
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { Calendar, Filter, Info, Download, Plus, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Candidate = {
  asset: string;
  price: number; // NOK
  holdings: number; // units
  costBasis: number; // NOK per unit
  unrealizedLoss: number; // NOK total
  dayChangePct: number;
  washSaleStart: string;
  washSaleEnd: string;
};

const MOCK_CANDIDATES: Candidate[] = [
  { asset: "BTC", price: 720000, holdings: 0.65, costBasis: 850000, unrealizedLoss: -84500, dayChangePct: -2.4, washSaleStart: "2025-06-01", washSaleEnd: "2025-07-01" },
  { asset: "ETH", price: 35000, holdings: 9.2, costBasis: 41000, unrealizedLoss: -55200, dayChangePct: -1.8, washSaleStart: "2025-06-03", washSaleEnd: "2025-07-03" },
  { asset: "SOL", price: 1750, holdings: 120, costBasis: 2200, unrealizedLoss: -54000, dayChangePct: -3.1, washSaleStart: "2025-06-05", washSaleEnd: "2025-07-05" },
  { asset: "ADA", price: 6.5, holdings: 4200, costBasis: 8.2, unrealizedLoss: -7140, dayChangePct: -0.9, washSaleStart: "2025-06-08", washSaleEnd: "2025-07-08" },
  { asset: "MATIC", price: 25.4, holdings: 1800, costBasis: 31.0, unrealizedLoss: -10080, dayChangePct: -1.1, washSaleStart: "2025-06-10", washSaleEnd: "2025-07-10" },
];

const TaxLossHarvesting = () => {
  const { t } = useLanguage();
  const [period, setPeriod] = useState<'1M'|'3M'|'YTD'|'1Y'|'ALL'>('YTD');
  const [taxMethod, setTaxMethod] = useState<'FIFO'|'LIFO'>('FIFO');
  const [includeFees, setIncludeFees] = useState<boolean>(true);
  const [washWindowDays, setWashWindowDays] = useState<number>(30);
  const [plan, setPlan] = useState<Array<{ asset: string; quantity: number; estSavings: number }>>([]);

  const totals = useMemo(() => {
    const harvestable = MOCK_CANDIDATES.reduce((s, c) => s + Math.abs(c.unrealizedLoss), 0);
    const potentialSavings = harvestable * 0.24; // assume 24% marginal tax rate mock
    const assetsWithLosses = MOCK_CANDIDATES.length;
    return {
      harvestable,
      potentialSavings,
      assetsWithLosses,
    };
  }, []);

  const addToPlan = (c: Candidate) => {
    if (plan.find(p => p.asset === c.asset)) return;
    const qty = Math.max(1, Math.floor(c.holdings * 0.25));
    const estSavings = Math.abs(c.unrealizedLoss) * 0.24 * 0.25;
    setPlan(prev => [...prev, { asset: c.asset, quantity: qty, estSavings }]);
  };

  const removeFromPlan = (asset: string) => setPlan(prev => prev.filter(p => p.asset !== asset));

  const updateQty = (asset: string, qty: number) => {
    setPlan(prev => prev.map(p => p.asset === asset ? { ...p, quantity: qty, estSavings: Math.max(0, qty) * 1000 } : p));
  };

  const planTotals = useMemo(() => {
    const est = plan.reduce((s, p) => s + p.estSavings, 0);
    return { estSavings: est };
  }, [plan]);

  return (
    <div className="space-y-8">
      {/* Header (title removed) */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-gray-600 dark:text-gray-300">January 1 2025 to today</span>
            <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium px-2.5 py-0.5 rounded">{t('tlh.inProgress')}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter size={16} /> {t('tlh.settings')}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: KPIs + Candidates */}
        <div className="lg:col-span-2 space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('tlh.kpi.estimatedLosses')}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">NOK {totals.harvestable.toLocaleString()}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('tlh.kpi.potentialSavings')}</div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">NOK {totals.potentialSavings.toLocaleString()}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('tlh.kpi.assetsWithLosses')}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{totals.assetsWithLosses}</div>
            </div>
          </div>

          {/* Candidates Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('tlh.candidates.title')}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('tlh.candidates.taxMethod')}: {taxMethod} • {t('tlh.candidates.washWindow')}: {washWindowDays} days • Fees {includeFees ? t('tlh.candidates.feesIncluded') : t('tlh.candidates.feesExcluded')}</div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 text-sm">
                    <th className="text-left py-3">{t('tlh.th.asset')}</th>
                    <th className="text-right py-3">{t('tlh.th.holdings')}</th>
                    <th className="text-right py-3">{t('tlh.th.price')}</th>
                    <th className="text-right py-3">{t('tlh.th.costBasis')}</th>
                    <th className="text-right py-3">{t('tlh.th.unrealizedLoss')}</th>
                    <th className="text-right py-3">{t('tlh.th.dayChange')}</th>
                    <th className="text-left py-3">{t('tlh.th.washWindow')}</th>
                    <th className="text-right py-3">{t('tlh.th.action')}</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_CANDIDATES.map(c => (
                    <tr key={c.asset} className="border-b border-gray-100 dark:border-gray-700 text-sm">
                      <td className="py-3 font-medium text-gray-900 dark:text-white">{c.asset}</td>
                      <td className="py-3 text-right text-gray-900 dark:text-white">{c.holdings.toLocaleString()}</td>
                      <td className="py-3 text-right text-gray-900 dark:text-white">NOK {c.price.toLocaleString()}</td>
                      <td className="py-3 text-right text-gray-900 dark:text-white">NOK {c.costBasis.toLocaleString()}</td>
                      <td className="py-3 text-right text-red-600">{c.unrealizedLoss.toLocaleString()}</td>
                      <td className={`py-3 text-right ${c.dayChangePct < 0 ? 'text-red-600' : 'text-green-600'}`}>{c.dayChangePct}%</td>
                      <td className="py-3 text-gray-700 dark:text-gray-300">{c.washSaleStart} → {c.washSaleEnd}</td>
                      <td className="py-3 text-right">
                        <Button size="sm" variant="outline" onClick={() => addToPlan(c)}>{t('tlh.add')}</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Plan Builder & Guide */}
        <div className="space-y-6">
          {/* Plan Builder */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('tlh.plan.title')}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('tlh.plan.projected')}: <span className="font-semibold text-green-600 dark:text-green-400">NOK {planTotals.estSavings.toLocaleString()}</span></div>
            </div>
            {plan.length === 0 ? (
              <div className="text-sm text-gray-600 dark:text-gray-300">{t('tlh.plan.empty')}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 text-sm">
                      <th className="text-left py-3">{t('tlh.plan.th.asset')}</th>
                      <th className="text-right py-3">{t('tlh.plan.th.qty')}</th>
                      <th className="text-right py-3">{t('tlh.plan.th.savings')}</th>
                      <th className="text-right py-3">{t('tlh.plan.th.remove')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.map(p => (
                      <tr key={p.asset} className="border-b border-gray-100 dark:border-gray-700 text-sm">
                        <td className="py-3 font-medium text-gray-900 dark:text-white">{p.asset}</td>
                        <td className="py-3 text-right">
                          <input
                            type="number"
                            min={0}
                            step={1}
                            value={p.quantity}
                            onChange={(e) => updateQty(p.asset, Number(e.target.value))}
                            className="w-24 text-right border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </td>
                        <td className="py-3 text-right text-green-600 dark:text-green-400">NOK {p.estSavings.toLocaleString()}</td>
                        <td className="py-3 text-right">
                          <Button size="sm" variant="ghost" onClick={() => removeFromPlan(p.asset)} className="text-gray-600 dark:text-gray-300 hover:text-red-600">
                            <Trash2 size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-4 flex gap-2">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white"><Plus size={16} className="mr-2" />{t('tlh.plan.generatePdf')}</Button>
              <Button variant="outline" className="flex items-center gap-2"><Download size={16} /> {t('tlh.plan.exportCsv')}</Button>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('tlh.how.title')}</h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
              <p>
                {t('tlh.how.line1')}{' '}<a className="text-blue-600 underline hover:text-blue-700" href="https://www.investopedia.com/terms/t/tax-loss-harvesting.asp" target="_blank" rel="noopener noreferrer">{t('tlh.how.here')}</a>.
              </p>
              <p>
                {t('tlh.how.line2').replace('{days}', String(washWindowDays))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
        <p>
          {t('tlh.disclaimer')}
        </p>
      </div>
    </div>
  );
};

export default TaxLossHarvesting;
