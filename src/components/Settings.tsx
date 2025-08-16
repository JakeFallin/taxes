import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [supportPermissionEnabled, setSupportPermissionEnabled] = useState(false);
  const [taxProfessionalEnabled, setTaxProfessionalEnabled] = useState(true);
  const { language, setLanguage, t } = useLanguage();
  return <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button onClick={() => setActiveTab("account")} className={`border-b-2 py-2 px-1 text-sm font-medium ${activeTab === "account" ? "border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"}`}>
            {t('settings.tabs.account')}
          </button>
          <button onClick={() => setActiveTab("tax")} className={`border-b-2 py-2 px-1 text-sm font-medium ${activeTab === "tax" ? "border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"}`}>
            {t('settings.tabs.tax')}
          </button>
          <button onClick={() => setActiveTab("subscription")} className={`border-b-2 py-2 px-1 text-sm font-medium ${activeTab === "subscription" ? "border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"}`}>
            {t('settings.tabs.subscription')}
          </button>
          <button onClick={() => setActiveTab("notifications")} className={`border-b-2 py-2 px-1 text-sm font-medium ${activeTab === "notifications" ? "border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"}`}>
            {t('settings.tabs.notifications')}
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === "account" && <div className="space-y-6">
          {/* Account Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Email</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>matshatlem@gmail.com</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Password</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>Reset password</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">UI Theme</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>System</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Location Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Home country</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>Norway</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Base currency</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>Norwegian Krone</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Language</h3>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <button
                    onClick={() => setLanguage('no')}
                    className={`px-3 py-1 rounded border ${language==='no' ? 'border-orange-500 text-orange-600' : 'border-gray-300 dark:border-gray-600'}`}
                  >
                    Norsk
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded border ${language==='en' ? 'border-orange-500 text-orange-600' : 'border-gray-300 dark:border-gray-600'}`}
                  >
                    English
                  </button>
                </div>
              </div>


              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Custom currencies</h3>
                </div>
                <ChevronRight size={16} className="text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Two factor authentication</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Secure your Kryptools account with an additional layer of security.</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Enable two factor authentication</span>
              <button onClick={() => setTwoFactorEnabled(!twoFactorEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFactorEnabled ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          {/* Support Permission */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Permission for Kryptools Support to view my account</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">This enables Kryptools support to view your Kryptools account in order to troubleshoot issues. You can revoke access any time.</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Allow support access</span>
              <button onClick={() => setSupportPermissionEnabled(!supportPermissionEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${supportPermissionEnabled ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${supportPermissionEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          {/* Tax Professional */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">I am a tax professional</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Tax professional status</span>
              <button onClick={() => setTaxProfessionalEnabled(!taxProfessionalEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${taxProfessionalEnabled ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${taxProfessionalEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="font-medium text-red-600 dark:text-red-400 mb-2">Delete account</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">This deletes all your Kryptools account data including exchanges, wallets, transactions and trade history. This action is irreversible.</p>
            </div>
            <Button variant="destructive">
              Delete account
            </Button>
          </div>
        </div>}

      {activeTab === "tax" && <div className="space-y-6">
          {/* Tax Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="space-y-6">
              {/* Cost basis method */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Cost basis method</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">This is the only cost basis method available for your country.</p>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <span>FIFO</span>
                </div>
              </div>

              {/* Cost basis tracking */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Cost basis tracking</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>Universal</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Tax year */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Tax year</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>January 1st to December 31st</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Treat liquid staking as non-taxable */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Treat liquid staking as non-taxable</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>Off</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Treat wrapping as non-taxable */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Treat wrapping as non-taxable</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>Off</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Treat liquid lending as non-taxable */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Treat liquid lending as non-taxable</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>Off</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Treat liquidity pool transactions as non-taxable */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Treat liquidity pool transactions as non-taxable</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>Off</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Treat staking rewards as non-taxable */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Treat staking rewards as non-taxable</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>Off</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>}

      {activeTab === "subscription" && <div className="space-y-8">
          {/* Subscription Plans */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Choose the plan that's right for you</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">We take care of your crypto taxes accurately, quickly, and securely</p>
            <p className="text-gray-600 dark:text-gray-400">so you can file online or with your tax professional</p>
            
            {/* Integration badges */}
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">500+ crypto integrations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">File directly with Tripletex and Fiken</span>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Base Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Simple</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Base</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">$59</span>
                  <span className="text-gray-600 dark:text-gray-400">/year</span>
                </div>
              </div>
              <Button className="w-full mb-6" variant="outline">Get Base →</Button>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Portfolio tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tripletex and Fiken integrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 dark:text-red-400">⚠</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tax reports for 2024 and all past years</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">Up to 100 transactions per year</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">You're at 3%</p>
              </div>
            </div>

            {/* Prime Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">Best value</span>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Optimized</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Prime</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">$199</span>
                  <span className="text-gray-600 dark:text-gray-400">/year</span>
                </div>
              </div>
              <Button className="w-full mb-6">Get Prime →</Button>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tax lots breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tax loss harvesting</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Performance tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Portfolio tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tripletex and Fiken integrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tax reports for 2024 and all past years</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">Up to 1,000 transactions per year</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">You're at 3%</p>
              </div>
            </div>

            {/* Ultra Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Advanced</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Ultra</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                  <span className="text-gray-600 dark:text-gray-400">/year</span>
                </div>
              </div>
              <Button className="w-full mb-6" variant="outline">Get Ultra →</Button>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Priority support</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Change cost basis method by year</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tax lots breakdown</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tax loss harvesting</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Performance tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Portfolio tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tripletex and Fiken integrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tax reports for 2024 and all past years</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">Up to 10,000 transactions per year</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">You're at 3%</p>
              </div>
            </div>

            {/* Full Service Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Bespoke</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Full Service</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">$3499</span>
                  <span className="text-gray-600 dark:text-gray-400">/year</span>
                </div>
              </div>
              <div className="flex gap-2 mb-6">
                <Button className="flex-1" variant="outline">Get Full Service →</Button>
                <Button variant="outline">Contact us</Button>
              </div>
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-gray-900 dark:text-white">You have access beyond the Ultra+ plan with:</p>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">A dedicated account manager that works with you to manage your CoinTracker account.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Personal assistance in managing and importing CSV files.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">A dedicated team of experts ready to work with you to review transactions, identify and fix errors, and reconcile your accounts.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Quarterly account health reviews so you're ready and confident well before tax deadlines.</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">This plan allows up to 300k transactions. Contact us if you are looking for higher limits or more support.</p>
              </div>
            </div>
          </div>
        </div>}

      {activeTab === "notifications" && <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Notifications</h2>  
          <p className="text-gray-600 dark:text-gray-400">Notification preferences will be displayed here.</p>
        </div>}
    </div>;
};
export default Settings;