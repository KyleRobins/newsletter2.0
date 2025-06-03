import { NewsletterList } from '@/components/newsletter/NewsletterList'
import { NewsletterForm } from '@/components/newsletter/NewsletterForm'

export default function NewslettersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Newsletter Management</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Create Newsletter</h2>
        <NewsletterForm />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Recent Newsletters</h2>
        <NewsletterList />
      </div>
    </div>
  )
}