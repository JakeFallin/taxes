import { Search, Plus, ChevronDown, Info, MoreHorizontal, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { AddTransactionModal } from "./AddTransactionModal";
import { TransactionDetailsModal, type TransactionRow } from "./TransactionDetailsModal";

const Transactions = () => {
  const { t } = useLanguage();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedWallets, setSelectedWallets] = useState<string[]>([]);
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [selectedDateRange, setSelectedDateRange] = useState<string>("All time");
  const [selectedHide, setSelectedHide] = useState<string[]>([]);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedTx, setSelectedTx] = useState<TransactionRow | null>(null);

  const baseTransactions = [
    {
      category: "Send",
      sent: "-0.0004736 ETH",
      received: "—",
      fee: "NOK 1.71",
      value: "NOK 1.20",
      gainLoss: "-NOK 1.80",
      date: "16 Jun 2025",
      time: "4:29 PM UTC",
      wallet: "Ethereum...ccd19"
    },
    {
      category: "Send",
      sent: "-0.0016754 ETH",
      received: "—",
      fee: "NOK 1.70",
      value: "NOK 4.23",
      gainLoss: "-NOK 1.89",
      date: "16 Jun 2025",
      time: "4:09 PM UTC",
      wallet: "Ethereum...ccd19"
    },
    {
      category: "Send",
      sent: "-0.0016754 ETH",
      received: "—",
      fee: "NOK 1.68",
      value: "NOK 4.23",
      gainLoss: "-NOK 1.86",
      date: "16 Jun 2025",
      time: "4:05 PM UTC",
      wallet: "Ethereum...ccd19"
    },
    {
      category: "Send",
      sent: "-0.0016754 ETH",
      received: "—",
      fee: "NOK 1.45",
      value: "NOK 4.23",
      gainLoss: "-NOK 1.63",
      date: "16 Jun 2025",
      time: "4:03 PM UTC",
      wallet: "Ethereum...ccd19"
    },
    {
      category: "Send",
      sent: "-0.0016754 ETH",
      received: "—",
      fee: "NOK 1.21",
      value: "NOK 4.23",
      gainLoss: "-NOK 1.38",
      date: "16 Jun 2025",
      time: "3:59 PM UTC",
      wallet: "Ethereum...ccd19"
    }
  ];

  // Generate 45 additional mock transactions
  const categories = ["Send", "Receive", "Trade", "Stake", "Unstake", "Payment"] as const;
  const walletsList = [
    "Ethereum...ccd19",
    "Bitcoin...a9f21",
    "Polygon...b7d42",
    "BSC...93ac0",
    "Solana...4f7e1"
  ];
  const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;
  const pad = (n: number) => n.toString().padStart(2, '0');

  const moreTransactions = Array.from({ length: 45 }, (_, idx) => {
    const cat = categories[Math.floor(Math.random() * categories.length)];
    const isSend = cat === "Send" || cat === "Payment" || cat === "Trade";
    const amt = randomBetween(0.0001, 0.005);
    const feeNok = randomBetween(0.8, 4.2);
    const valNok = randomBetween(1.2, 250.0);
    const gain = randomBetween(-12, 18);
    const hour = Math.floor(randomBetween(0, 23));
    const min = Math.floor(randomBetween(0, 59));
    const wallet = walletsList[Math.floor(Math.random() * walletsList.length)];
    return {
      category: cat,
      sent: isSend ? `-${amt.toFixed(7)} ${wallet.startsWith('Bitcoin') ? 'BTC' : 'ETH'}` : "—",
      received: !isSend ? `${amt.toFixed(7)} ${wallet.startsWith('Bitcoin') ? 'BTC' : 'ETH'}` : "—",
      fee: `NOK ${feeNok.toFixed(2)}`,
      value: `NOK ${valNok.toFixed(2)}`,
      gainLoss: `${gain >= 0 ? '+' : ''}NOK ${gain.toFixed(2)}`,
      date: "16 Jun 2025",
      time: `${((hour % 12) || 12)}:${pad(min)} ${hour < 12 ? 'AM' : 'PM'} UTC`,
      wallet,
    };
  });

  const transactions = [...baseTransactions, ...moreTransactions].map((t, i) => ({
    id: `tx_${i + 1}`,
    ...t,
  }));

  // Filter option lists
  const walletFilterOptions = ["Select all", ...walletsList];
  const currencyOptions = ["Select all", "ETH", "BTC", "MATIC", "BNB", "SOL"];
  const dateRangeOptions = ["Today", "7D", "30D", "YTD", "1Y", "All time", "Custom…"];
  const hideOptions = ["Zero value", "Internal transfers", "Duplicates", "Airdrops", "Fees only"];

  const handleWalletToggle = (wallet: string) => {
    if (wallet === "Select all") {
      if (selectedWallets.length === walletFilterOptions.length - 1) setSelectedWallets([]);
      else setSelectedWallets(walletFilterOptions.filter(w => w !== "Select all"));
      return;
    }
    setSelectedWallets(prev => prev.includes(wallet) ? prev.filter(w => w !== wallet) : [...prev, wallet]);
  };

  const handleCurrencyToggle = (ccy: string) => {
    if (ccy === "Select all") {
      if (selectedCurrencies.length === currencyOptions.length - 1) setSelectedCurrencies([]);
      else setSelectedCurrencies(currencyOptions.filter(c => c !== "Select all"));
      return;
    }
    setSelectedCurrencies(prev => prev.includes(ccy) ? prev.filter(c => c !== ccy) : [...prev, ccy]);
  };

  const handleHideToggle = (opt: string) => {
    setSelectedHide(prev => prev.includes(opt) ? prev.filter(h => h !== opt) : [...prev, opt]);
  };

  const categoryOptions = [
    "Select all",
    "Add liquidity",
    "Airdrop", 
    "Borrow",
    "Bridge",
    "Buy",
    "Collect Rewards",
    "Donation",
    "Fork",
    "Gift",
    "Interest Expense",
    "Interest Payment",
    "Lending Deposit",
    "Lending Withdrawal",
    "Linked Trade",
    "Loan Repayment",
    "Lost",
    "Margin",
    "Margin Gain",
    "Margin Fee",
    "Margin Loss",
    "Margin Rebate",
    "Mined",
    "Mint",
    "Other Income",
    "Payment",
    "Rebate",
    "Receive",
    "Remove Liquidity",
    "Royalty",
    "Sell",
    "Send",
    "Service",
    "Stake",
    "Staking Reward",
    "Stolen",
    "Trade",
    "Transfer",
    "Unstake",
    "Wrap"
  ];

  const statusOptions = [
    "Select all",
    "Review suggested",
    "Imported",
    "Manual",
    "Ignored",
    "Custom cost basis",
    "Custom Proceeds",
    "Unlinked",
    "Non Taxable"
  ];

  const handleCategoryToggle = (category: string) => {
    if (category === "Select all") {
      if (selectedCategories.length === categoryOptions.length - 1) {
        setSelectedCategories([]);
      } else {
        setSelectedCategories(categoryOptions.filter(option => option !== "Select all"));
      }
    } else {
      setSelectedCategories(prev => 
        prev.includes(category) 
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }
  };

  const handleStatusToggle = (status: string) => {
    if (status === "Select all") {
      if (selectedStatuses.length === statusOptions.length - 1) {
        setSelectedStatuses([]);
      } else {
        setSelectedStatuses(statusOptions.filter(option => option !== "Select all"));
      }
    } else {
      setSelectedStatuses(prev => 
        prev.includes(status) 
          ? prev.filter(s => s !== status)
          : [...prev, status]
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() => setShowAddTransaction(true)}
        >
          <Plus size={16} />
          {t('transactions.addNew')}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="text"
            placeholder={t('transactions.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              {t('transactions.category')} {selectedCategories.length > 0 && `(${selectedCategories.length})`}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
            {categoryOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
                onClick={() => handleCategoryToggle(option)}
              >
                <Checkbox
                  checked={
                    option === "Select all" 
                      ? selectedCategories.length === categoryOptions.length - 1
                      : selectedCategories.includes(option)
                  }
                  onChange={() => handleCategoryToggle(option)}
                />
                <span>{option}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              {t('transactions.wallet')} {selectedWallets.length > 0 && `(${selectedWallets.length})`}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
            {walletFilterOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
                onClick={() => handleWalletToggle(option)}
              >
                <Checkbox checked={option === 'Select all' ? selectedWallets.length === walletFilterOptions.length - 1 : selectedWallets.includes(option)} />
                <span>{option}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              {t('transactions.currency')} {selectedCurrencies.length > 0 && `(${selectedCurrencies.length})`}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
            {currencyOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
                onClick={() => handleCurrencyToggle(option)}
              >
                <Checkbox checked={option === 'Select all' ? selectedCurrencies.length === currencyOptions.length - 1 : selectedCurrencies.includes(option)} />
                <span>{option}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              {t('transactions.status')} {selectedStatuses.length > 0 && `(${selectedStatuses.length})`}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
            {statusOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
                onClick={() => handleStatusToggle(option)}
              >
                <Checkbox
                  checked={
                    option === "Select all" 
                      ? selectedStatuses.length === statusOptions.length - 1
                      : selectedStatuses.includes(option)
                  }
                  onChange={() => handleStatusToggle(option)}
                />
                <span>{option}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              {t('transactions.date')}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
            {dateRangeOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
                onClick={() => setSelectedDateRange(option)}
              >
                <span className={selectedDateRange === option ? 'font-semibold' : ''}>{option}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              {t('transactions.hide')} {selectedHide.length > 0 && `(${selectedHide.length})`}
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 max-h-80 overflow-y-auto bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
            {hideOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onSelect={(e) => e.preventDefault()}
                onClick={() => handleHideToggle(option)}
              >
                <Checkbox checked={selectedHide.includes(option)} />
                <span>{option}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
          CSV
          <ChevronDown size={16} />
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">
                  <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
                </th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">{t('transactions.th.category')}</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">{t('transactions.th.sent')}</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">{t('transactions.th.received')}</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">{t('transactions.th.fee')}</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    {t('transactions.th.value')}
                    <Info size={14} className="text-gray-400 dark:text-gray-500" />
                  </div>
                </th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    {t('transactions.th.gain')}
                    <Info size={14} className="text-gray-400 dark:text-gray-500" />
                  </div>
                </th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">{t('transactions.th.date')}</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.id} className="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-4 px-4">
                    <input type="checkbox" className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" />
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-medium text-gray-900 dark:text-white">{transaction.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        ⟠
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{transaction.sent}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.wallet}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-900 dark:text-white">{transaction.received}</td>
                  <td className="py-4 px-4 text-gray-900 dark:text-white">{transaction.fee}</td>
                  <td className="py-4 px-4 text-gray-900 dark:text-white">{transaction.value}</td>
                  <td className="py-4 px-4 text-red-600">{transaction.gainLoss}</td>
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-gray-900 dark:text-white">{transaction.date}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{transaction.time}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => {
                        setSelectedTx(transaction as TransactionRow);
                        setShowDetails(true);
                      }}
                    >
                      <MoreHorizontal size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <AddTransactionModal 
        isOpen={showAddTransaction}
        onClose={() => setShowAddTransaction(false)}
      />

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={showDetails}
        transaction={selectedTx}
        onClose={() => setShowDetails(false)}
        onSave={(id, updates) => {
          // For now, update in-place in this mock table
          if (selectedTx && selectedTx.id === id) {
            setSelectedTx({ ...selectedTx, ...updates });
          }
        }}
        onDelete={(id) => {
          // In a real app, call API to delete and refresh list
          console.log('Delete tx', id);
        }}
      />
    </div>
  );
};

export default Transactions;
