import React from 'react'
import { Heart, Star, Sparkles, Smile, Sun, Zap, Flower2 } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { DynamicPersonImages } from './DynamicPersonImages'

export function HeroVisual() {
  return (
    <section className="relative py-4 px-4 sm:px-6 lg:px-8 bg-background">
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
        <div className="flex justify-center lg:justify-end">
          {/* Visual Section */}
          <div className="relative animate-fade-in-up stagger-2 w-full max-w-lg lg:max-w-md">
            <div className="relative z-10">
              {/* Main Dynamic Person Image Container */}
              <DynamicPersonImages type="main" />
                
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
                className="absolute -top-6 -left-2 sm:-top-4 sm:-left-8" 
              />

              {/* Dynamic Success Rate Card - Responsive positioning */}
              <DynamicPersonImages 
                type="success" 
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-8" 
              />
            </div>

            {/* Background decoration - Hidden on mobile for cleaner look */}
            <div className="absolute inset-0 -z-10 hidden lg:block">
              <div className="absolute top-16 left-16 w-32 h-32 neo-yellow opacity-20 transform rotate-12"></div>
              <div className="absolute bottom-16 right-16 w-24 h-24 neo-orange opacity-20 transform -rotate-12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}