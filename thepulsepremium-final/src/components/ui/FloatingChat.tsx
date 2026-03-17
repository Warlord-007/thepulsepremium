import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare } from 'lucide-react'
import { useChatStore } from '../../hooks/useChatStore'
import AgentChat from './AgentChat'

export default function FloatingChat() {
  const { isOpen, openChat } = useChatStore()
  return (
    <>
      <AgentChat />
      <AnimatePresence>
        {!isOpen && (
          <motion.div initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0, opacity:0 }}
            transition={{ type:'spring', stiffness:300, damping:20 }}
            className="fixed bottom-6 right-6 z-40">
            <motion.button onClick={() => openChat()} whileHover={{ scale:1.08 }} whileTap={{ scale:0.95 }}
              className="relative w-14 h-14 rounded-sm flex items-center justify-center"
              style={{ background:'linear-gradient(135deg,#996515 0%,#D4AF37 60%,#FFD700 100%)', boxShadow:'0 0 30px rgba(212,175,55,0.5), 0 4px 20px rgba(0,0,0,0.6)' }}
              aria-label="Open AI Agent Chat">
              <MessageSquare size={22} className="text-black" fill="black" />
              <motion.div className="absolute inset-0 rounded-sm"
                animate={{ scale:[1,1.4], opacity:[0.6,0] }} transition={{ duration:2, repeat:Infinity, ease:'easeOut' }}
                style={{ border:'1px solid rgba(212,175,55,0.6)' }} />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-black bg-emerald-400"
                style={{ boxShadow:'0 0 6px rgba(52,211,153,0.8)' }} />
            </motion.button>
            <motion.div initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} transition={{ delay:2 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none px-3 py-1.5 rounded-sm"
              style={{ background:'rgba(10,10,10,0.96)', border:'1px solid rgba(212,175,55,0.28)' }}>
              <span className="text-xs text-[#D4AF37] font-semibold">AI Agents Online</span>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0"
                style={{ borderTop:'5px solid transparent', borderBottom:'5px solid transparent', borderLeft:'5px solid rgba(212,175,55,0.28)' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
