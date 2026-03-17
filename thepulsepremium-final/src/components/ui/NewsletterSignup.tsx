import { useState } from 'react'
import { Mail, Send, CheckCircle } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simple mock submission – replace with your actual endpoint
    // For now, we'll simulate success after 1 second
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setEmail('')
    }, 1000)

    // If you have a real endpoint (e.g., Google Form, API), use fetch here
  }

  if (submitted) {
    return (
      <div className="glass-gold rounded-sm py-12 px-8 text-center">
        <CheckCircle size={40} className="text-[#D4AF37] mx-auto mb-4" />
        <h3 className="font-serif text-2xl font-bold text-[#F5F0E6] mb-2">You're subscribed!</h3>
        <p className="text-[#F5F0E6]/42 text-sm max-w-md mx-auto">
          Thank you for joining The Pulse Premium. We'll send you the latest intelligence.
        </p>
      </div>
    )
  }

  return (
    <div className="glass-gold rounded-sm py-12 px-8">
      <div className="max-w-2xl mx-auto text-center">
        <Mail size={30} className="text-[#D4AF37]/35 mx-auto mb-3" />
        <h3 className="font-serif text-2xl font-bold text-[#F5F0E6] mb-2">Stay Ahead of the Curve</h3>
        <p className="text-[#F5F0E6]/42 text-sm max-w-md mx-auto mb-6">
          Get weekly insights on AI, virality, and wealth-building – no spam, just pure intelligence.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 bg-black/40 text-sm text-[#F5F0E6] placeholder-[#F5F0E6]/22 rounded-sm px-4 py-3 outline-none"
            style={{ border: '1px solid rgba(212,175,55,0.2)' }}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#D4AF37] text-black text-sm font-semibold rounded-sm hover:bg-[#F5E7B2] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Subscribing...' : 'Subscribe'} <Send size={14} />
          </button>
        </form>
        <p className="text-[10px] text-[#F5F0E6]/22 mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}
