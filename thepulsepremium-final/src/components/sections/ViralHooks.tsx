import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, Eye, Lock, TrendingUp, Zap, Heart, MessageCircle } from 'lucide-react'

const HOOKS = [
  {
    id:'h1', headline:'The AI Tool That Replaced a $200K/yr Employee',
    teaser:'A Fortune 500 CFO quietly automated 80% of their analyst team. The tool costs $49/month.',
    reveal:'The workflow: Claude AI + Zapier + Google Sheets. The CFO trained Claude with 3 years of financial models, then built a Zap that auto-generates weekly reports, flags anomalies, and drafts board summaries. The analyst role became one junior staff member auditing AI outputs. Saving: $187K/year in salary. This playbook works in legal, marketing, HR, and ops.',
    emotion:'AWE', emotionIcon:Zap, spreadScore:9.4, shares:12847, views:284920, tags:['AI','Wealth','Automation'],
  },
  {
    id:'h2', headline:'Nobody Talks About the "12-Hour Rule" for Virality',
    teaser:'The top 0.1% of viral posts share one timing pattern that platforms actively suppress.',
    reveal:'Post your best content at 11 PM in your target timezone. Algorithms measure engagement rate in the first 60 minutes — night audiences are 40% smaller, so your rate spikes even with lower raw numbers. By morning, the algo has flagged you as high-engagement and pushes organically. Creators using this see 3–7x more reach than identical content posted at "optimal" times.',
    emotion:'PROVOCATIVE', emotionIcon:TrendingUp, spreadScore:8.7, shares:9234, views:198340, tags:['Viral','Strategy','Growth'],
  },
  {
    id:'h3', headline:'The Wealth Gap Nobody Mentions: Information Arbitrage',
    teaser:"The ultra-wealthy don't just have more money. They have access to a different internet.",
    reveal:'Information arbitrage is the silent wealth multiplier. The wealthy consume signals — private deal flow, pre-announcement research, regulatory filings before press releases, Tier-1 academic papers 6–18 months before mainstream media. Tools that required $50K/yr institutional access are now available for <$500/month: Bloomberg alternatives, SEC EDGAR alerts, preprint aggregators, private Slack communities with operators and founders.',
    emotion:'RAGE', emotionIcon:Heart, spreadScore:9.1, shares:15621, views:412800, tags:['Wealth','Information','Power'],
  },
  {
    id:'h4', headline:'This 5-Minute Morning System Outperforms 2-Hour Routines',
    teaser:"Top performers quietly abandoned elaborate morning routines. Here's what replaced them.",
    reveal:'The 5-Minute OS: 90s box breathing → 60s reviewing your single Most Important Outcome → 90s writing the first sentence of your hardest task → 60s cold water on wrists. Science: decision fatigue peaks in the first 2 hours of waking. Long routines consume this premium window on meta-activities. TMOS preserves it for actual deep work.',
    emotion:'JOY', emotionIcon:Heart, spreadScore:8.3, shares:7891, views:163400, tags:['Productivity','Life','Health'],
  },
  {
    id:'h5', headline:'The Hidden API That Predicts Trending Topics 72hrs Early',
    teaser:'Before something trends on X or TikTok, it\'s already visible in one obscure data source.',
    reveal:'Google Trends "Related Queries" (rising) + Reddit /r/all "Hot" sorted by "new" + Wikipedia "Recent Changes" cross-referenced. When a topic appears in all three within 24 hours, it trends on mainstream social within 48–72 hours with >85% reliability. Build a Python script to poll these hourly and look for keyword overlap. Journalists, traders, and creators have used variations for years.',
    emotion:'AWE', emotionIcon:MessageCircle, spreadScore:9.6, shares:18942, views:520100, tags:['AI','Data','Viral'],
  },
]

const ECOLORS: Record<string,string> = { AWE:'#D4AF37', PROVOCATIVE:'#FF6B35', RAGE:'#FF3B3B', JOY:'#4ECDC4' }

function HookCard({ hook }: { hook: typeof HOOKS[0] }) {
  const [revealed, setReveal] = useState(false)
  const [shared, setShared]   = useState(false)
  const Icon = hook.emotionIcon
  const ec   = ECOLORS[hook.emotion]

  const share = (e: React.MouseEvent) => {
    e.stopPropagation(); setShared(true); setTimeout(() => setShared(false), 2000)
    navigator.clipboard?.writeText(`${hook.headline}\n\n${hook.teaser}\n\n— ThePulsePremium`)
  }

  return (
    <motion.article
      layout initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'-40px' }}
      transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
      onClick={() => setReveal(v => !v)} className="relative cursor-pointer rounded-sm overflow-hidden"
      style={{ background:'rgba(26,26,26,0.85)', border:`1px solid ${revealed?'rgba(212,175,55,0.45)':'rgba(212,175,55,0.14)'}`, backdropFilter:'blur(16px)', boxShadow:revealed?'0 0 40px rgba(212,175,55,0.12)':'none', transition:'border-color 0.3s, box-shadow 0.3s' }}
    >
      {/* SPREAD score bar */}
      <div className="absolute top-0 left-0 h-0.5 w-full" style={{ background:'#1A1A1A' }}>
        <motion.div className="h-full" style={{ background:'linear-gradient(90deg,#996515,#D4AF37,#FFD700)' }}
          initial={{ width:0 }} whileInView={{ width:`${hook.spreadScore*10}%` }} viewport={{ once:true }}
          transition={{ duration:1, delay:0.3 }} />
      </div>
      <div className="absolute top-4 right-4"><span className="badge-gold text-[10px]">{hook.tags[0]}</span></div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Icon size={13} style={{ color:ec }} />
          <span className="text-xs font-mono font-bold tracking-widest" style={{ color:ec }}>{hook.emotion}</span>
          <span className="text-xs text-[#F5F0E6]/30 ml-auto font-mono">SPREAD {hook.spreadScore}</span>
        </div>
        <h3 className="font-serif text-lg font-bold text-[#F5F0E6] mb-3 leading-snug pr-14">{hook.headline}</h3>
        <p className="text-sm text-[#F5F0E6]/55 leading-relaxed mb-4">{hook.teaser}</p>

        <AnimatePresence mode="wait">
          {!revealed
            ? <motion.div key="lock" initial={{ opacity:1 }} exit={{ opacity:0 }} className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color:'rgba(212,175,55,0.65)' }}>
                <Lock size={11} /> Tap to reveal full intelligence
              </motion.div>
            : <motion.div key="reveal" initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }} transition={{ duration:0.4 }}>
                <div className="border-t border-[#D4AF37]/20 pt-4 mb-4">
                  <p className="text-sm text-[#F5E7B2]/80 leading-relaxed">{hook.reveal}</p>
                </div>
              </motion.div>
          }
        </AnimatePresence>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#D4AF37]/10">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-[#F5F0E6]/35"><Share2 size={11} />{hook.shares.toLocaleString()}</span>
            <span className="flex items-center gap-1.5 text-xs text-[#F5F0E6]/35"><Eye size={11} />{(hook.views/1000).toFixed(0)}K</span>
          </div>
          <button onClick={share} className="p-1.5 rounded transition-all" style={{ background:shared?'rgba(212,175,55,0.2)':'rgba(212,175,55,0.07)', border:'1px solid rgba(212,175,55,0.25)', color:'#D4AF37' }}>
            <Share2 size={11} />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default function ViralHooks() {
  return (
    <section id="viral-hooks" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
          <span className="badge-gold mb-4 inline-flex"><TrendingUp size={11} /> SPREAD Framework</span>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-[#F5F0E6] mb-4">
            Viral Hooks That <span className="text-shimmer">Spread</span>
          </h2>
          <p className="text-[#F5F0E6]/50 max-w-xl mx-auto">Tap any card to unlock the full intelligence behind the headline.</p>
          <div className="gold-divider" />
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {HOOKS.map(hook => <HookCard key={hook.id} hook={hook} />)}
        </div>
      </div>
    </section>
  )
}
