import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { useChatStore } from '../../hooks/useChatStore'

const NAV = [
  { href: '/',       label: 'Home'      },
  { href: '/agent',  label: 'AI Agents' },
  { href: '/viral',  label: 'Viral Lab' },
  { href: '/blog',   label: 'Blog'      },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location                = useLocation()
  const { openChat }            = useChatStore()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => setOpen(false), [location])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.14)' : '1px solid transparent',
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full border border-[#D4AF37]/40 group-hover:border-[#D4AF37]/80 transition-colors" />
              <div className="absolute inset-[3px] rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                <Zap size={13} className="text-[#D4AF37]" fill="#D4AF37" />
              </div>
            </div>
            <span className="font-serif font-bold text-lg tracking-tight">
              <span className="text-shimmer">ThePulse</span><span className="text-[#D4AF37]">Premium</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {NAV.map(({ href, label }) => {
              const active = location.pathname === href
              return (
                <Link key={href} to={href}
                  className="relative text-sm font-medium tracking-wide group transition-colors"
                  style={{ color: active ? '#D4AF37' : 'rgba(245,240,230,0.65)' }}
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 h-px bg-[#D4AF37] transition-all duration-300"
                    style={{ width: active ? '100%' : '0%' }} />
                  {!active && <span className="absolute -bottom-0.5 left-0 h-px bg-[#D4AF37]/50 w-0 group-hover:w-full transition-all duration-300" />}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => openChat('premium-concierge')} className="hidden md:flex btn-gold text-xs py-2 px-4">
              Talk to Agent
            </button>
            <button onClick={() => setOpen(v => !v)} className="md:hidden p-2 text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 inset-x-0 z-40 glass border-b border-[#D4AF37]/12 px-6 py-6 flex flex-col gap-4"
          >
            {NAV.map(({ href, label }) => (
              <Link key={href} to={href} className="text-base font-medium py-2 border-b border-[#D4AF37]/10 last:border-0"
                style={{ color: location.pathname === href ? '#D4AF37' : '#F5F0E6' }}>
                {label}
              </Link>
            ))}
            <button onClick={() => { openChat('premium-concierge'); setOpen(false) }} className="btn-gold w-full justify-center mt-2">
              Talk to Agent
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
