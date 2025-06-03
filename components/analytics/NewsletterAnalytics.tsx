'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export function NewsletterAnalytics() {
  const [analytics, setAnalytics] = useState({
    totalSubscribers: 0,
    openRate: 0,
    clickRate: 0,
    trackDistribution: {},
  })

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    // Fetch subscribers count
    const { count: subscribersCount } = await supabase
      .from('subscriptions')
      .select('*', { count: 'exact' })

    // Fetch track distribution
    const { data: trackData } = await supabase
      .from('subscriptions')
      .select('tech_track')

    const distribution = trackData?.reduce((acc, curr) => {
      acc[curr.tech_track] = (acc[curr.tech_track] || 0) + 1
      return acc
    }, {})

    setAnalytics({
      totalSubscribers: subscribersCount || 0,
      openRate: 65, // Example data
      clickRate: 25, // Example data
      trackDistribution: distribution || {},
    })
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Subscribers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{analytics.totalSubscribers}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Open Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{analytics.openRate}%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Click Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{analytics.clickRate}%</p>
        </CardContent>
      </Card>
    </div>
  )
}