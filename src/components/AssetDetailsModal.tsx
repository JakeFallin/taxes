import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'
import type { AssetItem } from './AddAssetModal'

export function AssetDetailsModal({ isOpen, asset, onClose, onDelete }: { isOpen: boolean; asset: AssetItem | null; onClose: () => void; onDelete: (id: string) => void }) {
  const { t } = useLanguage()
  if (!isOpen || !asset) return null
  const handleDelete = () => {
    if (confirm(t('assets.deleteConfirm'))) {
      onDelete(asset.id)
      onClose()
    }
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{asset.name}</CardTitle>
          <div className="flex gap-2">
            <Button variant="destructive" onClick={handleDelete}>{t('assets.delete')}</Button>
            <Button variant="outline" onClick={onClose}>{t('common.cancel')}</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            {asset.imageUrl && (
              <img src={asset.imageUrl} alt={asset.name} className="w-full h-40 object-cover rounded-md" />
            )}
            <div className="flex justify-between"><span className="text-gray-500">{t('assets.type')}</span><span>{asset.type}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">{t('assets.network')}</span><span>{asset.network}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">{t('assets.quantity')}</span><span>{asset.quantity}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">{t('assets.value')}</span><span>NOK {asset.valueNok.toLocaleString()}</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


