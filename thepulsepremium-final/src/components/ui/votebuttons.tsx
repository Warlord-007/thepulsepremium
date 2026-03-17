import { useState, useEffect } from 'react'
import { ArrowUp, ArrowDown } from 'lucide-react'

interface VoteButtonsProps {
  postId: string
  initialScore?: number
  onVote?: (postId: string, direction: 'up' | 'down' | null) => void
}

export default function VoteButtons({ postId, initialScore = 0, onVote }: VoteButtonsProps) {
  const [vote, setVote] = useState<'up' | 'down' | null>(null)
  const [score, setScore] = useState(initialScore)

  useEffect(() => {
    const saved = localStorage.getItem(`vote-${postId}`) as 'up' | 'down' | null
    if (saved) setVote(saved)
  }, [postId])

  const handleVote = (direction: 'up' | 'down') => {
    let newVote: 'up' | 'down' | null = direction
    let delta = 0

    if (vote === direction) {
      newVote = null
      delta = direction === 'up' ? -1 : 1
    } else {
      if (vote === 'up') delta = -2
      else if (vote === 'down') delta = 2
      else delta = direction === 'up' ? 1 : -1
    }

    setVote(newVote)
    setScore(prev => prev + delta)
    localStorage.setItem(`vote-${postId}`, newVote || '')
    if (onVote) onVote(postId, newVote)
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={() => handleVote('up')}
        className={`vote-button upvote ${vote === 'up' ? 'text-[#FF4500]' : ''}`}
        aria-label="Upvote"
      >
        <ArrowUp size={20} />
      </button>
      <span className="vote-count text-xs font-bold">{score}</span>
      <button
        onClick={() => handleVote('down')}
        className={`vote-button downvote ${vote === 'down' ? 'text-[#7193FF]' : ''}`}
        aria-label="Downvote"
      >
        <ArrowDown size={20} />
      </button>
    </div>
  )
}
