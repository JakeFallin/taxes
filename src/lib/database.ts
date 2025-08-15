import { supabase } from './supabase'

// Database service functions
export const databaseService = {
  // Get all tables in the database
  async getTables() {
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
    
    if (error) {
      console.error('Error fetching tables:', error)
      return []
    }
    
    return data?.map(row => row.table_name) || []
  },

  // Get table structure
  async getTableStructure(tableName: string) {
    const { data, error } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable, column_default')
      .eq('table_schema', 'public')
      .eq('table_name', tableName)
      .order('ordinal_position')
    
    if (error) {
      console.error(`Error fetching structure for ${tableName}:`, error)
      return []
    }
    
    return data || []
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
    const { data, error } = await supabase
      .from('wallet')
      .insert({
        user_id: wallet.user_id,
        nickname: wallet.nickname,
        address: wallet.address,
        blockchain: wallet.blockchain,
        network: wallet.network,
        description: wallet.description,
        added_timestamp: new Date().toISOString()
      })
      .select()
    
    if (error) {
      console.error('Error adding wallet:', error)
      throw error
    }
    
    return data?.[0]
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
