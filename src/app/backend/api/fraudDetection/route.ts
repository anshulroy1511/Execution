import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../config/db';
import FraudReport from '../../models/FraudReport';
import { analyzeTransaction } from "../../services/fraudDetectionService";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase(); // Ensure MongoDB is connected
        const transaction = await req.json();
        const fraudResult = await analyzeTransaction(transaction);

        // Ensure required fields are present
        if (fraudResult.is_fraud === undefined) {
            fraudResult.is_fraud = false; // Default to false if missing
        }
        if (fraudResult.fraud_score === undefined) {
            fraudResult.fraud_score = 0.0; // Default to 0 if missing
        }

        // Store result in MongoDB
        await FraudReport.create({
            transaction_id: fraudResult.transaction_id,
            reporting_entity_id: "system",
            transaction_data: transaction,
            is_fraud_predicted: fraudResult.is_fraud, // ✅ Ensure this field is always present
            fraud_score: fraudResult.fraud_score, // ✅ Ensure fraud_score is present
            fraud_reason: fraudResult.fraud_reason,
            is_fraud_reported: false
        });

        return NextResponse.json(fraudResult);
    } catch (error) {
        console.error("🚨 Fraud Detection Error:", error);
        return NextResponse.json({ error: "Error processing transaction" }, { status: 500 });
    }
}

// ✅ Add GET handler to retrieve a transaction by transaction_id
export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const url = new URL(req.url);
        const transactionId = url.searchParams.get("transaction_id");

        if (!transactionId) {
            return NextResponse.json({ error: "Missing transaction_id" }, { status: 400 });
        }

        // ✅ Fetch transaction from MongoDB
        const transaction = await FraudReport.findOne({ transaction_id: transactionId });

        if (!transaction) {
            return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
        }

        return NextResponse.json({ transaction_data: transaction.transaction_data });
    } catch (error) {
        console.error("🚨 Error fetching transaction:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}