'use client'

import { useState, useEffect } from 'react'
import { Newsletter } from '@/types/database'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function NewsletterList() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNewsletters() {
      const { data, error } = await supabase
        .from('newsletters')
        .select('*')
        .order('created_at', { ascending: false })

      if (data) {
        setNewsletters(data)
      }
      setLoading(false)
    }

    fetchNewsletters()
  }, [])

  if (loading) {
    return <div>Loading newsletters...</div>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {newsletters.map((newsletter) => (
        <Card key={newsletter.id}>
          <CardHeader>
            <CardTitle>{newsletter.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Track: {newsletter.tech_track}
            </p>
            <p className="text-sm text-gray-500">
              Published: {new Date(newsletter.published_at).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}