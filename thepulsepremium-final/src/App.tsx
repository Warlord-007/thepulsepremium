import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import FloatingChat from './components/ui/FloatingChat'
import Home from './pages/Home'
import Agent from './pages/Agent'
import Viral from './pages/Viral'
import Blog from './pages/Blog'
import { ChatProvider } from './hooks/useChatStore'

export default function App() {
  return (
    <ChatProvider>
      <Router>
        <div className="relative min-h-screen bg-black">
          {/* Ambient gold radial glow */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full opacity-60"
              style={{ background: 'radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-40"
              style={{ background: 'radial-gradient(ellipse, rgba(153,101,21,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          </div>
          <Navbar />
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/agent" element={<Agent />} />
              <Route path="/viral" element={<Viral />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </main>
          <Footer />
          <FloatingChat />
        </div>
      </Router>
    </ChatProvider>
  )
}
