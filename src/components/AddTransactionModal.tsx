import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTransactions } from '@/hooks/useTransactions'
import { useWallets } from '@/hooks/useWallets'
import { Receipt, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddTransactionModal({ isOpen, onClose }: AddTransactionModalProps) {
  console.log('🔍 AddTransactionModal rendered with isOpen:', isOpen)
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { t } = useLanguage()
  
  // Form state
  const [walletId, setWalletId] = useState('')
  const [transactionType, setTransactionType] = useState('')
  const [transactionDate, setTransactionDate] = useState('')
  const [currency, setCurrency] = useState('ETH')
  const [amount, setAmount] = useState('')
  const [worth, setWorth] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')

  const { addTransaction } = useTransactions()
  const { wallets } = useWallets()

  // Set default date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setTransactionDate(today)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!walletId || !transactionType || !transactionDate || !currency || !amount) {
        throw new Error('Please fill in all required fields')
      }

      await addTransaction({
        wallet: walletId,
        transaction_type: transactionType,
        transaction_date: transactionDate,
        currency: currency,
        amount: parseFloat(amount),
        worth: worth ? parseFloat(worth) : undefined,
        description: description || undefined,
        tag: tag || undefined
      })

      // Reset form
      setWalletId('')
      setTransactionType('')
      setTransactionDate('')
      setCurrency('ETH')
      setAmount('')
      setWorth('')
      setDescription('')
      setTag('')
      
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add transaction')
      console.error('Error adding transaction:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            {t('tx.add.title')}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Wallet Selection */}
            <div>
              <Label htmlFor="wallet">{t('tx.wallet')}</Label>
              <Select value={walletId} onValueChange={setWalletId} required>
                <SelectTrigger>
                  <SelectValue placeholder={t('tx.wallet.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {wallets.map((wallet) => (
                    <SelectItem key={wallet.id} value={wallet.id}>
                      {wallet.nickname || wallet.address.slice(0, 8) + '...'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Transaction Type */}
            <div>
              <Label htmlFor="transactionType">{t('tx.type')}</Label>
              <Select value={transactionType} onValueChange={setTransactionType} required>
                <SelectTrigger>
                  <SelectValue placeholder={t('tx.type.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buy">Buy</SelectItem>
                  <SelectItem value="sell">Sell</SelectItem>
                  <SelectItem value="transfer_in">Transfer In</SelectItem>
                  <SelectItem value="transfer_out">Transfer Out</SelectItem>
                  <SelectItem value="airdrop">Airdrop</SelectItem>
                  <SelectItem value="mining">Mining</SelectItem>
                  <SelectItem value="staking">Staking</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date and Currency Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="transactionDate">{t('tx.date')}</Label>
                <Input
                  id="transactionDate"
                  type="date"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="currency">{t('tx.currency')}</Label>
                <Select value={currency} onValueChange={setCurrency} required>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="BTC">BTC</SelectItem>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="DAI">DAI</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amount and Worth Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">{t('tx.amount')}</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.00000001"
                  placeholder="0.00000000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="worth">{t('tx.worth')}</Label>
                <Input
                  id="worth"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={worth}
                  onChange={(e) => setWorth(e.target.value)}
                />
              </div>
            </div>

            {/* Description and Tag Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="description">{t('tx.description')}</Label>
                <Input
                  id="description"
                  placeholder={t('tx.description.placeholder')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="tag">{t('tx.tag')}</Label>
                <Input
                  id="tag"
                  placeholder={t('tx.tag.placeholder')}
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? t('tx.adding') : t('tx.add')}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                {t('tx.cancel')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
