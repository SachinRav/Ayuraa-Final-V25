import React from 'react'
import { Heart, Shield, Star, Users } from 'lucide-react'

export function TrustIndicators() {
  return (
    <section className="relative py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Trust Badge */}
        <div className="flex justify-center mb-6 sm:mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 neo-lime px-3 sm:px-4 py-2 neo-border hover-scale animate-subtle-glow">
            <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-black" />
            <span className="font-black text-black uppercase text-xs sm:text-sm">Verified & Trusted Healers</span>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12 animate-fade-in-up stagger-2">
          <div className="flex items-center gap-2 neo-card px-4 sm:px-6 py-3 sm:py-4 hover-lift hover-glow">
            <Users className="w-4 sm:w-5 h-4 sm:h-5 text-black" />
            <span className="font-bold text-black text-xs sm:text-sm">10,000+ Happy Clients</span>
          </div>
          <div className="flex items-center gap-2 neo-card px-4 sm:px-6 py-3 sm:py-4 hover-lift hover-glow">
            <Star className="w-4 sm:w-5 h-4 sm:h-5 text-black" />
            <span className="font-bold text-black text-xs sm:text-sm">4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2 neo-card px-4 sm:px-6 py-3 sm:py-4 hover-lift hover-glow">
            <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-black" />
            <span className="font-bold text-black text-xs sm:text-sm">100% Confidential</span>
          </div>
        </div>
      </div>
    </section>
  )
}