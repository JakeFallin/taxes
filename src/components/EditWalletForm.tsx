import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useWallets } from '@/hooks/useWallets'
import { Wallet, Edit } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface EditWalletFormProps {
  wallet: Wallet
  onClose: () => void
}

export function EditWalletForm({ wallet, onClose }: EditWalletFormProps) {
  const { t } = useLanguage()
  const [nickname, setNickname] = useState(wallet.nickname || '')
  const [description, setDescription] = useState(wallet.description || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { updateWallet } = useWallets()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await updateWallet(wallet.id, {
        nickname: nickname || null,
        description: description || null
      })
      onClose()
    } catch (err) {
      setError('Failed to update wallet. Please try again.')
      console.error('Error updating wallet:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="w-5 h-5" />
          {t('editWallet.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="address">{t('editWallet.address')}</Label>
            <Input
              id="address"
              value={wallet.address}
              disabled
              className="bg-gray-50 dark:bg-gray-700"
            />
            <p className="text-xs text-gray-500 mt-1">{t('editWallet.addressNote')}</p>
          </div>

          <div>
            <Label htmlFor="blockchain">{t('editWallet.blockchain')}</Label>
            <Input
              id="blockchain"
              value={wallet.blockchain}
              disabled
              className="bg-gray-50 dark:bg-gray-700"
            />
            <p className="text-xs text-gray-500 mt-1">{t('editWallet.blockchainNote')}</p>
          </div>

          <div>
            <Label htmlFor="nickname">{t('editWallet.walletName')}</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="My Ethereum Wallet"
            />
          </div>

          <div>
            <Label htmlFor="description">{t('editWallet.description')}</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Personal wallet for trading"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex gap-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? t('editWallet.updating') : t('editWallet.update')}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('editWallet.cancel')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
