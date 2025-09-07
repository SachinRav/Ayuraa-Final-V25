import React, { useState, useEffect } from 'react'
import { Search, Heart, Brain, Leaf, Sun, Moon, Star, Sparkles, Shield, Users } from 'lucide-react'
import { FloatingHealingIcons } from './FloatingHealingIcons'

interface ServiceMatchingProps {
  onBookHealer: (healer: any) => void
}

export function ServiceMatching({ onBookHealer }: ServiceMatchingProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [matchedHealers, setMatchedHealers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState('symptoms')

  const healingCategories = [
    {
      category: 'Mental Health & Emotional Healing',
      icon: Brain,
      color: 'neo-cyan',
      symptoms: [
        'Feeling overwhelmed or stressed',
        'Anxiety or panic attacks',
        'Depression or low mood',
        'Difficulty concentrating',
        'Sleep issues',
        'Emotional numbness',
        'Racing thoughts',
        'Feeling disconnected'
      ]
    },
    {
      category: 'Trauma & Grief Support',
      icon: Heart,
      color: 'neo-pink',
      symptoms: [
        'Past trauma affecting daily life',
        'Loss of a loved one',
        'Relationship breakup',
        'PTSD symptoms',
        'Nightmares or flashbacks',
        'Trust issues',
        'Emotional triggers',
        'Feeling stuck in the past'
      ]
    },
    {
      category: 'Spiritual & Energy Healing',
      icon: Star,
      color: 'neo-yellow',
      symptoms: [
        'Feeling spiritually disconnected',
        'Low energy or fatigue',
        'Seeking life purpose',
        'Blocked chakras',
        'Need for spiritual guidance',
        'Energy imbalances',
        'Lack of inner peace',
        'Spiritual awakening challenges'
      ]
    },
    {
      category: 'Personal Growth & Life Transitions',
      icon: Leaf,
      color: 'neo-lime',
      symptoms: [
        'Career confusion',
        'Life transitions',
        'Self-confidence issues',
        'Relationship challenges',
        'Setting boundaries',
        'Finding life direction',
        'Personal development',
        'Breaking negative patterns'
      ]
    }
  ]

  const mockHealers = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialty: 'Clinical Psychology & Mindfulness',
      experience: '12 years',
      rating: 4.9,
      sessions: 2500,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      approach: 'Combines evidence-based therapy with mindfulness practices',
      specialties: ['Anxiety', 'Depression', 'Stress Management', 'Mindfulness'],
      price: '₹2,500/session',
      availability: 'Available Today'
    },
    {
      id: 2,
      name: 'Ravi Krishnan',
      specialty: 'Energy Healing & Reiki Master',
      experience: '15 years',
      rating: 4.8,
      sessions: 1800,
      image: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face',
      approach: 'Holistic energy healing focusing on chakra balancing and spiritual wellness',
      specialties: ['Energy Healing', 'Chakra Balancing', 'Spiritual Guidance', 'Reiki'],
      price: '₹3,000/session',
      availability: 'Available Tomorrow'
    },
    {
      id: 3,
      name: 'Sarah Williams',
      specialty: 'Trauma Specialist & EMDR Therapist',
      experience: '10 years',
      rating: 4.9,
      sessions: 1200,
      image: 'https://images.unsplash.com/photo-1594824804732-ca8db5ac44ea?w=150&h=150&fit=crop&crop=face',
      approach: 'Trauma-informed care using EMDR and somatic healing techniques',
      specialties: ['Trauma Recovery', 'PTSD', 'EMDR', 'Somatic Healing'],
      price: '₹3,500/session',
      availability: 'Available This Week'
    }
  ]

  const handleSymptomSelect = (symptom) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const findHealers = async () => {
    if (selectedSymptoms.length === 0) return

    setIsLoading(true)
    setCurrentStep('matching')

    // Simulate API call with graceful fallback
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Use mock data as fallback
      const filtered = mockHealers.filter(healer => 
        selectedSymptoms.some(symptom => 
          healer.specialties.some(specialty => 
            symptom.toLowerCase().includes(specialty.toLowerCase()) ||
            specialty.toLowerCase().includes(symptom.toLowerCase())
          )
        )
      )
      
      setMatchedHealers(filtered.length > 0 ? filtered : mockHealers.slice(0, 2))
      setCurrentStep('results')
    } catch (error) {
      // Fallback to mock healers if API fails
      setMatchedHealers(mockHealers.slice(0, 2))
      setCurrentStep('results')
    } finally {
      setIsLoading(false)
    }
  }

  const resetSelection = () => {
    setSelectedSymptoms([])
    setMatchedHealers([])
    setCurrentStep('symptoms')
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background relative overflow-hidden">
      {/* Floating healing icons background */}
      <FloatingHealingIcons opacity="opacity-10" />

      {currentStep === 'symptoms' && (
        <div className="animate-fade-in-up">
          {/* Full-width Header Section */}
          <div className="w-full bg-gradient-to-r from-background via-white to-background py-8 sm:py-12 lg:py-16 mb-8 sm:mb-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Sparkles className="w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 text-black mx-auto mb-4 sm:mb-6 animate-gentle-bounce" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-black uppercase mb-4 sm:mb-6 leading-tight text-hover-glow animate-soft-pulse">
                What Are You Experiencing?
              </h2>
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-black mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
                Please select the areas where you'd like support. Remember, seeking help is a sign of 
                strength, and every healing journey is unique. There's no judgment here - only compassion 
                and understanding.
              </p>
              <div className="inline-flex items-center gap-2 sm:gap-3 neo-orange px-4 sm:px-6 py-2 sm:py-3 neo-border">
                <Heart className="w-4 sm:w-5 lg:w-6 h-4 sm:h-5 lg:h-6 text-black animate-soft-pulse" />
                <span className="font-black text-black uppercase text-sm sm:text-base lg:text-lg">Your Privacy is Sacred</span>
              </div>
            </div>
          </div>

          {/* Horizontal Grid of Healing Categories */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                {healingCategories.map((category, categoryIndex) => (
                  <div
                    key={categoryIndex}
                    className={`${category.color} p-4 sm:p-6 neo-border hover-lift animate-fade-in-up stagger-${categoryIndex + 1} h-full flex flex-col group transition-all duration-300 hover:neo-shadow-xl cursor-pointer`}
                    style={{
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-shrink-0">
                      <category.icon className="w-5 sm:w-6 lg:w-8 h-5 sm:h-6 lg:h-8 text-black flex-shrink-0 transition-all duration-300 group-hover:animate-gentle-bounce group-hover:scale-110 group-hover:drop-shadow-lg" />
                      <h3 className="text-xs sm:text-sm lg:text-base xl:text-lg font-black text-black uppercase leading-tight group-hover:text-hover-glow transition-all duration-200">
                        {category.category}
                      </h3>
                    </div>
                    
                    <div className="grid gap-2 sm:gap-3 flex-1">
                      {category.symptoms.map((symptom, index) => (
                        <button
                          key={index}
                          onClick={() => handleSymptomSelect(symptom)}
                          className={`text-left p-2 sm:p-3 neo-border transition-all hover-scale focus-expand min-h-[40px] sm:min-h-[44px] group-hover:transform group-hover:translateY(-1px) ${
                            selectedSymptoms.includes(symptom)
                              ? 'bg-black text-white neo-shadow-lg transform translate-x-1 translate-y-1'
                              : 'bg-white text-black hover:bg-gray-50 active:bg-gray-100 hover:shadow-lg'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs sm:text-sm leading-tight">{symptom}</span>
                            {selectedSymptoms.includes(symptom) && (
                              <Heart className="w-3 sm:w-4 h-3 sm:h-4 text-white animate-soft-pulse flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Summary & CTA */}
            {selectedSymptoms.length > 0 && (
              <div className="max-w-6xl mx-auto">
                <div className="neo-card p-4 sm:p-6 lg:p-8 text-center animate-fade-in-up">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black uppercase mb-3 sm:mb-4 leading-tight">
                    Thank You for Sharing
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg font-bold text-black mb-4 sm:mb-6 leading-relaxed">
                    You've selected <span className="neo-yellow px-2 py-1 neo-border mx-1">{selectedSymptoms.length}</span> 
                    areas for healing support. Let's connect you with healers who specialize in these areas.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center mb-6 sm:mb-8">
                    {selectedSymptoms.map((symptom, index) => (
                      <span
                        key={index}
                        className="neo-lime px-2 sm:px-3 py-1 sm:py-2 neo-border font-bold text-black text-xs sm:text-sm hover-scale"
                      >
                        {symptom}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button
                      onClick={findHealers}
                      className="neo-button px-6 sm:px-8 py-3 sm:py-4 hover-lift hover-glow focus-expand group w-full sm:w-auto"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Search className="w-4 sm:w-5 h-4 sm:h-5 group-hover:animate-gentle-rotate" />
                        <span className="text-sm sm:text-base">Connect with healers</span>
                      </div>
                    </button>
                    <button
                      onClick={resetSelection}
                      className="neo-cyan px-6 sm:px-8 py-3 sm:py-4 neo-border hover-scale focus-expand font-black uppercase w-full sm:w-auto text-sm sm:text-base"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {currentStep === 'matching' && (
        <div className="text-center animate-fade-in-up px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="neo-card p-6 sm:p-8 lg:p-12 hover-glow">
              <div className="animate-gentle-rotate w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 sm:mb-6">
                <Sparkles className="w-12 sm:w-16 h-12 sm:h-16 text-black" />
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-black text-black uppercase mb-3 sm:mb-4 leading-tight">
                Connecting You with Healers
              </h3>
              <p className="text-sm sm:text-base lg:text-lg font-bold text-black mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto">
                We're carefully reviewing our network of verified healers to find 
                those who specialize in supporting people with your specific needs...
              </p>
              <div className="flex justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 sm:w-3 h-2 sm:h-3 neo-yellow rounded-full animate-gentle-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {currentStep === 'results' && (
        <div className="animate-fade-in-up px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-black text-black uppercase mb-3 sm:mb-4 text-hover-glow leading-tight">
                Your Healing Matches
              </h3>
              <p className="text-sm sm:text-base lg:text-lg font-bold text-black mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed">
                Based on what you've shared, here are healers who specialize in supporting people 
                with similar experiences. Each one brings unique gifts and approaches to healing.
              </p>
              <div className="inline-flex items-center gap-2 neo-lime px-3 sm:px-4 py-1 sm:py-2 neo-border">
                <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-black animate-soft-pulse" />
                <span className="font-black text-black uppercase text-xs sm:text-sm">Carefully Matched Just for You</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {matchedHealers.map((healer, index) => (
                <div
                  key={healer.id}
                  className={`neo-card p-4 sm:p-6 lg:p-8 hover-lift hover-glow animate-fade-in-up stagger-${index + 1}`}
                >
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <img
                      src={healer.image}
                      alt={healer.name}
                      className="w-16 sm:w-20 h-16 sm:h-20 object-cover neo-border rounded-full mx-auto sm:mx-0 flex-shrink-0"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="text-base sm:text-lg lg:text-xl font-black text-black uppercase mb-2 leading-tight">{healer.name}</h4>
                      <p className="font-bold text-black mb-2 text-sm sm:text-base">{healer.specialty}</p>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 sm:w-4 h-3 sm:h-4 text-black fill-current" />
                          <span className="font-bold text-black text-xs sm:text-sm">{healer.rating}</span>
                        </div>
                        <span className="font-bold text-black text-xs sm:text-sm">{healer.sessions}+ sessions</span>
                        <span className="font-bold text-black text-xs sm:text-sm">{healer.experience}</span>
                      </div>
                      <div className="neo-cyan px-2 py-1 neo-border inline-block">
                        <span className="font-bold text-black text-xs sm:text-sm">{healer.availability}</span>
                      </div>
                    </div>
                  </div>

                  <p className="font-bold text-black mb-4 text-xs sm:text-sm lg:text-base leading-relaxed">{healer.approach}</p>

                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center sm:justify-start">
                    {healer.specialties.map((specialty, i) => (
                      <span
                        key={i}
                        className="neo-yellow px-2 py-1 neo-border font-bold text-black text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                    <span className="text-base sm:text-lg font-black text-black">{healer.price}</span>
                    <button
                      onClick={() => onBookHealer(healer)}
                      className="neo-button px-4 sm:px-6 py-2 sm:py-3 hover-lift hover-glow focus-expand group w-full sm:w-auto"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Heart className="w-3 sm:w-4 h-3 sm:h-4 group-hover:animate-soft-pulse" />
                        <span className="text-sm sm:text-base">Book Session</span>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Encouraging Message */}
            <div className="neo-orange p-4 sm:p-6 lg:p-8 neo-border text-center hover-glow">
              <Sparkles className="w-8 sm:w-10 h-8 sm:h-10 text-black mx-auto mb-3 sm:mb-4 animate-gentle-bounce" />
              <h4 className="text-base sm:text-lg lg:text-xl font-black text-black uppercase mb-3 sm:mb-4 leading-tight">
                Ready to Begin Your Healing Journey?
              </h4>
              <p className="font-bold text-black mb-4 sm:mb-6 max-w-2xl mx-auto text-xs sm:text-sm lg:text-base leading-relaxed">
                Taking this step shows incredible courage. Remember, healing is not linear, 
                and every small step counts. These healers are here to support you with compassion and expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={resetSelection}
                  className="neo-cyan px-4 sm:px-6 py-2 sm:py-3 neo-border hover-scale focus-expand font-black uppercase w-full sm:w-auto text-sm sm:text-base"
                >
                  Try Different Symptoms
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="neo-lime px-4 sm:px-6 py-2 sm:py-3 neo-border hover-scale focus-expand font-black uppercase w-full sm:w-auto text-sm sm:text-base"
                >
                  Browse All Healers
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}