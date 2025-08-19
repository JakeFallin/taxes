
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TaxSummary = () => {
  const { t } = useLanguage();
  return (
    <Card className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">{t('taxSummary.title')}</CardTitle>
        <Button 
          variant="ghost" 
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {t('taxSummary.more')}
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Tax Years Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-4">{t('taxSummary.taxYear')}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-900 dark:text-white font-medium">2025</span>
                <Lock size={14} className="text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 dark:text-white font-medium">2024</span>
                <Lock size={14} className="text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-4">{t('taxSummary.gains')}</h3>
            <div className="space-y-3">
              <div className="text-red-500 dark:text-red-400 font-medium">-NOK 7,242</div>
              <div className="text-red-500 dark:text-red-400 font-medium">-NOK 5,771</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-4">{t('taxSummary.income')}</h3>
            <div className="space-y-3">
              <div className="text-green-900 dark:text-white font-medium">NOK 133,471</div>
              <div className="text-green-900 dark:text-white font-medium">NOK 14,713</div>
            </div>
          </div>
        </div>

        {/* Tax Estimates Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">{t('taxSummary.estimatedRate')}</h4>
            <div className="text-gray-900 dark:text-white text-xl font-bold">30%</div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{t('taxSummary.capitalGainsTax')}</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">{t('taxSummary.taxablePnL')}</h4>
            <div className="text-green-600 dark:text-green-400 text-xl font-bold">NOK 144,514.74</div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{t('taxSummary.unrealizedGains')}</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">{t('taxSummary.estimatedDue')}</h4>
            <div className="text-orange-600 dark:text-orange-400 text-xl font-bold">NOK 45,894.42</div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{t('taxSummary.basedOnCurrent')}</p>
          </div>
        </div>

        {/* Additional Tax Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div>
            <h4 className="text-gray-900 dark:text-white font-medium mb-3">{t('taxSummary.shortVsLong')}</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('taxSummary.shortGains')}</span>
                <span className="text-gray-900 dark:text-white">NOK 87,492.30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('taxSummary.longGains')}</span>
                <span className="text-gray-900 dark:text-white">NOK 456,622.44</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-900 dark:text-white font-medium mb-3">{t('taxSummary.tlh')}</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('taxSummary.potentialSavings')}</span>
                <span className="text-green-600 dark:text-green-400">NOK 136,455.33</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">{t('taxSummary.harvestedLosses')}</span>
                <span className="text-gray-900 dark:text-white">-NOK 22,174.20</span>
              </div>
            </div>
          </div>
        </div>

      
      </CardContent>
    </Card>
  );
};

export default TaxSummary;
