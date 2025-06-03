'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export function SegmentationTools() {
  const [segments, setSegments] = useState([])
  const [newSegment, setNewSegment] = useState({
    name: '',
    conditions: []
  })

  const createSegment = async () => {
    const { data, error } = await supabase
      .from('segments')
      .insert([newSegment])

    if (!error) {
      // Update segments list
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Segment name"
          value={newSegment.name}
          onChange={(e) => setNewSegment({ ...newSegment, name: e.target.value })}
        />
        <Button onClick={createSegment}>Create Segment</Button>
      </div>

      <div className="space-y-4">
        {segments.map(segment => (
          <div key={segment.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{segment.name}</h3>
            <div className="flex gap-2 mt-2">
              {segment.conditions.map((condition, index) => (
                <Badge key={index} variant="secondary">
                  {condition.field} {condition.operator} {condition.value}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}