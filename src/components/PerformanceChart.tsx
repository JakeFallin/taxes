
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { Button } from "@/components/ui/button";
import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

// Time ranges to display
const timePeriods = ['24H', '1W', '1M', '1Y', 'ALL'] as const;

// Mock datasets for Portfolio vs Benchmark (values in NOK)
// Keep portfolio and benchmark noticeably different to look impressive in demos
const SERIES_DATA: Record<typeof timePeriods[number], Array<{ name: string; portfolio: number; benchmark: number }>> = {
  '24H': [
    { name: '00:00', portfolio: 300_000, benchmark: 309_000 },
    { name: '04:00', portfolio: 315_000, benchmark: 309_400 },
    { name: '08:00', portfolio: 330_000, benchmark: 309_900 },
    { name: '12:00', portfolio: 310_000, benchmark: 310_200 },
    { name: '16:00', portfolio: 345_000, benchmark: 310_600 },
    { name: '20:00', portfolio: 325_000, benchmark: 311_100 },
    { name: '24:00', portfolio: 338_000, benchmark: 311_400 },
  ],
  '1W': [
    { name: 'Mon', portfolio: 290_000, benchmark: 298_000 },
    { name: 'Tue', portfolio: 320_000, benchmark: 299_200 },
    { name: 'Wed', portfolio: 305_000, benchmark: 300_900 },
    { name: 'Thu', portfolio: 340_000, benchmark: 301_100 },
    { name: 'Fri', portfolio: 330_000, benchmark: 302_000 },
    { name: 'Sat', portfolio: 360_000, benchmark: 303_400 },
    { name: 'Sun', portfolio: 315_000, benchmark: 304_000 },
  ],
  '1M': [
    { name: 'W1', portfolio: 280_000, benchmark: 280_000 },
    { name: 'W2', portfolio: 335_000, benchmark: 284_400 },
    { name: 'W3', portfolio: 295_000, benchmark: 288_900 },
    { name: 'W4', portfolio: 365_000, benchmark: 293_200 },
  ],
  '1Y': [
    { name: 'Jan', portfolio: 220_000, benchmark: 205_000 },
    { name: 'Feb', portfolio: 260_000, benchmark: 209_400 },
    { name: 'Mar', portfolio: 240_000, benchmark: 212_300 },
    { name: 'Apr', portfolio: 285_000, benchmark: 216_500 },
    { name: 'May', portfolio: 260_000, benchmark: 222_400 },
    { name: 'Jun', portfolio: 310_000, benchmark: 228_700 },
    { name: 'Jul', portfolio: 350_000, benchmark: 236_100 },
    { name: 'Aug', portfolio: 300_000, benchmark: 241_400 },
    { name: 'Sep', portfolio: 360_000, benchmark: 246_800 },
    { name: 'Oct', portfolio: 330_000, benchmark: 252_300 },
    { name: 'Nov', portfolio: 380_000, benchmark: 258_900 },
    { name: 'Dec', portfolio: 410_000, benchmark: 266_100 },
  ],
  'ALL': [
    { name: '2021', portfolio: 120_000, benchmark: 118_000 },
    { name: '2022', portfolio: 180_000, benchmark: 145_000 },
    { name: '2023', portfolio: 240_000, benchmark: 190_000 },
    { name: '2024', portfolio: 300_000, benchmark: 230_000 },
    { name: '2025', portfolio: 380_000, benchmark: 266_100 },
  ],
};

const currencyTick = (value: number) => `NOK ${(value / 1000).toFixed(0)}k`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const portfolio = payload.find((p: any) => p.dataKey === 'portfolio')?.value;
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg min-w-[180px]">
        <p className="text-gray-900 dark:text-white font-medium mb-1">{label}</p>
        <div className="text-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Portfolio</span>
            <span className="text-orange-600 dark:text-orange-400 font-semibold">NOK {portfolio?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const PerformanceChart = () => {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<typeof timePeriods[number]>('ALL');
  const data = useMemo(() => SERIES_DATA[selectedPeriod], [selectedPeriod]);
  const yDomain = useMemo(() => {
    if (!data || data.length === 0) return ['auto', 'auto'] as [any, any];
    const values = data.map(d => d.portfolio);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = Math.max(1, (max - min) * 0.02);
    return [min - pad, max + pad] as [number, number];
  }, [data]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('')}</h2>
        <div className="flex items-center gap-4">
          <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {timePeriods.map(period => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className={selectedPeriod === period
                  ? "bg-orange-500 dark:bg-orange-600 text-white shadow-sm hover:bg-orange-600 dark:hover:bg-orange-700"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-600"}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 min-h-0 h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="#6b7280" className="dark:[&>text]:fill-gray-300" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#6b7280" className="dark:[&>text]:fill-gray-300" fontSize={12} tickFormatter={currencyTick} domain={yDomain} allowDataOverflow tickLine={false} axisLine={false} />
            <Tooltip cursor={{ stroke: "#9ca3af", strokeDasharray: "3 3" }} content={<CustomTooltip />} />
            <Area type="linear" dataKey="portfolio" stroke="#f97316" strokeWidth={2.5} fillOpacity={1} fill="url(#portfolioFill)" dot={false} />
            <Line type="linear" dataKey="portfolio" stroke="#f97316" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
