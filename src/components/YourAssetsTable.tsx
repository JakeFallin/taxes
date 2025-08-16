
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";

const assets = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "NOK 684,523.45",
    holdings: "NOK 27,380.94",
    holdingsAmount: "0.04000000 BTC",
    return: "NOK 1,856.34",
    returnPercentage: "+7.27%",
    isPositive: true,
    bgColor: "bg-orange-500",
    icon: "₿"
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "NOK 26,354.58",
    holdings: "NOK 10,318.71",
    holdingsAmount: "0.39502882 ETH",
    return: "NOK 112.90",
    returnPercentage: "+1.11%",
    isPositive: true,
    bgColor: "bg-gray-700",
    icon: "Ξ"
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: "NOK 1,876.23",
    holdings: "NOK 5,628.69",
    holdingsAmount: "3.00000000 SOL",
    return: "NOK 328.15",
    returnPercentage: "+6.19%",
    isPositive: true,
    bgColor: "bg-purple-500",
    icon: "◎"
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: "NOK 7.45",
    holdings: "NOK 3,725.00",
    holdingsAmount: "500.00000000 ADA",
    return: "NOK -186.25",
    returnPercentage: "-4.76%",
    isPositive: false,
    bgColor: "bg-blue-600",
    icon: "₳"
  }
];

const YourAssetsTable = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('assets.title')}</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-700">
                <TableHead className="text-gray-500 dark:text-gray-400 font-medium">{t('assets.th.name')}</TableHead>
                <TableHead className="text-gray-500 dark:text-gray-400 font-medium">{t('assets.th.price')}</TableHead>
                <TableHead className="text-gray-500 dark:text-gray-400 font-medium">{t('assets.th.holdings')}</TableHead>
                <TableHead className="text-gray-500 dark:text-gray-400 font-medium text-right">{t('assets.th.unrealized')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset, index) => (
                <TableRow key={index} className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${asset.bgColor} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {asset.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{asset.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{asset.symbol}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-gray-900 dark:text-white">{asset.price}</p>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{asset.holdings}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{asset.holdingsAmount}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div>
                      <p className={`font-medium ${asset.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {asset.return}
                      </p>
                      <p className={`text-sm ${asset.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {asset.returnPercentage}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default YourAssetsTable;
