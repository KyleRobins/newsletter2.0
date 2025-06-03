'use client'

import { Newsletter } from '@/types/database'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye, Send } from 'lucide-react'

interface NewsletterPreviewProps {
  newsletter: Newsletter
  onSend?: () => void
}

export function NewsletterPreview({ newsletter, onSend }: NewsletterPreviewProps) {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{newsletter.title}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{newsletter.tech_track}</span>
          <span>•</span>
          <span>{new Date(newsletter.published_at).toLocaleDateString()}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert">
          {newsletter.content}
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview in Browser
          </Button>
          <Button size="sm" onClick={onSend}>
            <Send className="h-4 w-4 mr-2" />
            Send Newsletter
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}