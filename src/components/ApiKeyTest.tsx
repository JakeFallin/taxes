import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EtherscanService } from '@/lib/etherscan'

export function ApiKeyTest() {
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<string>('')

  const testApiKey = async () => {
    setTesting(true)
    setResult('')
    
    try {
      const isWorking = await EtherscanService.testApiKey()
      if (isWorking) {
        setResult('✅ API key is working! You can now sync wallets.')
      } else {
        setResult('❌ API key is not working. Check your VITE_PUBLIC_ETHERSCAN_ID in .env.local')
      }
    } catch (error) {
      setResult(`❌ Error: ${error}`)
    } finally {
      setTesting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Test Etherscan API Key</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={testApiKey} 
          disabled={testing}
          className="w-full"
        >
          {testing ? 'Testing...' : 'Test API Key'}
        </Button>
        
        {result && (
          <div className="mt-4 p-3 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-sm">{result}</p>
          </div>
        )}
        
        <div className="mt-4 text-xs text-gray-500">
          <p><strong>To get an API key:</strong></p>
          <ol className="list-decimal list-inside mt-2 space-y-1">
            <li>Go to <a href="https://etherscan.io/apis" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">etherscan.io/apis</a></li>
            <li>Sign up or login</li>
            <li>Go to "My Account" → "API Keys"</li>
            <li>Create a new API key</li>
            <li>Add it to your .env.local as VITE_PUBLIC_ETHERSCAN_ID</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
