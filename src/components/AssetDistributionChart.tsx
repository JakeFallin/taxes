
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Bitcoin (BTC)', value: 45, color: '#f7931a', abbreviation: 'BTC' },
  { name: 'Ethereum (ETH)', value: 35, color: '#627eea', abbreviation: 'ETH' },
  { name: 'Cardano (ADA)', value: 10, color: '#0033ad', abbreviation: 'ADA' },
  { name: 'Solana (SOL)', value: 7, color: '#9945ff', abbreviation: 'SOL' },
  { name: 'Others', value: 3, color: '#6b7280', abbreviation: 'Others' },
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

const AssetDistributionChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={64}
          paddingAngle={3}
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
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AssetDistributionChart;
