import { useState, useEffect } from 'react'
import { useAuthContext } from '@/contexts/AuthContext'
import { transactionService, userService } from '@/lib/database'

export interface Transaction {
  id: string
  user_id: string
  wallet: string
  transaction_sys_type: string | null
  transaction_type: string
  transaction_date: string
  transaction_added_date: string | null
  sent_or_recieved: string | null
  contract: string | null
  function: string | null
  blockhain: string | null
  currency: string
  amount: number
  worth: number | null
  gain: number | null
  transaction_hash: string | null
  transaction_sender: string | null
  transaction_destination: string | null
  description: string | null
  tag: string | null
  included_in_tax: boolean | null
  warnings: string[] | null
  wallet_info?: {
    nickname: string
    address: string
    blockchain: string
  }
}

export interface PortfolioSummary {
  [asset: string]: {
    amount: number
    totalValue: number
    totalCost: number
  }
}

export function useTransactions() {
  const { user } = useAuthContext()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      loadTransactions()
      loadPortfolioSummary()
    } else {
      setTransactions([])
      setPortfolioSummary({})
      setLoading(false)
    }
  }, [user])

  const loadTransactions = async () => {
    if (!user) return
    
    try {
      setLoading(true)
      setError('')
      
      // Ensure user profile exists first
      await userService.ensureUserProfile(user.id, user.email || '')
      
      const userTransactions = await transactionService.getUserTransactions(user.id)
      setTransactions(userTransactions)
    } catch (err) {
      setError('Failed to load transactions')
      console.error('Error loading transactions:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadPortfolioSummary = async () => {
    if (!user) return
    
    try {
      const summary = await transactionService.getPortfolioSummary(user.id)
      setPortfolioSummary(summary)
    } catch (err) {
      console.error('Error loading portfolio summary:', err)
    }
  }

  const addTransaction = async (transactionData: {
    wallet: string
    transaction_type: string
    transaction_date: string
    currency: string
    amount: number
    worth?: number
    description?: string
    tag?: string
  }) => {
    if (!user) throw new Error('User not authenticated')
    
    try {
      const newTransaction = await transactionService.addTransaction({
        user_id: user.id,
        ...transactionData
      })
      
      if (newTransaction) {
        setTransactions(prev => [newTransaction, ...prev])
        // Refresh portfolio summary
        await loadPortfolioSummary()
      }
      
      return newTransaction
    } catch (err) {
      console.error('Error adding transaction:', err)
      throw err
    }
  }

  const getTotalPortfolioValue = () => {
    return Object.values(portfolioSummary).reduce((total, asset) => {
      return total + asset.totalValue
    }, 0)
  }

  const getAssetCount = () => {
    return Object.keys(portfolioSummary).length
  }

  return {
    transactions,
    portfolioSummary,
    loading,
    error,
    addTransaction,
    refreshTransactions: loadTransactions,
    refreshPortfolio: loadPortfolioSummary,
    getTotalPortfolioValue,
    getAssetCount
  }
}
