
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp } from "lucide-react";
import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SidebarTrigger } from "@/components/ui/sidebar";

// Time ranges
const timePeriods = ['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const;

// Mock datasets with stronger separation (values in NOK)
const SERIES_DATA: Record<typeof timePeriods[number], Array<{ name: string; portfolio: number; sp500: number; nasdaq: number; gold: number; silver: number; btc: number }>> = {
  '1D': [
    { name: '09:00', portfolio: 315_000, sp500: 312_000, nasdaq: 313_000, gold: 309_000, silver: 308_000, btc: 320_000 },
    { name: '12:00', portfolio: 317_400, sp500: 312_800, nasdaq: 314_500, gold: 309_600, silver: 308_300, btc: 325_500 },
    { name: '15:00', portfolio: 318_900, sp500: 313_100, nasdaq: 315_300, gold: 309_900, silver: 308_700, btc: 329_800 },
    { name: '18:00', portfolio: 320_300, sp500: 313_900, nasdaq: 316_200, gold: 310_200, silver: 309_000, btc: 334_200 },
    { name: '21:00', portfolio: 321_800, sp500: 314_500, nasdaq: 317_100, gold: 310_500, silver: 309_200, btc: 337_600 },
  ],
  '1W': [
    { name: 'Mon', portfolio: 302_000, sp500: 296_000, nasdaq: 298_500, gold: 290_500, silver: 289_000, btc: 312_000 },
    { name: 'Tue', portfolio: 308_400, sp500: 297_800, nasdaq: 301_600, gold: 291_200, silver: 289_400, btc: 318_700 },
    { name: 'Wed', portfolio: 312_700, sp500: 299_300, nasdaq: 304_800, gold: 292_000, silver: 289_900, btc: 325_900 },
    { name: 'Thu', portfolio: 318_900, sp500: 301_200, nasdaq: 307_100, gold: 292_800, silver: 290_200, btc: 333_400 },
    { name: 'Fri', portfolio: 322_300, sp500: 302_600, nasdaq: 309_500, gold: 293_400, silver: 290_600, btc: 341_800 },
  ],
  '1M': [
    { name: 'W1', portfolio: 285_000, sp500: 270_000, nasdaq: 275_000, gold: 260_000, silver: 258_000, btc: 295_000 },
    { name: 'W2', portfolio: 298_200, sp500: 274_500, nasdaq: 281_800, gold: 263_200, silver: 259_100, btc: 309_600 },
    { name: 'W3', portfolio: 305_600, sp500: 279_400, nasdaq: 289_700, gold: 265_600, silver: 260_200, btc: 321_900 },
    { name: 'W4', portfolio: 319_400, sp500: 284_300, nasdaq: 296_800, gold: 268_700, silver: 261_400, btc: 338_200 },
  ],
  '3M': [
    { name: 'M1', portfolio: 260_000, sp500: 240_000, nasdaq: 245_000, gold: 230_000, silver: 228_000, btc: 275_000 },
    { name: 'M2', portfolio: 292_500, sp500: 252_000, nasdaq: 260_000, gold: 236_000, silver: 232_000, btc: 315_000 },
    { name: 'M3', portfolio: 325_400, sp500: 266_100, nasdaq: 282_500, gold: 245_000, silver: 238_500, btc: 352_000 },
  ],
  '1Y': [
    { name: 'Jan', portfolio: 210_000, sp500: 200_000, nasdaq: 205_000, gold: 190_000, silver: 188_000, btc: 220_000 },
    { name: 'Apr', portfolio: 236_200, sp500: 210_500, nasdaq: 219_000, gold: 197_000, silver: 192_000, btc: 255_000 },
    { name: 'Jul', portfolio: 279_300, sp500: 228_000, nasdaq: 243_000, gold: 208_000, silver: 200_000, btc: 305_000 },
    { name: 'Oct', portfolio: 298_700, sp500: 246_500, nasdaq: 259_000, gold: 218_000, silver: 205_000, btc: 330_000 },
    { name: 'Dec', portfolio: 325_400, sp500: 266_100, nasdaq: 276_000, gold: 226_000, silver: 210_000, btc: 360_000 },
  ],
  'ALL': [
    { name: '2021', portfolio: 120_000, sp500: 115_000, nasdaq: 118_000, gold: 110_000, silver: 108_000, btc: 130_000 },
    { name: '2022', portfolio: 158_000, sp500: 140_000, nasdaq: 148_000, gold: 125_000, silver: 120_000, btc: 165_000 },
    { name: '2023', portfolio: 212_000, sp500: 175_000, nasdaq: 190_000, gold: 140_000, silver: 135_000, btc: 220_000 },
    { name: '2024', portfolio: 268_000, sp500: 205_000, nasdaq: 225_000, gold: 160_000, silver: 152_000, btc: 290_000 },
    { name: '2025', portfolio: 325_400, sp500: 266_100, nasdaq: 280_000, gold: 175_000, silver: 164_000, btc: 360_000 },
  ],
};

const benchmarks = [
  { key: 'sp500', label: 'S&P 500', color: '#3b82f6' },
  { key: 'nasdaq', label: 'NASDAQ', color: '#8b5cf6' },
  { key: 'gold', label: 'Gold', color: '#f59e0b' },
  { key: 'silver', label: 'Silver', color: '#9ca3af' },
  { key: 'btc', label: 'BTC', color: '#f97316' },
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
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<typeof timePeriods[number]>('3M');
  const [activeBenchmarks, setActiveBenchmarks] = useState(['sp500']);
  const chartData = useMemo(() => SERIES_DATA[selectedPeriod], [selectedPeriod]);

  const yDomain = useMemo(() => {
    if (!chartData || chartData.length === 0) return ['auto', 'auto'] as [any, any];
    const keys = ['portfolio', ...activeBenchmarks] as const;
    let min = Infinity;
    let max = -Infinity;
    chartData.forEach((d: any) => {
      keys.forEach((k) => {
        const v = d[k];
        if (typeof v === 'number') {
          if (v < min) min = v;
          if (v > max) max = v;
        }
      });
    });
    const pad = Math.max(1, (max - min) * 0.02);
    return [min - pad, max + pad] as [number, number];
  }, [chartData, activeBenchmarks]);

  const toggleBenchmark = (benchmarkKey: string) => {
    setActiveBenchmarks(prev => 
      prev.includes(benchmarkKey) 
        ? prev.filter(key => key !== benchmarkKey)
        : [...prev, benchmarkKey]
    );
  };

  return (
    <div className="space-y-8">
      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PerformanceCard
          title={t('performance.totalReturn')}
          value="$1,514.74"
          percentage="+13.10%"
          isPositive={true}
        />
        <PerformanceCard
          title={t('performance.unrealized')}
          value="$1,245.32"
          percentage="+10.85%"
          isPositive={true}
        />
        <PerformanceCard
          title={t('performance.realized')}
          value="$269.42"
          percentage="+2.25%"
          isPositive={true}
        />
        <PerformanceCard
          title={t('performance.bestPerformer')}
          value="Bitcoin"
          percentage="+28.5%"
          isPositive={true}
        />
      </div>

      {/* Portfolio vs. Benchmark Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('performance.pvb')}</h2>
          <div className="flex flex-col gap-3 items-end">
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
            <div className="flex gap-2 flex-wrap justify-end">
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
              <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                <Calendar size={16} />
                {t('performance.customRange')}
              </Button>
            </div>
          </div>
        </div>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
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
                tickFormatter={(value) => `NOK ${(value / 1000).toFixed(0)}k`}
                domain={yDomain}
                allowDataOverflow
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Portfolio line */}
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
            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{t('performance.premium')}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('performance.breakdownByCrypto')}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{t('performance.upgrade')}</p>
          <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">{t('performance.upgradeNow')}</Button>
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
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{t('performance.premium')}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{t('performance.coinDiversity')}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{t('performance.upgrade')}</p>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">{t('performance.upgradeNow')}</Button>
            </div>
          </div>
        </div>

        {/* Portfolio Insights */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm h-full flex flex-col justify-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('performance.portfolioInsights')}</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{t('performance.tlh')}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t('performance.noOpportunities')}</p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{t('performance.previewImpact')}</h4>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{t('performance.fundsOnExchanges')}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  You keep 0.00% of your assets on exchanges. Their current value is NOK 0.00.
                </p>
                <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">{t('performance.learnMore')}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
