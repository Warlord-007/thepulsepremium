// eventTriggers.js — ThePulsePremium Callboard Event Triggers
import { defineEventTriggers } from '@wolpertingerlabs/callboard'

export default defineEventTriggers([

  // New user joins → personalized welcome
  {
    id: 'new-user-welcome',
    event: 'user.registered',
    agentId: 'premium-concierge',
    handler: async ({ event, agent, storage }) => {
      const { userId, referralSource } = event.data
      const welcome = await agent.complete(`New ThePulsePremium member joined via: ${referralSource}. Write a warm, elegant 2-sentence personalized welcome referencing their likely interests.`)
      await storage.set(`user.${userId}.welcome`, { message: welcome, sentAt: new Date().toISOString() })
      return { message: welcome, userId }
    },
  },

  // Viral hook clicked → update SPREAD analytics
  {
    id: 'viral-hook-engaged',
    event: 'viral_hook.clicked',
    handler: async ({ event, storage }) => {
      const { hookId } = event.data
      const stats = await storage.get(`hook.${hookId}`) ?? { clicks: 0, shares: 0 }
      await storage.set(`hook.${hookId}`, { ...stats, clicks: stats.clicks + 1, lastEngaged: new Date().toISOString() })
    },
  },

  // Content shared → recalculate viral coefficient
  {
    id: 'content-shared',
    event: 'content.shared',
    agentId: 'viral-strategist',
    handler: async ({ event, agent, storage }) => {
      const { contentId, platform } = event.data
      const existing = await storage.get(`shares.${contentId}`) ?? { count: 0, platforms: {} }
      const updated = { count: existing.count + 1, platforms: { ...existing.platforms, [platform]: (existing.platforms[platform]??0)+1 }, lastShared: new Date().toISOString() }
      await storage.set(`shares.${contentId}`, updated)
      if (updated.count === 50) {
        const analysis = await agent.complete(`Content ${contentId} hit 50 shares. Why is it going viral? Use SPREAD framework.`)
        await storage.set(`viral.analysis.${contentId}`, { analysis, reachedAt: new Date().toISOString() })
      }
    },
  },

  // Chat ended → save to memory journal
  {
    id: 'session-memory-save',
    event: 'chat.session_ended',
    agentId: 'premium-concierge',
    handler: async ({ event, agent, storage }) => {
      const { sessionId, userId, messages } = event.data
      const summary = await agent.complete(`Summarize this chat in 3 bullet points: interests shown, questions asked, value delivered. Messages: ${JSON.stringify(messages.slice(-8))}`)
      await storage.set(`journal.${userId}.${sessionId}`, { summary, timestamp: new Date().toISOString(), messageCount: messages.length })
    },
  },

  // High engagement → trigger upgrade prompt
  {
    id: 'high-engagement-upgrade',
    event: 'user.high_engagement',
    agentId: 'premium-concierge',
    handler: async ({ event, agent }) => {
      const { userId, sessionCount, totalMessages } = event.data
      if (sessionCount >= 5 || totalMessages >= 50) {
        const msg = await agent.complete(`A loyal ThePulsePremium member has had ${sessionCount} sessions and ${totalMessages} messages. Write a 2-sentence message acknowledging their engagement and hinting at exclusive premium features.`)
        return { action: 'show_upgrade_prompt', message: msg, userId }
      }
    },
  },
])
