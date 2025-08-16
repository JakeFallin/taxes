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
    { role: 'assistant', content: 'Hi! I can help with crypto investment ideas, formatting CSVs for import, and more. What do you need?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content }])
    setLoading(true)
    try {
      // Placeholder assistant echo; integrate real AI backend later
      await new Promise(r => setTimeout(r, 500))
      setMessages(prev => [...prev, { role: 'assistant', content: `Got it. (demo reply) → ${content}` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('ai.title')}</h1>
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
