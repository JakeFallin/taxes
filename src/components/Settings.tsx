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
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.account.email')}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>matshatlem@gmail.com</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.account.password')}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>{t('settings.account.resetPassword')}</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.account.uiTheme')}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>{t('settings.account.uiTheme.system')}</span>
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
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.location.homeCountry')}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>{t('settings.location.homeCountryValue')}</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.location.baseCurrency')}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>{t('settings.location.baseCurrencyValue')}</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.location.language')}</h3>
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
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.location.customCurrencies')}</h3>
                </div>
                <ChevronRight size={16} className="text-gray-600 dark:text-gray-400" />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('settings.security.tfa.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('settings.security.tfa.desc')}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.security.tfa.enable')}</span>
              <button onClick={() => setTwoFactorEnabled(!twoFactorEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${twoFactorEnabled ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          {/* Support Permission */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('settings.support.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('settings.support.desc')}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.support.enable')}</span>
              <button onClick={() => setSupportPermissionEnabled(!supportPermissionEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${supportPermissionEnabled ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${supportPermissionEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          {/* Tax Professional */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{t('settings.taxPro.title')}</h3>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.taxPro.status')}</span>
              <button onClick={() => setTaxProfessionalEnabled(!taxProfessionalEnabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${taxProfessionalEnabled ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${taxProfessionalEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="font-medium text-red-600 dark:text-red-400 mb-2">{t('settings.delete.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('settings.delete.desc')}</p>
            </div>
            <Button variant="destructive">
              {t('settings.delete.cta')}
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
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.tax.costBasis.title')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.tax.costBasis.desc')}</p>
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  <span>{t('settings.tax.costBasis.value')}</span>
                </div>
              </div>

              {/* Cost basis tracking */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.tax.costTracking.title')}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>{t('settings.tax.costTracking.value')}</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Tax year */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.tax.taxYear.title')}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>{t('settings.tax.taxYear.value')}</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Treat liquid staking as non-taxable */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.tax.liquidStaking.title')}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>{t('common.off')}</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Treat wrapping as non-taxable */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.tax.wrapping.title')}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>{t('common.off')}</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Treat liquid lending as non-taxable */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.tax.lending.title')}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>{t('common.off')}</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Treat liquidity pool transactions as non-taxable */}
              <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.tax.lp.title')}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>{t('common.off')}</span>
                  <ChevronRight size={16} />
                </div>
              </div>

              {/* Treat staking rewards as non-taxable */}
              <div className="flex items-center justify-between py-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">{t('settings.tax.stakingRewards.title')}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span>{t('common.off')}</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>}

      {activeTab === "subscription" && <div className="space-y-8">
          {/* Subscription Plans */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('settings.sub.choosePlanTitle')}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-2">{t('settings.sub.taglineLine1')}</p>
            <p className="text-gray-600 dark:text-gray-400">{t('settings.sub.taglineLine2')}</p>
            
            {/* Integration badges */}
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.badge.integrations')}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.badge.tripletex')}</span>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Base Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('settings.sub.plan.base.tier')}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settings.sub.plan.base.name')}</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{t('settings.sub.plan.base.price')}</span>
                  <span className="text-gray-600 dark:text-gray-400">/year</span>
                </div>
              </div>
              <Button className="w-full mb-6" variant="outline">{t('settings.sub.plan.base.cta')}</Button>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.portfolioTracking')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.tripletexFiken')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500 dark:text-red-400">⚠</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.taxReports')}</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.limit.base')}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{t('settings.sub.progress')}</p>
              </div>
            </div>

            {/* Prime Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">{t('settings.sub.plan.prime.badge')}</span>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Optimized</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settings.sub.plan.prime.name')}</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{t('settings.sub.plan.prime.price')}</span>
                  <span className="text-gray-600 dark:text-gray-400">/year</span>
                </div>
              </div>
              <Button className="w-full mb-6">{t('settings.sub.plan.prime.cta')}</Button>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.taxLots')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.tlh')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.performance')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.portfolioTracking')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.tripletexFiken')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.taxReports')}</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.limit.prime')}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{t('settings.sub.progress')}</p>
              </div>
            </div>

            {/* Ultra Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('settings.sub.plan.ultra.tier')}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settings.sub.plan.ultra.name')}</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{t('settings.sub.plan.ultra.price')}</span>
                  <span className="text-gray-600 dark:text-gray-400">/year</span>
                </div>
              </div>
              <Button className="w-full mb-6" variant="outline">{t('settings.sub.plan.ultra.cta')}</Button>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.prioritySupport')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.changeCostBasis')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.taxLots')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.tlh')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.performance')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.portfolioTracking')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.tripletexFiken')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.taxReports')}</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.limit.ultra')}</p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{t('settings.sub.progress')}</p>
              </div>
            </div>

            {/* Full Service Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
              <div className="mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{t('settings.sub.plan.full.tier')}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('settings.sub.plan.full.name')}</h3>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{t('settings.sub.plan.full.price')}</span>
                  <span className="text-gray-600 dark:text-gray-400">/year</span>
                </div>
              </div>
              <div className="flex gap-2 mb-6">
                <Button className="flex-1" variant="outline">{t('settings.sub.plan.full.cta')}</Button>
                <Button variant="outline">{t('settings.sub.plan.full.contact')}</Button>
              </div>
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-gray-900 dark:text-white">You have access beyond the Ultra+ plan with:</p>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.full.accountManager')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.full.csvHelp')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.full.expertTeam')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.feature.full.quarterlyHealth')}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.sub.limit.full')}</p>
              </div>
            </div>
          </div>
        </div>}

      {activeTab === "notifications" && <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('settings.notifications.title')}</h2>  
          <p className="text-gray-600 dark:text-gray-400">{t('settings.notifications.desc')}</p>
        </div>}
    </div>;
};
export default Settings;