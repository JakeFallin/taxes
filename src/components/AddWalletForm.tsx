import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useWallets } from '@/hooks/useWallets'
import { Wallet, ChevronDown } from 'lucide-react'
import { SUPPORTED_BLOCKCHAINS, BlockchainType, validateBlockchainAddress } from '@/lib/blockchain'
import { useLanguage } from '@/contexts/LanguageContext'

interface AddWalletFormProps {
  onClose: () => void
}

export function AddWalletForm({ onClose }: AddWalletFormProps) {
  const { t } = useLanguage()
  const [nickname, setNickname] = useState('')
  const [address, setAddress] = useState('')
  const [blockchainType, setBlockchainType] = useState<BlockchainType>('ETHEREUM')
  const [network, setNetwork] = useState('mainnet')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [addressError, setAddressError] = useState('')

  const { addWallet } = useWallets()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setAddressError('')

    // Validate address format
    if (!validateBlockchainAddress(blockchainType, address)) {
      const blockchainInfo = SUPPORTED_BLOCKCHAINS[blockchainType]
      setAddressError(`Invalid ${blockchainInfo.name} address format`)
      setLoading(false)
      return
    }

    try {
      await addWallet({
        nickname,
        address,
        blockchain: SUPPORTED_BLOCKCHAINS[blockchainType].name,
        network,
        description
      })
      onClose()
    } catch (err) {
      setError('Failed to add wallet. Please try again.')
      console.error('Error adding wallet:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddressChange = (value: string) => {
    setAddress(value)
    setAddressError('')
    
    // Real-time address validation
    if (value && !validateBlockchainAddress(blockchainType, value)) {
      const blockchainInfo = SUPPORTED_BLOCKCHAINS[blockchainType]
      setAddressError(`Invalid ${blockchainInfo.name} address format`)
    }
  }

  const handleBlockchainChange = (value: BlockchainType) => {
    setBlockchainType(value)
    setNetwork(SUPPORTED_BLOCKCHAINS[value].defaultNetwork)
    setAddress('')
    setAddressError('')
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          {t('addWallet.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nickname">{t('addWallet.walletName')}</Label>
            <Input
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="My Ethereum Wallet"
              required
            />
          </div>

          <div>
            <Label htmlFor="blockchain">{t('addWallet.blockchain')}</Label>
            <Select value={blockchainType} onValueChange={handleBlockchainChange} required>
              <SelectTrigger>
                <SelectValue placeholder={t('addWallet.selectBlockchain')} />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SUPPORTED_BLOCKCHAINS).map(([key, info]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <span>{info.currency}</span>
                      <span className="text-gray-500">-</span>
                      <span>{info.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="network">{t('addWallet.network')}</Label>
            <Select value={network} onValueChange={setNetwork} required>
              <SelectTrigger>
                <SelectValue placeholder={t('addWallet.selectNetwork')} />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_BLOCKCHAINS[blockchainType].networks.map((net) => (
                  <SelectItem key={net} value={net}>
                    {net.charAt(0).toUpperCase() + net.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="address">{t('addWallet.address')}</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
              placeholder={SUPPORTED_BLOCKCHAINS[blockchainType].addressPrefix === '0x' ? '0x...' : '1... or 3... or bc1...'}
              required
            />
            {addressError && (
              <p className="text-sm text-red-600 mt-1">{addressError}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">{t('addWallet.description')}</Label>
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
              {loading ? t('addWallet.adding') : t('addWallet.add')}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('addWallet.cancel')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
