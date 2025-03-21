import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFraudReport extends Document {
    transaction_id: string;
    reporting_entity_id: string;
    transaction_data: object;
    fraud_details?: string;
    is_fraud_reported: boolean;
    is_fraud_predicted: boolean;
    fraud_score: number;
    fraud_reason: string;
    created_at: Date;
}

const FraudReportSchema: Schema<IFraudReport> = new Schema({
    transaction_id: { type: String, required: true },
    reporting_entity_id: { type: String, required: true },
    transaction_data: { type: Object, required: true }, // Store complete transaction data
    fraud_details: { type: String }, // Optional: Manual fraud report details
    is_fraud_reported: { type: Boolean, default: false }, // Default: Not reported
    is_fraud_predicted: { type: Boolean, required: true }, // AI-based fraud prediction
    fraud_score: { type: Number, required: true }, // AI model-generated fraud score (0-1)
    fraud_reason: { type: String, required: true }, // Reason for fraud detection
    created_at: { type: Date, default: Date.now } // Timestamp
});

const FraudReport: Model<IFraudReport> = 
    mongoose.models.FraudReport || mongoose.model<IFraudReport>('FraudReport', FraudReportSchema);

export default FraudReport;
