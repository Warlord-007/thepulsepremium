import { Link } from 'react-router-dom'
import { Zap, Twitter, Linkedin, Github, ArrowUpRight } from 'lucide-react'

const LINKS = {
  Platform:     [{ l:'Home', h:'/' }, { l:'AI Agents', h:'/agent' }, { l:'Viral Lab', h:'/viral' }, { l:'Blog', h:'/blog' }],
  Intelligence: [{ l:'SPREAD Framework', h:'/viral' }, { l:'Viral Hooks', h:'/#viral-hooks' }, { l:'Trend Signals', h:'/viral' }, { l:'AI Tools Index', h:'/blog' }],
  Resources:    [{ l:'API Docs', h:'/api/docs' }, { l:'Sitemap', h:'/sitemap.xml', ext:true }, { l:'Privacy Policy', h:'/privacy' }, { l:'Terms', h:'/terms' }],
}
const SOCIALS = [
  { icon: Twitter,  href: 'https://twitter.com/thepulsepremium',          label: 'X (Twitter)' },
  { icon: Linkedin, href: 'https://linkedin.com/company/thepulsepremium', label: 'LinkedIn' },
  { icon: Github,   href: 'https://github.com/thepulsepremium',           label: 'GitHub' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-[#D4AF37]/10 bg-[#0A0A0A]">
      <div className="h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(212,175,55,0.5),rgba(255,215,0,0.3),rgba(212,175,55,0.5),transparent)' }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 rounded-full border border-[#D4AF37]/40 group-hover:border-[#D4AF37]/70 transition-colors" />
                <div className="absolute inset-[3px] rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <Zap size={13} className="text-[#D4AF37]" fill="#D4AF37" />
                </div>
              </div>
              <span className="font-serif font-bold text-lg">
                <span className="text-shimmer">ThePulse</span><span className="text-[#D4AF37]">Premium</span>
              </span>
            </Link>
            <p className="text-sm text-[#F5F0E6]/45 leading-relaxed mb-6 max-w-xs">
              Your pulse on what's trending. AI-powered viral intelligence, premium content, and elite agents — engineered to keep you ahead.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-sm flex items-center justify-center transition-all hover:border-[#D4AF37]/50 hover:text-[#D4AF37]"
                  style={{ background:'rgba(212,175,55,0.06)', border:'1px solid rgba(212,175,55,0.15)', color:'rgba(245,240,230,0.4)' }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
          {/* Links */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]/70 mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link: any) => (
                  <li key={link.l}>
                    {link.ext
                      ? <a href={link.h} target="_blank" rel="noopener noreferrer" className="text-sm text-[#F5F0E6]/45 hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1">{link.l}<ArrowUpRight size={10} /></a>
                      : <Link to={link.h} className="text-sm text-[#F5F0E6]/45 hover:text-[#D4AF37] transition-colors">{link.l}</Link>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-[#D4AF37]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#F5F0E6]/25">© {new Date().getFullYear()} <span className="text-[#D4AF37]/40">ThePulsePremium</span>. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow:'0 0 6px rgba(52,211,153,0.8)' }} />
            <span className="text-[10px] text-[#F5F0E6]/25 uppercase tracking-widest">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
