import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../config/db';
import FraudReport from '../../models/FraudReport';
import { analyzeTransaction } from '../../services/fraudDetectionService';

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const body = await req.json();
        const { transaction_id, reporting_entity_id, fraud_details, transaction_data } = body;

        // ✅ Fetch transaction details from DB if transaction_data is missing
        let transactionDetails = transaction_data;
        if (!transactionDetails) {
            const existingTransaction = await FraudReport.findOne({ transaction_id });
            if (!existingTransaction) {
                return NextResponse.json(
                    { error: "Transaction not found", transaction_id, reporting_acknowledged: false, failure_code: 404 },
                    { status: 404 }
                );
            }
            transactionDetails = existingTransaction.transaction_data;
        }

        // ✅ Ensure transaction_data is now available
        if (!transactionDetails) {
            return NextResponse.json(
                { error: "Transaction data missing", transaction_id, reporting_acknowledged: false, failure_code: 400 },
                { status: 400 }
            );
        }

        // ✅ Run fraud detection on transaction_data
        const fraudResult = await analyzeTransaction(transactionDetails);

        // ✅ Save fraud report in MongoDB
        await FraudReport.create({
            transaction_id,
            reporting_entity_id,
            fraud_details,
            transaction_data: transactionDetails,
            is_fraud_predicted: fraudResult.is_fraud,
            fraud_score: fraudResult.fraud_score,
            fraud_reason: fraudResult.fraud_reason,
            is_fraud_reported: true,
        });

        return NextResponse.json(
            { transaction_id, reporting_acknowledged: true, failure_code: 0 },
            { status: 201 }
        );
    } catch (error) {
        console.error("🚨 Error reporting fraud:", error);
        return NextResponse.json(
            { error: "Internal server error", transaction_id: null, reporting_acknowledged: false, failure_code: 500 },
            { status: 500 }
        );
    }
}