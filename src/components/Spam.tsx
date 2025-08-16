import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Spam = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("potential");
  
  const potentialSpam = [
    { name: "usual", network: "Ethereum", contractAddress: "0x3b4...0bD47", icon: "🔵" },
    { name: "airdrops", network: "Ethereum", contractAddress: "0xa1c...eF19", icon: "🪂" },
    { name: "free-eth", network: "Ethereum", contractAddress: "0x9f0...B3A2", icon: "💸" },
    { name: "meme-coin", network: "Polygon", contractAddress: "0x21d...9A11", icon: "🐶" },
    { name: "promo-nft", network: "Ethereum", contractAddress: "0x7e7...0CA9", icon: "🪪" },
    { name: "bonus-usdt", network: "BSC", contractAddress: "0x0cd...3F91", icon: "💰" },
    { name: "lottery-token", network: "Ethereum", contractAddress: "0x4ac...7210", icon: "🎲" },
    { name: "gift-token", network: "Arbitrum", contractAddress: "0x6be...41Bd", icon: "🎁" },
    { name: "promo-airdrop", network: "Ethereum", contractAddress: "0x55a...D001", icon: "🪂" },
  ];
  
  const resolvedSpam = [
    { name: "ether (NFT collection)", network: "Ethereum", contractAddress: "0x117...157d7", icon: "🔵", verified: true },
    { name: "farm (NFT collection)", network: "Ethereum", contractAddress: "0x905...AE3cc", icon: "🔵", verified: true },
    { name: "reward-token", network: "Ethereum", contractAddress: "0x88c...eF22", icon: "🎯", verified: true },
    { name: "staking-bonus", network: "Polygon", contractAddress: "0x33b...9F10", icon: "🪙", verified: true },
    { name: "airdrops-claim", network: "Arbitrum", contractAddress: "0x72a...7C30", icon: "🪂", verified: true },
    { name: "gift-nft", network: "Ethereum", contractAddress: "0x5f1...AA07", icon: "🎁", verified: true },
    { name: "promo-eth", network: "Ethereum", contractAddress: "0x1b9...C0C1", icon: "💸", verified: true },
    { name: "lotto-coin", network: "BSC", contractAddress: "0x0f0...7D91", icon: "🎲", verified: true },
    { name: "meme-airdrop", network: "Ethereum", contractAddress: "0x9aa...E123", icon: "🐸", verified: true },
    { name: "bonus-nft", network: "Polygon", contractAddress: "0x2cd...98C5", icon: "🪪", verified: true },
  ];

  return <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button onClick={() => setActiveTab("potential")} className={`border-b-2 py-2 px-1 text-sm font-medium ${activeTab === "potential" ? "border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"}`}>
            {t('spam.tab.potential')} ({potentialSpam.length})
          </button>
          <button onClick={() => setActiveTab("resolved")} className={`border-b-2 py-2 px-1 text-sm font-medium ${activeTab === "resolved" ? "border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"}`}>
            {t('spam.tab.resolved')} ({resolvedSpam.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === "potential" && <div className="space-y-6">
          {/* Potential Spam Assets */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('spam.tab.potential')}</h2>
              <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">{t('spam.markAll')}</Button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('spam.desc')}
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
                <span>{t('spam.assetName')}</span>
                <span>{t('spam.network')}</span>
                <span>{t('spam.contract')}</span>
                <span></span>
              </div>
              
              {potentialSpam.map((asset, index) => <div key={index} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center text-white">
                      {asset.icon}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{asset.name}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{asset.network}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">{asset.contractAddress}</span>
                    <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">{t('spam.notSpam')}</Button>
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">{t('spam.spam')}</Button>
                  </div>
                </div>)}
            </div>
          </div>
        </div>}

      {activeTab === "resolved" && <div className="space-y-6">
          {/* Resolved Spam */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('spam.tab.resolved')}</h2>
                <div className="flex gap-2 mt-2">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded">
                    2 {t('spam.autoResolved')}
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded">
                    0 {t('spam.manual')}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 pb-2">
                <span>{t('spam.assetName')}</span>
                <span>{t('spam.network')}</span>
                <span>{t('spam.contract')}</span>
                <span></span>
              </div>
              
              {resolvedSpam.map((asset, index) => <div key={index} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center text-white">
                      {asset.icon}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">{asset.name}</span>
                      {asset.verified && <div className="w-4 h-4 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                        </div>}
                    </div>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">{asset.network}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">{asset.contractAddress}</span>
                    <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">{t('spam.notSpam')}</Button>
                    <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">{t('spam.spam')}</Button>
                  </div>
                </div>)}
            </div>
          </div>
        </div>}
    </div>;
};

export default Spam;
