import React from 'react'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  onBack: () => void
  label?: string
  className?: string
}

export function BackButton({ onBack, label = "BACK", className = "" }: BackButtonProps) {
  return (
    <button
      onClick={onBack}
      className={`flex items-center space-x-2 neo-cyan px-4 py-2 lg:px-6 lg:py-3 neo-border neo-shadow font-black text-black uppercase hover-lift hover-glow animate-fade-in-up transition-all ${className}`}
    >
      <ArrowLeft size={16} className="lg:w-5 lg:h-5" />
      <span className="text-sm lg:text-base">{label}</span>
    </button>
  )
}