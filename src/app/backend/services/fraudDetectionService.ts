import { Transaction, FraudAnalysisResult } from "../types";

// Rule-based engine configuration
const fraudRules = {
    high_amount_threshold: 5000, // Transactions above this may be flagged
    risky_transaction_types: ["wire_transfer", "crypto"], // High-risk transaction types
    blocked_users: ["user_99"] // Blocklist example
};

// AI-based fraud detection (placeholder)
export async function analyzeTransaction(transaction: Transaction): Promise<FraudAnalysisResult> {
    const fraudScore = Math.random(); // AI model score (to be replaced with actual model)
    let isFraud = fraudScore > 0.7;
    let fraudReason = isFraud ? "AI model detected high fraud probability" : "Legitimate transaction";

    // Apply rule-based checks
    if (transaction.amount && transaction.amount > fraudRules.high_amount_threshold) {
        isFraud = true;
        fraudReason = "Amount exceeds threshold";
    }
    if (fraudRules.risky_transaction_types.includes(transaction.transaction_type)) {
        isFraud = true;
        fraudReason = "High-risk transaction type detected";
    }
    if (fraudRules.blocked_users.includes(transaction.payer_id)) {
        isFraud = true;
        fraudReason = "Transaction from blocked user";
    }

    return {
        transaction_id: transaction.transaction_id,
        is_fraud: isFraud,
        fraud_source: "AI & Rule Engine",
        fraud_reason: fraudReason,
        fraud_score: fraudScore
    };
}
