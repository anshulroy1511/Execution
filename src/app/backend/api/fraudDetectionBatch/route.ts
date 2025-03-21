import { NextRequest, NextResponse } from 'next/server';
import FraudReport from '../../models/FraudReport';
import { analyzeTransaction } from "../../services/fraudDetectionService";

export async function POST(req: NextRequest) {
    try {
        const { transactions } = await req.json();
        
        if (!Array.isArray(transactions)) {
            return NextResponse.json({ error: "Invalid input, expected an array of transactions" }, { status: 400 });
        }

        // Process all transactions concurrently
        const results = await Promise.all(transactions.map(async (transaction) => {
            const fraudResult = await analyzeTransaction(transaction);

            // Save to MongoDB
            await FraudReport.create({
                transaction_id: fraudResult.transaction_id,
                reporting_entity_id: "system", // Auto-detected fraud
                transaction_data: transaction,
                is_fraud_predicted: fraudResult.is_fraud,
                fraud_score: fraudResult.fraud_score,
                fraud_reason: fraudResult.fraud_reason,
                is_fraud_reported: false
            });

            return { [fraudResult.transaction_id]: fraudResult };
        }));

        return NextResponse.json(Object.assign({}, ...results));
    } catch (error) {
        console.error("Batch Fraud Detection Error:", error);
        return NextResponse.json({ error: "Error processing batch transactions" }, { status: 500 });
    }
}
