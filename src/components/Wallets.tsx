import { RotateCw, Plus, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const Wallets = () => {
  const [showEmptyWallets, setShowEmptyWallets] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("highest-market-value");

  const wallets = [
    {
      id: "ethereum",
      name: "Ethereum Wallet ...bccd19",
      assets: 5,
      value: "NOK 10,392.31",
      lastSync: "4 hours ago",
      icon: "⟠"
    }
  ];

  const otherTransactions = [
    {
      id: "other",
      name: "Other transactions",
      assets: 0,
      value: "NOK 0.00",
      lastSync: null,
      icon: "📁"
    }
  ];

  const walletAssets = [
    {
      name: "ETH",
      holdings: "NOK 10,338.27",
      amount: "0.39502882 ETH",
      transactions: 3573,
      icon: "⟠"
    },
    {
      name: "usual",
      holdings: "748 USDO [www.usual.finance]",
      amount: "",
      transactions: 1,
      icon: "🔵"
    },
    {
      name: "getdrops",
      holdings: "4 Airdrop(s) to be claimed at https://getdrops.org",
      amount: "",
      transactions: 1,
      icon: "🔵"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            <RotateCw size={16} />
            Sync All
          </Button>
          <Button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white">
            <Plus size={16} />
            Add wallet
          </Button>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <Input
            placeholder="Type to find a wallet or chain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-64 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectItem value="highest-market-value" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Sort by Highest market value</SelectItem>
            <SelectItem value="lowest-market-value" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Sort by Lowest market value</SelectItem>
            <SelectItem value="alphabetical" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">Sort by Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Wallets List */}
        <div className="space-y-6">
          {/* Main Wallets */}
          <div className="space-y-4">
            {wallets.map((wallet) => (
              <div key={wallet.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl">
                      {wallet.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{wallet.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{wallet.assets} assets</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">{wallet.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{wallet.lastSync}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Other Transactions - No background/border */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Other transactions</h3>
            {otherTransactions.map((wallet) => (
              <div key={wallet.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl">
                    {wallet.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{wallet.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{wallet.assets} assets</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">{wallet.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Show wallets with 0 transactions toggle */}
          <div className="flex items-center justify-between py-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Show wallets with 0 transactions</span>
            <button
              onClick={() => setShowEmptyWallets(!showEmptyWallets)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showEmptyWallets ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showEmptyWallets ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Right Column - Wallet Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                ⟠
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Ethereum Wallet ...bccd19</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Last synced 4 hours ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              <RotateCw size={14} />
              Sync wallet
            </Button>
          </div>

          <div className="mb-6">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">NOK 10,369.94</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
              <span>Name</span>
              <div className="flex gap-8">
                <span>Holdings</span>
                <span>Transactions</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {walletAssets.map((asset, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      {asset.icon}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{asset.name}</span>
                  </div>
                  <div className="flex gap-8 text-right">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{asset.holdings}</div>
                      {asset.amount && <div className="text-sm text-gray-500 dark:text-gray-400">{asset.amount}</div>}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white w-16">{asset.transactions}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallets;
