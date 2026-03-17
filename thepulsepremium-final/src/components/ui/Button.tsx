import { ReactNode, ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  loading?: boolean
}

export default function Button({ variant = 'gold', size = 'md', children, loading, className = '', ...props }: ButtonProps) {
  const base = variant === 'gold' ? 'btn-gold' : variant === 'outline' ? 'btn-outline' : 'text-gold-primary hover:text-gold-shine transition-colors'
  const sizes = { sm: 'text-xs py-2 px-4', md: '', lg: 'text-base py-4 px-8' }
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props as any}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="60" strokeDashoffset="20" />
          </svg>
          {children}
        </span>
      ) : children}
    </motion.button>
  )
}
