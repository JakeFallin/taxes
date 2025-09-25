import { BlockchainService, BlockchainTransaction, BlockchainBalance } from './blockchain'

const ETHERSCAN_API_KEY = import.meta.env.VITE_PUBLIC_ETHERSCAN_ID

// Debug logging
console.log('🔍 Environment variables loaded:')
console.log('VITE_PUBLIC_ETHERSCAN_ID:', import.meta.env.VITE_PUBLIC_ETHERSCAN_ID)
console.log('ETHERSCAN_API_KEY:', ETHERSCAN_API_KEY)
console.log('API Key length:', ETHERSCAN_API_KEY?.length || 0)

interface EtherscanTransaction {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  transactionIndex: string
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  isError: string
  txreceipt_status: string
  input: string
  contractAddress: string
  cumulativeGasUsed: string
  gasUsed: string
  confirmations: string
  methodId: string
  functionName: string
}

interface EtherscanBalance {
  status: string
  message: string
  result: string
}

interface EtherscanTransactions {
  status: string
  message: string
  result: EtherscanTransaction[]
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class EtherscanService implements BlockchainService {
  private static baseUrl = 'https://api.etherscan.io/api'

  static async testApiKey(testAddress: string = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'): Promise<boolean> {
    // Test with a known address (Vitalik's wallet)
    const url = `${this.baseUrl}?module=account&action=balance&address=${testAddress}&tag=latest&apikey=${ETHERSCAN_API_KEY}`
    
    console.log('🔍 Testing Etherscan API with URL:', url)
    console.log('🔑 API Key length:', ETHERSCAN_API_KEY?.length || 0)
    
    try {
      const response = await fetch(url)
      console.log('📡 Response status:', response.status)
      console.log('📡 Response headers:', response.headers)
      
      const data = await response.json()
      console.log('📊 Response data:', data)
      
      if (data.status === '1') {
        console.log('✅ Etherscan API key is working')
        
        // Also test the transaction endpoint with the same address
        console.log('🔍 Testing transaction endpoint...')
        await sleep(600); // Rate limit delay
        try {
          const txUrl = `${this.baseUrl}?module=account&action=txlist&address=${testAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${ETHERSCAN_API_KEY}`
          const txResponse = await fetch(txUrl)
          const txData = await txResponse.json()
          console.log('📊 Transaction test response:', txData)
          
          if (txData.status === '1') {
            console.log('✅ Transaction endpoint working, found', txData.result?.length || 0, 'transactions')
          } else {
            console.log('⚠️ Transaction endpoint issue:', txData.message)
          }
        } catch (txError) {
          console.log('⚠️ Transaction endpoint error:', txError)
        }
        
        return true
      } else {
        console.error('❌ Etherscan API error:', data.message)
        console.error('❌ Full response:', data)
        return false
      }
    } catch (error) {
      console.error('❌ Error testing Etherscan API:', error)
      return false
    }
  }

  // Get service info
  getServiceInfo() {
    return {
      name: 'Ethereum',
      currency: 'ETH',
      baseUrl: EtherscanService.baseUrl,
      supportedNetworks: ['mainnet', 'goerli', 'sepolia']
    }
  }

  // Validate wallet address format
  validateAddress(address: string): boolean {
    return address.startsWith('0x') && address.length === 42 && /^[0-9a-fA-F]+$/.test(address.slice(2))
  }

  // Test if the service is working
  async testService(): Promise<boolean> {
    return EtherscanService.testApiKey()
  }

  // Get wallet balance
  async getWalletBalance(address: string): Promise<string> {
    return EtherscanService.getWalletBalance(address)
  }

  // Get wallet transactions
  async getWalletTransactions(address: string, startBlock = 0, endBlock = 99999999): Promise<BlockchainTransaction[]> {
    const transactions = await EtherscanService.getWalletTransactions(address, startBlock, endBlock)
    return transactions.map(tx => ({
      blockNumber: tx.blockNumber,
      timeStamp: tx.timeStamp,
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: tx.value,
      currency: 'ETH',
      fee: tx.gasUsed && tx.gasPrice ? (parseInt(tx.gasUsed) * parseInt(tx.gasPrice) / 1e18).toString() : undefined,
      confirmations: tx.confirmations,
      status: tx.isError === '0' ? 'success' : 'failed'
    }))
  }

  // Test a specific wallet address
  async testWalletAddress(address: string): Promise<{ balance: string; transactionCount: number; error?: string }> {
    return EtherscanService.testWalletAddress(address)
  }

  // Static methods for backward compatibility
  static async testWalletAddress(address: string): Promise<{ balance: string; transactionCount: number; error?: string }> {
    console.log(`🔍 Testing wallet address: ${address}`)
    
    try {
      // Test balance first
      const balance = await this.getWalletBalance(address)
      console.log(`✅ Balance: ${balance} ETH`)
      
      // Test transactions with a small block range
      const currentBlock = 19000000
      const recentStart = Math.max(0, currentBlock - 1000) // Last 1000 blocks
      
      const url = `${this.baseUrl}?module=account&action=txlist&address=${address}&startblock=${recentStart}&endblock=${currentBlock}&sort=desc&apikey=${ETHERSCAN_API_KEY}`
      console.log(`🔍 Testing transactions URL: ${url}`)
      
      const response = await fetch(url)
      const data = await response.json()
      console.log(`📊 Transaction response:`, data)
      
      if (data.status === '1') {
        const count = data.result?.length || 0
        console.log(`✅ Found ${count} transactions in recent blocks`)
        return { balance, transactionCount: count }
      } else if (data.message === 'No transactions found') {
        console.log(`ℹ️ No transactions found for address ${address} in recent blocks`)
        return { balance, transactionCount: 0 } // No error, just no transactions
      } else {
        console.log(`⚠️ Transaction query failed: ${data.message}`)
        return { balance, transactionCount: 0, error: data.message }
      }
    } catch (error) {
      console.error(`❌ Error testing wallet:`, error)
      return { balance: '0', transactionCount: 0, error: error.message }
    }
  }

  static async getWalletBalance(address: string): Promise<string> {
    if (!ETHERSCAN_API_KEY) {
      throw new Error('Etherscan API key not found. Please add VITE_PUBLIC_ETHERSCAN_ID to your .env.local file')
    }

    const url = `${this.baseUrl}?module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`
    
    try {
      const response = await fetch(url)
      const data: EtherscanBalance = await response.json()
      
      if (data.status === '1') {
        // Convert from wei to ETH
        return (parseInt(data.result) / Math.pow(10, 18)).toString()
      } else {
        throw new Error(`Etherscan API error: ${data.message}`)
      }
    } catch (error) {
      console.error('Error fetching wallet balance:', error)
      throw error
    }
  }

  static async getLatestBlock(): Promise<number> {
    const url = `${this.baseUrl}?module=proxy&action=eth_blockNumber&apikey=${ETHERSCAN_API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.result) {
        return parseInt(data.result, 16); // Hex to decimal
      }
      return 0; // Instead of 20000000, to avoid placeholders
    } catch (error) {
      console.error('Error fetching latest block:', error);
      return 0; // Instead of 20000000, to avoid placeholders
    }
  }

  static async getWalletTransactions(address: string, startBlock = 0, endBlock = 99999999): Promise<EtherscanTransaction[]> {
    if (!ETHERSCAN_API_KEY) {
      throw new Error('Etherscan API key not found. Please add VITE_PUBLIC_ETHERSCAN_ID to your .env.local file');
    }

    let allTransactions: EtherscanTransaction[] = [];
    let page = 1;
    const pageSize = 10000; // Etherscan max per call

    while (true) {
      const url = `${this.baseUrl}?module=account&action=txlist&address=${address}&startblock=${startBlock}&endblock=${endBlock}&page=${page}&offset=${pageSize}&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
      
      console.log(`🔍 Fetching page ${page}: ${url}`);
      const response = await fetch(url);
      const data: EtherscanTransactions = await response.json();
      
      if (data.status !== '1') {
        if (data.message === 'No transactions found') break;
        throw new Error(`Etherscan API error: ${data.message}`);
      }
      
      allTransactions = [...allTransactions, ...data.result];
      console.log(`📊 Fetched ${data.result.length} transactions on page ${page}. Total so far: ${allTransactions.length}`);
      
      if (data.result.length < pageSize) break; // No more pages
      
      page++;
      await sleep(600); // Rate limit: <2/sec
    }

    console.log(`✅ Total transactions fetched: ${allTransactions.length}`);
    return allTransactions;
  }

  static async getInternalTransactions(address: string, startBlock = 0, endBlock = 99999999): Promise<EtherscanTransaction[]> {
    const url = `${this.baseUrl}?module=account&action=txlistinternal&address=${address}&startblock=${startBlock}&endblock=${endBlock}&sort=desc&apikey=${ETHERSCAN_API_KEY}`
    
    try {
      const response = await fetch(url)
      const data: EtherscanTransactions = await response.json()
      
      if (data.status === '1') {
        return data.result
      } else {
        throw new Error(`Etherscan API error: ${data.message}`)
      }
    } catch (error) {
      console.error('Error fetching internal transactions:', error)
      throw error
    }
  }

  static async getTokenTransfers(address: string, startBlock = 0, endBlock = 99999999): Promise<any[]> {
    const url = `${this.baseUrl}?module=account&action=tokentx&address=${address}&startblock=${startBlock}&endblock=${endBlock}&sort=desc&apikey=${ETHERSCAN_API_KEY}`
    
    try {
      const response = await fetch(url)
      const data = await response.json()
      
      if (data.status === '1') {
        return data.result
      } else {
        throw new Error(`Etherscan API error: ${data.message}`)
      }
    } catch (error) {
      console.error('Error fetching token transfers:', error)
      throw error
    }
  }

  static convertWeiToEth(wei: string): number {
    return parseInt(wei) / Math.pow(10, 18)
  }

  static convertWeiToGwei(wei: string): number {
    return parseInt(wei) / Math.pow(10, 9)
  }

  static getTransactionType(tx: EtherscanTransaction): string {
    if (tx.contractAddress && tx.contractAddress !== '') {
      return 'contract_interaction'
    }
    if (tx.to && tx.to.toLowerCase() === tx.from.toLowerCase()) {
      return 'self_transfer'
    }
    return 'transfer'
  }

  static getTransactionDirection(tx: EtherscanTransaction, walletAddress: string): 'in' | 'out' {
    const walletLower = walletAddress.toLowerCase()
    if (tx.to.toLowerCase() === walletLower) {
      return 'in'
    }
    if (tx.from.toLowerCase() === walletLower) {
      return 'out'
    }
    return 'out' // Default fallback
  }
}
