import { Transaction, FraudAnalysisResult } from "../types";

const AI_MODEL_URL = "http://localhost:8000/predict"; // FastAPI Model URL

export async function analyzeTransaction(transaction: Transaction): Promise<FraudAnalysisResult> {
    try {
        // Call AI Model
        const response = await fetch(AI_MODEL_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch AI fraud prediction");
        }

        const aiResult = await response.json();

        // Ensure is_fraud_predicted is always present
        return {
            transaction_id: transaction.transaction_id,
            is_fraud: aiResult.is_fraud ?? false, // Default to false if missing
            fraud_source: "AI Model",
            fraud_reason: aiResult.fraud_reason || "No specific reason",
            fraud_score: aiResult.fraud_score ?? 0.0 // Default to 0 if missing
        };
    } catch (error) {
        console.error("🚨 AI Model Error:", error);

        // Return default values even if the AI model fails
        return {
            transaction_id: transaction.transaction_id,
            is_fraud: false, // Default to safe transaction
            fraud_source: "Error",
            fraud_reason: "AI Model Unavailable",
            fraud_score: 0.0
        };
    }
}