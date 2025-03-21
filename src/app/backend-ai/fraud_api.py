from fastapi import FastAPI
import joblib
import pandas as pd

app = FastAPI()

# ✅ Load trained AI fraud detection model
model = joblib.load("fraud_model.pkl")

@app.post("/predict")
async def predict_fraud(transaction: dict):
    """
    Predicts whether a given transaction is fraudulent.
    """
    try:
        # ✅ Convert input JSON to DataFrame
        df = pd.DataFrame([transaction])

        # ✅ Predict fraud
        prediction = model.predict(df)[0]  # 0 = Legit, 1 = Fraud
        fraud_score = model.predict_proba(df)[0][1]  # Probability of fraud

        return {
            "transaction_id": transaction.get("transaction_id", "unknown"),
            "is_fraud": bool(prediction),
            "fraud_source": "AI Model",
            "fraud_reason": "High fraud probability" if prediction else "Legitimate transaction",
            "fraud_score": float(fraud_score)
        }

    except Exception as e:
        return {"error": str(e)}