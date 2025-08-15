import { useState, useEffect } from 'react'
import { databaseService } from '@/lib/database'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Database, Table } from 'lucide-react'

export function DatabaseInspector() {
  const [tables, setTables] = useState<string[]>([])
  const [tableStructures, setTableStructures] = useState<Record<string, any[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    inspectDatabase()
  }, [])

  const inspectDatabase = async () => {
    try {
      setLoading(true)
      setError('')
      
      // Get all tables
      const tableList = await databaseService.getTables()
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
            <p className="text-gray-600">Your database appears to be empty. You may need to create tables first.</p>
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
