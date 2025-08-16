import { ChevronDown, Info, User, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
const Taxes = () => {
  const { t } = useLanguage();
  const [summaryTab, setSummaryTab] = useState<'exchanges' | 'wallets' | 'imported' | 'nfts'>('exchanges')
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">2025 {t('taxes.title')}</h1>
          <ChevronDown size={20} className="text-gray-600 dark:text-gray-400" />
          <div className="text-sm text-gray-600 dark:text-gray-400">January 1 2025 to today</div>
          <span className="px-2 py-1 bg-yellow-400 dark:bg-yellow-500 text-black dark:text-black text-xs font-medium rounded">
            {t('taxes.inProgress')}
          </span>
        </div>
        <Button variant="outline" className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800">
          <User size={16} />
          {t('taxes.addTaxPro')}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Capital Gains Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('taxes.totalCapitalGains')}</h3>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">-NOK 7,242.51</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{t('taxes.totalIncome')}</h3>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">NOK 0.00</div>
            </div>
          </div>

          {/* Taxable Capital Gains */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('taxes.taxableCapitalGains')}</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 font-medium text-gray-700 dark:text-gray-300">{t('taxes.gainType')}</th>
                    <th className="text-center py-3 font-medium text-gray-700 dark:text-gray-300">{t('taxes.shortTerm')}</th>
                    <th className="text-center py-3 font-medium text-gray-700 dark:text-gray-300">{t('taxes.longTerm')}</th>
                  </tr>
                </thead>
                <tbody className="space-y-4">
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 text-gray-900 dark:text-white">Crypto-to-crypto gains</td>
                    <td className="py-4 text-center text-red-600 dark:text-red-400 font-medium">
                      -NOK 5,842.31
                    </td>
                    <td className="py-4 text-center text-green-600 dark:text-green-400 font-medium">
                      NOK 1,400.20
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-4 flex items-center gap-2 text-gray-900 dark:text-white">
                      Other capital gains
                      <Info size={14} className="text-gray-400 dark:text-gray-500" />
                    </td>
                    <td className="py-4 text-center text-red-600 dark:text-red-400 font-medium">
                      -NOK 1,400.20
                    </td>
                    <td className="py-4 text-center text-gray-600 dark:text-gray-400">
                      NOK 0.00
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-gray-900 dark:text-white font-semibold">Total capital gains</td>
                    <td className="py-4 text-center text-red-600 dark:text-red-400 font-semibold">
                      -NOK 7,242.51
                    </td>
                    <td className="py-4 text-center text-green-600 dark:text-green-400 font-semibold">
                      NOK 1,400.20
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Taxable Income */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('taxes.taxableIncome')}</h2>
              <Info size={16} className="text-gray-400 dark:text-gray-500" />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 font-medium text-gray-700 dark:text-gray-300">{t('taxes.type')}</th>
                    <th className="text-left py-3 font-medium text-gray-700 dark:text-gray-300">{t('taxes.description')}</th>
                    <th className="text-right py-3 font-medium text-gray-700 dark:text-gray-300">{t('taxes.amountNok')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 text-gray-900 dark:text-white">Staking rewards</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">ETH staking via Lido</td>
                    <td className="py-3 text-right text-green-600 dark:text-green-400 font-medium">+ 12,450.25</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 text-gray-900 dark:text-white">Airdrops</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">Protocol incentive distribution</td>
                    <td className="py-3 text-right text-green-600 dark:text-green-400 font-medium">+ 2,150.00</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 text-gray-900 dark:text-white">Interest income</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">USDC lending yield</td>
                    <td className="py-3 text-right text-green-600 dark:text-green-400 font-medium">+ 3,275.45</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 text-gray-900 dark:text-white">Mining income</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">BTC pool payouts</td>
                    <td className="py-3 text-right text-green-600 dark:text-green-400 font-medium">+ 5,890.10</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 text-gray-900 dark:text-white">Referral rewards</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">Exchange referral program</td>
                    <td className="py-3 text-right text-green-600 dark:text-green-400 font-medium">+ 640.00</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-900 dark:text-white">Misc income</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">NFT royalties</td>
                    <td className="py-3 text-right text-green-600 dark:text-green-400 font-medium">+ 1,200.00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-3 font-semibold text-gray-900 dark:text-white" colSpan={2}>{t('taxes.totalTaxableIncome')}</td>
                    <td className="py-3 text-right font-semibold text-gray-900 dark:text-white">NOK 25,605.80</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Other Transactions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('taxes.otherTransactions')}</h2>
              <Info size={16} className="text-gray-400 dark:text-gray-500" />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 font-medium text-gray-700 dark:text-gray-300">{t('taxes.type')}</th>
                    <th className="text-left py-3 font-medium text-gray-700 dark:text-gray-300">{t('taxes.description')}</th>
                    <th className="text-right py-3 font-medium text-gray-700 dark:text-gray-300">{t('taxes.amountNok')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 text-gray-900 dark:text-white">Airdrop (income)</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">USDC airdrop claim</td>
                    <td className="py-3 text-right text-green-600 dark:text-green-400 font-medium">+ 1,250.00</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 text-gray-900 dark:text-white">Staking rewards</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">ETH staking via Lido</td>
                    <td className="py-3 text-right text-green-600 dark:text-green-400 font-medium">+ 3,420.75</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 text-gray-900 dark:text-white">Mining income</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">BTC solo mining</td>
                    <td className="py-3 text-right text-green-600 dark:text-green-400 font-medium">+ 980.10</td>
                  </tr>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 text-gray-900 dark:text-white">Transfer fee</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">Network fee (non-deductible)</td>
                    <td className="py-3 text-right text-red-600 dark:text-red-400 font-medium">- 145.32</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-900 dark:text-white">NFT sale (income)</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">Sold NFT on OpenSea</td>
                    <td className="py-3 text-right text-green-600 dark:text-green-400 font-medium">+ 6,780.00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-200 dark:border-gray-700">
                    <td className="py-3 font-semibold text-gray-900 dark:text-white" colSpan={2}>{t('taxes.totalOtherTransactions')}</td>
                    <td className="py-3 text-right font-semibold text-gray-900 dark:text-white">NOK 12,285.53</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Annual Tax Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{t('taxes.annualSummary')}</h2>
            
            <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
              <nav className="-mb-px flex space-x-8">
                <button onClick={() => setSummaryTab('exchanges')} className={`${summaryTab === 'exchanges' ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'} border-b-2 py-2 px-1 text-sm font-medium`}>
                  Exchanges
                </button>
                <button onClick={() => setSummaryTab('wallets')} className={`${summaryTab === 'wallets' ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover;border-gray-600'} border-b-2 py-2 px-1 text-sm font-medium`}>
                  Crypto wallets
                </button>
                <button onClick={() => setSummaryTab('imported')} className={`${summaryTab === 'imported' ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'} border-b-2 py-2 px-1 text-sm font-medium`}>
                  Imported wallets
                </button>
                <button onClick={() => setSummaryTab('nfts')} className={`${summaryTab === 'nfts' ? 'border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover;border-gray-600'} border-b-2 py-2 px-1 text-sm font-medium`}>
                  NFTs
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {summaryTab === 'exchanges' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Binance</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Transactions:</span>
                        <span className="text-gray-900 dark:text-white">1,247</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Volume:</span>
                        <span className="text-gray-900 dark:text-white">NOK 89,420</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Coinbase</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Transactions:</span>
                        <span className="text-gray-900 dark:text-white">892</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Volume:</span>
                        <span className="text-gray-900 dark:text-white">NOK 156,780</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Kraken</h4>
                    <div className="text-sm text-gray-600 dark;text-gray-400">
                      <div className="flex justify-between">
                        <span>Transactions:</span>
                        <span className="text-gray-900 dark:text:white">540</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Volume:</span>
                        <span className="text-gray-900 dark:text:white">NOK 67,320</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {summaryTab === 'wallets' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">MetaMask</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Transactions:</span>
                        <span className="text-gray-900 dark:text-white">1,040</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Volume:</span>
                        <span className="text-gray-900 dark:text-white">NOK 234,120</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Ledger</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Transactions:</span>
                        <span className="text-gray-900 dark:text-white">312</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Volume:</span>
                        <span className="text-gray-900 dark:text-white">NOK 98,540</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Phantom</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Transactions:</span>
                        <span className="text-gray-900 dark:text-white">221</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Volume:</span>
                        <span className="text-gray-900 dark:text-white">NOK 45,900</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {summaryTab === 'imported' && (
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">CSV Imports</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Files imported:</span>
                      <span className="text-gray-900 dark:text-white">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transactions processed:</span>
                      <span className="text-gray-900 dark:text-white">3,412</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duplicates removed:</span>
                      <span className="text-gray-900 dark:text-white">124</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {summaryTab === 'nfts' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">OpenSea</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Trades:</span>
                        <span className="text-gray-900 dark:text-white">67</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Volume:</span>
                        <span className="text-gray-900 dark:text-white">NOK 145,320</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Blur</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Trades:</span>
                        <span className="text-gray-900 dark:text-white">41</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Volume:</span>
                        <span className="text-gray-900 dark:text-white">NOK 92,780</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Magic Eden</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Trades:</span>
                        <span className="text-gray-900 dark:text-white">25</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Volume:</span>
                        <span className="text-gray-900 dark:text-white">NOK 38,210</span>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Current Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Plan</h3>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-200 text-xs font-medium rounded">
                Professional
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Yearly transaction limit</span>
                <span className="text-green-600 dark:text-green-400 font-medium">Unlimited</span>
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
                <span className="text-green-600 dark:text-green-400 font-medium">Unlimited</span>
              </div>
            </div>


          </div>

          {/* Tax Reports */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('taxes.taxReports')}</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{t('taxes.csvReports')}</h4>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Download size={16} className="text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-900 dark:text-white">Transaction History CSV</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-700 bg-green-50 dark:bg-green-900/20">
                    <Download size={14} className="mr-2" />
                    {t('taxes.downloadCsv')}
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
                  <Button variant="outline" size="sm" className="w-full border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-700 bg-green-50 dark:bg-green-900/20">
                    <Download size={14} className="mr-2" />
                    {t('taxes.downloadCsv')}
                  </Button>
                </div>

                

                {/* Additional mock downloads */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Download size={16} className="text-gray-400 dark:text-gray-500" />
                    <div>
                      <div className="text-gray-900 dark:text-white">Income Summary CSV</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Summarizes staking rewards, airdrops, mining, and other taxable income.</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-700 bg-green-50 dark:bg-green-900/20">
                    <Download size={14} className="mr-2" />
                    {t('taxes.downloadCsv')}
                  </Button>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <Download size={16} className="text-gray-400 dark:text-gray-500" />
                    <div>
                      <div className="text-gray-900 dark:text-white">Tax Lot Details CSV</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Per-lot acquisition/disposal dates, cost basis, and proceeds (FIFO mock).</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-700 bg-green-50 dark:bg-green-900/20">
                    <Download size={14} className="mr-2" />
                    {t('taxes.downloadCsv')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Export to Tax Authority */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('taxes.exportSkatteetaten.title')}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              We strive to provide seamless and compliant integrations with your tax authorities.
              Export a machine‑readable report formatted for Skatteetaten (Norwegian Tax Administration).
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Download size={16} className="mr-2" />
              {t('taxes.exportSkatteetaten.btn')}
            </Button>
          </div>

          {/* Transaction Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('taxes.transactionSummary')}</h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">{t('taxes.totalTransactionsThisYear')}</span>
                  <span className="text-gray-900 font-bold dark:text-white">3179</span>
                </div>
                <div className="space-y-6">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 text-xs font-medium rounded">
                    3173 Sent
                  </span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark;text-green-200 text-xs font-medium rounded">
                    6 Received
                  </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-red-100 dark:bg-blue-900 text-black-600 dark:text-blue-200 text-xs font-medium rounded">
                      34 spam
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-green-900 text-black-600 dark;text-green-200 text-xs font-medium rounded">
                      109 unconfirmed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Loss Harvesting (Mock) */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tax Loss Harvesting Opportunities</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/40">
                <div className="text-sm text-gray-600 dark:text-gray-300">Estimated harvestable losses</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">NOK 71,815.37</div>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/40">
                <div className="text-sm text-gray-600 dark:text-gray-300">Potential tax savings</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">NOK 18,450.00</div>
              </div>
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/40">
                <div className="text-sm text-gray-600 dark:text-gray-300">Assets with losses</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Top candidates</h4>
              <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between p-3 text-sm">
                  <span className="text-gray-700 dark:text-gray-300">BTC</span>
                  <span className="text-red-600 dark:text-red-400">-NOK 32,400.00</span>
                </div>
                <div className="flex items-center justify-between p-3 text-sm">
                  <span className="text-gray-700 dark:text-gray-300">ETH</span>
                  <span className="text-red-600 dark:text-red-400">-NOK 21,750.00</span>
                </div>
                <div className="flex items-center justify-between p-3 text-sm">
                  <span className="text-gray-700 dark:text-gray-300">SOL</span>
                  <span className="text-red-600 dark:text-red-400">-NOK 9,980.00</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Based on your mock portfolio, you could reduce taxable income by strategically realizing losses
                while maintaining market exposure.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">View harvesting plan</Button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Taxes;