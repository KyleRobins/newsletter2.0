'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { RichTextEditor } from '@/components/editor/RichTextEditor'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

export function EmailTemplateSystem() {
  const [templateName, setTemplateName] = useState('')
  const [templateContent, setTemplateContent] = useState('')
  const [variables, setVariables] = useState<string[]>(['name', 'track'])

  const saveTemplate = async () => {
    const { error } = await supabase.from('email_templates').insert({
      name: templateName,
      content: templateContent,
      variables: variables
    })

    if (error) {
      toast.error('Failed to save template')
    } else {
      toast.success('Template saved successfully')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Label>Template Name</Label>
        <Input
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Welcome Email"
        />
      </div>

      <div>
        <Label>Template Content</Label>
        <RichTextEditor
          content={templateContent}
          onChange={setTemplateContent}
        />
      </div>

      <div>
        <Label>Available Variables</Label>
        <div className="flex gap-2 flex-wrap">
          {variables.map(variable => (
            <span key={variable} className="px-2 py-1 bg-muted rounded-md">
              {`{{${variable}}}`}
            </span>
          ))}
        </div>
      </div>

      <Button onClick={saveTemplate}>Save Template</Button>
    </div>
  )
}