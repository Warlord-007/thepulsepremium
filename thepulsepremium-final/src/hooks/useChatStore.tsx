import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type AgentId = 'assistant' // only one agent now

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  provider?: string
}

interface ChatStore {
  isOpen: boolean
  messages: Message[]
  isLoading: boolean
  aiProvider: string
  openChat: () => void
  closeChat: () => void
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
}

const ChatContext = createContext<ChatStore | null>(null)

export const AGENT_CONFIG = {
  name: 'Assistant',
  avatar: '✨',
  color: '#FF4500',
  greeting: "Hi, I'm your assistant. Ask me about any article or topic on ThePulsePremium.",
  systemPrompt: `You are a helpful assistant for ThePulsePremium, a site featuring articles on AI, virality, wealth building, and productivity. Answer questions about the content, help users understand articles, and assist with newsletter signup. Be concise and friendly.`,
}

/* Gemini FREE */
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

/* Pollinations.ai FREE */
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
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: AGENT_CONFIG.greeting,
      timestamp: new Date(),
      provider: 'system',
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [aiProvider, setAiProvider] = useState('Ready')

  const openChat = useCallback(() => setIsOpen(true), [])
  const closeChat = useCallback(() => setIsOpen(false), [])
  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: AGENT_CONFIG.greeting,
        timestamp: new Date(),
        provider: 'system',
      },
    ])
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    const history = messages.slice(-10) // keep last 10 for context
    let text = ''
    let provider = ''

    try {
      // Try Gemini if API key is available
      const geminiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY
      if (geminiKey) {
        try {
          text = await callGemini(AGENT_CONFIG.systemPrompt, history, content, geminiKey)
          provider = 'Gemini'
        } catch (e) {
          console.warn('Gemini failed, falling back to Pollinations', e)
        }
      }

      // Fallback to Pollinations
      if (!text) {
        text = await callPollinations(AGENT_CONFIG.systemPrompt, history, content)
        provider = 'Pollinations'
      }

      setAiProvider(provider)
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: text,
          timestamp: new Date(),
          provider,
        },
      ])
    } catch (err) {
      console.error('All AI providers failed', err)
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
          timestamp: new Date(),
          provider: 'error',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  return (
    <ChatContext.Provider value={{ isOpen, messages, isLoading, aiProvider, openChat, closeChat, sendMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatStore() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatStore must be within ChatProvider')
  return ctx
}
