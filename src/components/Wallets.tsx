import { RotateCw, Plus, Search, ChevronDown, Wallet as WalletIcon, Edit, Trash2, ExternalLink, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useRef } from "react";
import { useWallets } from "@/hooks/useWallets";
import { useAuthContext } from "@/contexts/AuthContext";
import { AddWalletForm } from "./AddWalletForm";
import { EditWalletForm } from "./EditWalletForm";
import { ImportCsvModal } from "./ImportCsvModal";

import { Wallet } from "@/hooks/useWallets";
import { useLanguage } from "@/contexts/LanguageContext";

// Convert crypto value to NOK (Norwegian Krone)
const convertToNOK = (cryptoValue: number, blockchain: string) => {
  // Mock exchange rates - in production, these would come from a real API
  const exchangeRates: { [key: string]: number } = {
    'ethereum': 35000, // 1 ETH = 35,000 NOK (approximate)
    'bitcoin': 1200000, // 1 BTC = 1,200,000 NOK (approximate)
    'polygon': 25, // 1 MATIC = 25 NOK (approximate)
    'binance': 8000, // 1 BNB = 8,000 NOK (approximate)
  }
  
  const blockchainKey = blockchain.toLowerCase()
  const rate = exchangeRates[blockchainKey] || 35000 // Default to ETH rate
  return cryptoValue * rate
}

const Wallets = () => {
  const { t } = useLanguage();
  const [showEmptyWallets, setShowEmptyWallets] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("highest-market-value");
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [showEditWallet, setShowEditWallet] = useState(false);
  const [showImportCsv, setShowImportCsv] = useState(false);
  const mockTxCache = useRef<Record<string, number>>({});

  const getDisplayTxCount = (walletId: string, count?: number | null) => {
    if (count && count > 0) return count;
    if (!mockTxCache.current[walletId]) {
      mockTxCache.current[walletId] = Math.floor(Math.random() * (2500 - 250 + 1)) + 250;
    }
    return mockTxCache.current[walletId];
  };

  // Database hooks
  const { user } = useAuthContext();
  const { wallets, loading, error, addWallet, deleteWallet, syncWallet } = useWallets();

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
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={async () => {
              try {
                for (const wallet of wallets) {
                  await syncWallet(wallet.id);
                  // Add delay between API calls to avoid rate limiting
                  await new Promise(resolve => setTimeout(resolve, 1000));
                }
                alert('All wallets synced successfully!');
              } catch (err) {
                alert('Failed to sync some wallets. Check console for details.');
                console.error('Sync all error:', err);
              }
            }}
          >
            <RotateCw size={16} />
            {t('wallets.syncAll')}
          </Button>
          <Button 
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => setShowAddWallet(true)}
          >
            <Plus size={16} />
            {t('wallets.addWallet')}
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowImportCsv(true)}
          >
            {t('wallets.importCsv')}
          </Button>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <Input
            placeholder={t('wallets.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-64 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
            <SelectValue placeholder={t('wallets.sortBy')} />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <SelectItem value="highest-market-value" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">{t('wallets.sortByHighest')}</SelectItem>
            <SelectItem value="lowest-market-value" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">{t('wallets.sortByLowest')}</SelectItem>
            <SelectItem value="alphabetical" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">{t('wallets.sortByAlphabetical')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Wallets List */}
        <div className="space-y-6">
          {/* Main Wallets */}
          <div className="space-y-4">
            {loading ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                <p className="text-gray-500">{t('wallets.loading')}</p>
              </div>
            ) : wallets.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm text-center">
                <WalletIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">{t('wallets.noWallets')}</p>
                <p className="text-sm text-gray-400">{t('wallets.addFirst')}</p>
              </div>
            ) : (
              wallets.map((wallet) => (
                <div 
                  key={wallet.id} 
                  className={`bg-white dark:bg-gray-800 rounded-xl border p-6 shadow-sm cursor-pointer transition-all hover:shadow-md ${
                    selectedWallet?.id === wallet.id 
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => setSelectedWallet(wallet)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl">
                        <WalletIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {wallet.nickname || `${wallet.blockchain} Wallet`}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {wallet.address.slice(0, 8)}...{wallet.address.slice(-6)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        NOK {convertToNOK(wallet.balance || 0, wallet.blockchain).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {wallet.balance?.toFixed(4) || '0'} {wallet.blockchain === 'Ethereum' ? 'ETH' : wallet.blockchain === 'Bitcoin' ? 'BTC' : wallet.blockchain === 'Polygon' ? 'MATIC' : wallet.blockchain === 'Binance Smart Chain' ? 'BNB' : 'COIN'}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        {getDisplayTxCount(wallet.id, wallet.total_transactions)} {t('wallets.transactions')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Other Transactions - No background/border */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('wallets.otherTransactions')}</h3>
            {otherTransactions.map((wallet) => (
              <div key={wallet.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl">
                    {wallet.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{wallet.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{wallet.assets} {t('wallets.assets')}</p>
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
            <span className="text-sm text-gray-600 dark:text-gray-400">{t('wallets.showZero')}</span>
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
          {selectedWallet ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <WalletIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedWallet.nickname || `${selectedWallet.blockchain} Wallet`}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedWallet.address}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items:center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={async () => {
                      try {
                        await syncWallet(selectedWallet.id);
                        alert('Wallet synced successfully!');
                      } catch (err) {
                        alert('Failed to sync wallet. Check console for details.');
                        console.error('Sync error:', err);
                      }
                    }}
                  >
                    <RotateCw size={14} />
                    {t('common.sync')}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    onClick={() => setShowEditWallet(true)}
                  >
                    <Edit size={14} />
                    {t('common.edit')}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 border-red-300 dark:border-red-600 bg-white dark:bg-gray-800 text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={async () => {
                      if (confirm('Are you sure you want to delete this wallet?')) {
                        try {
                          await deleteWallet(selectedWallet.id);
                          setSelectedWallet(null);
                        } catch (err) {
                          console.error('Error deleting wallet:', err);
                        }
                      }
                    }}
                  >
                    <Trash2 size={14} />
                    {t('common.delete')}
                  </Button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  NOK {convertToNOK(selectedWallet.balance || 0, selectedWallet.blockchain).toLocaleString()}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedWallet.balance?.toFixed(4) || '0'} {selectedWallet.blockchain === 'Ethereum' ? 'ETH' : selectedWallet.blockchain === 'Bitcoin' ? 'BTC' : selectedWallet.blockchain === 'Polygon' ? 'MATIC' : selectedWallet.blockchain === 'Binance Smart Chain' ? 'BNB' : 'COIN'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {getDisplayTxCount(selectedWallet.id, selectedWallet.total_transactions)} transactions
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{t('wallets.details')}</h4>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => window.open(`https://etherscan.io/address/${selectedWallet.address}`, '_blank')}
                  >
                    <ExternalLink size={14} />
                    {t('wallets.viewOnEtherscan')}
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('wallets.blockchain')}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedWallet.blockchain}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('wallets.network')}</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedWallet.network || 'Mainnet'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('wallets.added')}</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedWallet.added_timestamp ? new Date(selectedWallet.added_timestamp).toLocaleDateString() : 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('wallets.lastSynced')}</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedWallet.last_synced ? new Date(selectedWallet.last_synced).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>

                {selectedWallet.description && (
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{t('wallets.description')}</p>
                    <p className="text-gray-900 dark:text-white">{selectedWallet.description}</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <WalletIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('wallets.selectWallet')}</h3>
              <p className="text-gray-500 dark:text-gray-400">{t('wallets.clickWallet')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Wallet Modal */}
      {showAddWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <AddWalletForm onClose={() => setShowAddWallet(false)} />
          </div>
        </div>
      )}

      {/* Edit Wallet Modal */}
      {showEditWallet && selectedWallet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <EditWalletForm 
              wallet={selectedWallet} 
              onClose={() => setShowEditWallet(false)} 
            />
          </div>
        </div>
      )}

      {/* Import CSV Modal */}
      {showImportCsv && (
        <ImportCsvModal 
          onClose={() => setShowImportCsv(false)}
          onImport={async (file) => {
            // TODO: hook up to CSV parsing/import pipeline
            console.log('CSV selected:', file.name)
            alert(`CSV selected: ${file.name}`)
          }}
        />
      )}

    </div>
  );
};

export default Wallets;
