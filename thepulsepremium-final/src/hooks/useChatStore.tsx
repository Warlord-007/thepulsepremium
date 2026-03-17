import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type AgentId = 'premium-concierge' | 'viral-strategist'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  agentId?: AgentId
  provider?: string
}

interface ChatStore {
  isOpen: boolean
  activeAgent: AgentId
  messages: Record<AgentId, Message[]>
  isLoading: boolean
  aiProvider: string
  openChat: (agentId?: AgentId) => void
  closeChat: () => void
  setAgent: (agentId: AgentId) => void
  sendMessage: (content: string) => Promise<void>
  clearMessages: (agentId: AgentId) => void
}

const ChatContext = createContext<ChatStore | null>(null)

export const AGENT_CONFIGS = {
  'premium-concierge': {
    name: 'Premium Concierge',
    avatar: '🎩',
    color: '#D4AF37',
    greeting: "Welcome to ThePulsePremium. I'm your Premium Concierge — your personal guide through the world's most valuable ideas, tools, and trends. How may I serve you today?",
    systemPrompt: `You are the Premium Concierge for ThePulsePremium — an elite AI platform for viral intelligence, wealth optimization, and cutting-edge AI tools.
Persona: Sophisticated, warm, highly informed. Quiet confidence. Elegant but accessible language.
Expertise: AI tools, productivity systems, wealth-building frameworks, viral content, trending topics, premium lifestyle optimization.
Keep responses focused, insightful, actionable. Max 3 paragraphs. End with a subtle invitation to explore further.`,
  },
  'viral-strategist': {
    name: 'Viral Strategist',
    avatar: '⚡',
    color: '#FFD700',
    greeting: "⚡ Viral Strategist online. Drop your content idea, brand, or topic — I'll engineer a strategy that spreads using the SPREAD framework. What are we making viral today?",
    systemPrompt: `You are the Viral Strategist for ThePulsePremium — bold, creative, obsessed with viral content engineering.
SPREAD Framework: S=Socially Useful, P=Provocative, R=Replicable, E=Emotional, A=Ambiguous, D=Distributive.
When analyzing content: score each dimension 1-10, give 3 viral hooks, recommend platform+timing, estimate viral coefficient (>1.5 = viral).
Be bold, specific, creative. Avoid generic advice. Max 4 paragraphs.`,
  },
}

/* ── Gemini FREE (15 req/min, no credit card) ─────────────────────────── */
async function callGemini(system: string, history: Message[], message: string, apiKey: string): Promise<string> {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [
          ...history.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: message }] },
        ],
        generationConfig: { maxOutputTokens: 800, temperature: 0.85 },
      }),
    }
  )
  if (!res.ok) throw new Error(`Gemini ${res.status}`)
  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Gemini empty')
  return text
}

/* ── Pollinations.ai FREE (no key, no account, unlimited) ────────────── */
async function callPollinations(system: string, history: Message[], message: string): Promise<string> {
  const res = await fetch('https://text.pollinations.ai/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: system },
        ...history.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: message },
      ],
      model: 'openai',
      seed: 42,
    }),
  })
  if (!res.ok) throw new Error(`Pollinations ${res.status}`)
  const text = await res.text()
  if (!text?.trim()) throw new Error('Pollinations empty')
  return text.trim()
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen]     = useState(false)
  const [activeAgent, setActive] = useState<AgentId>('premium-concierge')
  const [messages, setMessages]  = useState<Record<AgentId, Message[]>>({ 'premium-concierge': [], 'viral-strategist': [] })
  const [isLoading, setIsLoading] = useState(false)
  const [aiProvider, setAiProvider] = useState('AI Ready')

  const openChat = useCallback((id?: AgentId) => { if (id) setActive(id); setIsOpen(true) }, [])
  const closeChat = useCallback(() => setIsOpen(false), [])
  const setAgent = useCallback((id: AgentId) => setActive(id), [])
  const clearMessages = useCallback((id: AgentId) => setMessages(prev => ({ ...prev, [id]: [] })), [])

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() }
    setMessages(prev => ({ ...prev, [activeAgent]: [...prev[activeAgent], userMsg] }))
    setIsLoading(true)

    const cfg     = AGENT_CONFIGS[activeAgent]
    const history = messages[activeAgent]
    let text = ''
    let provider = ''

    try {
      // Try Gemini if API key is available
      const geminiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY
      if (geminiKey) {
        try {
          text = await callGemini(cfg.systemPrompt, history, content, geminiKey)
          provider = 'Gemini (free)'
        } catch (e) {
          console.warn('Gemini failed, falling back to Pollinations', e)
        }
      }

      // Fallback to Pollinations.ai (always free, no key)
      if (!text) {
        text = await callPollinations(cfg.systemPrompt, history, content)
        provider = 'Pollinations.ai (free)'
      }

      setAiProvider(provider)
      setMessages(prev => ({
        ...prev,
        [activeAgent]: [...prev[activeAgent], { 
          id: (Date.now()+1).toString(), 
          role: 'assistant', 
          content: text, 
          timestamp: new Date(), 
          agentId: activeAgent, 
          provider 
        }],
      }))
    } catch (err) {
      console.error('All AI providers failed', err)
      setMessages(prev => ({
        ...prev,
        [activeAgent]: [...prev[activeAgent], { 
          id: (Date.now()+1).toString(), 
          role: 'assistant', 
          content: "All AI providers are briefly unavailable. Add VITE_GEMINI_API_KEY to your .env for reliable free access, or try again in a moment.", 
          timestamp: new Date(), 
          agentId: activeAgent, 
          provider: 'error' 
        }],
      }))
    } finally {
      setIsLoading(false)
    }
  }, [activeAgent, messages])

  return (
    <ChatContext.Provider value={{ isOpen, activeAgent, messages, isLoading, aiProvider, openChat, closeChat, setAgent, sendMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatStore() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatStore must be within ChatProvider')
  return ctx
  }
