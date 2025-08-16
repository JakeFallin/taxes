import { BlockchainService, BlockchainTransaction, BlockchainBalance } from './blockchain'

const BLOCKCYPHER_API_KEY = import.meta.env.VITE_PUBLIC_BLOCKCYPHER_ID || ''

interface BlockCypherTransaction {
  block_height: number
  confirmed: string
  hash: string
  inputs: Array<{
    addresses: string[]
    value: number
  }>
  outputs: Array<{
    addresses: string[]
    value: number
    script_type: string
  }>
  fees: number
  total: number
  size: number
  preference: string
  relayed_by: string
  received: string
  ver: number
  double_spend: boolean
  vin_sz: number
  vout_sz: number
  confirmations: number
  confidence: number
  tx_hash: string
  tx_index: number
  tx_output_n: number
  value: number
  spent: boolean
  spent_by: string
  script: string
  addresses: string[]
}

interface BlockCypherBalance {
  address: string
  total_received: number
  total_sent: number
  balance: number
  unconfirmed_balance: number
  final_balance: number
  n_tx: number
  unconfirmed_n_tx: number
  final_n_tx: number
}

export class BitcoinService implements BlockchainService {
  private static baseUrl = 'https://api.blockcypher.com/v1'
  private static network = 'main' // 'main' for mainnet, 'test3' for testnet

  // Get service info
  getServiceInfo() {
    return {
      name: 'Bitcoin',
      currency: 'BTC',
      baseUrl: BitcoinService.baseUrl,
      supportedNetworks: ['mainnet', 'testnet']
    }
  }

  // Validate wallet address format
  validateAddress(address: string): boolean {
    // Basic Bitcoin address validation (legacy, P2SH, and bech32)
    return (
      (address.startsWith('1') && address.length >= 26 && address.length <= 35) ||
      (address.startsWith('3') && address.length >= 26 && address.length <= 35) ||
      (address.startsWith('bc1') && address.length >= 42 && address.length <= 62)
    )
  }

  // Test if the service is working
  async testService(): Promise<boolean> {
    try {
      console.log('🧪 Testing Bitcoin service...')
      // Test with a known Bitcoin address (Satoshi's first transaction)
      const testAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
      let url = `${BitcoinService.baseUrl}/btc/${BitcoinService.network}/addrs/${testAddress}/balance`
      
      // Add API key if available
      if (BLOCKCYPHER_API_KEY) {
        url += `?token=${BLOCKCYPHER_API_KEY}`
        console.log('🔑 Using BlockCypher API key for test')
      } else {
        console.log('⚠️ No BlockCypher API key found for test')
      }
      
      console.log(`🔗 Test URL: ${url}`)
      
      const response = await fetch(url)
      console.log(`📡 Test response status: ${response.status}`)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ Test failed with status ${response.status}: ${errorText}`)
        return false
      }
      
      const data = await response.json()
      console.log('📊 Test response data:', data)
      
      const success = response.ok && data.address === testAddress
      console.log(`✅ Bitcoin service test ${success ? 'PASSED' : 'FAILED'}`)
      
      return success
    } catch (error) {
      console.error('❌ Error testing Bitcoin service:', error)
      return false
    }
  }

  // Get wallet balance
  async getWalletBalance(address: string): Promise<string> {
    try {
      console.log(`🔍 Fetching Bitcoin balance for address: ${address}`)
      let url = `${BitcoinService.baseUrl}/btc/${BitcoinService.network}/addrs/${address}/balance`
      
      // Add API key if available
      if (BLOCKCYPHER_API_KEY) {
        url += `?token=${BLOCKCYPHER_API_KEY}`
        console.log(`🔑 Using BlockCypher API key`)
      } else {
        console.log(`⚠️ No BlockCypher API key found, using public endpoint`)
      }
      
      console.log(`🔗 BlockCypher balance API URL: ${url}`)
      
      const response = await fetch(url)
      console.log(`📡 BlockCypher balance API response status: ${response.status}`)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ BlockCypher balance API error: ${response.status} - ${errorText}`)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: BlockCypherBalance = await response.json()
      console.log(`💰 BlockCypher balance API response data:`, data)
      
      // Convert satoshis to BTC (1 BTC = 100,000,000 satoshis)
      const balanceInBTC = data.final_balance / 100000000
      console.log(`💰 Final balance in BTC: ${balanceInBTC}`)
      
      return balanceInBTC.toString()
    } catch (error) {
      console.error('❌ Error getting Bitcoin balance:', error)
      throw error
    }
  }

  // Get wallet transactions
  async getWalletTransactions(address: string, startBlock = 0, endBlock = 99999999): Promise<BlockchainTransaction[]> {
    try {
      console.log(`🔍 Fetching Bitcoin transactions for address: ${address}`)
      let url = `${BitcoinService.baseUrl}/btc/${BitcoinService.network}/addrs/${address}?limit=50`
      
      // Add API key if available
      if (BLOCKCYPHER_API_KEY) {
        url += `&token=${BLOCKCYPHER_API_KEY}`
        console.log(`🔑 Using BlockCypher API key`)
      } else {
        console.log(`⚠️ No BlockCypher API key found, using public endpoint`)
      }
      
      console.log(`🔗 BlockCypher API URL: ${url}`)
      
      const response = await fetch(url)
      console.log(`📡 BlockCypher API response status: ${response.status}`)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ BlockCypher API error: ${response.status} - ${errorText}`)
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log(`📊 BlockCypher API response data:`, data)
      console.log(`📊 Number of transactions in response: ${data.txs?.length || 0}`)
      
      const transactions: BlockchainTransaction[] = []
      
      // Process incoming transactions
      if (data.txs && Array.isArray(data.txs)) {
        console.log(`🔄 Processing ${data.txs.length} transactions...`)
        
        for (const tx of data.txs) {
          console.log(`🔍 Processing transaction: ${tx.hash}`)
          console.log(`🔍 Transaction inputs: ${tx.inputs?.length || 0}`)
          console.log(`🔍 Transaction outputs: ${tx.outputs?.length || 0}`)
          
          // Find outputs to our address
          for (const output of tx.outputs) {
            if (output.addresses && output.addresses.includes(address)) {
              console.log(`✅ Found incoming transaction: ${tx.hash} with value: ${output.value} satoshis`)
              transactions.push({
                blockNumber: tx.block_height?.toString() || '0',
                timeStamp: tx.received,
                hash: tx.hash,
                from: tx.inputs[0]?.addresses[0] || 'unknown',
                to: address,
                value: (output.value / 100000000).toString(), // Convert satoshis to BTC
                currency: 'BTC',
                fee: tx.fees ? (tx.fees / 100000000).toString() : undefined,
                confirmations: tx.confirmations?.toString() || '0',
                status: tx.confirmations > 0 ? 'success' : 'pending'
              })
            }
          }
          
          // Find inputs from our address (outgoing transactions)
          for (const input of tx.inputs) {
            if (input.addresses && input.addresses.includes(address)) {
              console.log(`✅ Found outgoing transaction: ${tx.hash} with value: ${input.value} satoshis`)
              transactions.push({
                blockNumber: tx.block_height?.toString() || '0',
                timeStamp: tx.received,
                hash: tx.hash,
                from: address,
                to: tx.outputs[0]?.addresses[0] || 'unknown',
                value: (input.value / 100000000).toString(), // Convert satoshis to BTC
                currency: 'BTC',
                fee: tx.fees ? (tx.fees / 100000000).toString() : undefined,
                confirmations: tx.confirmations?.toString() || '0',
                status: tx.confirmations > 0 ? 'success' : 'pending'
              })
            }
          }
        }
      } else {
        console.log(`⚠️ No transactions found or invalid data structure:`, data)
      }
      
      console.log(`📊 Final processed transactions: ${transactions.length}`)
      return transactions
    } catch (error) {
      console.error('❌ Error getting Bitcoin transactions:', error)
      throw error
    }
  }

  // Test a specific wallet address
  async testWalletAddress(address: string): Promise<{ balance: string; transactionCount: number; error?: string }> {
    try {
      console.log(`🔍 Testing Bitcoin wallet address: ${address}`)
      
      // Validate address format
      if (!this.validateAddress(address)) {
        return {
          balance: '0',
          transactionCount: 0,
          error: 'Invalid Bitcoin address format'
        }
      }
      
      // Get balance
      const balance = await this.getWalletBalance(address)
      console.log('💰 Bitcoin balance:', balance, 'BTC')
      
      // Get transactions
      const transactions = await this.getWalletTransactions(address)
      console.log('📊 Bitcoin transactions:', transactions.length)
      
      return {
        balance,
        transactionCount: transactions.length
      }
    } catch (error) {
      console.error('❌ Error testing Bitcoin wallet:', error)
      return {
        balance: '0',
        transactionCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }
}
