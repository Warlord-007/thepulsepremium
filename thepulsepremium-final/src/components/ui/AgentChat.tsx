import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X } from 'lucide-react'
import { useChatStore, AGENT_CONFIG } from '../../hooks/useChatStore'

export default function AgentChat() {
  const { isOpen, closeChat, messages, isLoading, sendMessage, clearMessages } = useChatStore()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const message = input
    setInput('')
    await sendMessage(message)
  }

  const handleNewChat = () => {
    clearMessages()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeChat}
            className="fixed inset-0 bg-black z-40"
          />
          {/* Chat panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-[#1A1A1B] border-l border-[#343536] z-50 flex flex-col shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#343536]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{AGENT_CONFIG.avatar}</span>
                <div>
                  <h2 className="font-semibold text-[#F5F0E6]">{AGENT_CONFIG.name}</h2>
                  <p className="text-xs text-[#818384]">Ask me anything</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleNewChat}
                  className="text-xs px-2 py-1 rounded border border-[#343536] text-[#818384] hover:text-[#F5F0E6] transition-colors"
                >
                  New chat
                </button>
                <button onClick={closeChat} className="text-[#818384] hover:text-[#F5F0E6]">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-[#FF4500] text-white'
                        : 'bg-[#2A2A2B] text-[#F5F0E6] border border-[#343536]'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    {msg.provider && msg.provider !== 'system' && (
                      <p className="text-[10px] text-[#818384] mt-1">{msg.provider}</p>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#2A2A2B] border border-[#343536] p-3 rounded-lg">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#818384] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-[#818384] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-[#818384] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-[#343536]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about an article..."
                  className="flex-1 bg-[#0F0F10] text-[#F5F0E6] placeholder-[#818384] rounded-sm px-3 py-2 text-sm outline-none border border-[#343536] focus:border-[#FF4500]"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-[#FF4500] text-white p-2 rounded-sm hover:bg-[#FF4500]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
  }
