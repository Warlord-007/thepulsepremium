import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Share2, Eye, ArrowRight, Search, Tag } from 'lucide-react'
import VoteButtons from '../components/ui/VoteButtons'

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
  votes?: number
}

function PostCard({ p, featured = false, onAskAssistant }: { p: Post; featured?: boolean; onAskAssistant?: (title: string) => void }) {
  const [copied, setCopied] = useState(false)
  const share = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    navigator.clipboard?.writeText(`${window.location.origin}/blog/${p.slug}`)
  }

  return (
    <div className={`card-reddit group ${featured ? 'p-6' : 'p-4'}`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <VoteButtons postId={p.id} initialScore={p.votes || 0} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-[#818384] mb-1">
            <span className="uppercase">{p.category}</span>
            <span>·</span>
            <span>{p.readTime} min read</span>
          </div>
          <h3 className={`font-bold text-[#F5F0E6] hover:text-[#FF4500] transition-colors ${featured ? 'text-xl' : 'text-base'}`}>
            {p.title}
          </h3>
          {featured && <p className="text-sm text-[#818384] mt-2 line-clamp-2">{p.excerpt}</p>}
          <div className="flex flex-wrap gap-2 mt-2 text-xs text-[#818384]">
            {p.tags.map(t => (
              <span key={t} className="flex items-center gap-1">#{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-[#818384]">
            <span className="flex items-center gap-1"><Eye size={14} />{(p.views / 1000).toFixed(0)}K</span>
            <button onClick={share} className="flex items-center gap-1 hover:text-[#FF4500]">
              <Share2 size={14} /> {p.shares}
            </button>
            <button
              onClick={() => onAskAssistant?.(p.title)}
              className="flex items-center gap-1 hover:text-[#FF4500]"
            >
              Ask Assistant <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')

  useEffect(() => {
    document.title = 'Blog – ThePulsePremium'
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

  const categories = ['All', ...Array.from(new Set(posts.map(p => p.category)))]
  const filtered = posts.filter(p =>
    (cat === 'All' || p.category === cat) &&
    (!q || p.title.toLowerCase().includes(q.toLowerCase()) || p.excerpt.toLowerCase().includes(q.toLowerCase()))
  )
  const featuredPosts = filtered.filter(p => p.featured)
  const regularPosts = filtered.filter(p => !p.featured)

  const handleAskAssistant = (articleTitle: string) => {
    window.dispatchEvent(new CustomEvent('openChatWithContext', { detail: { article: articleTitle } }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F10] pt-24 pb-20 px-6 flex items-center justify-center">
        <div className="text-[#818384]">Loading articles…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F10] pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <h1 className="font-serif text-5xl md:text-6xl font-black text-[#F5F0E6] mb-4">
            The <span className="text-[#FF4500]">Pulse Blog</span>
          </h1>
          <p className="text-[#818384] max-w-xl mx-auto text-lg">
            Deep dives, frameworks, and intelligence reports on AI, virality, wealth, and optimization.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#818384]" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search articles…"
              className="w-full bg-[#1A1A1B] text-sm text-[#F5F0E6] placeholder-[#818384] rounded-sm pl-10 pr-4 py-3 outline-none border border-[#343536] focus:border-[#FF4500]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap transition-all border ${
                  cat === c
                    ? 'bg-[#FF4500] text-white border-[#FF4500]'
                    : 'bg-transparent text-[#818384] border-[#343536] hover:border-[#FF4500] hover:text-[#FF4500]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {featuredPosts.length > 0 && (
          <div className="mb-10">
            <h2 className="font-serif text-lg font-bold text-[#F5F0E6] mb-4 flex items-center gap-2">
              <TrendingUp size={15} className="text-[#FF4500]" /> Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {featuredPosts.map(p => (
                <PostCard key={p.id} p={p} featured onAskAssistant={handleAskAssistant} />
              ))}
            </div>
          </div>
        )}

        <h2 className="font-serif text-lg font-bold text-[#F5F0E6] mb-4">
          {cat === 'All' ? 'All Articles' : cat}{' '}
          <span className="font-sans text-sm font-normal text-[#818384]">({regularPosts.length})</span>
        </h2>

        {regularPosts.length === 0 ? (
          <div className="text-center py-16 text-[#818384]">
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
      </div>
    </div>
  )
}
