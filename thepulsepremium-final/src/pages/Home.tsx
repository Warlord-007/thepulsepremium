import { useEffect } from 'react'
import Hero from '../components/sections/Hero'
import ViralHooks from '../components/sections/ViralHooks'
import AgentShowcase from '../components/sections/AgentShowcase'
import SocialProof from '../components/sections/SocialProof'
import ViralLoop from '../components/sections/ViralLoop'
import CTA from '../components/sections/CTA'

export default function Home() {
  useEffect(() => { document.title = "ThePulsePremium – Your Pulse on What's Trending" }, [])
  return (
    <>
      <Hero />
      <ViralHooks />
      <AgentShowcase />
      <SocialProof />
      <ViralLoop />
      <CTA />
    </>
  )
}
