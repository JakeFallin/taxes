import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';

// Supported time ranges (prop comes from parent)
const timePeriods = ['24H', '1W', '1M', '1Y', 'ALL'] as const;

// Mock compact datasets (NOK). Keep portfolio ahead of benchmark for a more impressive mock.
const SERIES_DATA: Record<typeof timePeriods[number], Array<{ name: string; portfolio: number; benchmark: number }>> = {
  '24H': [
    { name: '00:00', portfolio: 300_000, benchmark: 309_000 },
    { name: '06:00', portfolio: 335_000, benchmark: 309_800 },
    { name: '12:00', portfolio: 310_000, benchmark: 310_700 },
    { name: '18:00', portfolio: 345_000, benchmark: 311_200 },
    { name: '24:00', portfolio: 338_000, benchmark: 311_500 },
  ],
  '1W': [
    { name: 'Mon', portfolio: 290_000, benchmark: 298_000 },
    { name: 'Wed', portfolio: 340_000, benchmark: 301_000 },
    { name: 'Fri', portfolio: 360_000, benchmark: 302_000 },
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
    { name: 'Apr', portfolio: 285_000, benchmark: 216_500 },
    { name: 'Jul', portfolio: 350_000, benchmark: 236_100 },
    { name: 'Oct', portfolio: 330_000, benchmark: 252_300 },
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
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-lg min-w-[180px]">
        <p className="text-gray-900 dark:text-white font-medium text-xs mb-1">{label}</p>
        <div className="text-xs space-y-1">
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

const CompactPerformanceChart = ({ selectedPeriod }: { selectedPeriod?: string }) => {
  const period = (timePeriods as readonly string[]).includes(selectedPeriod || '') ? (selectedPeriod as typeof timePeriods[number]) : 'ALL';
  const data = SERIES_DATA[period];
  const yDomain = (() => {
    if (!data || data.length === 0) return ['auto', 'auto'] as [any, any];
    const values = data.map(d => d.portfolio);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const pad = Math.max(1, (max - min) * 0.02);
    return [min - pad, max + pad] as [number, number];
  })();

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 20, bottom: 70, left: -20 }}>
            <defs>
              <linearGradient id="portfolioFillCompact" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              stroke="#6b7280" 
              className="dark:[&>text]:fill-gray-300" 
              fontSize={9}
              tick={{ fontSize: 9 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280" 
              className="dark:[&>text]:fill-gray-300" 
              fontSize={9}
              tickFormatter={currencyTick}
              domain={yDomain}
              allowDataOverflow
              tick={{ fontSize: 9 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip cursor={{ stroke: "#9ca3af", strokeDasharray: "3 3" }} content={<CustomTooltip />} />
            <Area type="linear" dataKey="portfolio" stroke="#f97316" strokeWidth={1.5} fillOpacity={1} fill="url(#portfolioFillCompact)" dot={false} />
            <Line type="linear" dataKey="portfolio" stroke="#f97316" strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompactPerformanceChart;
