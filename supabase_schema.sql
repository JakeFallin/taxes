-- Kryptools Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USER TABLE
CREATE TABLE IF NOT EXISTS "user" (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT,
    last_name TEXT,
    nickname TEXT,
    friends UUID[] DEFAULT '{}',
    friend_requests UUID[] DEFAULT '{}',
    email TEXT UNIQUE NOT NULL,
    wallets UUID[] DEFAULT '{}',
    nft_list UUID[] DEFAULT '{}',
    totals UUID[] DEFAULT '{}',
    account_provider TEXT DEFAULT 'email',
    account_type TEXT DEFAULT 'individual',
    account_currency TEXT DEFAULT 'USD',
    account_region TEXT,
    subscription_level TEXT DEFAULT 'free',
    transaction_limit INTEGER DEFAULT 1000,
    wallet_limit INTEGER DEFAULT 10,
    timezone TEXT DEFAULT 'UTC',
    default_tax_type TEXT DEFAULT 'FIFO',
    account_created_ts TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    first_time BOOLEAN DEFAULT TRUE,
    beginning_tax_day INTEGER DEFAULT 1,
    beginning_tax_month INTEGER DEFAULT 1,
    lock_transactions_timestamp TIMESTAMP WITH TIME ZONE,
    treat_airdrops_as_income BOOLEAN DEFAULT TRUE,
    treat_forks_as_income BOOLEAN DEFAULT TRUE,
    treat_mining_as_income BOOLEAN DEFAULT TRUE,
    dust_transaction_threshold DECIMAL(10,2) DEFAULT 1.00,
    transer_as_deductible BOOLEAN DEFAULT FALSE,
    cb_refund_zcd BOOLEAN DEFAULT FALSE,
    team UUID[] DEFAULT '{}',
    phone_number TEXT,
    address_one TEXT,
    address_two TEXT,
    city TEXT,
    state TEXT,
    zip TEXT
);

-- 2. ACCOUNT_TOTALS TABLE
CREATE TABLE IF NOT EXISTS account_totals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES "user"(user_id) ON DELETE CASCADE,
    account_total_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    account_connected_wallets UUID[] DEFAULT '{}',
    account_connected_nfts UUID[] DEFAULT '{}',
    account_total_value DECIMAL(20,8) DEFAULT 0,
    account_cost_basis DECIMAL(20,8) DEFAULT 0,
    account_unrealized_gains DECIMAL(20,8) DEFAULT 0,
    account_value_in DECIMAL(20,8) DEFAULT 0,
    account_value_out DECIMAL(20,8) DEFAULT 0,
    account_income DECIMAL(20,8) DEFAULT 0,
    account_expenses DECIMAL(20,8) DEFAULT 0,
    account_trading_fees DECIMAL(20,8) DEFAULT 0,
    realized_gains DECIMAL(20,8) DEFAULT 0
);

-- 3. WALLET TABLE
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

-- 6. TAX_REPORT TABLE
CREATE TABLE IF NOT EXISTS tax_report (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES "user"(user_id) ON DELETE CASCADE,
    year INTEGER NOT NULL,
    transactions_amount INTEGER DEFAULT 0,
    total_deposits INTEGER DEFAULT 0,
    total_withdrawls INTEGER DEFAULT 0,
    total_trades INTEGER DEFAULT 0,
    total_transfers INTEGER DEFAULT 0,
    capital_gains DECIMAL(20,8) DEFAULT 0,
    other_gains DECIMAL(20,8) DEFAULT 0,
    income DECIMAL(20,8) DEFAULT 0,
    costs DECIMAL(20,8) DEFAULT 0,
    gifts DECIMAL(20,8) DEFAULT 0,
    country TEXT,
    currency TEXT DEFAULT 'USD',
    tax_method TEXT DEFAULT 'FIFO',
    cost_tracking_method TEXT DEFAULT 'wallet_based',
    report_begin TIMESTAMP WITH TIME ZONE,
    report_end TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_email ON "user"(email);
CREATE INDEX IF NOT EXISTS idx_account_totals_user_id ON account_totals(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_user_id ON wallet(user_id);
CREATE INDEX IF NOT EXISTS idx_wallet_address ON wallet(address);
CREATE INDEX IF NOT EXISTS idx_asset_user_id ON asset(user_id);
CREATE INDEX IF NOT EXISTS idx_asset_coin_name ON asset(coin_name);
CREATE INDEX IF NOT EXISTS idx_transaction_user_id ON transaction(user_id);
CREATE INDEX IF NOT EXISTS idx_transaction_wallet ON transaction(wallet);
CREATE INDEX IF NOT EXISTS idx_transaction_date ON transaction(transaction_date);
CREATE INDEX IF NOT EXISTS idx_tax_report_user_id ON tax_report(user_id);
CREATE INDEX IF NOT EXISTS idx_tax_report_year ON tax_report(year);

-- Enable Row Level Security (RLS)
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_totals ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset ENABLE ROW LEVEL SECURITY;
ALTER TABLE transaction ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_report ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- User can only access their own data
CREATE POLICY "Users can view own profile" ON "user" FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON "user" FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON "user" FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own account totals" ON account_totals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own account totals" ON account_totals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own account totals" ON account_totals FOR UPDATE USING (auth.uid() = user_id);

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

CREATE POLICY "Users can view own tax reports" ON tax_report FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tax reports" ON tax_report FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tax reports" ON tax_report FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tax reports" ON tax_report FOR DELETE USING (auth.uid() = user_id);

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
