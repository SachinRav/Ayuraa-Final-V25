import React, { useState, useEffect } from 'react'
import { ImageWithFallback } from './figma/ImageWithFallback'

interface Person {
  id: number
  name: string
  role: string
  imageUrl: string
  quote?: string
  stat?: string
  statLabel?: string
}

interface DynamicPersonImagesProps {
  type: 'main' | 'testimonial' | 'success'
  className?: string
}

export function DynamicPersonImages({ type, className = "" }: DynamicPersonImagesProps) {
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0)

  // Different sets of people for different card types
  const mainPeople: Person[] = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Meditation Teacher",
      imageUrl: "https://images.unsplash.com/photo-1635695696701-fc9b49c991bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwdGVhY2hlciUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MjEzNzgyfDA&ixlib=rb-4.1.0&q=80&w=600&utm_source=figma&utm_medium=referral"
    },
    {
      id: 2,
      name: "Arjun Patel",
      role: "Yoga Instructor",
      imageUrl: "https://images.unsplash.com/photo-1658279445014-dcc466ac1192?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwaW5zdHJ1Y3RvciUyMG1hbGUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTYyMTM3ODZ8MA&ixlib=rb-4.1.0&q=80&w=600&utm_source=figma&utm_medium=referral"
    },
    {
      id: 3,
      name: "Kavya Reddy",
      role: "Energy Healer", 
      imageUrl: "https://images.unsplash.com/photo-1720473148379-ec41731ad693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBoZWFsZXIlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjIxMzc5MXww&ixlib=rb-4.1.0&q=80&w=600&utm_source=figma&utm_medium=referral"
    },
    {
      id: 4,
      name: "Rohit Singh",
      role: "Ayurvedic Practitioner",
      imageUrl: "https://images.unsplash.com/photo-1659353887222-630895f23cc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxheXVydmVkaWMlMjBkb2N0b3IlMjBtYWxlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MjEzNzk1fDA&ixlib=rb-4.1.0&q=80&w=600&utm_source=figma&utm_medium=referral"
    }
  ]

  const testimonialPeople: Person[] = [
    {
      id: 1,
      name: "Sarah M.",
      role: "Client",
      imageUrl: "https://images.unsplash.com/photo-1753161023962-665967602405?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGNsaWVudCUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MjEzODAwfDA&ixlib=rb-4.1.0&q=80&w=100&utm_source=figma&utm_medium=referral",
      quote: "Ayuraa helped me find the perfect healer. I finally feel understood and supported."
    },
    {
      id: 2,
      name: "Michael K.",
      role: "Client", 
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      quote: "The healing sessions have transformed my life. I'm more balanced and peaceful than ever."
    },
    {
      id: 3,
      name: "Lisa R.",
      role: "Client",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      quote: "Amazing platform! Found exactly the right healer for my specific needs."
    },
    {
      id: 4,
      name: "David L.",
      role: "Client",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      quote: "Professional, trustworthy, and life-changing. Highly recommend Ayuraa!"
    }
  ]

  const successPeople: Person[] = [
    {
      id: 1,
      name: "Dr. Ananya",
      role: "Wellness Expert",
      imageUrl: "https://images.unsplash.com/photo-1697510364485-e900c2fe7524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlyaXR1YWwlMjBndWlkZSUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2MjEzODA0fDA&ixlib=rb-4.1.0&q=80&w=100&utm_source=figma&utm_medium=referral",
      stat: "98%",
      statLabel: "Success Rate"
    },
    {
      id: 2,
      name: "Healer Maya",
      role: "Energy Specialist", 
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      stat: "95%",
      statLabel: "Happy Clients"
    },
    {
      id: 3,
      name: "Dr. Ravi",
      role: "Ayurvedic Doctor",
      imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face",
      stat: "92%",
      statLabel: "Healing Rate"
    },
    {
      id: 4,
      name: "Guru Sita",
      role: "Spiritual Guide",
      imageUrl: "https://images.unsplash.com/photo-1594824226417-4b1b0c61b9b4?w=100&h=100&fit=crop&crop=face",
      stat: "97%",
      statLabel: "Satisfaction"
    }
  ]

  // Select the appropriate people array based on type
  const people = type === 'main' ? mainPeople : type === 'testimonial' ? testimonialPeople : successPeople

  // Auto-rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPersonIndex((prev) => (prev + 1) % people.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [people.length])

  const currentPerson = people[currentPersonIndex]

  if (type === 'main') {
    return (
      <div className={`neo-card p-4 sm:p-6 lg:p-8 hover-lift hover-glow transition-all duration-500 ${className}`}>
        <div className="relative">
          <ImageWithFallback
            src={currentPerson.imageUrl}
            alt={`${currentPerson.name} - ${currentPerson.role}`}
            className="w-full h-48 sm:h-64 lg:h-80 object-cover neo-border transition-all duration-500"
          />
          
          {/* Person Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-white font-black text-lg sm:text-xl">{currentPerson.name}</h3>
            <p className="text-white/90 font-bold text-sm sm:text-base uppercase">{currentPerson.role}</p>
          </div>

          {/* Animated dots indicator */}
          <div className="absolute top-4 right-4 flex space-x-1">
            {people.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPersonIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (type === 'testimonial') {
    return (
      <div className={`neo-pink p-1.5 sm:p-2.5 neo-border max-w-[144px] sm:max-w-[168px] hover-lift hover-glow animate-subtle-glow transition-all duration-500 ${className}`}>
        <div className="flex items-center gap-1 mb-1 sm:mb-1.5">
          <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-full neo-border overflow-hidden flex-shrink-0">
            <ImageWithFallback
              src={currentPerson.imageUrl}
              alt={currentPerson.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-white font-black text-[9px] sm:text-[10px]">{currentPerson.name}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-white text-[8px] sm:text-[9px]">⭐</span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-white font-bold text-[8px] sm:text-[9px] leading-tight">
          "{currentPerson.quote}"
        </p>
        
        {/* Animated dots indicator */}
        <div className="flex justify-center mt-1 space-x-0.5">
          {people.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                index === currentPersonIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    )
  }

  if (type === 'success') {
    return (
      <div className={`neo-cyan p-1.5 sm:p-2.5 neo-border max-w-[100px] sm:max-w-[120px] hover-lift hover-glow animate-subtle-glow transition-all duration-500 ${className}`} style={{animationDelay: '1s'}}>
        <div className="text-center">
          <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full neo-border overflow-hidden mx-auto mb-1">
            <ImageWithFallback
              src={currentPerson.imageUrl}
              alt={currentPerson.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-black font-black text-sm sm:text-base">{currentPerson.stat}</p>
          <p className="text-black font-bold text-[8px] sm:text-[9px] uppercase">{currentPerson.statLabel}</p>
          <p className="text-black font-bold text-[8px] sm:text-[9px] mt-0.5">{currentPerson.name}</p>
        </div>
        
        {/* Animated dots indicator */}
        <div className="flex justify-center mt-1 space-x-0.5">
          {people.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                index === currentPersonIndex ? 'bg-black' : 'bg-black/50'
              }`}
            />
          ))}
        </div>
      </div>
    )
  }

  return null
}