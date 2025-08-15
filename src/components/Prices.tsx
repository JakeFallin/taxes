
import { Search, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Prices = () => {
  const [activeTab, setActiveTab] = useState("all");

  const cryptoPrices = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "NOK 1,077,452.07",
      marketCap: "NOK 21T",
      volume24h: "NOK 484B",
      circulatingSupply: "19 878 000",
      change24h: "+3.86%",
      changeColor: "text-green-600",
      bgColor: "bg-orange-500",
      icon: "₿"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "NOK 26,390.39",
      marketCap: "NOK 31.6T",
      volume24h: "NOK 211B",
      circulatingSupply: "120 721 027",
      change24h: "+6.44%",
      changeColor: "text-green-600",
      bgColor: "bg-gray-700",
      icon: "Ξ"
    },
    {
      name: "Tether USDt",
      symbol: "USDT",
      price: "NOK 9.92",
      marketCap: "NOK 15.3T",
      volume24h: "NOK 759B",
      circulatingSupply: "155 485 904 912",
      change24h: "+0.03%",
      changeColor: "text-green-600",
      bgColor: "bg-teal-500",
      icon: "₮"
    },
    {
      name: "XRP",
      symbol: "XRP",
      price: "NOK 23.02",
      marketCap: "NOK 13.4T",
      volume24h: "NOK 40.8B",
      circulatingSupply: "58 881 764 070",
      change24h: "+8.21%",
      changeColor: "text-green-600",
      bgColor: "bg-gray-600",
      icon: "◉"
    },
    {
      name: "BNB",
      symbol: "BNB",
      price: "NOK 6,526.12",
      marketCap: "NOK 9.11T",
      volume24h: "NOK 15.5B",
      circulatingSupply: "140 886 357",
      change24h: "+2.27%",
      changeColor: "text-green-600",
      bgColor: "bg-yellow-500",
      icon: "◆"
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "NOK 1,558.89",
      marketCap: "NOK 8.15T",
      volume24h: "NOK 42.7B",
      circulatingSupply: "527 749 933",
      change24h: "+5.68%",
      changeColor: "text-green-600",
      bgColor: "bg-purple-500",
      icon: "◎"
    },
    {
      name: "USDC",
      symbol: "USDC",
      price: "NOK 9.91",
      marketCap: "NOK 6.06T",
      volume24h: "NOK 103B",
      circulatingSupply: "61 629 887 779",
      change24h: "-0.01%",
      changeColor: "text-red-600",
      bgColor: "bg-blue-500",
      icon: "$"
    },
    {
      name: "Dogecoin",
      symbol: "DOGE",
      price: "NOK 1.78",
      marketCap: "NOK 2.64T",
      volume24h: "NOK 10.8B",
      circulatingSupply: "149 714 086 384",
      change24h: "+4.13%",
      changeColor: "text-green-600",
      bgColor: "bg-yellow-600",
      icon: "Ð"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <div></div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button 
            onClick={() => setActiveTab("all")}
            className={`border-b-2 py-2 px-1 text-sm font-medium ${
              activeTab === "all" 
                ? "border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400" 
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            All prices
          </button>
          <button 
            onClick={() => setActiveTab("watchlist")}
            className={`border-b-2 py-2 px-1 text-sm font-medium ${
              activeTab === "watchlist" 
                ? "border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400" 
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            Watchlist
          </button>
        </nav>
      </div>

      {/* Prices Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">Coin</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">Price</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">Market cap</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">24h vol</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">Circulating supply</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">24h %</th>
              </tr>
            </thead>
            <tbody>
              {cryptoPrices.map((crypto, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Star size={16} className="text-gray-400 dark:text-gray-500" />
                      <div className={`w-8 h-8 ${crypto.bgColor} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {crypto.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{crypto.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{crypto.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">{crypto.price}</td>
                  <td className="py-4 px-4 text-gray-900 dark:text-white">{crypto.marketCap}</td>
                  <td className="py-4 px-4 text-gray-900 dark:text-white">{crypto.volume24h}</td>
                  <td className="py-4 px-4 text-gray-900 dark:text-white">{crypto.circulatingSupply}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      crypto.changeColor === 'text-green-600' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                    }`}>
                      {crypto.change24h}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Prices;
