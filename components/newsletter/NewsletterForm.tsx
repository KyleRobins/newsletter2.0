'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { NewsletterSchedule } from './NewsletterSchedule'
import { NewsletterPreview } from './NewsletterPreview'
import { RichTextEditor } from '@/components/editor/RichTextEditor'

export function NewsletterForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [techTrack, setTechTrack] = useState('')
  const [loading, setLoading] = useState(false)
  const [scheduledDate, setScheduledDate] = useState<Date>()
  const [showPreview, setShowPreview] = useState(false)

  const handleSchedule = (date: Date) => {
    setScheduledDate(date)
  }

  const previewNewsletter: Newsletter = {
    id: 'preview',
    title,
    content,
    tech_track: techTrack,
    published_at: scheduledDate?.toISOString() || new Date().toISOString(),
    created_at: new Date().toISOString(),
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="tech-track">Tech Track</Label>
          <Select value={techTrack} onValueChange={setTechTrack}>
            <SelectTrigger>
              <SelectValue placeholder="Select track" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="devops">DevOps</SelectItem>
              <SelectItem value="web3">Web3</SelectItem>
              <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <RichTextEditor
            content={content}
            onChange={setContent}
          />
        </div>

        <div className="flex items-center justify-between">
          <NewsletterSchedule onSchedule={handleSchedule} />
          <div className="space-x-2">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
            >
              Preview
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Newsletter'}
            </Button>
          </div>
        </div>
      </form>

      {showPreview && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <NewsletterPreview 
            newsletter={previewNewsletter}
            onSend={handleSubmit}
          />
        </div>
      )}
    </div>
  )
}