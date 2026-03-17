import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Clock, Share2, Eye, ArrowRight, Search, Tag } from 'lucide-react'

const POSTS = [
  { id:'p1', slug:'ai-tools-replacing-workers', title:'The AI Tools Quietly Replacing Knowledge Workers in 2025', excerpt:'A deep-dive into the exact workflows Fortune 500 companies are using to automate previously human-only tasks — and the $49/month tools making it possible.', category:'AI Tools', tags:['AI','Automation','Future of Work'], readTime:8, views:48920, shares:2341, spreadScore:9.2, featured:true },
  { id:'p2', slug:'spread-framework-guide', title:'The Complete SPREAD Framework: Engineer Content That Goes Viral', excerpt:'Master the six dimensions of viral content engineering used by top creators with 10M+ combined followers.', category:'Viral Strategy', tags:['Viral','Content','SPREAD'], readTime:12, views:31200, shares:4892, spreadScore:9.7, featured:true },
  { id:'p3', slug:'information-arbitrage', title:'Information Arbitrage: The Wealth Strategy the 1% Use Daily', excerpt:'The tools, sources, and workflows giving the ultra-wealthy an information edge — now accessible for under $500/month.', category:'Wealth Building', tags:['Wealth','Information','Strategy'], readTime:10, views:67800, shares:5621, spreadScore:9.1, featured:false },
  { id:'p4', slug:'12-hour-rule', title:'The 12-Hour Rule: Game the Algorithm Without Paying for Ads', excerpt:'The timing pattern platforms never publish but top creators discovered through years of A/B testing.', category:'Growth', tags:['Viral','Algorithm','Growth'], readTime:6, views:42100, shares:3891, spreadScore:8.9, featured:false },
  { id:'p5', slug:'free-ai-tools-2025', title:'The Best Free AI Tools of 2025 (No Credit Card Required)', excerpt:'Google Gemini, Pollinations.ai, and 14 other powerful AI tools you can use right now for zero cost.', category:'AI Tools', tags:['AI','Free Tools','Productivity'], readTime:7, views:89300, shares:7210, spreadScore:9.5, featured:false },
  { id:'p6', slug:'morning-system-5-min', title:'The 5-Minute Morning System That Outperforms 2-Hour Routines', excerpt:'Top performers abandoned elaborate morning routines. Here is the minimal operating system that replaced them — and the neuroscience behind why it works.', category:'Productivity', tags:['Productivity','Health','Systems'], readTime:5, views:34500, shares:2900, spreadScore:8.3, featured:false },
]

const CATS = ['All','AI Tools','Viral Strategy','Wealth Building','Growth','Productivity']

function PostCard({ p, featured=false }: { p: typeof POSTS[0]; featured?: boolean }) {
  const [copied, setCopied] = useState(false)
  const share = () => { setCopied(true); setTimeout(()=>setCopied(false),2000); navigator.clipboard?.writeText(`${window.location.origin}/blog/${p.slug}`) }

  if (featured) return (
    <motion.article initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
      className="relative rounded-sm overflow-hidden group"
      style={{ background:'rgba(26,26,26,0.95)', border:'1px solid rgba(212,175,55,0.24)', backdropFilter:'blur(20px)' }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background:'linear-gradient(90deg,transparent,#D4AF37,transparent)' }} />
      <div className="p-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="badge-gold text-[10px]">Featured</span>
          <span className="text-[10px] text-[#F5F0E6]/32 font-mono">{p.category}</span>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-black text-[#F5F0E6] leading-tight mb-3 group-hover:text-[#D4AF37] transition-colors">{p.title}</h2>
        <p className="text-sm text-[#F5F0E6]/55 leading-relaxed mb-6">{p.excerpt}</p>
        <div className="flex flex-wrap gap-3 mb-6">
          {p.tags.map(t => <span key={t} className="flex items-center gap-1 text-[10px] font-mono text-[#D4AF37]/48"><Tag size={9} />#{t}</span>)}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-[#F5F0E6]/33">
            <span className="flex items-center gap-1"><Clock size={11} />{p.readTime}m read</span>
            <span className="flex items-center gap-1"><Eye size={11} />{(p.views/1000).toFixed(0)}K views</span>
            <span className="flex items-center gap-1"><TrendingUp size={11} />SPREAD {p.spreadScore}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={share} className="p-2 rounded-sm text-[#F5F0E6]/35 hover:text-[#D4AF37] transition-colors"
              style={{ background:'rgba(212,175,55,0.06)', border:'1px solid rgba(212,175,55,0.14)' }}>
              <Share2 size={13} />
            </button>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37] hover:gap-2.5 transition-all">
              Read Article <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  )

  return (
    <motion.article initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
      className="glass rounded-sm p-5 group hover:border-[#D4AF37]/22 transition-colors">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-mono text-[#D4AF37]/48 uppercase tracking-widest">{p.category}</span>
        <span className="text-[#D4AF37]/18">·</span>
        <span className="text-[10px] text-[#F5F0E6]/28">{p.readTime}m</span>
      </div>
      <h3 className="font-serif text-base font-bold text-[#F5F0E6] leading-snug mb-2 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
      <p className="text-xs text-[#F5F0E6]/42 leading-relaxed mb-4 line-clamp-2">{p.excerpt}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[10px] text-[#F5F0E6]/28">
          <span className="flex items-center gap-1"><Eye size={10} />{(p.views/1000).toFixed(0)}K</span>
          <span className="flex items-center gap-1"><Share2 size={10} />{p.shares}</span>
        </div>
        <span className="text-[10px] font-mono text-[#D4AF37]/38">SPREAD {p.spreadScore}</span>
      </div>
    </motion.article>
  )
}

export default function Blog() {
  const [cat, setCat] = useState('All')
  const [q, setQ]     = useState('')
  useEffect(() => { document.title = 'Blog – ThePulsePremium' }, [])

  const filtered = POSTS.filter(p =>
    (cat==='All'||p.category===cat) &&
    (!q||p.title.toLowerCase().includes(q.toLowerCase())||p.excerpt.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-14">
          <span className="badge-gold mb-4 inline-flex"><BookOpen size={11} /> Intelligence Library</span>
          <h1 className="font-serif text-5xl md:text-6xl font-black text-[#F5F0E6] mb-4">The <span className="text-shimmer">Pulse Blog</span></h1>
          <p className="text-[#F5F0E6]/50 max-w-xl mx-auto text-lg">Deep dives, frameworks, and intelligence reports on AI, virality, wealth, and optimization.</p>
        </motion.div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-sm">
            <Search size={13} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]/38" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search articles…"
              className="w-full bg-[#1A1A1A]/60 text-sm text-[#F5F0E6] placeholder-[#F5F0E6]/22 rounded-sm pl-10 pr-4 py-3 outline-none"
              style={{ border:'1px solid rgba(212,175,55,0.2)' }} />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className="px-3 py-2 rounded-sm text-xs font-medium whitespace-nowrap transition-all"
                style={{ background:cat===c?'rgba(212,175,55,0.12)':'transparent', border:`1px solid ${cat===c?'rgba(212,175,55,0.38)':'rgba(212,175,55,0.1)'}`, color:cat===c?'#D4AF37':'rgba(245,240,230,0.42)' }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Featured */}
        {cat==='All' && !q && (
          <div className="mb-10">
            <h2 className="font-serif text-lg font-bold text-[#F5F0E6] mb-4 flex items-center gap-2"><TrendingUp size={15} className="text-[#D4AF37]" /> Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-5 mb-10">
              {POSTS.filter(p=>p.featured).map(p => <PostCard key={p.id} p={p} featured />)}
            </div>
          </div>
        )}

        {/* Grid */}
        <h2 className="font-serif text-lg font-bold text-[#F5F0E6] mb-4">
          {cat==='All'?'All Articles':cat} <span className="font-sans text-sm font-normal text-[#F5F0E6]/28">({filtered.length})</span>
        </h2>
        {filtered.length===0
          ? <div className="text-center py-16 text-[#F5F0E6]/28"><BookOpen size={38} className="mx-auto mb-3 opacity-20" /><p>No articles match your search.</p></div>
          : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.map(p => <PostCard key={p.id} p={p} />)}</div>
        }

        {/* CMS prompt */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          className="mt-16 text-center glass-gold rounded-sm py-12 px-8">
          <BookOpen size={30} className="text-[#D4AF37]/35 mx-auto mb-3" />
          <h3 className="font-serif text-2xl font-bold text-[#F5F0E6] mb-2">More Intelligence Coming</h3>
          <p className="text-[#F5F0E6]/42 text-sm max-w-md mx-auto mb-4">New articles published weekly. Connect Contentful, Sanity, or Notion to <code className="font-mono text-[#D4AF37]/65 mx-1 text-xs">GET /api/blog</code> to publish instantly.</p>
          <span className="badge-gold text-[10px]">Ready for CMS integration</span>
        </motion.div>
      </div>
    </div>
  )
}
