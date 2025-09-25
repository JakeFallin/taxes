-- Kryptools Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Simplified USER TABLE
CREATE TABLE IF NOT EXISTS "user" (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    account_currency TEXT DEFAULT 'USD',
    default_tax_type TEXT DEFAULT 'FIFO',
    account_created_ts TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    -- Removed: friends, friend_requests, nft_list, totals, account_provider, account_type, account_region, subscription_level, transaction_limit, wallet_limit, timezone, first_time, beginning_tax_day, beginning_tax_month, lock_transactions_timestamp, treat_airdrops_as_income, treat_forks_as_income, treat_mining_as_income, dust_transaction_threshold, transer_as_deductible, cb_refund_zcd, team, phone_number, address_one, address_two, city, state, zip
);

-- Drop unused tables
DROP TABLE IF EXISTS account_totals;
DROP TABLE IF EXISTS tax_report;

-- Existing WALLET, ASSET, TRANSACTION tables remain (adapt if needed)

-- Add PRICE_HISTORY TABLE
CREATE TABLE IF NOT EXISTS price_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coin_name TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    price DECIMAL(20,8) NOT NULL,
    currency TEXT DEFAULT 'USD'
);

-- 2. WALLET TABLE
CREATE TABLE IF NOT EXISTS wallet (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES "user"(user_id) ON DELETE CASCADE,
    total_value DECIMAL(20,8) DEFAULT 0,
    total_transactions INTEGER DEFAULT 0,
    total_deposits INTEGER DEFAULT 0,
    total_withdrawls INTEGER DEFAULT 0,
    added_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_synced TIMESTAMP WITH TIME ZONE,
    auto_sync_enabled BOOLEAN DEFAULT TRUE,
    blockchain TEXT NOT NULL,
    network TEXT,
    nickname TEXT,
    description TEXT,
    balance DECIMAL(20,8) DEFAULT 0,
    transactions UUID[] DEFAULT '{}',
    address TEXT NOT NULL,
    start_import_from TIMESTAMP WITH TIME ZONE,
    wallet_type TEXT DEFAULT 'internal',
    is_archived BOOLEAN DEFAULT FALSE,
    most_recent_transaction TIMESTAMP WITH TIME ZONE,
    included_in_tax BOOLEAN DEFAULT TRUE
);

-- 4. ASSET TABLE
CREATE TABLE IF NOT EXISTS asset (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES "user"(user_id) ON DELETE CASCADE,
    coin_name TEXT NOT NULL,
    coin_rank INTEGER,
    coin_price DECIMAL(20,8),
    coin_market_cap DECIMAL(20,8),
    coin_amount DECIMAL(20,8) DEFAULT 0,
    total_value DECIMAL(20,8) DEFAULT 0,
    total_cost DECIMAL(20,8) DEFAULT 0,
    cost_unit DECIMAL(20,8) DEFAULT 0,
    total_roi DECIMAL(10,4) DEFAULT 0,
    gains DECIMAL(20,8) DEFAULT 0,
    allocation DECIMAL(5,2) DEFAULT 0,
    coinstamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TRANSACTION TABLE
CREATE TABLE IF NOT EXISTS transaction (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES "user"(user_id) ON DELETE CASCADE,
    wallet UUID REFERENCES wallet(id) ON DELETE CASCADE,
    transaction_sys_type TEXT DEFAULT 'Manual',
    transaction_type TEXT NOT NULL,
    transaction_date TIMESTAMP WITH TIME ZONE NOT NULL,
    transaction_added_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sent_or_recieved TEXT,
    contract TEXT,
    function TEXT,
    blockhain TEXT,
    currency TEXT NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    worth DECIMAL(20,8),
    gain DECIMAL(20,8) DEFAULT 0,
    transaction_hash TEXT,
    transaction_sender TEXT,
    transaction_destination TEXT,
    description TEXT,
    tag TEXT,
    included_in_tax BOOLEAN DEFAULT TRUE,
    warnings TEXT[]
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_email ON "user"(email);
CREATE INDEX IF NOT EXISTS idx_wallet_user_id ON wallet(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_address ON wallet(address);
CREATE INDEX IF NOT EXISTS idx_asset_user_id ON asset(user_id);
CREATE INDEX IF NOT EXISTS idx_asset_coin_name ON asset(coin_name);
CREATE INDEX IF NOT EXISTS idx_transaction_user_id ON transaction(user_id);
CREATE INDEX IF NOT EXISTS idx_transaction_wallet ON transaction(wallet);
CREATE INDEX IF NOT EXISTS idx_transaction_date ON transaction(transaction_date);
CREATE INDEX IF NOT EXISTS idx_price_history_coin_name ON price_history(coin_name);

-- Enable Row Level Security (RLS)
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- User can only access their own data
CREATE POLICY "Users can view own profile" ON "user" FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON "user" FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON "user" FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own wallets" ON wallet FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own wallets" ON wallet FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own wallets" ON wallet FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own wallets" ON wallet FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own assets" ON asset FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own assets" ON asset FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own assets" ON asset FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own assets" ON asset FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON transaction FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON transaction FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own transactions" ON transaction FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own transactions" ON transaction FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own price history" ON price_history FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own price history" ON price_history FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own price history" ON price_history FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own price history" ON price_history FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public."user" (user_id, email, account_created_ts)
  VALUES (new.id, new.email, NOW());
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
