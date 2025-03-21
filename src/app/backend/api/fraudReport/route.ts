import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../config/db';
import FraudReport from '../../models/FraudReport';
import { analyzeTransaction } from '../../services/fraudDetectionService';

export async function POST(req: NextRequest) {
    try {
        // Ensure MongoDB is connected
        await connectToDatabase();

        // Parse request body
        const body = await req.json();
        const { transaction_id, reporting_entity_id, fraud_details, transaction_data } = body;

        // Validate required fields
        if (!transaction_id || !reporting_entity_id || !fraud_details || !transaction_data) {
            return NextResponse.json(
                { error: "Missing required fields", transaction_id, reporting_acknowledged: false, failure_code: 400 },
                { status: 400 }
            );
        }

        // Check if the transaction is already reported
        const existingReport = await FraudReport.findOne({ transaction_id });

        if (existingReport) {
            return NextResponse.json(
                { error: "Fraud already reported", transaction_id, reporting_acknowledged: false, failure_code: 409 },
                { status: 409 }
            );
        }

        // Run fraud detection to get required fields
        const fraudResult = await analyzeTransaction(transaction_data);

        // Create a new fraud report entry with all required fields
        const report = new FraudReport({
            transaction_id,
            reporting_entity_id,
            fraud_details,
            transaction_data,
            is_fraud_predicted: fraudResult.is_fraud, // Required field
            fraud_score: fraudResult.fraud_score, // Required field
            fraud_reason: fraudResult.fraud_reason, // Required field
            is_fraud_reported: true,
        });

        // Save the fraud report to MongoDB
        await report.save();

        console.log(`✅ Fraud Report Saved for Transaction: ${transaction_id}`);

        return NextResponse.json(
            { transaction_id, reporting_acknowledged: true, failure_code: 0 },
            { status: 201 }
        );

    } catch (error) {
        console.error('🚨 Error reporting fraud:', error);
        return NextResponse.json(
            { error: "Internal server error", transaction_id: null, reporting_acknowledged: false, failure_code: 500 },
            { status: 500 }
        );
    }
}
