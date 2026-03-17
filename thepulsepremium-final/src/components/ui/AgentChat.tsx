import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2, Trash2 } from 'lucide-react'
import { useChatStore, AGENT_CONFIGS, type AgentId } from '../../hooks/useChatStore'

function Dots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0,1,2].map(i => (
        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
          animate={{ y:[0,-5,0], opacity:[0.4,1,0.4] }} transition={{ duration:0.8, repeat:Infinity, delay:i*0.15 }} />
      ))}
    </div>
  )
}

function Tab({ id, active, onClick }: { id: AgentId; active: boolean; onClick: () => void }) {
  const c = AGENT_CONFIGS[id]
  return (
    <button onClick={onClick} className="flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-medium transition-all"
      style={{ background:active?'rgba(212,175,55,0.14)':'transparent', color:active?'#D4AF37':'rgba(245,240,230,0.42)', border:`1px solid ${active?'rgba(212,175,55,0.3)':'transparent'}` }}>
      <span>{c.avatar}</span><span>{c.name}</span>
    </button>
  )
}

export default function AgentChat() {
  const { isOpen, activeAgent, messages, isLoading, aiProvider, closeChat, setAgent, sendMessage, clearMessages } = useChatStore()
  const [input, setInput]   = useState('')
  const [showSug, setShowS] = useState(true)
  const bottomRef           = useRef<HTMLDivElement>(null)
  const inputRef            = useRef<HTMLTextAreaElement>(null)
  const cfg     = AGENT_CONFIGS[activeAgent]
  const msgs    = messages[activeAgent]
  const hasMsgs = msgs.length > 0

  const SUGS = activeAgent === 'premium-concierge'
    ? ["What's trending in AI right now?", "Help me build a wealth stack", "Best productivity tools?"]
    : ["Score my content idea with SPREAD", "Give me 5 viral hooks for LinkedIn", "What's going viral this week?"]

  useEffect(() => { if (isOpen) { setTimeout(() => inputRef.current?.focus(), 300); setShowS(!hasMsgs) } }, [isOpen])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [msgs, isLoading])

  const send = async () => {
    const t = input.trim(); if (!t || isLoading) return
    setInput(''); setShowS(false); await sendMessage(t)
  }
  const onKey = (e: React.KeyboardEvent) => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send() } }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} onClick={closeChat}
            className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm" />
          <motion.div initial={{ opacity:0, y:40, scale:0.96 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0, y:40, scale:0.96 }}
            transition={{ duration:0.32, ease:[0.22,1,0.36,1] }}
            className="fixed bottom-0 sm:bottom-6 right-0 sm:right-6 z-50 w-full sm:w-[420px] h-[85vh] sm:h-[620px] flex flex-col rounded-t-xl sm:rounded-sm overflow-hidden"
            style={{ background:'rgba(8,8,8,0.98)', border:'1px solid rgba(212,175,55,0.24)', boxShadow:'0 0 60px rgba(212,175,55,0.14), 0 30px 80px rgba(0,0,0,0.85)', backdropFilter:'blur(24px)' }}>
            <div className="h-px shrink-0" style={{ background:'linear-gradient(90deg,transparent,#D4AF37,#FFD700,#D4AF37,transparent)' }} />

            {/* Header */}
            <div className="shrink-0 px-5 py-4 border-b border-[#D4AF37]/13">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-sm flex items-center justify-center text-lg shrink-0"
                    style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.2)' }}>{cfg.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold text-[#F5F0E6] font-serif">{cfg.name}</div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow:'0 0 5px rgba(52,211,153,0.8)' }} />
                      <span className="text-[10px] text-[#F5F0E6]/38 uppercase tracking-widest">
                        {aiProvider && aiProvider !== 'AI Ready' ? aiProvider : 'Online'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {hasMsgs && <button onClick={() => clearMessages(activeAgent)} className="p-1.5 text-[#F5F0E6]/28 hover:text-[#D4AF37]/70 transition-colors"><Trash2 size={13} /></button>}
                  <button onClick={closeChat} className="p-1.5 text-[#F5F0E6]/28 hover:text-[#F5F0E6] transition-colors"><X size={15} /></button>
                </div>
              </div>
              <div className="flex gap-2">
                <Tab id="premium-concierge" active={activeAgent==='premium-concierge'} onClick={() => setAgent('premium-concierge')} />
                <Tab id="viral-strategist"  active={activeAgent==='viral-strategist'}  onClick={() => setAgent('viral-strategist')} />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {!hasMsgs && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-sm flex items-center justify-center text-sm shrink-0 mt-0.5"
                    style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.2)' }}>{cfg.avatar}</div>
                  <div className="rounded-sm rounded-tl-none px-4 py-3 text-sm text-[#F5F0E6]/80 leading-relaxed"
                    style={{ background:'rgba(212,175,55,0.06)', border:'1px solid rgba(212,175,55,0.11)' }}>{cfg.greeting}</div>
                </div>
              )}
              {msgs.map(m => (
                <div key={m.id} className={`flex gap-3 ${m.role==='user'?'flex-row-reverse':''}`}>
                  {m.role==='assistant' && (
                    <div className="w-7 h-7 rounded-sm flex items-center justify-center text-sm shrink-0 mt-0.5"
                      style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.2)' }}>{cfg.avatar}</div>
                  )}
                  <div className={`max-w-[80%] rounded-sm px-4 py-3 text-sm leading-relaxed ${m.role==='user'?'rounded-tr-none':'rounded-tl-none'}`}
                    style={m.role==='user'
                      ? { background:'rgba(212,175,55,0.14)', border:'1px solid rgba(212,175,55,0.24)', color:'#F5F0E6' }
                      : { background:'rgba(26,26,26,0.92)', border:'1px solid rgba(212,175,55,0.09)', color:'rgba(245,240,230,0.84)' }
                    }>{m.content}</div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-sm flex items-center justify-center text-sm shrink-0 mt-0.5"
                    style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.2)' }}>{cfg.avatar}</div>
                  <div className="rounded-sm rounded-tl-none" style={{ background:'rgba(26,26,26,0.92)', border:'1px solid rgba(212,175,55,0.09)' }}>
                    <Dots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            <AnimatePresence>
              {showSug && !hasMsgs && (
                <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
                  className="px-4 pb-3 flex flex-wrap gap-2">
                  {SUGS.map(s => (
                    <button key={s} onClick={() => { setInput(s); setShowS(false); inputRef.current?.focus() }}
                      className="text-[11px] px-3 py-1.5 rounded-sm transition-all"
                      style={{ background:'rgba(212,175,55,0.06)', border:'1px solid rgba(212,175,55,0.18)', color:'rgba(245,240,230,0.58)' }}>{s}</button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="shrink-0 p-4 border-t border-[#D4AF37]/13">
              <div className="flex gap-2 items-end px-4 py-2.5 rounded-sm"
                style={{ background:'rgba(26,26,26,0.8)', border:'1px solid rgba(212,175,55,0.18)' }}>
                <textarea ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey}
                  placeholder={`Message ${cfg.name}…`} rows={1}
                  className="flex-1 bg-transparent text-sm text-[#F5F0E6] placeholder-[#F5F0E6]/22 resize-none outline-none leading-relaxed"
                  style={{ maxHeight:'90px', minHeight:'22px' }} />
                <button onClick={send} disabled={!input.trim()||isLoading}
                  className="shrink-0 w-8 h-8 rounded-sm flex items-center justify-center transition-all disabled:opacity-30"
                  style={{ background:input.trim()?'linear-gradient(135deg,#996515,#D4AF37)':'rgba(212,175,55,0.09)', color:'#000' }}>
                  {isLoading ? <Loader2 size={13} className="animate-spin text-[#D4AF37]" /> : <Send size={13} />}
                </button>
              </div>
              <p className="text-[9px] text-center text-[#F5F0E6]/18 mt-2 uppercase tracking-widest">
                ThePulsePremium · Free AI: Gemini + Pollinations.ai
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
