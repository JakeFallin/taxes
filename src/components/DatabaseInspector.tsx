import { useState, useEffect } from 'react'
import { databaseService } from '@/lib/database'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Database, Table, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function DatabaseInspector() {
  const [tables, setTables] = useState<string[]>([])
  const [tableStructures, setTableStructures] = useState<Record<string, any[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'failed'>('checking')

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setConnectionStatus('checking')
      
      // Test basic connection by trying to query a table
      const { data, error } = await supabase.from('user').select('user_id').limit(1)
      
      if (error) {
        console.error('Connection test failed:', error)
        setConnectionStatus('failed')
        setError(`Connection failed: ${error.message}`)
        setLoading(false)
        return
      }
      
      setConnectionStatus('connected')
      inspectDatabase()
    } catch (err) {
      console.error('Connection test error:', err)
      setConnectionStatus('failed')
      setError('Failed to connect to Supabase. Check your credentials.')
      setLoading(false)
    }
  }

  const inspectDatabase = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Get all tables
      const tableList = await databaseService.getTables()
      console.log('Found tables:', tableList)
      setTables(tableList)
      
      // Get structure for each table
      const structures: Record<string, any[]> = {}
      for (const tableName of tableList) {
        const structure = await databaseService.getTableStructure(tableName)
        structures[tableName] = structure
      }
      setTableStructures(structures)
      
    } catch (err) {
      setError('Failed to inspect database. Make sure your Supabase credentials are correct.')
      console.error('Database inspection error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (connectionStatus === 'checking') {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Testing connection...</span>
        </div>
      </div>
    )
  }

  if (connectionStatus === 'failed') {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-600 mb-2">Connection Failed</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <div className="space-y-2 text-sm text-left bg-gray-50 p-4 rounded">
              <p><strong>To fix this:</strong></p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Create a <code>.env.local</code> file in your project root</li>
                <li>Add your Supabase credentials:</li>
                <li><code>VITE_SUPABASE_URL=your_project_url</code></li>
                <li><code>VITE_SUPABASE_ANON_KEY=your_anon_key</code></li>
                <li>Restart the development server</li>
              </ol>
            </div>
            <Button onClick={testConnection} variant="outline" className="mt-4">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Inspecting database...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center">
            <Database className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-600 mb-2">Database Connection Error</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={inspectDatabase} variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Database Schema Inspector</h2>
          <p className="text-gray-600">Found {tables.length} tables in your database</p>
          <Badge variant="outline" className="mt-2">
            <Database className="h-3 w-3 mr-1" />
            Connected to Supabase
          </Badge>
        </div>
        <Button onClick={inspectDatabase} variant="outline">
          Refresh
        </Button>
      </div>

      {tables.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <Table className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Tables Found</h3>
            <p className="text-gray-600 mb-4">Your database appears to be empty. You need to run the SQL schema first.</p>
            <div className="text-sm text-left bg-blue-50 p-4 rounded">
              <p><strong>Next steps:</strong></p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Go to your Supabase dashboard</li>
                <li>Click "SQL Editor" in the left sidebar</li>
                <li>Copy the contents of <code>supabase_schema.sql</code></li>
                <li>Paste and run the SQL</li>
                <li>Refresh this page</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {tables.map(tableName => (
            <Card key={tableName}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="h-5 w-5" />
                  {tableName}
                  <Badge variant="secondary">
                    {tableStructures[tableName]?.length || 0} columns
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tableStructures[tableName] && tableStructures[tableName].length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-medium">Column</th>
                          <th className="text-left p-2 font-medium">Type</th>
                          <th className="text-left p-2 font-medium">Nullable</th>
                          <th className="text-left p-2 font-medium">Default</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableStructures[tableName].map((column, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="p-2 font-mono text-blue-600">{column.column_name}</td>
                            <td className="p-2 font-mono">{column.data_type}</td>
                            <td className="p-2">
                              <Badge variant={column.is_nullable === 'YES' ? 'outline' : 'default'}>
                                {column.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}
                              </Badge>
                            </td>
                            <td className="p-2 font-mono text-gray-500">
                              {column.column_default || '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">No columns found for this table.</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
