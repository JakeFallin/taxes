
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { ChevronDown, Calendar, TrendingUp } from "lucide-react";
import { useState } from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";

const data = [
  { name: 'Jun 10', portfolio: 10200, sp500: 10000, nasdaq: 9800, gold: 9900, silver: 10100, btc: 9700 },
  { name: 'Jun 11', portfolio: 10350, sp500: 10050, nasdaq: 9900, gold: 9920, silver: 10150, btc: 9800 },
  { name: 'Jun 12', portfolio: 10280, sp500: 10100, nasdaq: 9950, gold: 9940, silver: 10120, btc: 9900 },
  { name: 'Jun 13', portfolio: 10420, sp500: 10150, nasdaq: 10000, gold: 9960, silver: 10180, btc: 10200 },
  { name: 'Jun 14', portfolio: 10380, sp500: 10200, nasdaq: 10050, gold: 9980, silver: 10200, btc: 10400 },
  { name: 'Jun 15', portfolio: 10420, sp500: 10250, nasdaq: 10100, gold: 10000, silver: 10220, btc: 10600 },
  { name: 'Jun 16', portfolio: 10420, sp500: 10300, nasdaq: 10150, gold: 10020, silver: 10240, btc: 10800 },
];

const timePeriods = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

const benchmarks = [
  { key: 'sp500', label: 'S&P 500', color: '#6b7280' },
  { key: 'nasdaq', label: 'NASDAQ', color: '#6b7280' },
  { key: 'gold', label: 'Gold', color: '#6b7280' },
  { key: 'silver', label: 'Silver', color: '#f97316' },
  { key: 'btc', label: 'BTC', color: '#6b7280' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-gray-900 dark:text-white font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: NOK {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PerformanceCard = ({ title, value, percentage, isPositive }: {
  title: string;
  value: string;
  percentage: string;
  isPositive: boolean;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm text-gray-600 dark:text-gray-300">{title}</h3>
      <TrendingUp size={16} className={isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"} />
    </div>
    <div className="space-y-1">
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className={`text-sm font-medium ${isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
        {percentage}
      </p>
    </div>
  </div>
);

const Performance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('3M');
  const [activeBenchmarks, setActiveBenchmarks] = useState(['sp500']);

  const toggleBenchmark = (benchmarkKey: string) => {
    setActiveBenchmarks(prev => 
      prev.includes(benchmarkKey) 
        ? prev.filter(key => key !== benchmarkKey)
        : [...prev, benchmarkKey]
    );
  };

  return (
    <div className="space-y-8">
      {/* Time Period Selector */}
      <div className="flex items-center gap-4">
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {timePeriods.map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={selectedPeriod === period 
                ? "bg-orange-500 dark:bg-orange-600 text-white shadow-sm hover:bg-orange-600 dark:hover:bg-orange-700" 
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-600"
              }
            >
              {period}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
          <Calendar size={16} />
          Custom Range
        </Button>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PerformanceCard
          title="Total Return"
          value="$1,514.74"
          percentage="+13.10%"
          isPositive={true}
        />
        <PerformanceCard
          title="Unrealized P&L"
          value="$1,245.32"
          percentage="+10.85%"
          isPositive={true}
        />
        <PerformanceCard
          title="Realized P&L"
          value="$269.42"
          percentage="+2.25%"
          isPositive={true}
        />
        <PerformanceCard
          title="Best Performer"
          value="Bitcoin"
          percentage="+28.5%"
          isPositive={true}
        />
      </div>

      {/* Portfolio vs. Benchmark Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio vs. Benchmark</h2>
          <div className="flex gap-2 flex-wrap">
            {benchmarks.map((benchmark) => (
              <Button
                key={benchmark.key}
                variant="outline"
                size="sm"
                onClick={() => toggleBenchmark(benchmark.key)}
                className={`border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  activeBenchmarks.includes(benchmark.key) 
                    ? 'bg-gray-100 dark:bg-gray-700' 
                    : 'bg-white dark:bg-gray-800'
                }`}
              >
                {benchmark.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis 
                dataKey="name" 
                stroke="#6b7280"
                className="dark:[&>text]:fill-gray-300"
                fontSize={12}
                axisLine={true}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                className="dark:[&>text]:fill-gray-300"
                fontSize={12}
                axisLine={true}
                tickLine={false}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Portfolio line - always shown in green */}
              <Line 
                type="monotone" 
                dataKey="portfolio" 
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
                name="Portfolio"
              />
              
              {/* Benchmark lines */}
              {benchmarks.map((benchmark) => 
                activeBenchmarks.includes(benchmark.key) && (
                  <Line
                    key={benchmark.key}
                    type="monotone"
                    dataKey={benchmark.key}
                    stroke={benchmark.color}
                    strokeWidth={2}
                    dot={false}
                    name={benchmark.label}
                  />
                )
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="text-center py-12">
          <div className="mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Premium feature</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Performance breakdown by crypto</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Upgrade to unlock this feature</p>
          <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">Upgrade now</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coin Diversity Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-900 dark:bg-gray-100 rounded-full"></div>
              </div>
              <div className="mb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Premium feature</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Coin Diversity</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Upgrade to unlock this feature</p>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">Upgrade now</Button>
            </div>
          </div>
        </div>

        {/* Portfolio Insights */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm h-full flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Portfolio Insights</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Tax loss harvesting</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">You currently don't have opportunities to harvest tax losses.</p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Preview impact</h4>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Funds on exchanges</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  You keep 0.00% of your assets on exchanges. Their current value is NOK 0.00.
                </p>
                <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">Learn more</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
