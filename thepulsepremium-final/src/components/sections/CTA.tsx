import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, MessageSquare, TrendingUp } from 'lucide-react'
import { useChatStore } from '../../hooks/useChatStore'

export default function CTA() {
  const { openChat } = useChatStore()
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
          className="relative rounded-sm overflow-hidden text-center"
          style={{ background:'rgba(26,26,26,0.97)', border:'1px solid rgba(212,175,55,0.28)', boxShadow:'0 0 80px rgba(212,175,55,0.1), 0 0 160px rgba(212,175,55,0.05)' }}>
          <div className="absolute top-0 inset-x-0 h-px" style={{ background:'linear-gradient(90deg,transparent,#D4AF37,#FFD700,#D4AF37,transparent)' }} />
          <div className="absolute bottom-0 inset-x-0 h-px" style={{ background:'linear-gradient(90deg,transparent,#996515,#D4AF37,#996515,transparent)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 60%)' }} />
          <div className="relative z-10 px-8 py-16 md:py-20">
            <motion.div initial={{ scale:0 }} whileInView={{ scale:1 }} viewport={{ once:true }} transition={{ duration:0.5, type:'spring' }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-sm mb-6 mx-auto"
              style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.3)', boxShadow:'0 0 30px rgba(212,175,55,0.2)' }}>
              <Sparkles size={28} className="text-[#D4AF37]" />
            </motion.div>
            <h2 className="font-serif text-4xl md:text-5xl font-black text-[#F5F0E6] mb-4 leading-tight">
              Your Pulse Starts <span className="text-shimmer">Right Now</span>
            </h2>
            <p className="text-[#F5F0E6]/55 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands already leveraging ThePulsePremium's AI agents and viral intelligence to stay ahead, grow faster, and create smarter.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => openChat('premium-concierge')} className="btn-gold w-full sm:w-auto text-sm">
                <MessageSquare size={15} /> Start with Concierge <ArrowRight size={15} />
              </button>
              <button onClick={() => openChat('viral-strategist')} className="btn-outline w-full sm:w-auto text-sm">
                <TrendingUp size={15} /> Try Viral Strategist
              </button>
            </div>
            <p className="text-xs text-[#F5F0E6]/22 mt-6 uppercase tracking-widest">No signup required · Instant access · ThePulsePremium</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
