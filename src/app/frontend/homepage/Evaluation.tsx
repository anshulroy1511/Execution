import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import React from 'react'

const Evaluation = () => {
  return (
    <div>  <Card>
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
  </Card></div>
  )
}

export default Evaluation