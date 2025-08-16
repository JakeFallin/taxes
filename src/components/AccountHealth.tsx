
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const AccountHealth = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("todo");

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button 
            onClick={() => setActiveTab("todo")}
            className={`border-b-2 py-2 px-1 text-sm font-medium ${
              activeTab === "todo" 
                ? "border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400" 
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            {t('health.pending')}
          </button>
          <button 
            onClick={() => setActiveTab("ignored")}
            className={`border-b-2 py-2 px-1 text-sm font-medium ${
              activeTab === "ignored" 
                ? "border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400" 
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            {t('health.ignored')}
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "todo" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Status Card */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <div className="flex items-start gap-6">
                {/* Hand Wave Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.45 9 2V4H11V2C11 1.45 11.45 1 12 1S13 1.45 13 2V4H15V2C15 1.45 15.45 1 16 1S17 1.45 17 2V4C18.1 4 19 4.9 19 6V8C19 9.1 18.1 10 17 10H7C5.9 10 5 9.1 5 8V6C5 4.9 5.9 4 7 4ZM7 12H17V20C17 21.1 16.1 22 15 22H9C7.9 22 7 21.1 7 20V12Z"/>
                    </svg>
                  </div>
                </div>

                {/* Status Content */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t('health.allSyncing')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We automatically review your account on a regular basis. 
                    If something needs your attention, you'll see those 
                    recommendations here.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('health.whyImportant')}
              </h3>
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Account connections may occasionally break due to expired API keys, 
                  changed credentials, or platform security updates. When this happens, 
                  users may experience gaps in their transaction history, incorrect 
                  balances, or incomplete tax calculations.
                </p>
                <p>
                  The Re-authentication Account Tool is crucial for maintaining 
                  accurate, up-to-date financial data within CoinTracker.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "ignored" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Status Card */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
              <div className="flex items-start gap-6">
                {/* Sleep Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </div>
                </div>

                {/* Status Content */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {t('health.nothing')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    You haven't ignored any tasks, so you can ignore this tab for now.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t('health.whyImportant')}
              </h3>
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Account connections may occasionally break due to expired API keys, 
                  changed credentials, or platform security updates. When this happens, 
                  users may experience gaps in their transaction history, incorrect 
                  balances, or incomplete tax calculations.
                </p>
                <p>
                  The Re-authentication Account Tool is crucial for maintaining 
                  accurate, up-to-date financial data within CoinTracker.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountHealth;
