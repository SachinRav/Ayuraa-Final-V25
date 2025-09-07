import React from 'react'
import { Sun, Smile, Flower2, Heart, Sparkles, Zap, Leaf, Star, MessageCircle, Shield } from 'lucide-react'

interface FloatingHealingIconsProps {
  className?: string
  opacity?: string
}

export function FloatingHealingIcons({ className = "", opacity = "opacity-20" }: FloatingHealingIconsProps) {
  // Floating healing icons with consistent positioning across components
  const healingIcons = [
    { Icon: Sun, top: '10%', left: '5%', delay: '0s', rotation: '12deg', size: 24 },
    { Icon: Smile, top: '20%', right: '8%', delay: '0.5s', rotation: '-8deg', size: 20 },
    { Icon: Flower2, top: '70%', left: '3%', delay: '1s', rotation: '15deg', size: 22 },
    { Icon: Heart, top: '80%', right: '5%', delay: '1.5s', rotation: '-12deg', size: 20 },
    { Icon: Sparkles, top: '40%', left: '2%', delay: '2s', rotation: '8deg', size: 18 },
    { Icon: Zap, top: '60%', right: '3%', delay: '2.5s', rotation: '-15deg', size: 20 },
    { Icon: Leaf, top: '30%', left: '8%', delay: '3s', rotation: '10deg', size: 19 },
    { Icon: Star, top: '50%', right: '10%', delay: '3.5s', rotation: '-5deg', size: 17 },
    { Icon: MessageCircle, top: '15%', left: '15%', delay: '4s', rotation: '18deg', size: 21 },
    { Icon: Shield, top: '85%', left: '12%', delay: '4.5s', rotation: '-10deg', size: 20 },
    { Icon: Sun, top: '35%', right: '15%', delay: '5s', rotation: '25deg', size: 16 },
    { Icon: Flower2, top: '65%', left: '20%', delay: '5.5s', rotation: '-20deg', size: 18 }
  ]

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      {/* Floating healing icons */}
      {healingIcons.map(({ Icon, top, left, right, delay, rotation, size }, index) => (
        <div
          key={index}
          className={`absolute pointer-events-none ${opacity}`}
          style={{
            top,
            left: left || 'auto',
            right: right || 'auto',
            animationDelay: delay,
            transform: `rotate(${rotation})`
          }}
        >
          <Icon 
            size={size} 
            className="text-black animate-gentle-float"
          />
        </div>
      ))}
    </div>
  )
}