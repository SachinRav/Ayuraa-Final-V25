import React, { useState, useEffect, useRef } from 'react'
import { Heart, Shield, Star, Users, Sparkles, Leaf, Smile, Sun, CloudRain, Zap, Flower2, MessageCircle } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { FloatingHealingIcons } from './FloatingHealingIcons'
import { DynamicPersonImages } from './DynamicPersonImages'

interface HeroProps {
  onGetStarted: () => void
  onSignIn: () => void
  onBecomeHealer: () => void
  onAskAI?: () => void
  user: any
}

export function Hero({ onGetStarted, onSignIn, onBecomeHealer, onAskAI, user }: HeroProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const textRef = useRef<HTMLSpanElement>(null)

  const healingWords = [
    'Ayurveda',
    'Crystal',
    'Pranic',
    'Chakra',
    'Sound',
    'Yoga',
    'Meditation',
    'Reiki',
    'Quantum',
    'Holistic',
    'Mindful',
    'Spiritual',
    'Wellness',
    'Aromatherapy',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % healingWords.length)
        setIsAnimating(false)
      }, 300)
    }, 1800)

    return () => clearInterval(interval)
  }, [healingWords.length])

  return (
    <section className="relative py-4 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating healing icons background */}
      <FloatingHealingIcons className="hidden lg:block" opacity="opacity-15" />

      {/* Background elements for warmth - Hidden on mobile for cleaner look */}
      <div className="absolute inset-0 opacity-10 hidden sm:block">
        <div className="absolute top-10 left-10 w-20 h-20 neo-yellow rounded-full animate-gentle-float"></div>
        <div className="absolute top-32 right-20 w-16 h-16 neo-lime rounded-full animate-gentle-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 neo-cyan rounded-full animate-gentle-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 neo-orange rounded-full animate-gentle-float" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Comic-style floating healing icons */}
      <div className="absolute inset-0 opacity-20 hidden lg:block pointer-events-none">
        <div className="absolute top-20 left-1/4 animate-gentle-float" style={{animationDelay: '0.5s'}}>
          <Sun className="w-8 h-8 text-orange-400" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-gentle-float" style={{animationDelay: '1.5s'}}>
          <Smile className="w-6 h-6 text-pink-400" />
        </div>
        <div className="absolute bottom-1/3 left-1/6 animate-gentle-float" style={{animationDelay: '2.5s'}}>
          <Flower2 className="w-7 h-7 text-green-400" />
        </div>
        <div className="absolute top-1/2 right-1/6 animate-gentle-float" style={{animationDelay: '1s'}}>
          <Flower2 className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="absolute bottom-20 right-1/2 animate-gentle-float" style={{animationDelay: '3s'}}>
          <Zap className="w-6 h-6 text-yellow-400" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-6 sm:space-y-8 animate-fade-in-up">
            {/* Main Headline */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-lg sm:text-xl lg:text-3xl font-black text-black uppercase transform hover-tilt text-hover-glow animate-soft-pulse leading-tight">
                Your Journey to
                <br />
                
                {/* Dynamic Healing Word Container - Fixed width coverage */}
                <div className="flex justify-center lg:justify-start my-3 sm:my-4">
                  <div className="relative inline-block">
                    <span 
                      ref={textRef}
                      className={`neo-yellow px-4 sm:px-6 py-3 sm:py-4 neo-border transform -skew-x-5 transition-all duration-600 font-black uppercase text-center inline-block whitespace-nowrap ${
                        isAnimating ? 'opacity-0 scale-95 -translate-y-1' : 'opacity-100 scale-100 translate-y-0'
                      }`}
                      style={{
                        minWidth: 'fit-content',
                        minHeight: '60px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        lineHeight: '1.1'
                      }}
                    >
                      {healingWords[currentWordIndex]}
                    </span>
                  </div>
                </div>
                
                {/* Healing Text - Centered */}
                <div className="flex justify-center lg:justify-start my-3 sm:my-4">
                  <span className="neo-pink px-4 sm:px-6 py-3 sm:py-4 neo-border transform -skew-x-4 inline-flex items-center justify-center whitespace-nowrap font-black uppercase" style={{ minHeight: '60px' }}>
                    Healing Starts!
                  </span>
                </div>
                
                <span className="block mt-4 sm:mt-6">
                  
                </span>
              </h1>
              
              <p className="text-xs sm:text-sm lg:text-base font-bold text-black max-w-xl animate-fade-in-up stagger-2 leading-relaxed">
                Connect with certified healers, explore natural wellness products, and access resources 
                for mental, physical, emotional, and spiritual health—Ayuraa ensures safe, personalized, 
                <span className="neo-yellow px-1 sm:px-2 py-1 neo-border mx-1 inline-block">compassionate environment.</span> 
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 animate-fade-in-up stagger-4">
              {/* Primary CTA Buttons Row */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                {!user ? (
                  <>
                    <button
                      onClick={onGetStarted}
                      className="neo-button px-4 sm:px-6 py-2 sm:py-3 hover-lift hover-glow focus-expand group w-full sm:w-auto"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 group-hover:animate-gentle-rotate" />
                        <span className="text-xs sm:text-sm">Connect with healers</span>
                      </div>
                    </button>
                    <div className="relative">
                      <button
                        onClick={onSignIn}
                        className="neo-cyan px-4 sm:px-6 py-2 sm:py-3 neo-border hover-scale focus-expand font-black uppercase w-full sm:w-auto text-xs sm:text-sm"
                      >
                        Shop Magical Products
                      </button>
                      {/* Discount Sticker - Repositioned to not overlap button text */}
                      <div className="absolute -top-3 -right-3 neo-pink px-2 py-1 neo-border text-white font-black text-xs uppercase transform rotate-12 hover:rotate-6 transition-transform z-10">
                        ₹150 OFF
                      </div>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={onGetStarted}
                    className="neo-button px-4 sm:px-6 py-2 sm:py-3 hover-lift hover-glow focus-expand group w-full sm:w-auto"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Heart className="w-4 sm:w-5 h-4 sm:h-5 group-hover:animate-soft-pulse" />
                      <span className="text-xs sm:text-sm">Continue Your Journey</span>
                    </div>
                  </button>
                )}
              </div>

              {/* Ask AYURAA AI Button Row */}
              <div className="flex justify-center lg:justify-start">
                <button
                  onClick={onAskAI}
                  className="neo-lime px-4 sm:px-6 py-2 sm:py-3 neo-border hover-lift hover-glow focus-expand group w-full sm:w-auto max-w-sm"
                >
                  <div className="flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5 group-hover:animate-gentle-bounce" />
                    <span className="text-xs sm:text-sm font-black uppercase">Ask AYURAA AI</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-fade-in-up stagger-2 mt-8 sm:mt-0 lg:-mt-[67px]">
            <div className="relative z-10">
              {/* Main Dynamic Person Image Container */}
              <DynamicPersonImages type="main" className="w-[90%] mx-auto" />
                
              {/* Floating Elements - Hidden on mobile for cleaner look */}
              <div className="hidden sm:block absolute -top-4 -right-4 neo-yellow p-3 lg:p-4 neo-border hover-scale animate-gentle-float">
                <Heart className="w-6 lg:w-8 h-6 lg:h-8 text-black" />
              </div>
              
              <div className="hidden sm:block absolute -bottom-4 -left-4 neo-lime p-3 lg:p-4 neo-border hover-scale animate-gentle-float" style={{animationDelay: '1s'}}>
                <Sparkles className="w-6 lg:w-8 h-6 lg:h-8 text-black" />
              </div>

              {/* Dynamic Testimonial Card - Responsive positioning */}
              <DynamicPersonImages 
                type="testimonial" 
                className="absolute top-2 -left-2 sm:-top-4 sm:-left-8" 
              />

              {/* Dynamic Success Rate Card - Responsive positioning */}
              <DynamicPersonImages 
                type="success" 
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-8" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}