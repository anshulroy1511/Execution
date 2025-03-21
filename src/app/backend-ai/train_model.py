import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# ✅ Load the dataset
df = pd.read_csv("transactions_train.csv")

# ✅ Preview dataset structure
print(df.head())

# ✅ Select relevant features for fraud detection
features = [
    "transaction_amount",
    "transaction_channel",
    "transaction_payment_mode_anonymous",
    "payment_gateway_bank_anonymous",
    "payer_mobile_anonymous",
    "payer_browser_anonymous"
]
target = "is_fraud"  # Assuming there's a column indicating fraud (1 = fraud, 0 = legit)

# ✅ Check if all necessary columns exist
for col in features + [target]:
    if col not in df.columns:
        raise ValueError(f"❌ Missing column: {col}")

# ✅ Convert categorical values to numeric codes
for col in ["transaction_channel", "transaction_payment_mode_anonymous", "payment_gateway_bank_anonymous", "payer_mobile_anonymous", "payer_browser_anonymous"]:
    df[col] = df[col].astype("category").cat.codes

# ✅ Define input (X) and output (y)
X = df[features]
y = df[target]

# ✅ Split dataset (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ✅ Train the fraud detection model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# ✅ Evaluate model accuracy
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model Accuracy: {accuracy:.2f}")

# ✅ Save the trained model
joblib.dump(model, "fraud_model.pkl")
print("✅ Model saved as fraud_model.pkl")