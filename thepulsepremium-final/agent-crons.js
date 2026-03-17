// agent-crons.js — ThePulsePremium Scheduled Agent Jobs
import { defineCrons } from '@wolpertingerlabs/callboard'

export default defineCrons([

  // Daily Trend Briefing — 6:00 AM ET
  {
    id: 'daily-trend-briefing',
    schedule: '0 6 * * *',
    timezone: 'America/New_York',
    agentId: 'premium-concierge',
    task: async ({ agent, storage }) => {
      const briefing = await agent.complete('Write a 3-sentence premium trend briefing for ThePulsePremium members based on today\'s AI and business landscape. Be insightful, not generic.')
      await storage.set('daily.briefing', { text: briefing, date: new Date().toISOString() })
      console.log('[CRON] Daily briefing generated')
    },
  },

  // Viral Pattern Scan — Every 4 Hours
  {
    id: 'viral-pattern-scan',
    schedule: '0 */4 * * *',
    agentId: 'viral-strategist',
    task: async ({ agent, storage }) => {
      const analysis = await agent.complete('What viral content patterns are showing high coefficients right now on X, TikTok, LinkedIn, and Reddit? List 5 patterns with SPREAD scores. Reply as JSON.', { json: true })
      await storage.set('context.viral_patterns', { updatedAt: new Date().toISOString(), patterns: analysis })
      console.log('[CRON] Viral patterns updated')
    },
  },

  // Social Proof Counter — Every Hour
  {
    id: 'social-proof-update',
    schedule: '0 * * * *',
    task: async ({ storage }) => {
      const s = await storage.get('stats.social') ?? { visitors: 24891, shares: 8432, activeNow: 47 }
      await storage.set('stats.social', {
        visitors:  s.visitors  + Math.floor(Math.random() * 40 + 10),
        shares:    s.shares    + Math.floor(Math.random() * 15 + 3),
        activeNow: Math.floor(Math.random() * 35 + 28),
        updatedAt: new Date().toISOString(),
      })
    },
  },

  // Weekly Memory Digest — Sunday 10 PM ET
  {
    id: 'weekly-digest',
    schedule: '0 22 * * 0',
    timezone: 'America/New_York',
    agentId: 'premium-concierge',
    task: async ({ agent, storage }) => {
      const journals = await storage.getAll('journal.*')
      if (!journals.length) return
      const digest = await agent.complete(`Review these weekly conversation journals and extract: top user interests, common questions, content opportunities. Data: ${JSON.stringify(journals.slice(-20))}`, { json: true })
      await storage.set('weekly.digest', { digest, createdAt: new Date().toISOString() })
      console.log('[CRON] Weekly digest compiled')
    },
  },
])
