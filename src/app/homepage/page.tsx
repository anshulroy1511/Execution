"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Activity, BarChart3, Calendar, CreditCard, Filter, LineChart, Search, ShieldAlert, ShieldCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart as ReLineChart, Line } from "recharts";

// Mock data
const mockTransactions = [
  { id: "TX001", payerId: "PAY001", payeeId: "PYE001", amount: 1250.00, is_fraud_predicted: false, is_fraud_reported: false, date: "2025-03-15", channel: "Online", paymentMode: "Credit Card", gatewayBank: "CitiBank" },
  { id: "TX002", payerId: "PAY002", payeeId: "PYE003", amount: 850.75, is_fraud_predicted: true, is_fraud_reported: true, date: "2025-03-16", channel: "Mobile", paymentMode: "Debit Card", gatewayBank: "Chase" },
  { id: "TX003", payerId: "PAY001", payeeId: "PYE002", amount: 2500.00, is_fraud_predicted: true, is_fraud_reported: false, date: "2025-03-17", channel: "ATM", paymentMode: "Cash", gatewayBank: "Bank of America" },
  { id: "TX004", payerId: "PAY003", payeeId: "PYE001", amount: 750.25, is_fraud_predicted: false, is_fraud_reported: false, date: "2025-03-18", channel: "Branch", paymentMode: "Check", gatewayBank: "Wells Fargo" },
  { id: "TX005", payerId: "PAY002", payeeId: "PYE004", amount: 3200.50, is_fraud_predicted: false, is_fraud_reported: true, date: "2025-03-19", channel: "Online", paymentMode: "Wire Transfer", gatewayBank: "JPMorgan" },
  { id: "TX006", payerId: "PAY004", payeeId: "PYE002", amount: 1100.00, is_fraud_predicted: true, is_fraud_reported: true, date: "2025-03-20", channel: "Mobile", paymentMode: "Credit Card", gatewayBank: "CitiBank" },
];

// Sample data for charts
const channelData = [
  { name: "Online", predicted: 12, reported: 8 },
  { name: "Mobile", predicted: 8, reported: 5 },
  { name: "ATM", predicted: 3, reported: 2 },
  { name: "Branch", predicted: 1, reported: 1 },
];

const paymentModeData = [
  { name: "Credit Card", value: 45, color: "#ff4d6d" },
  { name: "Debit Card", value: 25, color: "#3a86ff" },
  { name: "Wire Transfer", value: 15, color: "#8338ec" },
  { name: "Cash", value: 10, color: "#ffbe0b" },
  { name: "Check", value: 5, color: "#06d6a0" },
];

const timeSeriesData = [
  { date: "2025-03-01", predicted: 2, reported: 1 },
  { date: "2025-03-05", predicted: 3, reported: 2 },
  { date: "2025-03-10", predicted: 5, reported: 3 },
  { date: "2025-03-15", predicted: 4, reported: 3 },
  { date: "2025-03-20", predicted: 6, reported: 4 },
  { date: "2025-03-25", predicted: 3, reported: 2 },
  { date: "2025-03-30", predicted: 4, reported: 3 },
];

const payerOptions = [
  { value: "all", label: "All Payers" },
  { value: "PAY001", label: "PAY001" },
  { value: "PAY002", label: "PAY002" },
  { value: "PAY003", label: "PAY003" },
  { value: "PAY004", label: "PAY004" },
];

const payeeOptions = [
  { value: "all", label: "All Payees" },
  { value: "PYE001", label: "PYE001" },
  { value: "PYE002", label: "PYE002" },
  { value: "PYE003", label: "PYE003" },
  { value: "PYE004", label: "PYE004" },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayer, setSelectedPayer] = useState("all");
  const [selectedPayee, setSelectedPayee] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  const filteredTransactions = mockTransactions.filter(transaction => {
    // Filter by transaction ID search
    if (searchTerm && !transaction.id.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by payer
    if (selectedPayer !== "all" && transaction.payerId !== selectedPayer) {
      return false;
    }
    
    // Filter by payee
    if (selectedPayee !== "all" && transaction.payeeId !== selectedPayee) {
      return false;
    }
    
    // Filter by tab selection
    if (activeTab === "predicted" && !transaction.is_fraud_predicted) {
      return false;
    }
    if (activeTab === "reported" && !transaction.is_fraud_reported) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="p-0">
      <div className="w-screen dark bg-background text-foreground p-20">

      <h1 className="text-center text-5xl font-bold bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text mb-5 mt-[-10] bg-clip-text">
  DASHBOARD
</h1>
 
      {/* Summary Cards */}
      <div className="bg-gradient-to-b from-background to-background/80 pt-0 ">
        <div className=" mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 ">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                  <h3 className="text-2xl font-bold">{mockTransactions.length}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-destructive/20">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="p-2 bg-destructive/10 rounded-full">
                  <ShieldAlert className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Predicted Fraud</p>
                  <h3 className="text-2xl font-bold">{mockTransactions.filter(t => t.is_fraud_predicted).length}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-orange-500/20">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="p-2 bg-orange-500/10 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-orange-500" />
                </div>
                <div >
                  <p className="text-sm font-medium text-muted-foreground">Reported Fraud</p>
                  <h3 className="text-2xl font-bold">{mockTransactions.filter(t => t.is_fraud_reported).length}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-blue-500/20 ">
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="p-2 bg-blue-500/10 rounded-full">
                  <CreditCard className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                  <h3 className="text-2xl font-bold">
                    ${mockTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <main className="flex-1 mx-auto px-4 py-6">
        <div className="grid gap-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
          <LineChart className="h-8 w-8 text-primary" />
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
            Transaction Monitoring Dashboard
          </span>
</h1>

              <p className="text-muted-foreground">Monitor and analyze transaction fraud patterns</p>
            </div>
            <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-md border border-border/50">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <DateRangePicker className="w-full md:w-auto" />
            </div>
          </div>
          
          {/* Filters Section */}
          <Card>
            <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
  <Filter className="h-5 w-5 text-primary " />
  <span className=" text-2xl">
    Filters & Search
  </span>
</CardTitle>

            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Transaction ID</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by Transaction ID" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Payer ID</label>
                  <Select 
                    options={payerOptions} 
                    value={selectedPayer}
                    onChange={(e) => setSelectedPayer(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Payee ID</label>
                  <Select 
                    options={payeeOptions} 
                    value={selectedPayee}
                    onChange={(e) => setSelectedPayee(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Data Table Section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
               <span className="2xl"> Transaction Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4 justify-around">
                  <TabsTrigger value="all">All Transactions</TabsTrigger>
                  <TabsTrigger value="predicted">Predicted Fraud</TabsTrigger>
                  <TabsTrigger value="reported">Reported Fraud</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab} className="w-full">
                  <div className="rounded-md border">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr className="text-left">
                            <th className="p-2 font-medium">Transaction ID</th>
                            <th className="p-2 font-medium">Payer ID</th>
                            <th className="p-2 font-medium">Payee ID</th>
                            <th className="p-2 font-medium">Amount</th>
                            <th className="p-2 font-medium">Date</th>
                            <th className="p-2 font-medium">Channel</th>
                            <th className="p-2 font-medium">Payment Mode</th>
                            <th className="p-2 font-medium">Gateway Bank</th>
                            <th className="p-2 font-medium">Predicted Fraud</th>
                            <th className="p-2 font-medium">Reported Fraud</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTransactions.length > 0 ? (
                            filteredTransactions.map((transaction) => (
                              <tr key={transaction.id} className="border-t">
                                <td className="p-2">{transaction.id}</td>
                                <td className="p-2">{transaction.payerId}</td>
                                <td className="p-2">{transaction.payeeId}</td>
                                <td className="p-2">${transaction.amount.toFixed(2)}</td>
                                <td className="p-2">{transaction.date}</td>
                                <td className="p-2">{transaction.channel}</td>
                                <td className="p-2">{transaction.paymentMode}</td>
                                <td className="p-2">{transaction.gatewayBank}</td>
                                <td className="p-2">
                                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${transaction.is_fraud_predicted ? 'bg-destructive/20 text-destructive' : 'bg-secondary text-secondary-foreground'}`}>
                                    {transaction.is_fraud_predicted ? (
                                      <>
                                        <ShieldAlert className="mr-1 h-3 w-3" />
                                        Yes
                                      </>
                                    ) : (
                                      <>
                                        <ShieldCheck className="mr-1 h-3 w-3" />
                                        No
                                      </>
                                    )}
                                  </span>
                                </td>
                                <td className="p-2">
                                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${transaction.is_fraud_reported ? 'bg-destructive/20 text-destructive' : 'bg-secondary text-secondary-foreground'}`}>
                                    {transaction.is_fraud_reported ? (
                                      <>
                                        <ShieldAlert className="mr-1 h-3 w-3" />
                                        Yes
                                      </>
                                    ) : (
                                      <>
                                        <ShieldCheck className="mr-1 h-3 w-3" />
                                        No
                                      </>
                                    )}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={10} className="p-4 text-center text-muted-foreground">
                                No transactions found matching the current filters.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Graphs & Metrics Section */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Fraud by Channel</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={channelData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#888' }} />
                    <YAxis tick={{ fill: '#888' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e1e2e', borderColor: '#333', borderRadius: '6px' }} 
                      itemStyle={{ color: '#eee' }} 
                      labelStyle={{ color: '#eee' }} 
                    />
                    <Bar dataKey="predicted" name="Predicted Fraud" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="reported" name="Reported Fraud" fill="#f97316" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Fraud by Payment Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={paymentModeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentModeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e1e2e', borderColor: '#333', borderRadius: '6px' }} 
                      itemStyle={{ color: '#eee' }} 
                      labelStyle={{ color: '#eee' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Fraud Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ReLineChart data={timeSeriesData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: '#888' }} />
                  <YAxis tick={{ fill: '#888' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e1e2e', borderColor: '#333', borderRadius: '6px' }} 
                    itemStyle={{ color: '#eee' }} 
                    labelStyle={{ color: '#eee' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predicted" 
                    name="Predicted Fraud" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="reported" 
                    name="Reported Fraud" 
                    stroke="#f97316" 
                    strokeWidth={2} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </ReLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center p-4 border rounded-md">
                  <h3 className="font-medium">Precision</h3>
                  <div className="text-3xl font-bold mt-2">83%</div>
                  <p className="text-xs text-muted-foreground mt-1">Based on last 30 days</p>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-md">
                  <h3 className="font-medium">Recall</h3>
                  <div className="text-3xl font-bold mt-2">76%</div>
                  <p className="text-xs text-muted-foreground mt-1">Based on last 30 days</p>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-md">
                  <h3 className="font-medium">F1 Score</h3>
                  <div className="text-3xl font-bold mt-2">79%</div>
                  <p className="text-xs text-muted-foreground mt-1">Based on last 30 days</p>
                </div>
              </div>
              <div className="mt-4 h-[200px] grid grid-cols-2 gap-2">
                <div className="grid grid-cols-2 grid-rows-2 gap-1 p-4 border rounded-md">
                  <div className="flex flex-col items-center justify-center p-2 rounded bg-green-500/20 border border-green-500/30">
                    <p className="text-xs text-muted-foreground">True Negative</p>
                    <p className="text-2xl font-bold">342</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 rounded bg-orange-500/20 border border-orange-500/30">
                    <p className="text-xs text-muted-foreground">False Positive</p>
                    <p className="text-2xl font-bold">43</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 rounded bg-orange-500/20 border border-orange-500/30">
                    <p className="text-xs text-muted-foreground">False Negative</p>
                    <p className="text-2xl font-bold">27</p>
                  </div>
                  <div className="flex flex-col items-center justify-center p-2 rounded bg-green-500/20 border border-green-500/30">
                    <p className="text-xs text-muted-foreground">True Positive</p>
                    <p className="text-2xl font-bold">168</p>
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 border rounded-md">
                  <ul className="space-y-4 w-full">
                    <li className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Accuracy</span>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-muted overflow-hidden rounded-full mr-2">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                        <span className="text-sm font-medium">87%</span>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">F1 Score</span>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-muted overflow-hidden rounded-full mr-2">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '79%' }}></div>
                        </div>
                        <span className="text-sm font-medium">79%</span>
                      </div>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Specificity</span>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-muted overflow-hidden rounded-full mr-2">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '89%' }}></div>
                        </div>
                        <span className="text-sm font-medium">89%</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
    </div>
  );
}