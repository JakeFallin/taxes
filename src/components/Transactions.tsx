import { Search, Plus, ChevronDown, Info, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const Transactions = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const transactions = [
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
        <Button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white">
          <Plus size={16} />
          Add New
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-64 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="text"
            placeholder="AI powered search"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Category {selectedCategories.length > 0 && `(${selectedCategories.length})`}
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

        <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
          Wallet
          <ChevronDown size={16} />
        </Button>
        <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
          Currency
          <ChevronDown size={16} />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Status {selectedStatuses.length > 0 && `(${selectedStatuses.length})`}
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
        
        <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
          Date
          <ChevronDown size={16} />
        </Button>
        <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
          Hide
          <ChevronDown size={16} />
        </Button>
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
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">Category</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">Sent</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">Received</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">Fee</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    Value
                    <Info size={14} className="text-gray-400 dark:text-gray-500" />
                  </div>
                </th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    Gain/Income
                    <Info size={14} className="text-gray-400 dark:text-gray-500" />
                  </div>
                </th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">Date</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
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
                    <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MoreHorizontal size={16} />
                    </Button>
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

export default Transactions;
