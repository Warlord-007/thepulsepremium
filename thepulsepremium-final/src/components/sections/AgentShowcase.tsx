import { motion } from 'framer-motion'
import { Bot, Zap, Brain, Clock, Shield, ArrowRight } from 'lucide-react'
import { useChatStore } from '../../hooks/useChatStore'

const AGENTS = [
  {
    id: 'premium-concierge' as const,
    name: 'Premium Concierge', avatar: '🎩',
    tagline: 'Elegant. Knowledgeable. Always On.',
    desc: 'Your personal AI guide through the best ideas, tools, and opportunities. Calm authority, anticipates needs before you voice them.',
    caps: ['AI tool recommendations & comparisons','Wealth-building frameworks','Daily trend briefings','Premium content curation'],
    badge: 'Concierge Class',
  },
  {
    id: 'viral-strategist' as const,
    name: 'Viral Strategist', avatar: '⚡',
    tagline: 'Engineer Virality. Own the Algorithm.',
    desc: 'Bold, creative force that scores content through SPREAD, identifies viral angles, and architects distribution plans.',
    caps: ['SPREAD framework analysis','Viral hook generation','Platform timing strategies','Viral coefficient scoring'],
    badge: 'SPREAD Certified',
  },
]

const FEATURES = [
  { icon: Brain,  label: 'Long-term Memory', desc: 'Remembers your goals across sessions' },
  { icon: Clock,  label: 'Always Available',  desc: '24/7 instant response, zero wait' },
  { icon: Shield, label: 'Private & Secure',  desc: 'Conversations never used for training' },
  { icon: Zap,    label: 'Cron-Powered',      desc: 'Auto-runs trend analysis daily' },
]

export default function AgentShowcase() {
  const { openChat } = useChatStore()
  return (
    <section id="agents" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
          <span className="badge-gold mb-4 inline-flex"><Bot size={11} /> Powered by Callboard</span>
          <h2 className="font-serif text-4xl md:text-5xl font-black text-[#F5F0E6] mb-4">Meet Your <span className="text-shimmer">AI Agents</span></h2>
          <p className="text-[#F5F0E6]/50 max-w-xl mx-auto">Two specialist agents. Infinite intelligence. Backed by memory, cron jobs, and real-time event triggers.</p>
          <div className="gold-divider" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {AGENTS.map((a, i) => (
            <motion.div key={a.id}
              initial={{ opacity:0, x:i===0?-30:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              transition={{ duration:0.6, delay:i*0.12 }}
              className="relative rounded-sm overflow-hidden"
              style={{ background:'rgba(26,26,26,0.95)', border:'1px solid rgba(212,175,55,0.2)', backdropFilter:'blur(20px)' }}
            >
              <div className="absolute top-0 inset-x-0 h-px" style={{ background:'linear-gradient(90deg,transparent,#D4AF37,transparent)' }} />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ boxShadow:['0 0 10px rgba(212,175,55,0.2)','0 0 25px rgba(212,175,55,0.5)','0 0 10px rgba(212,175,55,0.2)'] }}
                      transition={{ duration:3, repeat:Infinity }}
                      className="w-13 h-13 w-12 h-12 rounded-sm flex items-center justify-center text-xl"
                      style={{ background:'rgba(212,175,55,0.08)', border:'1px solid rgba(212,175,55,0.25)' }}
                    >{a.avatar}</motion.div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#F5F0E6]">{a.name}</h3>
                      <p className="text-xs text-[#F5F0E6]/40 mt-0.5">{a.tagline}</p>
                    </div>
                  </div>
                  <span className="badge-gold text-[10px]">{a.badge}</span>
                </div>
                <p className="text-sm text-[#F5F0E6]/55 leading-relaxed mb-6">{a.desc}</p>
                <ul className="space-y-2 mb-8">
                  {a.caps.map(c => (
                    <li key={c} className="flex items-center gap-2.5 text-sm text-[#F5F0E6]/70">
                      <div className="w-1 h-1 rounded-full bg-[#D4AF37]" />{c}
                    </li>
                  ))}
                </ul>
                <button onClick={() => openChat(a.id)} className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#D4AF37] hover:gap-3 transition-all">
                  Start Conversation <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map(({ icon:Icon, label, desc }) => (
            <div key={label} className="glass-gold rounded-sm p-5 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.2)' }}>
                  <Icon size={16} className="text-[#D4AF37]" />
                </div>
              </div>
              <div className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest mb-1">{label}</div>
              <div className="text-xs text-[#F5F0E6]/45 leading-snug">{desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
