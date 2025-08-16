import { BlockchainService, BlockchainType } from './blockchain'
import { EtherscanService } from './etherscan'
import { BitcoinService } from './bitcoin'

export class BlockchainServiceFactory {
  private static services: Map<BlockchainType, BlockchainService> = new Map()

  static getService(blockchainType: BlockchainType): BlockchainService {
    if (!this.services.has(blockchainType)) {
      let service: BlockchainService
      
      switch (blockchainType) {
        case 'ETHEREUM':
          service = new EtherscanService()
          break
        case 'BITCOIN':
          service = new BitcoinService()
          break
        case 'POLYGON':
          // For now, use Ethereum service since Polygon is EVM compatible
          service = new EtherscanService()
          break
        case 'BINANCE_SMART_CHAIN':
          // For now, use Ethereum service since BSC is EVM compatible
          service = new EtherscanService()
          break
        default:
          throw new Error(`Unsupported blockchain type: ${blockchainType}`)
      }
      
      this.services.set(blockchainType, service)
    }
    
    return this.services.get(blockchainType)!
  }

  static async testAllServices(): Promise<Record<BlockchainType, boolean>> {
    const results: Record<BlockchainType, boolean> = {} as Record<BlockchainType, boolean>
    
    for (const blockchainType of Object.keys(SUPPORTED_BLOCKCHAINS) as BlockchainType[]) {
      try {
        const service = this.getService(blockchainType)
        results[blockchainType] = await service.testService()
        console.log(`✅ ${blockchainType} service test:`, results[blockchainType])
      } catch (error) {
        console.error(`❌ ${blockchainType} service test failed:`, error)
        results[blockchainType] = false
      }
    }
    
    return results
  }

  static getSupportedBlockchains() {
    return Object.keys(SUPPORTED_BLOCKCHAINS) as BlockchainType[]
  }
}

// Re-export for convenience
export { SUPPORTED_BLOCKCHAINS } from './blockchain'
