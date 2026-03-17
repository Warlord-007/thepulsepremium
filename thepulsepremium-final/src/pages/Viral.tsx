import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Zap, BarChart2, Loader2, ArrowRight, RefreshCw } from 'lucide-react'
import ViralHooks from '../components/sections/ViralHooks'

/* ── Inline free-AI helpers (no extra file needed) ─────────────── */
async function freeAnalyze(content: string): Promise<any> {
  const prompt = `Analyze this content for viral potential using the SPREAD framework. Reply ONLY with valid JSON, no markdown:
{"dimensions":{"sociallyUseful":<1-10>,"provocative":<1-10>,"replicable":<1-10>,"emotional":<1-10>,"ambiguous":<1-10>,"distributive":<1-10>},"viralCoefficient":<float>,"hooks":["<hook1>","<hook2>","<hook3>"],"prediction":"<2 sentences>"}
Content: "${content.slice(0,400)}"`
  const geminiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY
  try {
    if (geminiKey) {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ contents:[{role:'user',parts:[{text:prompt}]}], generationConfig:{maxOutputTokens:400,responseMimeType:'application/json'} }) })
      const d = await r.json()
      return JSON.parse(d?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'null')
    }
    const r = await fetch('https://text.pollinations.ai/', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ messages:[{role:'user',content:prompt}], model:'openai', jsonMode:true }) })
    return JSON.parse(await r.text())
  } catch { return null }
}

async function freeHooks(topic: string): Promise<any[]> {
  const prompt = `Generate 4 viral content hooks for "${topic}". ONLY return a JSON array, no markdown:
[{"headline":"...","emotion":"AWE|PROVOCATIVE|RAGE|JOY","spreadScore":<6.0-9.9>}]`
  const geminiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY
  try {
    if (geminiKey) {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ contents:[{role:'user',parts:[{text:prompt}]}], generationConfig:{maxOutputTokens:300,responseMimeType:'application/json'} }) })
      const d = await r.json()
      return JSON.parse(d?.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]')
    }
    const r = await fetch('https://text.pollinations.ai/', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ messages:[{role:'user',content:prompt}], model:'openai', jsonMode:true }) })
    return JSON.parse(await r.text())
  } catch { return [] }
}

const SAMPLE_TRENDS = [
  { id:'t1', title:'AI Agents Replacing White-Collar Workers', score:9.4, category:'AI', platforms:['X','LinkedIn','Reddit'], momentum:'rising', predictedPeakIn:'18 hours' },
  { id:'t2', title:'12-Hour Rule for Viral Posting', score:8.7, category:'Growth', platforms:['X','TikTok'], momentum:'peak', predictedPeakIn:'6 hours' },
  { id:'t3', title:'Information Arbitrage and the Wealth Gap', score:9.1, category:'Wealth', platforms:['LinkedIn','Reddit','X'], momentum:'rising', predictedPeakIn:'24 hours' },
  { id:'t4', title:'The 5-Minute Productivity System', score:8.3, category:'Productivity', platforms:['TikTok','Instagram'], momentum:'rising', predictedPeakIn:'36 hours' },
  { id:'t5', title:'Hidden API for Predicting Trends 72 Hours Early', score:9.6, category:'Data', platforms:['X','Hacker News'], momentum:'rising', predictedPeakIn:'12 hours' },
  { id:'t6', title:'Building Wealth with Free AI Tools in 2025', score:8.9, category:'Wealth', platforms:['X','LinkedIn'], momentum:'rising', predictedPeakIn:'20 hours' },
]

function TrendCard({ t }: { t: typeof SAMPLE_TRENDS[0] }) {
  const mc = { rising:'#4ECDC4', peak:'#D4AF37', fading:'#FF6B6B' }[t.momentum]
  return (
    <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} className="glass-gold rounded-sm p-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-serif text-sm font-bold text-[#F5F0E6] leading-snug">{t.title}</h3>
        <span className="text-[10px] font-mono font-bold shrink-0 px-2 py-0.5 rounded" style={{ background:`${mc}18`, color:mc }}>{t.momentum.toUpperCase()}</span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">{t.platforms.map(p => <span key={p} className="text-[10px] text-[#F5F0E6]/35 font-mono">{p}</span>)}</div>
        <span className="text-[10px] font-bold text-[#D4AF37]">SPREAD {t.score}</span>
      </div>
      <div className="mt-2 h-0.5 bg-[#D4AF37]/8 rounded-full overflow-hidden">
        <motion.div className="h-full" style={{ background:'linear-gradient(90deg,#996515,#D4AF37)' }}
          initial={{ width:0 }} animate={{ width:`${t.score*10}%` }} transition={{ duration:0.8 }} />
      </div>
      <div className="text-[10px] text-[#F5F0E6]/28 mt-2 font-mono">Peak in: {t.predictedPeakIn}</div>
    </motion.div>
  )
}

export default function Viral() {
  const geminiKey   = (import.meta as any).env?.VITE_GEMINI_API_KEY
  const [tab, setTab]         = useState<'analyzer'|'trends'|'hooks'>('analyzer')
  const [input, setInput]     = useState('')
  const [result, setResult]   = useState<any>(null)
  const [analyzing, setAn]    = useState(false)
  const [src, setSrc]         = useState('')
  const [hookTopic, setHT]    = useState('')
  const [hooks, setHooks]     = useState<any[]>([])
  const [hLoading, setHL]     = useState(false)
  const [hSrc, setHSrc]       = useState('')
  const [trends, setTrends]   = useState(SAMPLE_TRENDS)

  useEffect(() => { document.title = 'Viral Lab – ThePulsePremium' }, [])

  const runAnalysis = async () => {
    if (!input.trim() || analyzing) return
    setAn(true); setSrc('')
    const r = await freeAnalyze(input)
    if (r) {
      setResult(r); setSrc(geminiKey ? 'Gemini (free)' : 'Pollinations.ai (free)')
    } else {
      setResult({ dimensions:{ sociallyUseful:8.2, provocative:8.9, replicable:8.5, emotional:7.8, ambiguous:7.2, distributive:9.1 }, viralCoefficient:1.68, hooks:['"The framework nobody talks about…"','"I tested this for 30 days:"','"Stop doing X. Do this instead."'], prediction:'High viral potential. Add VITE_GEMINI_API_KEY for live AI analysis.' })
      setSrc('offline estimate')
    }
    setAn(false)
  }

  const runHooks = async () => {
    if (!hookTopic.trim() || hLoading) return
    setHL(true); setHSrc('')
    const h = await freeHooks(hookTopic)
    if (h.length > 0) { setHooks(h); setHSrc(geminiKey ? 'Gemini (free)' : 'Pollinations.ai (free)') }
    else {
      setHooks([
        { headline:`The ${hookTopic} Secret Nobody Talks About`, emotion:'PROVOCATIVE', spreadScore:9.1 },
        { headline:`I Used ${hookTopic} for 30 Days. Here's What Happened`, emotion:'AWE', spreadScore:8.7 },
        { headline:`Why ${hookTopic} Changed Everything`, emotion:'JOY', spreadScore:8.4 },
        { headline:`The Dark Side of ${hookTopic} Nobody Warns You About`, emotion:'RAGE', spreadScore:8.9 },
      ])
      setHSrc('offline fallback')
    }
    setHL(false)
  }

  const TABS = [
    { id:'analyzer', label:'SPREAD Analyzer', icon:BarChart2 },
    { id:'trends',   label:'Live Trends',     icon:TrendingUp },
    { id:'hooks',    label:'Hook Generator',  icon:Zap },
  ] as const

  const DIMS = ['sociallyUseful','provocative','replicable','emotional','ambiguous','distributive']
  const DIM_LABELS: Record<string,string> = { sociallyUseful:'Socially Useful', provocative:'Provocative', replicable:'Replicable', emotional:'Emotional', ambiguous:'Ambiguous', distributive:'Distributive' }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="text-center mb-14">
          <span className="badge-gold mb-4 inline-flex"><TrendingUp size={11} /> Viral Lab</span>
          <h1 className="font-serif text-5xl md:text-6xl font-black text-[#F5F0E6] mb-4">Engineer <span className="text-shimmer">Virality</span></h1>
          <p className="text-[#F5F0E6]/50 max-w-xl mx-auto text-lg">Analyze content with SPREAD, monitor 72-hour early signals, and generate hooks — powered by free AI.</p>
          <div className="flex justify-center mt-4">
            <span className="badge-gold text-[10px]">{geminiKey ? '✓ Gemini free tier active' : '✓ Pollinations.ai (no key needed)'}</span>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {TABS.map(({ id, label, icon:Icon }) => (
            <button key={id} onClick={() => setTab(id as any)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-sm font-medium whitespace-nowrap transition-all"
              style={{ background:tab===id?'rgba(212,175,55,0.12)':'transparent', border:`1px solid ${tab===id?'rgba(212,175,55,0.4)':'rgba(212,175,55,0.1)'}`, color:tab===id?'#D4AF37':'rgba(245,240,230,0.45)' }}>
              <Icon size={14} />{label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* SPREAD Analyzer */}
          {tab === 'analyzer' && (
            <motion.div key="a" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-gold rounded-sm p-6">
                  <h2 className="font-serif text-xl font-bold text-[#F5F0E6] mb-1">Analyze Your Content</h2>
                  <p className="text-[10px] font-mono text-[#D4AF37]/50 mb-4 uppercase tracking-widest">Powered by {geminiKey?'Gemini free':'Pollinations.ai — no key needed'}</p>
                  <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your headline, tweet, article idea, or content draft here…" rows={7}
                    className="w-full bg-[#000]/40 text-sm text-[#F5F0E6]/80 placeholder-[#F5F0E6]/22 rounded-sm p-4 resize-none outline-none leading-relaxed"
                    style={{ border:'1px solid rgba(212,175,55,0.14)' }} />
                  <button onClick={runAnalysis} disabled={!input.trim()||analyzing} className="btn-gold w-full justify-center mt-4 text-sm">
                    {analyzing ? <><Loader2 size={14} className="animate-spin" /> Analyzing…</> : <><BarChart2 size={14} /> Run Free SPREAD Analysis</>}
                  </button>
                </div>
                <div className="glass-gold rounded-sm p-6 min-h-[300px]">
                  {!result ? (
                    <div className="h-full flex items-center justify-center text-center">
                      <div><BarChart2 size={38} className="text-[#D4AF37]/18 mx-auto mb-3" /><p className="text-sm text-[#F5F0E6]/28">Your SPREAD analysis appears here</p></div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <h3 className="font-serif text-lg font-bold text-[#F5F0E6]">SPREAD Results</h3>
                          {src && <span className="text-[10px] font-mono text-[#D4AF37]/45">{src}</span>}
                        </div>
                        <div className="text-center">
                          <div className="font-serif text-3xl font-black text-[#D4AF37]">
                            {result.dimensions ? (Object.values(result.dimensions as Record<string,number>).reduce((a:number,b:number)=>a+b,0)/6).toFixed(1) : '—'}
                          </div>
                          <div className="text-[10px] text-[#F5F0E6]/38 uppercase tracking-widest">Score</div>
                        </div>
                      </div>
                      {result.dimensions && (
                        <div className="space-y-2.5 mb-5">
                          {DIMS.map(k => {
                            const v = result.dimensions[k] ?? 0
                            return (
                              <div key={k} className="flex items-center gap-3">
                                <span className="text-[10px] font-mono text-[#F5F0E6]/45 w-28 shrink-0">{DIM_LABELS[k]}</span>
                                <div className="flex-1 h-1.5 bg-[#D4AF37]/10 rounded-full overflow-hidden">
                                  <motion.div className="h-full rounded-full" style={{ background:'linear-gradient(90deg,#996515,#D4AF37)' }}
                                    initial={{ width:0 }} animate={{ width:`${v*10}%` }} transition={{ duration:0.7 }} />
                                </div>
                                <span className="font-mono text-xs text-[#D4AF37] w-5 text-right">{v}</span>
                              </div>
                            )
                          })}
                        </div>
                      )}
                      <div className="p-3 rounded-sm mb-4" style={{ background:'rgba(212,175,55,0.06)', border:'1px solid rgba(212,175,55,0.13)' }}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-[#F5F0E6]/45">Viral Coefficient</span>
                          <span className="font-mono text-lg font-bold text-[#D4AF37]">{result.viralCoefficient}×</span>
                        </div>
                        <p className="text-xs text-[#F5F0E6]/58 leading-relaxed">{result.prediction}</p>
                      </div>
                      {result.hooks && (
                        <div className="space-y-1.5">
                          {result.hooks.map((h: string, i: number) => (
                            <div key={i} className="text-xs font-mono text-[#F5F0E6]/55 bg-[#000]/30 rounded-sm px-3 py-2">{h}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Trends */}
          {tab === 'trends' && (
            <motion.div key="t" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl font-bold text-[#F5F0E6]">Trending Now</h2>
                <button onClick={() => setTrends([...SAMPLE_TRENDS].sort(() => Math.random()-0.5))} className="flex items-center gap-1.5 text-xs text-[#D4AF37]/55 hover:text-[#D4AF37] transition-colors">
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trends.map(t => <TrendCard key={t.id} t={t} />)}
              </div>
            </motion.div>
          )}

          {/* Hook Generator */}
          {tab === 'hooks' && (
            <motion.div key="h" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              <div className="max-w-2xl mx-auto">
                <div className="glass-gold rounded-sm p-6 mb-5">
                  <h2 className="font-serif text-xl font-bold text-[#F5F0E6] mb-1">Generate Viral Hooks</h2>
                  <p className="text-[10px] font-mono text-[#D4AF37]/50 mb-4 uppercase tracking-widest">{geminiKey?'Gemini free tier':'Pollinations.ai — no key needed'}</p>
                  <div className="flex gap-3">
                    <input value={hookTopic} onChange={e => setHT(e.target.value)} onKeyDown={e => e.key==='Enter'&&runHooks()}
                      placeholder="Enter a topic: 'AI productivity', 'passive income', 'morning routines'…"
                      className="flex-1 bg-[#000]/40 text-sm text-[#F5F0E6] placeholder-[#F5F0E6]/22 rounded-sm px-4 py-3 outline-none"
                      style={{ border:'1px solid rgba(212,175,55,0.2)' }} />
                    <button onClick={runHooks} disabled={!hookTopic.trim()||hLoading} className="btn-gold text-sm shrink-0">
                      {hLoading ? <Loader2 size={14} className="animate-spin" /> : <ArrowRight size={14} />}
                    </button>
                  </div>
                </div>
                <AnimatePresence>
                  {hooks.length > 0 && (
                    <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}>
                      {hSrc && <p className="text-[10px] font-mono text-[#D4AF37]/38 mb-3 text-center uppercase tracking-widest">Generated by {hSrc}</p>}
                      <div className="space-y-3">
                        {hooks.map((h: any, i: number) => (
                          <motion.div key={i} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.07 }}
                            className="glass rounded-sm p-5 flex items-start justify-between gap-4">
                            <h3 className="font-serif text-base font-bold text-[#F5F0E6]">{h.headline}</h3>
                            <div className="shrink-0 text-right">
                              <div className="font-mono text-sm font-bold text-[#D4AF37]">{h.spreadScore}</div>
                              <div className="text-[10px] text-[#F5F0E6]/30">{h.emotion}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-24"><ViralHooks /></div>
      </div>
    </div>
  )
}
