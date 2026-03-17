import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Share2, TrendingUp, ArrowUpRight, RefreshCw } from 'lucide-react'

const UGC = [
  { id:1, handle:'@sophia_builds', av:'SB', platform:'X (Twitter)', content:"Just ran my content through @ThePulsePremium's SPREAD analyzer. It scored my thread 8.9/10 for Provocative and 9.1 for Distributive. Posted at the 12-hour rule time. 180K impressions in 18 hours.", engagement:'12.4K likes', spread:9.0 },
  { id:2, handle:'@marcus_flux',   av:'MF', platform:'LinkedIn',    content:"The Premium Concierge recommended 4 AI tools I'd never heard of. Combined them into a workflow that handles 60% of my agency's research. ROI? $14K saved in month one.", engagement:'847 reactions', spread:8.4 },
  { id:3, handle:'@kai_viral',     av:'KV', platform:'TikTok',      content:"Made a video about the 'information arbitrage' hook from @ThePulsePremium. 2.1M views in 48 hours. The SPREAD framework is real. These aren't tips — they're formulas.", engagement:'2.1M views', spread:9.7 },
  { id:4, handle:'@priya_wealth',  av:'PW', platform:'X (Twitter)', content:"ThePulsePremium's daily trend briefing hit my inbox before Bloomberg this morning. Had the narrative framed before most traders even read the headline.", engagement:'6.8K shares', spread:8.9 },
  { id:5, handle:'@alex_content',  av:'AC', platform:'Instagram',   content:"I test AI tools for a living. ThePulsePremium's Viral Strategist gave me more actionable direction in 3 messages than most $2K consulting calls.", engagement:'4.2K saves', spread:8.6 },
  { id:6, handle:'@nina_loops',    av:'NL', platform:'Reddit',      content:"PSA: If you're not using ThePulsePremium for trend spotting, you're 72 hours behind. Their early-warning method predicted 4/4 major Twitter trends last week.", engagement:'2.1K upvotes', spread:9.2 },
]
const PC: Record<string,string> = { 'X (Twitter)':'#1DA1F2', LinkedIn:'#0077B5', TikTok:'#FF0050', Instagram:'#E1306C', Reddit:'#FF4500' }

export default function ViralLoop() {
  const [shown, setShown] = useState(4)
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-14">
          <span className="badge-gold mb-4 inline-flex"><Share2 size={11} /> The Viral Loop</span>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-[#F5F0E6] mb-3">Readers Who <span className="text-shimmer">Spread the Pulse</span></h2>
          <p className="text-[#F5F0E6]/50 max-w-lg mx-auto">Real results from members who applied the SPREAD framework.</p>
          <div className="gold-divider" />
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          <AnimatePresence>
            {UGC.slice(0, shown).map((u, i) => (
              <motion.div key={u.id} layout initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4, delay:i*0.04 }}
                className="break-inside-avoid glass rounded-sm p-5 group hover:border-[#D4AF37]/28 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background:'linear-gradient(135deg,#D4AF37,#996515)' }}>{u.av}</div>
                    <div>
                      <div className="text-sm font-semibold text-[#F5F0E6]">{u.handle}</div>
                      <div className="text-[10px] font-mono" style={{ color:PC[u.platform]??'#D4AF37' }}>{u.platform}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono text-[#D4AF37]/50">SPREAD</span>
                    <span className="text-[10px] font-bold text-[#D4AF37]">{u.spread}</span>
                    <ArrowUpRight size={11} className="text-[#D4AF37]/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <p className="text-sm text-[#F5F0E6]/70 leading-relaxed mb-3">{u.content}</p>
                <div className="flex items-center justify-between text-[10px] text-[#F5F0E6]/30">
                  <span className="flex items-center gap-1"><TrendingUp size={10} />{u.engagement}</span>
                </div>
                <div className="mt-3 h-0.5 bg-[#D4AF37]/8 rounded-full overflow-hidden">
                  <motion.div className="h-full" style={{ background:'linear-gradient(90deg,#996515,#D4AF37)' }}
                    initial={{ width:0 }} whileInView={{ width:`${u.spread*10}%` }} viewport={{ once:true }} transition={{ duration:1 }} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {shown < UGC.length && (
          <div className="flex justify-center mt-10">
            <button onClick={() => setShown(UGC.length)} className="btn-outline text-xs flex items-center gap-2">
              <RefreshCw size={13} /> Load More Stories
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
