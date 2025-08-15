import { ChevronDown, Info, User, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
const Taxes = () => {
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">2025 Taxes</h1>
          <ChevronDown size={20} className="text-gray-600 dark:text-gray-400" />
          <div className="text-sm text-gray-600 dark:text-gray-400">January 1 2025 to today</div>
          <span className="px-2 py-1 bg-yellow-400 dark:bg-yellow-500 text-black dark:text-black text-xs font-medium rounded">
            In progress
          </span>
        </div>
        <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
          <User size={16} />
          Add Tax Pro
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Capital Gains Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total capital gains</h3>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">-NOK 7,242.51</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total income</h3>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">NOK 0.00</div>
            </div>
          </div>

          {/* Taxable Capital Gains */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Taxable Capital Gains</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 font-medium text-gray-700 dark:text-gray-300">Gain type</th>
                    <th className="text-center py-3 font-medium text-gray-700 dark:text-gray-300">Short term</th>
                    <th className="text-center py-3 font-medium text-gray-700 dark:text-gray-300">Long term</th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 text-gray-900 dark:text-white">Crypto-to-crypto gains</td>
                    <td className="py-4 text-center">
                      <Lock size={16} className="mx-auto text-gray-400 dark:text-gray-500" />
                    </td>
                    <td className="py-4 text-center">
                      <Lock size={16} className="mx-auto text-gray-400 dark:text-gray-500" />
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      Other capital gains
                      <Info size={14} className="text-gray-400 dark:text-gray-500" />
                    </td>
                    <td className="py-4 text-center">
                      <Lock size={16} className="mx-auto text-gray-400 dark:text-gray-500" />
                    </td>
                    <td className="py-4 text-center">
                      <Lock size={16} className="mx-auto text-gray-400 dark:text-gray-500" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-gray-900 dark:text-white">Total capital gains</td>
                    <td className="py-4 text-center">
                      <Lock size={16} className="mx-auto text-gray-400 dark:text-gray-500" />
                    </td>
                    <td className="py-4 text-center">
                      <Lock size={16} className="mx-auto text-gray-400 dark:text-gray-500" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Taxable Income */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Taxable Income</h2>
              <Info size={16} className="text-gray-400 dark:text-gray-500" />
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">You have no taxable income</p>
            </div>
          </div>

          {/* Other Transactions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Other Transactions</h2>
              <Info size={16} className="text-gray-400 dark:text-gray-500" />
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">You have no other transactions</p>
            </div>
          </div>

          {/* Annual Tax Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Annual Tax Summary</h2>
            
            <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
              <nav className="-mb-px flex space-x-8">
                <button className="border-b-2 border-blue-600 dark:border-blue-400 py-2 px-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                  Exchanges
                </button>
                <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600">
                  Crypto wallets
                </button>
                <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600">
                  Imported wallets
                </button>
              </nav>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">No exchanges to show.</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Plan</h3>
              <span className="text-gray-600 dark:text-gray-400">None</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Yearly transaction limit</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Your transactions in 2024</span>
                <div className="flex items-center gap-1">
                  <span className="text-gray-900 dark:text-white">396</span>
                  <Info size={14} className="text-gray-400 dark:text-gray-500" />
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Plan limit</span>
                <span className="text-gray-900 dark:text-white">0</span>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-6 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
              Upgrade to Prime
            </Button>
          </div>

          {/* Tax Reports */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Reports</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">CSV reports</h4>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Download size={16} className="text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-900 dark:text-white">Transaction History CSV</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                    <Lock size={14} className="mr-2" />
                    Upgrade
                  </Button>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Download size={16} className="text-gray-400 dark:text-gray-500" />
                    <div>
                      <div className="text-gray-900 dark:text-white">Capital Gains CSV</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">The Capital Gains CSV includes only transactions that resulted in a capital gain.</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
                    <Lock size={14} className="mr-2" />
                    Upgrade
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transaction Summary</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Total transactions this year</span>
                  <span className="text-gray-900 dark:text-white">3179</span>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 text-xs font-medium rounded">
                    3173 Sent
                  </span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-200 text-xs font-medium rounded">
                    6 Received
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Taxes;