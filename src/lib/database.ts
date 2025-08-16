import { supabase } from './supabase'
import { BlockchainServiceFactory } from './blockchainFactory'
import { BlockchainType } from './blockchain'

// Database service functions
export const databaseService = {
  // Get all tables in the database by testing each one
  async getTables() {
    const knownTables = ['user', 'account_totals', 'wallet', 'asset', 'transaction', 'tax_report']
    const existingTables: string[] = []
    
    for (const tableName of knownTables) {
      try {
        const { error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1)
        
        if (!error) {
          existingTables.push(tableName)
        }
      } catch (err) {
        console.log(`Table ${tableName} does not exist`)
      }
    }
    
    return existingTables
  },

  // Get table structure by trying to query the table
  async getTableStructure(tableName: string) {
    try {
      // Try to get one row to see the structure
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1)
      
      if (error) {
        console.error(`Error fetching structure for ${tableName}:`, error)
        return []
      }
      
      // If we get data, return the column names
      if (data && data.length > 0) {
        const columns = Object.keys(data[0]).map(key => ({
          column_name: key,
          data_type: 'unknown',
          is_nullable: 'YES',
          column_default: null
        }))
        return columns
      }
      
      return []
    } catch (err) {
      console.error(`Error fetching structure for ${tableName}:`, err)
      return []
    }
  },

  // Get sample data from a table
  async getSampleData(tableName: string, limit = 5) {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(limit)
    
    if (error) {
      console.error(`Error fetching sample data from ${tableName}:`, error)
      return []
    }
    
    return data || []
  }
}

// Wallet management functions
export const walletService = {
  async getUserWallets(userId: string) {
    const { data, error } = await supabase
      .from('wallet')
      .select('*')
      .eq('user_id', userId)
      .eq('is_archived', false)
    
    if (error) {
      console.error('Error fetching user wallets:', error)
      return []
    }
    
    return data || []
  },

  async addWallet(wallet: {
    user_id: string
    nickname: string
    address: string
    blockchain: string
    network?: string
    description?: string
  }) {
    // First ensure user profile exists
    const { data: userData } = await supabase.auth.getUser()
    if (userData?.user?.email) {
      await userService.ensureUserProfile(wallet.user_id, userData.user.email)
    }
    
    try {
      // Determine blockchain type from blockchain name
      const blockchainType = this.getBlockchainTypeFromName(wallet.blockchain)
      const blockchainService = BlockchainServiceFactory.getService(blockchainType)
      
      // Get initial balance and transaction count
      console.log('🔍 Fetching initial data for new wallet:', wallet.address)
      console.log('🔗 Using blockchain service:', blockchainService.getServiceInfo().name)
      
      const balance = await blockchainService.getWalletBalance(wallet.address)
      const transactions = await blockchainService.getWalletTransactions(wallet.address)
      
      const currency = blockchainService.getServiceInfo().currency
      console.log(`💰 Initial balance: ${balance} ${currency}`)
      console.log(`📊 Initial transactions: ${transactions.length}`)
      
      // Insert wallet with initial data
      const { data, error } = await supabase
        .from('wallet')
        .insert({
          user_id: wallet.user_id,
          nickname: wallet.nickname,
          address: wallet.address,
          blockchain: wallet.blockchain,
          network: wallet.network,
          description: wallet.description,
          balance: parseFloat(balance),
          total_transactions: transactions.length,
          added_timestamp: new Date().toISOString(),
          last_synced: new Date().toISOString()
        })
        .select()
      
      if (error) {
        console.error('Error adding wallet:', error)
        throw error
      }
      
      console.log('✅ Wallet added successfully with initial data')
      return data?.[0]
    } catch (error) {
      console.error('Error adding wallet with blockchain data:', error)
      throw error
    }
  },

  // Helper function to determine blockchain type from name
  getBlockchainTypeFromName(blockchainName: string): BlockchainType {
    const name = blockchainName.toLowerCase()
    if (name.includes('ethereum')) return 'ETHEREUM'
    if (name.includes('bitcoin')) return 'BITCOIN'
    if (name.includes('polygon')) return 'POLYGON'
    if (name.includes('binance')) return 'BINANCE_SMART_CHAIN'
    return 'ETHEREUM' // Default fallback
  },

  async deleteWallet(walletId: string) {
    const { error } = await supabase
      .from('wallet')
      .update({ is_archived: true })
      .eq('id', walletId)
    
    if (error) {
      console.error('Error archiving wallet:', error)
      throw error
    }
  },

  async updateWallet(walletId: string, updates: {
    nickname?: string
    description?: string
    auto_sync_enabled?: boolean
    included_in_tax?: boolean
  }) {
    const { data, error } = await supabase
      .from('wallet')
      .update(updates)
      .eq('id', walletId)
      .select()
    
    if (error) {
      console.error('Error updating wallet:', error)
      throw error
    }
    
    return data?.[0]
  },

  async syncWallet(walletId: string) {
    // Get wallet details
    const { data: wallet, error: walletError } = await supabase
      .from('wallet')
      .select('*')
      .eq('id', walletId)
      .single()
    
    if (walletError || !wallet) {
      throw new Error('Wallet not found')
    }

    try {
      console.log('🔄 Syncing wallet:', wallet.address)
      
      // Determine blockchain type and get appropriate service
      const blockchainType = this.getBlockchainTypeFromName(wallet.blockchain)
      const blockchainService = BlockchainServiceFactory.getService(blockchainType)
      
      console.log('🔗 Using blockchain service:', blockchainService.getServiceInfo().name)
      
      // Fetch latest balance
      const balance = await blockchainService.getWalletBalance(wallet.address)
      const currency = blockchainService.getServiceInfo().currency
      console.log(`💰 Latest balance: ${balance} ${currency}`)
      
      // Update wallet with new balance
      const { data: updatedWallet, error: updateError } = await supabase
        .from('wallet')
        .update({
          balance: parseFloat(balance),
          last_synced: new Date().toISOString()
        })
        .eq('id', walletId)
        .select()
        .single()
      
      if (updateError) {
        console.error('❌ Error updating wallet:', updateError)
        throw updateError
      }
      
      console.log('✅ Wallet synced successfully')
      return updatedWallet
    } catch (error) {
      console.error('Error syncing wallet:', error)
      throw error
    }
  }
}

// User management functions
export const userService = {
  async ensureUserProfile(userId: string, email: string) {
    // Check if user profile exists
    const { data: existingUser, error: checkError } = await supabase
      .from('user')
      .select('user_id')
      .eq('user_id', userId)
      .single()
    
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking user profile:', checkError)
      return null
    }
    
    // If user doesn't exist, create profile
    if (!existingUser) {
      const { data: newUser, error: createError } = await supabase
        .from('user')
        .insert({
          user_id: userId,
          email: email,
          account_created_ts: new Date().toISOString()
        })
        .select()
        .single()
      
      if (createError) {
        console.error('Error creating user profile:', createError)
        return null
      }
      
      return newUser
    }
    
    return existingUser
  }
}

// Transaction management functions
export const transactionService = {
  async getUserTransactions(userId: string) {
    const { data, error } = await supabase
      .from('transaction')
      .select(`
        *,
        wallet:wallet(nickname, address, blockchain)
      `)
      .eq('user_id', userId)
      .order('transaction_date', { ascending: false })
    
    if (error) {
      console.error('Error fetching user transactions:', error)
      return []
    }
    
    return data || []
  },

  async addTransaction(transaction: {
    user_id: string
    wallet: string
    transaction_type: string
    transaction_date: string
    currency: string
    amount: number
    worth?: number
    description?: string
    tag?: string
  }) {
    const { data, error } = await supabase
      .from('transaction')
      .insert({
        ...transaction,
        transaction_added_date: new Date().toISOString()
      })
      .select()
    
    if (error) {
      console.error('Error adding transaction:', error)
      throw error
    }
    
    return data?.[0]
  },

  async getPortfolioSummary(userId: string) {
    const { data, error } = await supabase
      .from('asset')
      .select('coin_name, coin_amount, total_value, total_cost')
      .eq('user_id', userId)
    
    if (error) {
      console.error('Error fetching portfolio summary:', error)
      return {}
    }
    
    // Calculate portfolio summary from assets
    const summary: Record<string, { amount: number; totalValue: number; totalCost: number }> = {}
    
    data?.forEach(asset => {
      summary[asset.coin_name] = {
        amount: asset.coin_amount || 0,
        totalValue: asset.total_value || 0,
        totalCost: asset.total_cost || 0
      }
    })
    
    return summary
  },

  async getAccountTotals(userId: string) {
    const { data, error } = await supabase
      .from('account_totals')
      .select('*')
      .eq('user_id', userId)
      .order('account_total_timestamp', { ascending: false })
      .limit(1)
    
    if (error) {
      console.error('Error fetching account totals:', error)
      return null
    }
    
    return data?.[0] || null
  }
}
