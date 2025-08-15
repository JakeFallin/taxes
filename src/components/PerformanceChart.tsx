
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { useState } from 'react';

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

const timePeriods = ['24H', '1W', '1M', '1Y', 'ALL'];

const CustomTooltip = ({
  active,
  payload,
  label
}: any) => {
  if (active && payload && payload.length) {
    return <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-gray-900 dark:text-white font-medium">{label}</p>
        <p className="text-green-600 dark:text-green-400">${payload[0].value.toLocaleString()}</p>
      </div>;
  }
  return null;
};

const PerformanceChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('ALL');
  
  return <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio Overview</h2>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {timePeriods.map(period => <Button key={period} variant={selectedPeriod === period ? "default" : "ghost"} size="sm" onClick={() => setSelectedPeriod(period)} className={selectedPeriod === period ? "bg-orange-500 dark:bg-orange-600 text-white shadow-sm hover:bg-orange-600 dark:hover:bg-orange-700" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-600"}>
              {period}
            </Button>)}
        </div>
      </div>
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#6b7280" className="dark:[&>text]:fill-gray-300" fontSize={12} />
            <YAxis stroke="#6b7280" className="dark:[&>text]:fill-gray-300" fontSize={12} tickFormatter={value => `$${(value / 1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} dot={{
            fill: '#f97316',
            strokeWidth: 2,
            r: 4
          }} className="dark:[&_circle]:display-none" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>;
};

export default PerformanceChart;
