import React from 'react'

const emojis = [
  // Love & Care
  '💕', '💖', '💗', '💙', '💜', '💚', '❤️', '🧡', '🤍', '💛',
  
  // Wellness & Healing
  '🌿', '🌱', '🍃', '🌸', '🌻', '🌹', '🏵️', '🌷', '🌼',
  
  // Spiritual & Energy
  '✨', '⭐', '🌟', '💫', '🔮', '🕉️', '☯️', '🙏', '🧘‍♀️', '🧘‍♂️',
  
  // Peace & Tranquility
  '🌙', '☀️', '🌈', '🦋', '🕊️', '🌊', '💎', '🔆', '🌅', '🌄',
  
  // Care & Support
  '🤗', '🫶', '👐', '🙌', '✋', '👏', '🫧', '💒', '🏠', '🎭'
]

export function FloatingEmojis() {
  // Generate random positions, sizes, and animation delays for emojis
  const generateEmojiElements = () => {
    const elements = []
    const numEmojis = 35 // Number of floating emojis
    
    for (let i = 0; i < numEmojis; i++) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)]
      const size = Math.random() * 20 + 15 // 15px to 35px
      const left = Math.random() * 100 // 0% to 100% viewport width
      const top = Math.random() * 100 // 0% to 100% viewport height
      const animationDelay = Math.random() * 10 // 0s to 10s delay
      const animationDuration = Math.random() * 15 + 10 // 10s to 25s duration
      const opacity = Math.random() * 0.08 + 0.02 // 0.02 to 0.1 opacity (extremely subtle)
      const rotation = Math.random() * 360 // Random initial rotation
      
      elements.push({
        id: i,
        emoji,
        size,
        left,
        top,
        animationDelay,
        animationDuration,
        opacity,
        rotation
      })
    }
    
    return elements
  }

  const emojiElements = React.useMemo(() => generateEmojiElements(), [])

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -10 }}
    >
      {/* Random floating emojis - extremely subtle */}
      {emojiElements.map((element) => (
        <div
          key={element.id}
          className="absolute select-none animate-gentle-float"
          style={{
            left: `${element.left}%`,
            top: `${element.top}%`,
            fontSize: `${element.size}px`,
            opacity: element.opacity,
            animationDelay: `${element.animationDelay}s`,
            animationDuration: `${element.animationDuration}s`,
            transform: `rotate(${element.rotation}deg)`,
            userSelect: 'none',
            pointerEvents: 'none',
            zIndex: -10
          }}
        >
          {element.emoji}
        </div>
      ))}
      
      {/* Additional clustered emojis for more dynamic feel - also very subtle */}
      <div className="absolute top-10 left-10 animate-soft-pulse" style={{ opacity: 0.05, zIndex: -10 }}>
        <span className="text-2xl">💕</span>
      </div>
      
      <div className="absolute top-20 right-20 animate-gentle-bounce" style={{ opacity: 0.06, zIndex: -10 }}>
        <span className="text-lg">🌿</span>
      </div>
      
      <div className="absolute bottom-32 left-16 animate-soft-pulse" style={{ opacity: 0.05, zIndex: -10 }}>
        <span className="text-xl">✨</span>
      </div>
      
      <div className="absolute bottom-20 right-32 animate-gentle-float" style={{ opacity: 0.06, zIndex: -10 }}>
        <span className="text-lg">🌸</span>
      </div>
      
      <div className="absolute top-1/3 left-1/4 animate-gentle-bounce" style={{ opacity: 0.04, zIndex: -10 }}>
        <span className="text-2xl">🙏</span>
      </div>
      
      <div className="absolute top-1/2 right-1/4 animate-soft-pulse" style={{ opacity: 0.06, zIndex: -10 }}>
        <span className="text-lg">💙</span>
      </div>
      
      <div className="absolute bottom-1/3 left-1/3 animate-gentle-float" style={{ opacity: 0.05, zIndex: -10 }}>
        <span className="text-xl">🌱</span>
      </div>
      
      <div className="absolute top-1/4 right-1/3 animate-gentle-bounce" style={{ opacity: 0.07, zIndex: -10 }}>
        <span className="text-lg">🦋</span>
      </div>
      
      {/* Completely transparent sunflower - invisible but maintains structure */}
      <div className="absolute bottom-1/4 right-1/2 animate-soft-pulse" style={{ opacity: 0, zIndex: -10 }}>
        <span className="text-2xl">🌻</span>
      </div>
      
      <div className="absolute top-3/4 left-1/2 animate-gentle-float" style={{ opacity: 0.06, zIndex: -10 }}>
        <span className="text-lg">💖</span>
      </div>
      
      {/* Corner accent emojis - extremely subtle */}
      <div className="absolute top-5 left-5 animate-gentle-bounce" style={{ opacity: 0.05, zIndex: -10 }}>
        <span className="text-sm">🌟</span>
      </div>
      
      <div className="absolute top-5 right-5 animate-soft-pulse" style={{ opacity: 0.06, zIndex: -10 }}>
        <span className="text-sm">🕊️</span>
      </div>
      
      <div className="absolute bottom-5 left-5 animate-gentle-float" style={{ opacity: 0.04, zIndex: -10 }}>
        <span className="text-sm">🍃</span>
      </div>
      
      <div className="absolute bottom-5 right-5 animate-gentle-bounce" style={{ opacity: 0.07, zIndex: -10 }}>
        <span className="text-sm">💚</span>
      </div>
      
      {/* Mobile-optimized smaller elements - also very subtle */}
      <div className="block sm:hidden">
        <div className="absolute top-1/6 left-1/6 animate-soft-pulse" style={{ opacity: 0.04, zIndex: -10 }}>
          <span className="text-xs">🌈</span>
        </div>
        
        <div className="absolute top-2/3 right-1/6 animate-gentle-float" style={{ opacity: 0.05, zIndex: -10 }}>
          <span className="text-xs">💫</span>
        </div>
        
        <div className="absolute bottom-1/5 left-3/4 animate-gentle-bounce" style={{ opacity: 0.06, zIndex: -10 }}>
          <span className="text-xs">🌙</span>
        </div>
      </div>
    </div>
  )
}