
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

// Additional asset comparisons (mock)
const extraAssets = [
  { key: 'nvda', label: 'NVIDIA', color: '#22c55e' },
  { key: 'goog', label: 'GOOGLE', color: '#ef4444' },
  { key: 'tsla', label: 'TESLA', color: '#e11d48' },
  { key: 'crude', label: 'CRUDE OIL', color: '#92400e' },
  { key: 'lumber', label: 'LUMBER', color: '#b45309' },
  { key: 'corn', label: 'CORN', color: '#84cc16' },
  { key: 'eth', label: 'ETH', color: '#06b6d4' },
  { key: 'doge', label: 'DOGE', color: '#a3a3a3' },
  { key: 'labubu', label: 'Labubu', color: '#db2777' },
] as const;

// Mock breakdown by crypto (weights are percent of portfolio)
const BREAKDOWN_DATA: Array<{ asset: string; weight: number; returnPct: number; contribPct: number; dayChange: number; volatility: number; sharpe: number }>
  = [
    { asset: 'BTC', weight: 45, returnPct: 28.5, contribPct: 12.8, dayChange: 1.8, volatility: 62, sharpe: 1.20 },
    { asset: 'ETH', weight: 35, returnPct: 18.2, contribPct: 6.4, dayChange: 1.1, volatility: 55, sharpe: 1.05 },
    { asset: 'SOL', weight: 7, returnPct: 42.3, contribPct: 3.4, dayChange: 2.6, volatility: 78, sharpe: 1.30 },
    { asset: 'MATIC', weight: 5, returnPct: 9.6, contribPct: 0.5, dayChange: 0.4, volatility: 48, sharpe: 0.80 },
    { asset: 'LINK', weight: 4, returnPct: -3.2, contribPct: -0.2, dayChange: -0.9, volatility: 52, sharpe: -0.10 },
    { asset: 'Others', weight: 4, returnPct: 6.1, contribPct: 0.2, dayChange: 0.2, volatility: 40, sharpe: 0.50 },
  ];

const DIVERSITY_COLORS = ['#f97316', '#10b981', '#6366f1', '#06b6d4', '#f59e0b', '#94a3b8'];

// Alternative diversity scenarios (mock)
type DiversityPoint = { asset: string; weight: number; returnPct: number; volatility: number };
type DiversityScenario = { name: string; note: string; data: DiversityPoint[] };

const DIVERSITY_SCENARIOS: DiversityScenario[] = [
  {
    name: 'Current mix',
    note: 'Your present allocation snapshot based on wallets.',
    data: [
      { asset: 'BTC', weight: 45, returnPct: 28.5, volatility: 62 },
      { asset: 'ETH', weight: 35, returnPct: 18.2, volatility: 55 },
      { asset: 'SOL', weight: 7, returnPct: 42.3, volatility: 78 },
      { asset: 'MATIC', weight: 5, returnPct: 9.6, volatility: 48 },
      { asset: 'LINK', weight: 4, returnPct: -3.2, volatility: 52 },
      { asset: 'Others', weight: 4, returnPct: 6.1, volatility: 40 },
    ],
  },
  {
    name: 'Balanced (BTC/ETH 60/40)',
    note: 'Classic large-cap crypto split for risk-adjusted stability.',
    data: [
      { asset: 'BTC', weight: 60, returnPct: 20.0, volatility: 55 },
      { asset: 'ETH', weight: 40, returnPct: 16.0, volatility: 50 },
    ],
  },
  {
    name: 'Growth tilt',
    note: 'Higher exposure to growth alts for potential outperformance.',
    data: [
      { asset: 'BTC', weight: 35, returnPct: 24.0, volatility: 60 },
      { asset: 'ETH', weight: 30, returnPct: 18.0, volatility: 55 },
      { asset: 'SOL', weight: 15, returnPct: 35.0, volatility: 85 },
      { asset: 'MATIC', weight: 10, returnPct: 14.0, volatility: 58 },
      { asset: 'LINK', weight: 10, returnPct: 10.0, volatility: 54 },
    ],
  },
  {
    name: 'Defensive (adds stablecoins)',
    note: 'Introduces 10% stablecoin buffer to reduce drawdowns.',
    data: [
      { asset: 'BTC', weight: 40, returnPct: 18.0, volatility: 50 },
      { asset: 'ETH', weight: 30, returnPct: 14.0, volatility: 45 },
      { asset: 'SOL', weight: 8, returnPct: 22.0, volatility: 70 },
      { asset: 'MATIC', weight: 6, returnPct: 9.0, volatility: 45 },
      { asset: 'LINK', weight: 6, returnPct: 7.0, volatility: 42 },
      { asset: 'Stablecoins', weight: 10, returnPct: 4.0, volatility: 5 },
    ],
  },
];

function calcTop2Concentration(data: DiversityPoint[]): number {
  const sorted = [...data].sort((a, b) => b.weight - a.weight);
  return (sorted[0]?.weight || 0) + (sorted[1]?.weight || 0);
}

function calcHHI(data: DiversityPoint[]): number {
  // Herfindahl–Hirschman Index on 0..1 scale
  const hhi = data.reduce((sum, p) => sum + Math.pow(p.weight / 100, 2), 0);
  return hhi;
}

function calcEstVolatility(data: DiversityPoint[]): number {
  // Simple weighted average vol for demo
  const vol = data.reduce((sum, p) => sum + p.weight * p.volatility, 0) / 100;
  return vol;
}

function calcExpectedReturn(data: DiversityPoint[]): number {
  const ret = data.reduce((sum, p) => sum + p.weight * p.returnPct, 0) / 100;
  return ret;
}

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
  const [activeBenchmarks, setActiveBenchmarks] = useState<string[]>(['sp500']);
  const baseData = useMemo(() => SERIES_DATA[selectedPeriod], [selectedPeriod]);

  // Build augmented chart data with extra mock series
  const chartData = useMemo(() => {
    const len = baseData.length || 1;
    return baseData.map((point, idx) => {
      const t = idx / Math.max(1, len - 1);
      const withExtras: any = { ...point };
      // Helper to modulate
      const wave = (phase: number, amp: number) => 1 + Math.sin(2 * Math.PI * (t + phase)) * amp;

      // Choose baselines
      const basePortfolio = (point as any).portfolio;
      const baseNasdaq = (point as any).nasdaq ?? basePortfolio;
      const baseSP = (point as any).sp500 ?? basePortfolio;
      const baseGold = (point as any).gold ?? basePortfolio * 0.9;
      const baseBTC = (point as any).btc ?? basePortfolio * 1.05;

      // Equities
      withExtras.nvda = baseNasdaq * 1.15 * wave(0.0, 0.08) * (1 + t * 0.06);
      withExtras.goog = baseSP * 1.05 * wave(0.1, 0.05) * (1 + t * 0.03);
      withExtras.tsla = baseNasdaq * 1.10 * wave(0.2, 0.12) * (1 + t * 0.08);

      // Commodities
      withExtras.crude = baseGold * 0.85 * wave(0.05, 0.06);
      withExtras.lumber = baseGold * 0.70 * wave(0.15, 0.10);
      withExtras.corn = baseGold * 0.60 * wave(0.25, 0.07);

      // Crypto
      withExtras.eth = baseBTC * 0.55 * wave(0.35, 0.14) * (1 + t * 0.05);
      withExtras.doge = baseBTC * 0.12 * wave(0.45, 0.30) * (1 + t * 0.12);

      // Meme/collectible proxy
      withExtras.labubu = basePortfolio * 0.20 * wave(0.55, 0.25);

      return withExtras;
    });
  }, [baseData]);

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

  const [showMoreAssets, setShowMoreAssets] = useState(false);

  return (
    <div className="space-y-8">
      {/* Top metrics: Income, Expenses, In, Out */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PerformanceCard
          title={t('performance.income')}
          value="NOK 124,950"
          percentage="+4.2% MoM"
          isPositive={true}
        />
        <PerformanceCard
          title={t('performance.expenses')}
          value="NOK 18,420"
          percentage="-1.1% MoM"
          isPositive={false}
        />
        <PerformanceCard
          title={t('performance.in')}
          value="NOK 2,850,000"
          percentage="+120k last 30d"
          isPositive={true}
        />
        <PerformanceCard
          title={t('performance.out')}
          value="NOK 2,320,000"
          percentage="+80k last 30d"
          isPositive={true}
        />
      </div>
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMoreAssets(s => !s)}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800"
              >
                {showMoreAssets ? 'Hide assets' : 'More assets'}
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                <Calendar size={16} />
                {t('performance.customRange')}
              </Button>
            </div>
          </div>
        </div>
        {showMoreAssets && (
          <div className="flex flex-wrap gap-2 mb-4">
            {extraAssets.map((asset) => (
              <Button
                key={asset.key}
                variant="outline"
                size="sm"
                onClick={() => toggleBenchmark(asset.key)}
                className={`border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  activeBenchmarks.includes(asset.key)
                    ? 'bg-gray-100 dark:bg-gray-700'
                    : 'bg-white dark:bg-gray-800'
                }`}
                style={{ borderColor: asset.color }}
              >
                {asset.label}
              </Button>
            ))}
          </div>
        )}
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
              {extraAssets.map((asset) => (
                activeBenchmarks.includes(asset.key) && (
                  <Line
                    key={asset.key}
                    type="monotone"
                    dataKey={asset.key}
                    stroke={asset.color}
                    strokeWidth={2}
                    dot={false}
                    name={asset.label}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Breakdown by Crypto */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('performance.breakdownByCrypto')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-500 dark:text-gray-400">
              <tr>
                <th className="text-left pb-3 font-medium">Asset</th>
                <th className="text-right pb-3 font-medium">Weight</th>
                <th className="text-right pb-3 font-medium">Return</th>
                <th className="text-right pb-3 font-medium">Contribution</th>
                <th className="text-right pb-3 font-medium">24h</th>
                <th className="text-right pb-3 font-medium">Volatility</th>
                <th className="text-right pb-3 font-medium">Sharpe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {BREAKDOWN_DATA.map((row) => (
                <tr key={row.asset} className="hover:bg-gray-50 dark:hover:bg-gray-700/40">
                  <td className="py-3 font-medium text-gray-900 dark:text-white">{row.asset}</td>
                  <td className="py-3 text-right text-gray-700 dark:text-gray-300">{row.weight}%</td>
                  <td className={`py-3 text-right ${row.returnPct >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{row.returnPct.toFixed(1)}%</td>
                  <td className={`py-3 text-right ${row.contribPct >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{row.contribPct.toFixed(1)}%</td>
                  <td className={`py-3 text-right ${row.dayChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{row.dayChange.toFixed(1)}%</td>
                  <td className="py-3 text-right text-gray-700 dark:text-gray-300">{row.volatility}%</td>
                  <td className="py-3 text-right text-gray-700 dark:text-gray-300">{row.sharpe.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Coin Diversity Section with Scenarios */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('performance.coinDiversity')}</h3>
          {/* Scenario carousel controls */}
          <DiversityCarousel />
        </div>

        {/* Advanced Portfolio Insights */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm h-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('performance.portfolioInsights')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Risk exposure (annualized vol)</div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">54%</div>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Concentration (Top 2)</div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">80% in BTC/ETH</div>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Max drawdown (3M)</div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">-12.7%</div>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Best/Worst day</div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">+6.1% / -5.4%</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="font-medium text-gray-900 dark:text-white">Highlights</div>
              <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>BTC contributed most to returns (+12.8% contribution).</li>
                <li>Portfolio Sharpe ratio estimated at 1.02.</li>
                <li>Consider trimming SOL exposure ({'>'}7% weight, high volatility).</li>
                <li>Cash buffer recommended: 5–10% to reduce drawdowns.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;

// Coin Diversity Carousel Component
function DiversityCarousel() {
  const [idx, setIdx] = useState(0);
  const scenario = DIVERSITY_SCENARIOS[idx % DIVERSITY_SCENARIOS.length];
  const top2 = calcTop2Concentration(scenario.data);
  const hhi = calcHHI(scenario.data);
  const vol = calcEstVolatility(scenario.data);
  const ret = calcExpectedReturn(scenario.data);

  const prev = () => setIdx((i) => (i - 1 + DIVERSITY_SCENARIOS.length) % DIVERSITY_SCENARIOS.length);
  const next = () => setIdx((i) => (i + 1) % DIVERSITY_SCENARIOS.length);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Scenario</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{scenario.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">{scenario.note}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prev} className="p-2 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} className="p-2 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={scenario.data} dataKey="weight" nameKey="asset" innerRadius={60} outerRadius={90} paddingAngle={2}>
                {scenario.data.map((entry, i) => (
                  <Cell key={`cell-${entry.asset}`} fill={DIVERSITY_COLORS[i % DIVERSITY_COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={24} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {scenario.data.map((row, i) => (
            <div key={row.asset} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: DIVERSITY_COLORS[i % DIVERSITY_COLORS.length] }} />
                <span className="text-sm text-gray-900 dark:text-white">{row.asset}</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-300">{row.weight}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scenario metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Top-2 concentration</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{top2}%</div>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">HHI (0-1)</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{hhi.toFixed(2)}</div>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Est. volatility</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{vol.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Exp. return</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">{ret.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
}
