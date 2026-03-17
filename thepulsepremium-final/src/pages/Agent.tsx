import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bot, Brain, Clock, Zap, CheckCircle, Code2, Terminal, ArrowRight } from 'lucide-react'
import { useChatStore, AGENT_CONFIGS } from '../hooks/useChatStore'

const MEMORY_FEATURES = [
  'Session journal saved after every conversation',
  'Long-term preference extraction across sessions',
  'Daily briefing auto-generated at 6 AM ET',
  'Viral pattern scan runs every 4 hours',
  'Weekly memory digest compiled every Sunday',
]

const EVENTS = [
  'user.registered → personalized welcome message',
  'viral_hook.clicked → SPREAD analytics update',
  'content.shared → viral coefficient recalculation',
  'chat.session_ended → journal entry saved',
  'user.high_engagement → premium upgrade prompt',
]

const API_ENDPOINTS = [
  { method:'GET',    path:'/api/agents',                   desc:'List all available agents with live stats' },
  { method:'GET',    path:'/api/agents/:id',               desc:'Agent detail — name, status, messages served' },
  { method:'POST',   path:'/api/agents/:id/chat',          desc:'Send message, receive AI reply with sessionId' },
  { method:'GET',    path:'/api/agents/:id/suggestions',   desc:'Context-aware quick-reply suggestions' },
  { method:'DELETE', path:'/api/agents/:id/sessions/:id',  desc:'Clear session memory from Callboard store' },
]

const METHOD_COLOR: Record<string,string> = { GET:'#4ECDC4', POST:'#D4AF37', DELETE:'#FF6B6B' }

export default function Agent() {
  const { openChat } = useChatStore()
  useEffect(() => { document.title = 'AI Agents – ThePulsePremium' }, [])

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }} className="text-center mb-16">
          <span className="badge-gold mb-4 inline-flex"><Bot size={11} /> Callboard-Powered Agents</span>
          <h1 className="font-serif text-5xl md:text-6xl font-black text-[#F5F0E6] mb-4">Your <span className="text-shimmer">AI Agents</span></h1>
          <p className="text-[#F5F0E6]/50 max-w-xl mx-auto text-lg">Two specialist agents with memory, cron jobs, and real-time event triggers. Free AI via Gemini + Pollinations.ai.</p>
        </motion.div>

        {/* Agent cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {(['premium-concierge','viral-strategist'] as const).map((id, i) => {
            const cfg = AGENT_CONFIGS[id]
            return (
              <motion.div key={id} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2+i*0.1 }}
                className="relative rounded-sm overflow-hidden"
                style={{ background:'rgba(26,26,26,0.95)', border:'1px solid rgba(212,175,55,0.2)', backdropFilter:'blur(20px)' }}>
                <div className="absolute top-0 inset-x-0 h-px" style={{ background:'linear-gradient(90deg,transparent,#D4AF37,transparent)' }} />
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-5">
                    <motion.div animate={{ boxShadow:['0 0 10px rgba(212,175,55,0.2)','0 0 25px rgba(212,175,55,0.5)','0 0 10px rgba(212,175,55,0.2)'] }}
                      transition={{ duration:3, repeat:Infinity }}
                      className="w-12 h-12 rounded-sm flex items-center justify-center text-xl"
                      style={{ background:'rgba(212,175,55,0.08)', border:'1px solid rgba(212,175,55,0.25)' }}>{cfg.avatar}</motion.div>
                    <div>
                      <h2 className="font-serif text-xl font-bold text-[#F5F0E6]">{cfg.name}</h2>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow:'0 0 5px rgba(52,211,153,0.8)' }} />
                        <span className="text-[10px] text-[#F5F0E6]/38 uppercase tracking-widest">Online · Free AI</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#F5F0E6]/55 leading-relaxed mb-6">
                    {id === 'premium-concierge'
                      ? 'Sophisticated AI guide for AI tools, wealth building, productivity, and trending intelligence. Powered by Gemini or Pollinations.ai — completely free.'
                      : 'Bold creative agent using the SPREAD framework to score, analyze, and engineer viral content. Available 24/7 via free AI backends.'
                    }
                  </p>
                  <button onClick={() => openChat(id)} className="btn-gold w-full justify-center text-sm">
                    Start Conversation <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Memory + Events */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} className="glass-gold rounded-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.2)' }}>
                <Brain size={17} className="text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F5F0E6]">Memory System</h3>
            </div>
            <ul className="space-y-3">
              {MEMORY_FEATURES.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-[#F5F0E6]/65">
                  <CheckCircle size={13} className="text-[#D4AF37] shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} className="glass-gold rounded-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.2)' }}>
                <Clock size={17} className="text-[#D4AF37]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#F5F0E6]">Event Triggers</h3>
            </div>
            <ul className="space-y-3">
              {EVENTS.map(e => (
                <li key={e} className="flex items-start gap-2.5 text-sm text-[#F5F0E6]/65">
                  <Zap size={13} className="text-[#D4AF37] shrink-0 mt-0.5" />
                  <code className="font-mono text-xs leading-relaxed">{e}</code>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* API Reference */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="rounded-sm overflow-hidden"
          style={{ background:'rgba(8,8,8,0.97)', border:'1px solid rgba(212,175,55,0.2)' }}>
          <div className="flex items-center gap-3 px-6 py-4 border-b border-[#D4AF37]/13">
            <Code2 size={15} className="text-[#D4AF37]" />
            <h3 className="font-serif text-lg font-bold text-[#F5F0E6]">Agent REST API</h3>
            <a href="/api/docs" target="_blank" className="ml-auto text-xs text-[#D4AF37]/55 hover:text-[#D4AF37] transition-colors font-mono">GET /api/docs ↗</a>
          </div>
          <div className="p-6">
            {API_ENDPOINTS.map(ep => (
              <div key={ep.path} className="flex items-start gap-3 py-3 border-b border-[#D4AF37]/7 last:border-0">
                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded shrink-0 mt-0.5"
                  style={{ background:`${METHOD_COLOR[ep.method]}18`, color:METHOD_COLOR[ep.method] }}>{ep.method}</span>
                <div>
                  <code className="text-xs text-[#F5E7B2]/65 font-mono">{ep.path}</code>
                  <p className="text-xs text-[#F5F0E6]/38 mt-0.5">{ep.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-6 mb-6 rounded-sm overflow-hidden" style={{ background:'rgba(0,0,0,0.6)', border:'1px solid rgba(212,175,55,0.1)' }}>
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#D4AF37]/9">
              <Terminal size={11} className="text-[#D4AF37]/55" />
              <span className="text-[10px] font-mono text-[#D4AF37]/45 uppercase tracking-widest">Example</span>
            </div>
            <pre className="p-4 text-xs font-mono text-[#F5E7B2]/65 overflow-x-auto leading-relaxed">{`const res = await fetch('/api/agents/premium-concierge/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: "What AI tools should I use?" })
})
const { reply, sessionId } = await res.json()`}</pre>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
