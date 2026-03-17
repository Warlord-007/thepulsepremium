import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Clock, Share2, Eye, ArrowRight, Search, Tag, Mail } from 'lucide-react'
import NewsletterSignup from '../components/ui/NewsletterSignup' // we'll create this next

// Define the post type
interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  readTime: number
  views: number
  shares: number
  spreadScore: number
  featured: boolean
}

function PostCard({ p, featured = false, onAskAssistant }: { p: Post; featured?: boolean; onAskAssistant?: (title: string) => void }) {
  const [copied, setCopied] = useState(false)
  const share = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    navigator.clipboard?.writeText(`${window.location.origin}/blog/${p.slug}`)
  }

  const cardContent = (
    <>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-mono text-[#D4AF37]/48 uppercase tracking-widest">{p.category}</span>
        <span className="text-[#D4AF37]/18">·</span>
        <span className="text-[10px] text-[#F5F0E6]/28">{p.readTime}m read</span>
      </div>
      <h3 className={`font-serif ${featured ? 'text-2xl md:text-3xl' : 'text-base'} font-bold text-[#F5F0E6] leading-snug mb-2 group-hover:text-[#D4AF37] transition-colors`}>
        {p.title}
      </h3>
      <p className={`text-[#F5F0E6]/42 leading-relaxed mb-4 ${featured ? 'text-sm' : 'text-xs line-clamp-2'}`}>
        {p.excerpt}
      </p>
      <div className="flex flex-wrap gap-3 mb-4">
        {p.tags.map(t => (
          <span key={t} className="flex items-center gap-1 text-[10px] font-mono text-[#D4AF37]/48">
            <Tag size={9} />#{t}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-[#F5F0E6]/33">
          <span className="flex items-center gap-1"><Eye size={11} />{(p.views / 1000).toFixed(0)}K</span>
          <span className="flex items-center gap-1"><Share2 size={11} />{p.shares}</span>
          {featured && <span className="flex items-center gap-1"><TrendingUp size={11} />SPREAD {p.spreadScore}</span>}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={share}
            className="p-2 rounded-sm text-[#F5F0E6]/35 hover:text-[#D4AF37] transition-colors"
            style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.14)' }}
          >
            <Share2 size={13} />
          </button>
          <button
            onClick={() => onAskAssistant?.(p.title)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:gap-2.5 transition-all"
          >
            Ask Assistant <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </>
  )

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-sm overflow-hidden group"
        style={{
          background: 'rgba(26,26,26,0.95)',
          border: '1px solid rgba(212,175,55,0.24)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,#D4AF37,transparent)' }} />
        <div className="p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge-gold text-[10px]">Featured</span>
          </div>
          {cardContent}
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-sm p-5 group hover:border-[#D4AF37]/22 transition-colors"
    >
      {cardContent}
    </motion.article>
  )
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')

  useEffect(() => {
    document.title = 'Blog – ThePulsePremium'

    // Fetch posts from public JSON file
    fetch('/data/posts.json')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load posts:', err)
        setLoading(false)
      })
  }, [])

  // Extract unique categories from posts
  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))]

  const filtered = posts.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (!q || p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase()))
  )

  const featuredPosts = filtered.filter(p => p.featured)
  const regularPosts = filtered.filter(p => !p.featured)

  const handleAskAssistant = (articleTitle: string) => {
    // This will open the chat and prefill a message about this article
    // We need to integrate with the chat store; we'll implement later
    // For now, just open chat
    const event = new CustomEvent('openChatWithContext', { detail: { article: articleTitle } })
    window.dispatchEvent(event)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
        <div className="text-[#F5F0E6]/42">Loading articles…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <span className="badge-gold mb-4 inline-flex"><BookOpen size={11} /> Intelligence Library</span>
          <h1 className="font-serif text-5xl md:text-6xl font-black text-[#F5F0E6] mb-4">
            The <span className="text-shimmer">Pulse Blog</span>
          </h1>
          <p className="text-[#F5F0E6]/50 max-w-xl mx-auto text-lg">
            Deep dives, frameworks, and intelligence reports on AI, virality, wealth, and optimization.
          </p>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/38" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search articles…"
              className="w-full bg-[#1A1A1A]/60 text-sm text-[#F5F0E6] placeholder-[#F5F0E6]/22 rounded-sm pl-10 pr-4 py-3 outline-none"
              style={{ border: '1px solid rgba(212,175,55,0.2)' }}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap transition-all"
                style={{
                  background: cat === c ? 'rgba(212,175,55,0.12)' : 'transparent',
                  border: `1px solid ${cat === c ? 'rgba(212,175,55,0.38)' : 'rgba(212,175,55,0.1)'}`,
                  color: cat === c ? '#D4AF37' : 'rgba(245,240,230,0.42)'
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        {featuredPosts.length > 0 && (
          <div className="mb-10">
            <h2 className="font-serif text-lg font-bold text-[#F5F0E6] mb-4 flex items-center gap-2">
              <TrendingUp size={15} className="text-[#D4AF37]" /> Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {featuredPosts.map(p => (
                <PostCard key={p.id} p={p} featured onAskAssistant={handleAskAssistant} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <h2 className="font-serif text-lg font-bold text-[#F5F0E6] mb-4">
          {cat === 'All' ? 'All Articles' : cat}{' '}
          <span className="font-sans text-sm font-normal text-[#F5F0E6]/28">({regularPosts.length})</span>
        </h2>

        {regularPosts.length === 0 ? (
          <div className="text-center py-16 text-[#F5F0E6]/28">
            <BookOpen size={38} className="mx-auto mb-3 opacity-20" />
            <p>No articles match your search.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularPosts.map(p => (
              <PostCard key={p.id} p={p} onAskAssistant={handleAskAssistant} />
            ))}
          </div>
        )}

        {/* Newsletter Signup Section */}
        <div className="mt-16">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  )
}
