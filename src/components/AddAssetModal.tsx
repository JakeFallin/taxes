import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'

export interface AssetItem {
  id: string
  name: string
  type: 'NFT' | 'Token' | 'Custom'
  network: string
  quantity: number
  valueNok: number
  imageUrl?: string
}

export function AddAssetModal({ isOpen, onClose, onAdd }: { isOpen: boolean; onClose: () => void; onAdd: (asset: AssetItem) => void }) {
  const { t } = useLanguage()
  const [name, setName] = useState('')
  const [type, setType] = useState<'NFT' | 'Token' | 'Custom'>('NFT')
  const [network, setNetwork] = useState('Ethereum')
  const [quantity, setQuantity] = useState('1')
  const [valueNok, setValueNok] = useState('0')
  const [imageUrl, setImageUrl] = useState('')

  if (!isOpen) return null

  const save = () => {
    onAdd({
      id: Math.random().toString(36).slice(2),
      name,
      type,
      network,
      quantity: parseFloat(quantity || '0'),
      valueNok: parseFloat(valueNok || '0'),
      imageUrl: imageUrl || undefined,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>{t('assets.add.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>{t('assets.name')}</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t('assets.type')}</Label>
                <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 px-3 py-2">
                  <option value="NFT">{t('assets.nft')}</option>
                  <option value="Token">{t('assets.token')}</option>
                  <option value="Custom">{t('assets.custom')}</option>
                </select>
              </div>
              <div>
                <Label>{t('assets.network')}</Label>
                <Input value={network} onChange={(e) => setNetwork(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t('assets.quantity')}</Label>
                <Input value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" />
              </div>
              <div>
                <Label>{t('assets.value')}</Label>
                <Input value={valueNok} onChange={(e) => setValueNok(e.target.value)} type="number" />
              </div>
            </div>
            <div>
              <Label>{t('assets.imageUrl')}</Label>
              <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={onClose}>{t('common.cancel')}</Button>
              <Button onClick={save}>{t('assets.save')}</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


