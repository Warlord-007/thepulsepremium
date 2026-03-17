import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useChatStore } from '../../hooks/useChatStore'

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{ width: Math.random()*3+1, height: Math.random()*3+1, left:`${Math.random()*100}%`, top:`${Math.random()*100}%`, background: i%3===0?'#D4AF37':i%3===1?'#996515':'#F5E7B2' }}
          animate={{ y:[0,-70-Math.random()*50], opacity:[0,0.8,0], scale:[0,1,0] }}
          transition={{ duration: 4+Math.random()*4, repeat:Infinity, delay:Math.random()*8, ease:'easeOut' }}
        />
      ))}
    </div>
  )
}

function PulseWave() {
  return (
    <div className="flex items-center gap-[3px] h-8">
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div key={i} className="w-[3px] rounded-full bg-[#D4AF37]/60"
          animate={{ height:['6px',`${14+Math.sin(i*0.8)*12}px`,'6px'] }}
          transition={{ duration:1.3, repeat:Infinity, delay:i*0.07, ease:'easeInOut' }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const { openChat } = useChatStore()
  const canvasRef    = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx    = canvas.getContext('2d'); if (!ctx) return
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    let frame = 0, raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'rgba(212,175,55,0.04)'; ctx.lineWidth = 0.5
      const sp = 70, off = (frame * 0.15) % sp
      for (let x = -off; x < canvas.width + sp; x += sp) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,canvas.height); ctx.stroke() }
      for (let y = -off; y < canvas.height + sp; y += sp) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(canvas.width,y); ctx.stroke() }
      const scanY = (frame * 1.2) % (canvas.height + 160) - 80
      const g = ctx.createLinearGradient(0,scanY-50,0,scanY+50)
      g.addColorStop(0,'transparent'); g.addColorStop(0.5,'rgba(212,175,55,0.025)'); g.addColorStop(1,'transparent')
      ctx.fillStyle = g; ctx.fillRect(0, scanY-50, canvas.width, 100)
      frame++; raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  const C = { hidden:{}, show:{ transition:{ staggerChildren:0.1, delayChildren:0.2 } } }
  const I = { hidden:{ opacity:0, y:28 }, show:{ opacity:1, y:0, transition:{ duration:0.7, ease:[0.22,1,0.36,1] } } }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden noise">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 z-0" style={{ background:'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.07) 0%, rgba(153,101,21,0.04) 40%, transparent 70%)' }} />
      <div className="absolute bottom-0 inset-x-0 h-40 z-0" style={{ background:'linear-gradient(to top, #000, transparent)' }} />
      <Particles />

      <motion.div variants={C} initial="hidden" animate="show"
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 pb-16">
        <motion.div variants={I} className="flex justify-center mb-8">
          <span className="badge-gold"><Sparkles size={11} /> AI-Powered Viral Intelligence</span>
        </motion.div>

        <motion.h1 variants={I} className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-[1.04]">
          <span style={{ color:'#F5F0E6' }}>Your Pulse on</span><br />
          <span className="text-shimmer">What's Trending</span>
        </motion.h1>

        <motion.p variants={I} className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-4 font-light leading-relaxed" style={{ color:'rgba(245,240,230,0.58)' }}>
          ThePulsePremium delivers elite AI agents, viral content intelligence, and wealth-building insights — engineered to keep you ahead of every curve.
        </motion.p>

        <motion.div variants={I} className="flex justify-center mb-10"><PulseWave /></motion.div>

        <motion.div variants={I} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => openChat('premium-concierge')} className="btn-gold text-sm w-full sm:w-auto">
            Meet Your Concierge <ArrowRight size={15} />
          </button>
          <Link to="/viral" className="btn-outline text-sm w-full sm:w-auto">
            Explore Viral Lab <TrendingUp size={15} />
          </Link>
        </motion.div>

        <motion.div variants={I} className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-14">
          {[['24,000+','Monthly Readers'],['8,400+','Shares This Month'],['2 AI','Live Agents']].map(([v,l]) => (
            <div key={l} className="text-center">
              <div className="font-serif text-2xl font-bold" style={{ color:'#D4AF37' }}>{v}</div>
              <div className="text-xs uppercase tracking-widest mt-0.5" style={{ color:'rgba(245,240,230,0.4)' }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity, ease:'easeInOut' }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border:'1px solid rgba(212,175,55,0.3)' }}>
          <div className="w-1 h-2 rounded-full" style={{ background:'rgba(212,175,55,0.6)' }} />
        </motion.div>
      </div>
    </section>
  )
}
