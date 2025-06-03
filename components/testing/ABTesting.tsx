'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { RichTextEditor } from '@/components/editor/RichTextEditor'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TestResults } from './TestResults'
import { toast } from 'sonner'

export function ABTesting() {
  const [testName, setTestName] = useState('')
  const [variantA, setVariantA] = useState({ content: '', subject: '' })
  const [variantB, setVariantB] = useState({ content: '', subject: '' })
  const [currentTestId, setCurrentTestId] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    validateTest()
  }, [testName, variantA, variantB])

  const validateTest = () => {
    const isValid = 
      testName.length > 0 &&
      variantA.subject.length > 0 &&
      variantA.content.length > 0 &&
      variantB.subject.length > 0 &&
      variantB.content.length > 0

    setIsValid(isValid)
  }

  const createTest = async () => {
    if (!isValid) {
      toast.error('Please fill in all fields')
      return
    }

    const { data, error } = await supabase.from('ab_tests').insert({
      name: testName,
      variant_a: variantA,
      variant_b: variantB,
      status: 'draft'
    }).select()

    if (error) {
      toast.error('Failed to create test')
    } else {
      toast.success('Test created successfully')
      setCurrentTestId(data[0].id)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <Label>Test Name</Label>
        <Input
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          placeholder="Black Friday Campaign Test"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Variant A</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Subject Line</Label>
                <Input
                  value={variantA.subject}
                  onChange={(e) => setVariantA({ ...variantA, subject: e.target.value })}
                />
              </div>
              <div>
                <Label>Content</Label>
                <RichTextEditor
                  content={variantA.content}
                  onChange={(content) => setVariantA({ ...variantA, content })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Variant B</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Subject Line</Label>
                <Input
                  value={variantB.subject}
                  onChange={(e) => setVariantB({ ...variantB, subject: e.target.value })}
                />
              </div>
              <div>
                <Label>Content</Label>
                <RichTextEditor
                  content={variantB.content}
                  onChange={(content) => setVariantB({ ...variantB, content })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => {
            setTestName('')
            setVariantA({ content: '', subject: '' })
            setVariantB({ content: '', subject: '' })
          }}
        >
          Reset
        </Button>
        <Button 
          onClick={createTest}
          disabled={!isValid}
        >
          Create A/B Test
        </Button>
      </div>

      {currentTestId && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Test Results</h2>
          <TestResults testId={currentTestId} />
        </div>
      )}
    </div>
  )
}