import { NextRequest, NextResponse } from 'next/server';
import FraudReport from '../../models/FraudReport';
import { analyzeTransaction } from "../../services/fraudDetectionService";
import {connectToDatabase} from "../../config/db"

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase(); // Ensure MongoDB is connected
        const transaction = await req.json();
        const fraudResult = await analyzeTransaction(transaction);

        // Store result in MongoDB
        await FraudReport.create({
            transaction_id: fraudResult.transaction_id,
            reporting_entity_id: "system",
            transaction_data: transaction,
            is_fraud_predicted: fraudResult.is_fraud,
            fraud_score: fraudResult.fraud_score,
            fraud_reason: fraudResult.fraud_reason,
            is_fraud_reported: false
        });

        return NextResponse.json(fraudResult);
    } catch (error) {
        console.error("Fraud Detection Error:", error);
        return NextResponse.json({ error: "Error processing transaction" }, { status: 500 });
    }
}
