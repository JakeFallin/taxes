import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const AiAssistant = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t('ai.welcome') }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const TLH_RESPONSE = `Tax Loss Harvesting (TLH) – Detailed Guide

Overview
- TLH is the practice of realizing capital losses to offset capital gains and potentially reduce your tax bill. In crypto, this means selling assets that are trading below your tax lot cost basis, then redeploying into similar (but not substantially identical) exposure to maintain market participation.

How it works
1) Identify tax lots with unrealized losses (market value < cost basis).
2) Realize losses by selling those lots; the realized loss = sum(cost basis) − sum(sale proceeds).
3) Reallocate proceeds to maintain risk exposure (e.g., rotate to a correlated asset, a different instrument, or wait a cooling period, depending on local rules and your policy).
4) Track lot-level adjustments (remaining lots, new basis, acquisition dates).

Lot selection methods
- FIFO: First-In, First-Out – simplest, may be suboptimal for TLH.
- HIFO: Highest-In, First-Out – prioritizes selling highest-basis lots to maximize loss.
- Specific Identification: Explicitly pick lots to sell – most flexible and often best for TLH.

Wash-sale and local considerations
- Rules vary by jurisdiction. Some countries restrict claiming losses if you repurchase the same or substantially identical assets within a defined window. If applicable in your jurisdiction, consider:
  • Cooling-off window before/after sale (e.g., 30 days in some regimes).
  • Using alternative but correlated exposure (e.g., rotate ETH → a basket or a different L2 token) to avoid a substantially identical repurchase.
  • Document intent and trades for auditability.

Example (illustrative)
- You hold 5.0 ETH purchased at an average cost of NOK 30,000 per ETH (total cost NOK 150,000). Market is now NOK 26,000 per ETH.
- You sell 2.0 ETH at NOK 26,000 → proceeds NOK 52,000; cost of those lots NOK 60,000 → realized loss NOK 8,000.
- You immediately buy a diversified basket (e.g., a mix of large-cap L2s) or wait out your local cooling period before repurchasing ETH.
- The realized loss can offset realized gains this year; excess may carry forward per local rules.

Data Kryptools uses for TLH analytics
- Positions and tax lots: quantity, acquisition date, unit cost basis, fees.
- Market data: current price, historical price, volatility (for scenario stress).
- Realized events: sells, transfers, fees – to compute realized P&L and remaining lots.

How Kryptools computes candidates
1) Build lot-level ledger from imports and wallet sync.
2) Mark lots with unrealized loss and rank by potential loss (HIFO-style when helpful).
3) Check constraints (e.g., minimum trade size, fees, liquidity, and optional wash-sale window assumptions).
4) Propose actions with estimated tax impact: estimated realized loss, projected savings (loss × estimated marginal tax rate), and replacement ideas.

Risks and caveats
- Transaction costs and spreads: small lots may be uneconomical.
- Slippage/liquidity: especially for long-tail tokens.
- Tracking error: replacement assets may not perfectly mirror exposure.
- Policy and compliance: ensure alignment with local tax law and personal policy.
- Recordkeeping: retain confirmations and lot-level details for audits.

Best practices
- Batch small lots into periodic TLH reviews to reduce fees.
- Use specific identification where supported to optimize loss harvesting.
- Avoid immediately repurchasing substantially identical assets if local rules restrict.
- Set thresholds (e.g., harvest if unrealized loss > NOK X or > Y%).
- Rebalance after harvesting to maintain target risk.

Kryptools plan builder (mock)
- Select candidates → edit quantities → view projected savings and after-fee impact.
- Export a plan (CSV/PDF) and execution checklist.
- Track a cooling window (if applicable) before repurchasing.

Disclaimer: This is general information, not tax or legal advice. Consult a qualified professional for guidance specific to your situation.`

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content }])
    setLoading(true)
    try {
      await new Promise(r => setTimeout(r, 400))
      setMessages(prev => [...prev, { role: 'assistant', content: TLH_RESPONSE }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => sendMessage('Suggest a diversified crypto portfolio with low risk.')}>{t('ai.quick.investment')}</Button>
          <Button variant="outline" onClick={() => sendMessage('Format this CSV header for wallets: date,type,asset,amount,fee,tx_hash,note')}>{t('ai.quick.csv')}</Button>
          <Button variant="outline" onClick={() => sendMessage('Explain tax implications of staking rewards in Norway (not legal advice).')}>{t('ai.quick.tax')}</Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 h-[520px] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {messages.map((m, i) => (
            <div key={i} className={`${m.role === 'assistant' ? 'bg-gray-50 dark:bg-gray-700' : 'bg-blue-50 dark:bg-blue-900/40'} rounded-lg px-3 py-2 max-w-[85%] ${m.role === 'assistant' ? '' : 'ml-auto'}`}>
              <div className="text-xs mb-1 text-gray-500 dark:text-gray-400">{m.role === 'assistant' ? t('ai.assistant') : t('ai.you')}</div>
              <div className="text-sm text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{m.content}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Input
            placeholder={t('ai.placeholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
            className="flex-1"
          />
          <Button onClick={() => sendMessage()} disabled={loading}>{loading ? t('ai.sending') : t('ai.send')}</Button>
        </div>
      </div>
    </div>
  )
}

export default AiAssistant;
