
import { Button } from "@/components/ui/button";

const TaxLossHarvesting = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">2025 Tax Loss Harvesting</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-gray-600 dark:text-gray-300">January 1 2025 to today</span>
            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium px-2.5 py-0.5 rounded">
              In progress
            </span>
          </div>
        </div>
        <div className="text-right text-sm text-gray-600 dark:text-gray-300">
          <div>Cost basis method: FIFO | Cost basis tracking: Universal</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Tax Summary */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">2025 Tax Summary</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-white">Potential tax savings</span>
                  <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9,9h0a3,3,0,0,1,6,0c0,2-3,3-3,3"></path>
                      <path d="M12,17h0"></path>
                    </svg>
                  </button>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">NOK 0.00</span>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-300">Maximum harvestable losses</span>
                <span className="text-gray-900 dark:text-white">NOK 0.00</span>
              </div>

              <div className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">Realized crypto gains/losses</span>
                  <span className="font-semibold text-red-600 dark:text-red-400">-NOK 71,815.37</span>
                </div>
                
                <div className="ml-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Short-term</span>
                    <span className="text-gray-900 dark:text-white">NOK 0.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Long-term</span>
                    <span className="text-gray-900 dark:text-white">-NOK 7,242.51</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Crypto you can sell at a loss</h3>
            <Button variant="outline" className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">Upgrade Plan</Button>
          </div>
        </div>

        {/* Right Column - Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How tax loss harvesting works</h3>
          
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Selling crypto that's gone down in value can offset the profits you've made 
              by selling investments that have gone up. By "harvesting" these losses, 
              you can potentially reduce your tax liability. Learn more about tax loss 
              harvesting.
            </p>
            
            <p>
              To harvest these losses, consider making the trades below from your 
              wallets and exchanges by December 31, 2025.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        <p>
          Disclaimer: None of the above is or should be construed as legal, tax, audit, accounting, or brokerage advice. 
          All information is provided for informational purposes only.
        </p>
      </div>
    </div>
  );
};

export default TaxLossHarvesting;
