import { useState, useEffect } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { walletService } from '@/lib/database'

export interface Wallet {
  id: string
  user_id: string
  total_value: number | null
  total_transactions: number | null
  total_deposits: number | null
  total_withdrawls: number | null
  added_timestamp: string | null
  last_synced: string | null
  auto_sync_enabled: boolean | null
  blockchain: string
  network: string | null
  nickname: string | null
  description: string | null
  balance: number | null
  transactions: string[] | null
  address: string
  start_import_from: string | null
  wallet_type: string | null
  is_archived: boolean | null
  most_recent_transaction: string | null
  included_in_tax: boolean | null
}

export function useWallets() {
  const { user } = useAuthContext()
  const [wallets, setWallets] = useState<Wallet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      loadWallets()
    } else {
      setWallets([])
      setLoading(false)
    }
  }, [user])

  const loadWallets = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError('')
      const userWallets = await walletService.getUserWallets(user.id)
      setWallets(userWallets)
    } catch (err) {
      setError('Failed to load wallets')
      console.error('Error loading wallets:', err)
    } finally {
      setLoading(false)
    }
  }

  const addWallet = async (walletData: {
    nickname: string
    address: string
    blockchain: string
    network?: string
    description?: string
  }) => {
    if (!user) throw new Error('User not authenticated')
    
    try {
      const newWallet = await walletService.addWallet({
        user_id: user.id,
        ...walletData
      })
      
      if (newWallet) {
        setWallets(prev => [...prev, newWallet])
      }
      
      return newWallet
    } catch (err) {
      console.error('Error adding wallet:', err)
      throw err
    }
  }

  const deleteWallet = async (walletId: string) => {
    try {
      await walletService.deleteWallet(walletId)
      setWallets(prev => prev.filter(wallet => wallet.id !== walletId))
    } catch (err) {
      console.error('Error deleting wallet:', err)
      throw err
    }
  }

  return {
    wallets,
    loading,
    error,
    addWallet,
    deleteWallet,
    refreshWallets: loadWallets
  }
}
