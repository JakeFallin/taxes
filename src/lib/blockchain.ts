export interface BlockchainTransaction {
  blockNumber: string
  timeStamp: string
  hash: string
  from: string
  to: string
  value: string
  currency: string
  fee?: string
  confirmations: string
  status: 'success' | 'pending' | 'failed'
}

export interface BlockchainBalance {
  balance: string
  currency: string
  lastUpdated: string
}

export interface BlockchainService {
  // Get wallet balance
  getWalletBalance(address: string): Promise<string>
  
  // Get wallet transactions
  getWalletTransactions(address: string, startBlock?: number, endBlock?: number): Promise<BlockchainTransaction[]>
  
  // Test if the service is working
  testService(): Promise<boolean>
  
  // Test a specific wallet address
  testWalletAddress(address: string): Promise<{ balance: string; transactionCount: number; error?: string }>
  
  // Validate wallet address format
  validateAddress(address: string): boolean
  
  // Get service info
  getServiceInfo(): {
    name: string
    currency: string
    baseUrl: string
    supportedNetworks: string[]
  }
}

// Supported blockchain types
export const SUPPORTED_BLOCKCHAINS = {
  ETHEREUM: {
    name: 'Ethereum',
    currency: 'ETH',
    networks: ['mainnet', 'goerli', 'sepolia'],
    defaultNetwork: 'mainnet',
    addressPrefix: '0x',
    addressLength: 42
  },
  BITCOIN: {
    name: 'Bitcoin',
    currency: 'BTC',
    networks: ['mainnet', 'testnet'],
    defaultNetwork: 'mainnet',
    addressPrefix: ['1', '3', 'bc1'],
    addressLength: [26, 35, 62]
  },
  POLYGON: {
    name: 'Polygon',
    currency: 'MATIC',
    networks: ['mainnet', 'mumbai'],
    defaultNetwork: 'mainnet',
    addressPrefix: '0x',
    addressLength: 42
  },
  BINANCE_SMART_CHAIN: {
    name: 'Binance Smart Chain',
    currency: 'BNB',
    networks: ['mainnet', 'testnet'],
    defaultNetwork: 'mainnet',
    addressPrefix: '0x',
    addressLength: 42
  }
} as const

export type BlockchainType = keyof typeof SUPPORTED_BLOCKCHAINS
export type NetworkType = string

// Helper function to get blockchain info
export function getBlockchainInfo(type: BlockchainType) {
  return SUPPORTED_BLOCKCHAINS[type]
}

// Helper function to validate address for a specific blockchain
export function validateBlockchainAddress(type: BlockchainType, address: string): boolean {
  const info = SUPPORTED_BLOCKCHAINS[type]
  
  if (type === 'ETHEREUM' || type === 'POLYGON' || type === 'BINANCE_SMART_CHAIN') {
    return address.startsWith('0x') && address.length === 42 && /^[0-9a-fA-F]+$/.test(address.slice(2))
  }
  
  if (type === 'BITCOIN') {
    // Basic Bitcoin address validation (legacy, P2SH, and bech32)
    return (
      (address.startsWith('1') && address.length >= 26 && address.length <= 35) ||
      (address.startsWith('3') && address.length >= 26 && address.length <= 35) ||
      (address.startsWith('bc1') && address.length >= 42 && address.length <= 62)
    )
  }
  
  return false
}
