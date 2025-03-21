export interface Transaction {
    transaction_id: string;
    amount: number;
    currency: string;
    payer_id: string;
    payee_id: string;
    transaction_type: string;
}

export interface FraudAnalysisResult {
    transaction_id: string;
    is_fraud: boolean;
    fraud_source: string; // "AI Model" or "Rule Engine"
    fraud_reason: string; // Explanation for fraud decision
    fraud_score?: number; // AI model score (0 to 1), optional
}
