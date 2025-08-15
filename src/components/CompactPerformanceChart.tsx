import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useState } from 'react';

// Simplified data for compact view
const data = [{
  name: 'Jan',
  value: 10000
}, {
  name: 'Feb',
  value: 10500
}, {
  name: 'Mar',
  value: 9800
}, {
  name: 'Apr',
  value: 11200
}, {
  name: 'May',
  value: 12000
}, {
  name: 'Jun',
  value: 11800
}, {
  name: 'Jul',
  value: 13076
}];

const CustomTooltip = ({
  active,
  payload,
  label
}: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg">
        <p className="text-gray-900 dark:text-white font-medium text-sm">{label}</p>
        <p className="text-green-600 dark:text-green-400 text-sm">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const CompactPerformanceChart = ({ selectedPeriod }: { selectedPeriod?: string }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-[200px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              className="dark:[&>text]:fill-gray-300" 
              fontSize={10}
              tick={{ fontSize: 10 }}
            />
            <YAxis 
              stroke="#6b7280" 
              className="dark:[&>text]:fill-gray-300" 
              fontSize={10}
              tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#f97316" 
              strokeWidth={2} 
              dot={{
                fill: '#f97316',
                strokeWidth: 2,
                r: 3
              }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompactPerformanceChart;
