import React from 'react'
import { Heart, Shield, Star, Users } from 'lucide-react'

export function TrustBar() {
  return (
    <div className="w-full bg-background border-b-2 border-black py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12">
          {/* Verified Badge */}
          <div className="flex items-center gap-2 text-black">
            <Shield className="w-4 h-4" />
            <span className="font-black uppercase text-xs sm:text-sm">Verified & Trusted Healers</span>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex items-center gap-2 text-black">
            <Users className="w-4 h-4" />
            <span className="font-bold text-xs sm:text-sm">10,000+ Happy Clients</span>
          </div>
          
          <div className="flex items-center gap-2 text-black">
            <Star className="w-4 h-4" />
            <span className="font-bold text-xs sm:text-sm">4.9/5 Rating</span>
          </div>
          
          <div className="flex items-center gap-2 text-black">
            <Heart className="w-4 h-4" />
            <span className="font-bold text-xs sm:text-sm">100% Confidential</span>
          </div>
        </div>
      </div>
    </div>
  )
}