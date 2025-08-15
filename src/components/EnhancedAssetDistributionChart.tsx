
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Enhanced data with more detailed breakdown
const data = [
  { name: 'Bitcoin (BTC)', value: 45, color: '#f7931a', abbreviation: 'BTC' },
  { name: 'Ethereum (ETH)', value: 35, color: '#627eea', abbreviation: 'ETH' },
  { name: 'Cardano (ADA)', value: 8, color: '#0033ad', abbreviation: 'ADA' },
  { name: 'Solana (SOL)', value: 5, color: '#9945ff', abbreviation: 'SOL' },
  { name: 'Polygon (MATIC)', value: 3, color: '#8247e5', abbreviation: 'MATIC' },
  { name: 'Chainlink (LINK)', value: 2, color: '#375bd2', abbreviation: 'LINK' },
  { name: 'Litecoin (LTC)', value: 1.5, color: '#bfbbbb', abbreviation: 'LTC' },
  { name: 'Others', value: 0.5, color: '#6b7280', abbreviation: 'Others' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
        <p className="text-gray-900 dark:text-white font-medium">{data.name}</p>
        <p className="text-green-600 dark:text-green-400">{data.value}%</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload, isSwapped }: any) => {
  return (
    <div className={`asset-list grid grid-cols-2 gap-y-2 gap-x-4 pr-2 ${
      isSwapped ? 'mt-8 max-h-[160px] overflow-y-auto' : 'mt-4 max-h-[120px] overflow-y-auto'
    }`}>
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className={`rounded-full flex-shrink-0 ${isSwapped ? 'w-4 h-4' : 'w-3 h-3'}`}
            style={{ backgroundColor: entry.color }}
          />
          <span className={`text-gray-600 dark:text-gray-300 truncate ${
            isSwapped ? 'text-base' : 'text-sm'
          }`}>
            {entry.payload.abbreviation} {entry.payload.value}%
          </span>
        </div>
      ))}
    </div>
  );
};

interface EnhancedAssetDistributionChartProps {
  isSwapped?: boolean;
}

const EnhancedAssetDistributionChart = ({ isSwapped = false }: EnhancedAssetDistributionChartProps) => {
  return (
    <div className={`h-full flex flex-col ${isSwapped ? 'pie-chart' : ''}`}>
      <div className="flex-1 pb-5" style={{ height: isSwapped ? 'calc(100% - 20px)' : '90%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={isSwapped ? 110 : 80}
              outerRadius={isSwapped ? 180 : 150}
              paddingAngle={2}
              dataKey="value"
              startAngle={90}
              endAngle={450}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend isSwapped={isSwapped} />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnhancedAssetDistributionChart;
