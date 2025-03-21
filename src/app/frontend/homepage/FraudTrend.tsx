import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import React from 'react'
import { CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis ,LineChart as ReLineChart} from 'recharts'

const timeSeriesData = [
    { date: "2025-03-01", predicted: 2, reported: 1 },
    { date: "2025-03-05", predicted: 3, reported: 2 },
    { date: "2025-03-10", predicted: 5, reported: 3 },
    { date: "2025-03-15", predicted: 4, reported: 3 },
    { date: "2025-03-20", predicted: 6, reported: 4 },
    { date: "2025-03-25", predicted: 3, reported: 2 },
    { date: "2025-03-30", predicted: 4, reported: 3 },
  ];
const FraudTrend = () => {
  return (
    <div> <Card>
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
  </Card></div>
  )
}

export default FraudTrend