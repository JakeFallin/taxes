import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

interface TestResult {
  blockchain: string
  status: 'pending' | 'success' | 'failed'
  message?: string
}

export function BlockchainServiceTest() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isTesting, setIsTesting] = useState(false)
  const [supportedBlockchains, setSupportedBlockchains] = useState<string[]>([])

  const testAllServices = async () => {
    setIsTesting(true)
    setTestResults([])
    
    try {
      const { BlockchainServiceFactory } = await import('@/lib/blockchainFactory')
      const results = await BlockchainServiceFactory.testAllServices()
      
      const formattedResults: TestResult[] = Object.entries(results).map(([blockchain, status]) => ({
        blockchain,
        status: status ? 'success' : 'failed',
        message: status ? 'Service working' : 'Service failed'
      }))
      
      setTestResults(formattedResults)
      console.log('🔍 Blockchain service test results:', results)
    } catch (error) {
      console.error('Error testing services:', error)
      setTestResults([{
        blockchain: 'Error',
        status: 'failed',
        message: 'Failed to test services'
      }])
    } finally {
      setIsTesting(false)
    }
  }

  const getSupportedBlockchains = async () => {
    try {
      const { BlockchainServiceFactory } = await import('@/lib/blockchainFactory')
      const supported = BlockchainServiceFactory.getSupportedBlockchains()
      setSupportedBlockchains(supported)
      console.log('Supported blockchains:', supported)
    } catch (error) {
      console.error('Error getting supported blockchains:', error)
      setSupportedBlockchains(['Error loading blockchains'])
    }
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'pending':
        return <Loader2 className="w-4 h-4 text-yellow-500 animate-spin" />
    }
  }

  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800">Working</Badge>
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>
      case 'pending':
        return <Badge variant="secondary">Testing...</Badge>
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔗 Blockchain Service Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button 
            onClick={testAllServices}
            disabled={isTesting}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isTesting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Testing Services...
              </>
            ) : (
              'Test All Services'
            )}
          </Button>
          <Button 
            onClick={getSupportedBlockchains}
            variant="outline"
            className="bg-green-500 hover:bg-green-600 text-white border-green-600"
          >
            Show Supported Blockchains
          </Button>
        </div>

        {/* Supported Blockchains */}
        {supportedBlockchains.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Supported Blockchains</h3>
            <div className="flex flex-wrap gap-2">
              {supportedBlockchains.map((blockchain) => (
                <Badge key={blockchain} variant="outline" className="text-sm">
                  {blockchain}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Test Results */}
        {testResults.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Test Results</h3>
            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(result.status)}
                    <span className="font-medium">{result.blockchain}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(result.status)}
                    {result.message && (
                      <span className="text-sm text-gray-600">{result.message}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Alert */}
        <Alert>
          <AlertDescription>
            This component tests the connectivity and functionality of all blockchain services.
            Use it to verify that your API keys are working correctly and services are accessible.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
