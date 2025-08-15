import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock Supabase client if environment variables are missing
// This allows the app to run without Supabase for development
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables not found. Authentication will not work until you configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env.local file.')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async () => ({ error: { message: 'Supabase not configured' } }),
        signUp: async () => ({ error: { message: 'Supabase not configured' } }),
        signOut: async () => ({ error: null }),
        resetPasswordForEmail: async () => ({ error: { message: 'Supabase not configured' } }),
      },
    } as any

// Database types matching your actual schema
export interface Database {
  public: {
    Tables: {
      user: {
        Row: {
          user_id: string
          first_name: string | null
          last_name: string | null
          nickname: string | null
          friends: string[] | null
          friend_requests: string[] | null
          email: string
          wallets: string[] | null
          nft_list: string[] | null
          totals: string[] | null
          account_provider: string | null
          account_type: string | null
          account_currency: string | null
          account_region: string | null
          subscription_level: string | null
          transaction_limit: number | null
          wallet_limit: number | null
          timezone: string | null
          default_tax_type: string | null
          account_created_ts: string | null
          first_time: boolean | null
          beginning_tax_day: number | null
          beginning_tax_month: number | null
          lock_transactions_timestamp: string | null
          treat_airdrops_as_income: boolean | null
          treat_forks_as_income: boolean | null
          treat_mining_as_income: boolean | null
          dust_transaction_threshold: number | null
          transer_as_deductible: boolean | null
          cb_refund_zcd: boolean | null
          team: string[] | null
          phone_number: string | null
          address_one: string | null
          address_two: string | null
          city: string | null
          state: string | null
          zip: string | null
        }
        Insert: {
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          nickname?: string | null
          friends?: string[] | null
          friend_requests?: string[] | null
          email: string
          wallets?: string[] | null
          nft_list?: string[] | null
          totals?: string[] | null
          account_provider?: string | null
          account_type?: string | null
          account_currency?: string | null
          account_region?: string | null
          subscription_level?: string | null
          transaction_limit?: number | null
          wallet_limit?: number | null
          timezone?: string | null
          default_tax_type?: string | null
          account_created_ts?: string | null
          first_time?: boolean | null
          beginning_tax_day?: number | null
          beginning_tax_month?: number | null
          lock_transactions_timestamp?: string | null
          treat_airdrops_as_income?: boolean | null
          treat_forks_as_income?: boolean | null
          treat_mining_as_income?: boolean | null
          dust_transaction_threshold?: number | null
          transer_as_deductible?: boolean | null
          cb_refund_zcd?: boolean | null
          team?: string[] | null
          phone_number?: string | null
          address_one?: string | null
          address_two?: string | null
          city?: string | null
          state?: string | null
          zip?: string | null
        }
        Update: {
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          nickname?: string | null
          friends?: string[] | null
          friend_requests?: string[] | null
          email?: string
          wallets?: string[] | null
          nft_list?: string[] | null
          totals?: string[] | null
          account_provider?: string | null
          account_type?: string | null
          account_currency?: string | null
          account_region?: string | null
          subscription_level?: string | null
          transaction_limit?: number | null
          wallet_limit?: number | null
          timezone?: string | null
          default_tax_type?: string | null
          account_created_ts?: string | null
          first_time?: boolean | null
          beginning_tax_day?: number | null
          beginning_tax_month?: number | null
          lock_transactions_timestamp?: string | null
          treat_airdrops_as_income?: boolean | null
          treat_forks_as_income?: boolean | null
          treat_mining_as_income?: boolean | null
          dust_transaction_threshold?: number | null
          transer_as_deductible?: boolean | null
          cb_refund_zcd?: boolean | null
          team?: string[] | null
          phone_number?: string | null
          address_one?: string | null
          address_two?: string | null
          city?: string | null
          state?: string | null
          zip?: string | null
        }
      }
      wallet: {
        Row: {
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
        Insert: {
          id?: string
          user_id: string
          total_value?: number | null
          total_transactions?: number | null
          total_deposits?: number | null
          total_withdrawls?: number | null
          added_timestamp?: string | null
          last_synced?: string | null
          auto_sync_enabled?: boolean | null
          blockchain: string
          network?: string | null
          nickname?: string | null
          description?: string | null
          balance?: number | null
          transactions?: string[] | null
          address: string
          start_import_from?: string | null
          wallet_type?: string | null
          is_archived?: boolean | null
          most_recent_transaction?: string | null
          included_in_tax?: boolean | null
        }
        Update: {
          id?: string
          user_id?: string
          total_value?: number | null
          total_transactions?: number | null
          total_deposits?: number | null
          total_withdrawls?: number | null
          added_timestamp?: string | null
          last_synced?: string | null
          auto_sync_enabled?: boolean | null
          blockchain?: string
          network?: string | null
          nickname?: string | null
          description?: string | null
          balance?: number | null
          transactions?: string[] | null
          address?: string
          start_import_from?: string | null
          wallet_type?: string | null
          is_archived?: boolean | null
          most_recent_transaction?: string | null
          included_in_tax?: boolean | null
        }
      }
      transaction: {
        Row: {
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
        }
        Insert: {
          id?: string
          user_id: string
          wallet: string
          transaction_sys_type?: string | null
          transaction_type: string
          transaction_date: string
          transaction_added_date?: string | null
          sent_or_recieved?: string | null
          contract?: string | null
          function?: string | null
          blockhain?: string | null
          currency: string
          amount: number
          worth?: number | null
          gain?: number | null
          transaction_hash?: string | null
          transaction_sender?: string | null
          transaction_destination?: string | null
          description?: string | null
          tag?: string | null
          included_in_tax?: boolean | null
          warnings?: string[] | null
        }
        Update: {
          id?: string
          user_id?: string
          wallet?: string
          transaction_sys_type?: string | null
          transaction_type?: string
          transaction_date?: string
          transaction_added_date?: string | null
          sent_or_recieved?: string | null
          contract?: string | null
          function?: string | null
          blockhain?: string | null
          currency?: string
          amount?: number
          worth?: number | null
          gain?: number | null
          transaction_hash?: string | null
          transaction_sender?: string | null
          transaction_destination?: string | null
          description?: string | null
          tag?: string | null
          included_in_tax?: boolean | null
          warnings?: string[] | null
        }
      }
      asset: {
        Row: {
          id: string
          user_id: string
          coin_name: string
          coin_rank: number | null
          coin_price: number | null
          coin_market_cap: number | null
          coin_amount: number | null
          total_value: number | null
          total_cost: number | null
          cost_unit: number | null
          total_roi: number | null
          gains: number | null
          allocation: number | null
          coinstamp: string | null
        }
        Insert: {
          id?: string
          user_id: string
          coin_name: string
          coin_rank?: number | null
          coin_price?: number | null
          coin_market_cap?: number | null
          coin_amount?: number | null
          total_value?: number | null
          total_cost?: number | null
          cost_unit?: number | null
          total_roi?: number | null
          gains?: number | null
          allocation?: number | null
          coinstamp?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          coin_name?: string
          coin_rank?: number | null
          coin_price?: number | null
          coin_market_cap?: number | null
          coin_amount?: number | null
          total_value?: number | null
          total_cost?: number | null
          cost_unit?: number | null
          total_roi?: number | null
          gains?: number | null
          allocation?: number | null
          coinstamp?: string | null
        }
      }
      account_totals: {
        Row: {
          id: string
          user_id: string
          account_total_timestamp: string | null
          account_connected_wallets: string[] | null
          account_connected_nfts: string[] | null
          account_total_value: number | null
          account_cost_basis: number | null
          account_unrealized_gains: number | null
          account_value_in: number | null
          account_value_out: number | null
          account_income: number | null
          account_expenses: number | null
          account_trading_fees: number | null
          realized_gains: number | null
        }
        Insert: {
          id?: string
          user_id: string
          account_total_timestamp?: string | null
          account_connected_wallets?: string[] | null
          account_connected_nfts?: string[] | null
          account_total_value?: number | null
          account_cost_basis?: number | null
          account_unrealized_gains?: number | null
          account_value_in?: number | null
          account_value_out?: number | null
          account_income?: number | null
          account_expenses?: number | null
          account_trading_fees?: number | null
          realized_gains?: number | null
        }
        Update: {
          id?: string
          user_id?: string
          account_total_timestamp?: string | null
          account_connected_wallets?: string[] | null
          account_connected_nfts?: string[] | null
          account_total_value?: number | null
          account_cost_basis?: number | null
          account_unrealized_gains?: number | null
          account_value_in?: number | null
          account_value_out?: number | null
          account_income?: number | null
          account_expenses?: number | null
          account_trading_fees?: number | null
          realized_gains?: number | null
        }
      }
      tax_report: {
        Row: {
          id: string
          user_id: string
          year: number
          transactions_amount: number | null
          total_deposits: number | null
          total_withdrawls: number | null
          total_trades: number | null
          total_transfers: number | null
          capital_gains: number | null
          other_gains: number | null
          income: number | null
          costs: number | null
          gifts: number | null
          country: string | null
          currency: string | null
          tax_method: string | null
          cost_tracking_method: string | null
          report_begin: string | null
          report_end: string | null
        }
        Insert: {
          id?: string
          user_id: string
          year: number
          transactions_amount?: number | null
          total_deposits?: number | null
          total_withdrawls?: number | null
          total_trades?: number | null
          total_transfers?: number | null
          capital_gains?: number | null
          other_gains?: number | null
          income?: number | null
          costs?: number | null
          gifts?: number | null
          country?: string | null
          currency?: string | null
          tax_method?: string | null
          cost_tracking_method?: string | null
          report_begin?: string | null
          report_end?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          year?: number
          transactions_amount?: number | null
          total_deposits?: number | null
          total_withdrawls?: number | null
          total_trades?: number | null
          total_transfers?: number | null
          capital_gains?: number | null
          other_gains?: number | null
          income?: number | null
          costs?: number | null
          gifts?: number | null
          country?: string | null
          currency?: string | null
          tax_method?: string | null
          cost_tracking_method?: string | null
          report_begin?: string | null
          report_end?: string | null
        }
      }
    }
  }
}
