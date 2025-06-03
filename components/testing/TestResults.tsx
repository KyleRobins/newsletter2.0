import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface TestResultData {
  variant: 'a' | 'b'
  opens: number
  clicks: number
  conversions: number
}

interface TestResultsProps {
  testId: string
}

export function TestResults({ testId }: TestResultsProps) {
  const [results, setResults] = useState<TestResultData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResults()
  }, [testId])

  const fetchResults = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('test_id', testId)

      if (error) throw error

      if (data) {
        setResults(data)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch results'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Error: {error}</p>
        <button 
          onClick={fetchResults}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground"
        >
          Try again
        </button>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No results available yet
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>Variant {result.variant.toUpperCase()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Opens</span>
                  <span>{result.opens}</span>
                </div>
                <Progress value={(result.opens / Math.max(...results.map(r => r.opens))) * 100} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Clicks</span>
                  <span>{result.clicks}</span>
                </div>
                <Progress value={(result.clicks / Math.max(...results.map(r => r.clicks))) * 100} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Conversions</span>
                  <span>{result.conversions}</span>
                </div>
                <Progress value={(result.conversions / Math.max(...results.map(r => r.conversions))) * 100} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}