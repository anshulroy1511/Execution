"use client";

import { useState } from "react";

export default function Anshul() {
  const [singleTransaction, setSingleTransaction] = useState({
    transaction_id: "",
    amount: "",
    transaction_type: "",
    payer_id: "",
  });

  const [batchTransactions, setBatchTransactions] = useState("");
  const [reportFraudData, setReportFraudData] = useState({
    transaction_id: "",
    reporting_entity_id: "",
    fraud_details: "",
  });

  const [singleResult, setSingleResult] = useState<string | null>(null);
  const [batchResult, setBatchResult] = useState<any | null>(null);
  const [reportResult, setReportResult] = useState<string | null>(null);

  // Handle input changes
  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSingleTransaction({ ...singleTransaction, [e.target.name]: e.target.value });
  };

  const handleBatchChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBatchTransactions(e.target.value);
  };

  const handleReportChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReportFraudData({ ...reportFraudData, [e.target.name]: e.target.value });
  };

  // ✅ Function to check a single transaction
  const analyzeSingleTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/backend/api/fraudDetection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(singleTransaction),
      });
      const data = await response.json();
      setSingleResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setSingleResult("Error checking transaction ❌");
    }
  };

  // ✅ Function to analyze batch transactions
  const analyzeBatchTransactions = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedTransactions = JSON.parse(batchTransactions);
      const response = await fetch("/backend/api/fraudDetectionBatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactions: parsedTransactions }),
      });
      const data = await response.json();
      setBatchResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setBatchResult("Error processing batch transactions ❌");
    }
  };

  // ✅ Function to report fraud
  const reportFraud = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        // ✅ Fetch the transaction details first using GET request
        const transactionResponse = await fetch(`http://localhost:3000/backend/api/fraudDetection?transaction_id=${reportFraudData.transaction_id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const transactionData = await transactionResponse.json();

        if (!transactionData.transaction_data) {
            setReportResult("Transaction not found ❌");
            return;
        }

        // ✅ Send fraud report request
        const requestData = {
            transaction_id: reportFraudData.transaction_id,
            reporting_entity_id: reportFraudData.reporting_entity_id,
            fraud_details: reportFraudData.fraud_details,
            transaction_data: transactionData.transaction_data // ✅ Use fetched transaction data
        };

        const response = await fetch("http://localhost:3000/backend/api/fraudReport", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();
        setReportResult(JSON.stringify(data, null, 2));
    } catch (error) {
        setReportResult("Error reporting fraud ❌");
    }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">🚀 Fraud Detection System</h1>

      {/* Single Transaction Check */}
      <div className="bg-white p-6 rounded shadow-md w-96 mb-6">
        <h2 className="text-lg font-bold mb-4">🔍 Check Single Transaction</h2>
        <form onSubmit={analyzeSingleTransaction}>
          <input type="text" name="transaction_id" placeholder="Transaction ID" className="border p-2 w-full mb-2" onChange={handleSingleChange} required />
          <input type="number" name="amount" placeholder="Amount" className="border p-2 w-full mb-2" onChange={handleSingleChange} required />
          <select name="transaction_type" className="border p-2 w-full mb-2" onChange={handleSingleChange}>
            <option value="">Select Transaction Type</option>
            <option value="wire_transfer">Wire Transfer</option>
            <option value="credit_card">Credit Card</option>
          </select>
          <input type="text" name="payer_id" placeholder="Payer ID" className="border p-2 w-full mb-4" onChange={handleSingleChange} required />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Analyze Transaction</button>
        </form>
        {singleResult && <pre className="mt-4 p-2 bg-gray-200 text-sm rounded">{singleResult}</pre>}
      </div>

      {/* Batch Fraud Detection */}
      <div className="bg-white p-6 rounded shadow-md w-96 mb-6">
        <h2 className="text-lg font-bold mb-4">📊 Batch Fraud Detection</h2>
        <form onSubmit={analyzeBatchTransactions}>
          <textarea name="batchTransactions" placeholder="Enter JSON array of transactions" className="border p-2 w-full mb-4 h-32" onChange={handleBatchChange}></textarea>
          <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Analyze Batch</button>
        </form>
        {batchResult && <pre className="mt-4 p-2 bg-gray-200 text-sm rounded">{batchResult}</pre>}
      </div>

      {/* Report Fraud */}
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">⚠ Report Fraud</h2>
        <form onSubmit={reportFraud}>
          <input type="text" name="transaction_id" placeholder="Transaction ID" className="border p-2 w-full mb-2" onChange={handleReportChange} required />
          <input type="text" name="reporting_entity_id" placeholder="Reporting Entity ID" className="border p-2 w-full mb-2" onChange={handleReportChange} required />
          <textarea name="fraud_details" placeholder="Describe fraud" className="border p-2 w-full mb-4 h-20" onChange={handleReportChange} required></textarea>
          <button className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700">Report Fraud</button>
        </form>
        {reportResult && <pre className="mt-4 p-2 bg-gray-200 text-sm rounded">{reportResult}</pre>}
      </div>
    </div>
  );
}