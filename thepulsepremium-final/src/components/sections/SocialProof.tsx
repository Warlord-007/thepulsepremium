import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Users, Share2, Globe, Star, Zap } from 'lucide-react'

function useCounter(end: number, dur = 2200, go = false, isFloat = false) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!go) return
    let t0: number | null = null
    const step = (ts: number) => {
      if (!t0) t0 = ts
      const p = Math.min((ts - t0) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setN(Math.floor(e * (isFloat ? end * 10 : end)))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, dur, go, isFloat])
  return isFloat ? (n / 10).toFixed(1) : n.toLocaleString()
}

const STATS = [
  { icon:Users,      end:24891, suffix:'',   label:'Monthly Readers',    desc:'Growing 40% MoM' },
  { icon:Share2,     end:8432,  suffix:'+',  label:'Shares This Month',  desc:'Across 12 platforms' },
  { icon:TrendingUp, end:97,    suffix:'%',  label:'Accuracy Rate',      desc:'On trend predictions' },
  { icon:Globe,      end:142,   suffix:'',   label:'Countries Reached',  desc:'Global influence' },
  { icon:Star,       end:4.9,   suffix:'',   label:'Agent Rating',       desc:'From 2,100+ chats', isFloat:true },
  { icon:Zap,        end:12,    suffix:'ms', label:'Avg Response Time',  desc:'Real-time intelligence' },
]

const TESTIMONIALS = [
  { quote:"ThePulsePremium's Viral Strategist gave me a SPREAD score that predicted my next viral thread. 200K impressions.", author:'@elara_builds', role:'Indie Creator, 180K followers' },
  { quote:"The Premium Concierge recommended an AI stack that cut my agency's research time by 70%. ROI in week one.", author:'Marcus T.', role:'Agency Founder' },
  { quote:"I thought I understood viral content. Then I tried the Viral Lab. Everything changed.", author:'@pulsereader_k', role:'Growth Marketer' },
]

export default function SocialProof() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-80px' })
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-black text-[#F5F0E6] mb-3">By the <span className="text-shimmer">Numbers</span></h2>
          <p className="text-[#F5F0E6]/50 max-w-md mx-auto">Live metrics from ThePulsePremium community.</p>
          <div className="gold-divider" />
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
          {STATS.map(({ icon:Icon, end, suffix, label, desc, isFloat }) => {
            const display = useCounter(end, 2200, inView, isFloat)
            return (
              <motion.div key={label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                className="glass-gold rounded-sm p-6 group hover:border-[#D4AF37]/35 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                    style={{ background:'rgba(212,175,55,0.08)', border:'1px solid rgba(212,175,55,0.2)' }}>
                    <Icon size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="font-serif text-3xl font-black text-[#D4AF37]">{display}</span>
                      <span className="font-mono text-sm text-[#D4AF37]/70">{suffix}</span>
                    </div>
                    <div className="text-sm font-semibold text-[#F5F0E6] mt-0.5">{label}</div>
                    <div className="text-xs text-[#F5F0E6]/40 mt-0.5">{desc}</div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote key={t.author} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
              className="glass rounded-sm p-6">
              <div className="flex gap-0.5 mb-4">{Array.from({length:5}).map((_,j) => <Star key={j} size={13} fill="#D4AF37" className="text-[#D4AF37]" />)}</div>
              <p className="text-sm text-[#F5F0E6]/70 leading-relaxed mb-5 italic">"{t.quote}"</p>
              <footer>
                <div className="text-sm font-semibold text-[#D4AF37]">{t.author}</div>
                <div className="text-xs text-[#F5F0E6]/40 mt-0.5">{t.role}</div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
