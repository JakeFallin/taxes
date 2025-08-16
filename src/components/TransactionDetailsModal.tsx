import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { X, Trash2, Info } from 'lucide-react'

export type TransactionRow = {
  id: string
  category: string
  sent: string
  received: string
  fee: string
  value: string
  gainLoss: string
  date: string
  time: string
  wallet: string
  name?: string
  note?: string
  txHash?: string
}

interface TransactionDetailsModalProps {
  isOpen: boolean
  transaction: TransactionRow | null
  onClose: () => void
  onSave: (id: string, updates: Partial<Pick<TransactionRow, 'name' | 'note'>>) => void
  onDelete: (id: string) => void
}

export function TransactionDetailsModal({ isOpen, transaction, onClose, onSave, onDelete }: TransactionDetailsModalProps) {
  const [name, setName] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    setName(transaction?.name || '')
    setNote(transaction?.note || '')
  }, [transaction])

  if (!isOpen || !transaction) return null

  const handleSave = () => {
    onSave(transaction.id, { name, note })
    onClose()
  }

  const handleDelete = () => {
    onDelete(transaction.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">Edit Transaction</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="destructive" size="sm" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-xs text-gray-500">Category</Label>
              <div className="text-sm font-medium">{transaction.category}</div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Wallet</Label>
              <div className="text-sm font-medium">{transaction.wallet}</div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Date</Label>
              <div className="text-sm font-medium">{transaction.date}</div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Time</Label>
              <div className="text-sm font-medium">{transaction.time}</div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Sent</Label>
              <div className="text-sm font-medium">{transaction.sent}</div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Received</Label>
              <div className="text-sm font-medium">{transaction.received}</div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Fee</Label>
              <div className="text-sm font-medium">{transaction.fee}</div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Value</Label>
              <div className="text-sm font-medium">{transaction.value}</div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Gain / Loss</Label>
              <div className="text-sm font-medium">{transaction.gainLoss}</div>
            </div>
            {transaction.txHash && (
              <div className="col-span-2">
                <Label className="text-xs text-gray-500 flex items-center gap-1">
                  <Info className="w-3 h-3" /> Tx Hash
                </Label>
                <div className="text-sm font-mono break-all">{transaction.txHash}</div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tx-name">Custom name</Label>
              <Input id="tx-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Payment to John" />
            </div>
            <div>
              <Label htmlFor="tx-note">Note</Label>
              <Input id="tx-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add an internal note" />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


