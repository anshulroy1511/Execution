"use client";

import { useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";


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
  const [dashboardData, setDashboardData] = useState([]);

  const handleSingleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSingleTransaction({ ...singleTransaction, [e.target.name]: e.target.value });
  };

  const handleBatchChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBatchTransactions(e.target.value);
  };

  const handleReportChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReportFraudData({ ...reportFraudData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (url: string, payload: any, setResult: any) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("Error processing request ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">🚀 Fraud Detection System</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {/* Card Component */}
        {[
          { title: "🔍 Single Transaction", action: () => handleSubmit("/api/fraud", singleTransaction, setSingleResult), result: singleResult, data: singleTransaction, handler: handleSingleChange },
          { title: "📊 Batch Transactions", action: () => handleSubmit("/api/batchFraud", { transactions: JSON.parse(batchTransactions) }, setBatchResult), result: batchResult, data: batchTransactions, handler: handleBatchChange },
          { title: "⚠ Report Fraud", action: () => handleSubmit("/api/reportFraud", reportFraudData, setReportResult), result: reportResult, data: reportFraudData, handler: handleReportChange },
        ].map(({ title, action, result, handler }, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition w-full">
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                action();
              }}
              className="space-y-4"
            >
              {Object.keys(singleTransaction).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  placeholder={key.replace(/_/g, ' ').toUpperCase()}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300 focus:outline-none"
                  onChange={handler}
                />
              ))}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
            {result && (
              <pre className="mt-4 p-2 bg-gray-100 border rounded text-sm overflow-auto max-h-40">{result}</pre>
            )}
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="bg-white p-6 mt-10 rounded-lg shadow-lg hover:shadow-xl transition w-full col-span-full mb-40">
          <h2 className="text-2xl font-semibold mb-4">📈 Fraud Analysis Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="fraudulentTransactions" stroke="#FF0000" strokeWidth={2} />
              <Line type="monotone" dataKey="totalTransactions" stroke="#00C49F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
    </div>
  );
}
