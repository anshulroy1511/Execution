import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart as ReLineChart, Line } from "recharts";

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
  
const Graph = () => {
  return (
    <div><div className="grid gap-6 md:grid-cols-2">
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
  </div></div>
  )
}

export default Graph