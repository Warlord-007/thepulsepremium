# ThePulsePremium

**Your Pulse on What's Trending** — AI-powered viral intelligence platform with free AI agents, SPREAD framework, and premium content.

---

## ⚡ Quick Start (5 minutes)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .callboard.env .env
# Open .env and add your FREE Gemini API key (see below)

# 3. Run locally
npm run dev
# Opens at http://localhost:3000
```

---

## 🆓 Free AI Setup

The site works with **zero cost** using two free AI services:

### Option A — Google Gemini (Recommended, 15 req/min free)
1. Go to **https://aistudio.google.com/app/apikey**
2. Sign in with any Google/Gmail account
3. Click **"Create API key"** — no credit card needed
4. Open your `.env` file and set:
   ```
   VITE_GEMINI_API_KEY=your_key_here
   ```

### Option B — Pollinations.ai (Zero setup, unlimited)
- Already enabled by default — no key, no account, nothing to do
- The AI agents use this automatically when Gemini is unavailable

**AI Priority Order:** Callboard → Gemini (free) → Pollinations.ai (free)

---

## 📁 Project Structure

```
/thepulsepremium
  /public
    index.html          — Full SEO meta tags, OG tags, structured data
    favicon.svg         — Gold pulse wave logo
    robots.txt          — Search engine instructions
    sitemap.xml         — XML sitemap for Google
  /src
    /components
      /layout
        Navbar.tsx       — Sticky glassmorphism navbar with mobile menu
        Footer.tsx       — Multi-column footer with social links
      /sections
        Hero.tsx         — Full-screen hero with canvas grid + particles
        ViralHooks.tsx   — 5 interactive SPREAD-scored viral hook cards
        AgentShowcase.tsx — Two agent cards with animated glow effects
        SocialProof.tsx  — Animated counters + testimonials
        ViralLoop.tsx    — Masonry UGC wall from community members
        CTA.tsx          — Conversion section with dual CTAs
      /ui
        Button.tsx       — Reusable gold/outline button component
        AgentChat.tsx    — Full glassmorphism chat modal with agent tabs
        FloatingChat.tsx — Floating button + tooltip
    /pages
      Home.tsx           — Assembles all sections
      Agent.tsx          — Agent detail page with API reference
      Viral.tsx          — SPREAD analyzer + trend monitor + hook generator
      Blog.tsx           — Article grid with search and category filter
    /hooks
      useChatStore.tsx   — Chat state + free AI fallback chain
    /styles
      globals.css        — Full design system (Clubroom Contrast)
    App.tsx              — Router + ChatProvider
    main.tsx             — React entry point
  package.json
  vite.config.ts
  tailwind.config.js
  .callboard.env         — Environment variables (rename to .env)
  agents.config.js       — Callboard agent definitions
  agent-crons.js         — 4 scheduled cron jobs
  eventTriggers.js       — 5 event trigger handlers
```

---

## 🎨 Design System — Clubroom Contrast

| Token | Value | Use |
|---|---|---|
| `--black` | `#000000` | Primary background |
| `--ink` | `#0A0A0A` | Elevated surfaces |
| `--charcoal` | `#1A1A1A` | Cards, modals |
| `--gold` | `#D4AF37` | Primary accent |
| `--gold-light` | `#F5E7B2` | Highlights |
| `--gold-deep` | `#996515` | Gradient start |
| `--gold-shine` | `#FFD700` | Gradient end |
| `--cream` | `#F5F0E6` | Body text |

**Typography:**
- Headlines: Playfair Display (serif)
- Body: Inter (sans-serif)
- Code: JetBrains Mono

---

## 🤖 AI Agents

### Premium Concierge 🎩
- Elegant guide for AI tools, wealth building, and trends
- Memory: session journals + long-term preferences
- Cron: daily trend briefing at 6 AM ET

### Viral Strategist ⚡
- SPREAD framework analyzer and viral hook generator
- Memory: content niche, audience, platform preferences
- Cron: viral pattern scan every 4 hours

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/agents` | List all agents |
| POST | `/api/agents/:id/chat` | Send message to agent |
| GET | `/api/trends` | Current trending topics |
| GET | `/api/trends/early` | 72-hour early warning signals |
| POST | `/api/viral/analyze` | SPREAD analysis on content |
| POST | `/api/viral/hooks/generate` | AI-generate viral hooks |
| GET | `/api/blog` | List blog posts |
| GET | `/api/stats/social` | Social proof counters |
| POST | `/api/newsletter/subscribe` | Newsletter signup |
| GET | `/api/search` | Full-text search |
| GET | `/api/health` | Health check |

Start the API server:
```bash
cd server && npm install && node index.js
# API runs at http://localhost:4000
# Docs at http://localhost:4000/api/docs
```

---

## 🚀 Deploy to Netlify

```bash
npm run build
# Deploy the /dist folder to Netlify

# Or use Netlify CLI:
npm install -g netlify-cli
netlify deploy --prod
```

Set environment variables in Netlify dashboard:
- `VITE_GEMINI_API_KEY` → your free Gemini key

---

## 📱 n8n Automation (Content Auto-Generation)

**Easiest method — no installation needed:**
1. Go to **n8n.io** on your phone
2. Sign up free (no credit card)
3. Create a workflow: `Schedule → HTTP POST to Gemini/Pollinations → POST to /api/blog`

**Free image generation with Pollinations.ai:**
```
https://image.pollinations.ai/prompt/YOUR_PROMPT?width=1024&height=1024&model=flux&nologo=true
```
Use this URL directly in `<img>` tags or in n8n workflows — no API key needed.

---

## 🌐 SEO

- Full meta tags, Open Graph, Twitter Card
- JSON-LD structured data
- XML sitemap at `/sitemap.xml`
- `robots.txt` configured
- Mobile-first responsive design
- Proper H1→H2→H3 heading hierarchy

---

## 📄 License

© ThePulsePremium. All rights reserved.
