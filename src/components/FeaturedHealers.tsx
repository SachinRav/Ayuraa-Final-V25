import React, { useState, useEffect } from 'react'
import { Star, Clock, DollarSign, Award, ChevronLeft, ChevronRight, Zap, Users, Heart, Sparkles, Flower2, Sun } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { projectId, publicAnonKey } from '../utils/supabase/info'

interface FeaturedHealersProps {
  onBookHealer: (healer: any) => void
}

export function FeaturedHealers({ onBookHealer }: FeaturedHealersProps) {
  const [healers, setHealers] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    { id: 'all', label: 'ALL HEALERS' },
    { id: 'Spiritual Life Coaches', label: 'SPIRITUAL' },
    { id: 'Ayurvedic Healers', label: 'AYURVEDA' },
    { id: 'Sound Healing Practitioners', label: 'SOUND HEALING' },
    { id: 'Breathwork Coaches', label: 'BREATHWORK' },
    { id: 'Crystal Healing Experts', label: 'CRYSTAL HEALING' },
    { id: 'Manifestation Coaches', label: 'MANIFESTATION' }
  ]

  // Mock healers data as fallback
  const mockHealers = [
    {
      id: 'healer-1',
      name: 'Dr. Priya Sharma',
      rating: 4.9,
      reviews_count: 247,
      specialties: ['Ayurveda', 'Detox', 'Nutrition'],
      bio: 'Certified Ayurvedic practitioner with 15+ years of experience in holistic healing and wellness coaching.',
      price: 120,
      availability: ['Mon', 'Wed', 'Fri'],
      category: 'Ayurvedic Healers'
    },
    {
      id: 'healer-2',
      name: 'Maya Patel',
      rating: 4.8,
      reviews_count: 189,
      specialties: ['Crystal Healing', 'Chakra Balancing', 'Energy Work'],
      bio: 'Master crystal healer specializing in energy alignment and spiritual transformation through ancient practices.',
      price: 95,
      availability: ['Tue', 'Thu', 'Sat'],
      category: 'Crystal Healing Experts'
    },
    {
      id: 'healer-3',
      name: 'Ravi Kumar',
      rating: 4.7,
      reviews_count: 156,
      specialties: ['Sound Healing', 'Meditation', 'Tibetan Bowls'],
      bio: 'Sound healing practitioner trained in traditional Tibetan techniques for deep relaxation and healing.',
      price: 85,
      availability: ['Mon', 'Thu', 'Sun'],
      category: 'Sound Healing Practitioners'
    },
    {
      id: 'healer-4',
      name: 'Ananya Gupta',
      rating: 4.9,
      reviews_count: 203,
      specialties: ['Breathwork', 'Pranayama', 'Stress Relief'],
      bio: 'Certified breathwork coach helping clients find balance through ancient breathing techniques.',
      price: 110,
      availability: ['Wed', 'Fri', 'Sat'],
      category: 'Breathwork Coaches'
    },
    {
      id: 'healer-5',
      name: 'Arjun Singh',
      rating: 4.8,
      reviews_count: 178,
      specialties: ['Life Coaching', 'Manifestation', 'Spiritual Growth'],
      bio: 'Spiritual life coach dedicated to helping souls discover their purpose and manifest their dreams.',
      price: 130,
      availability: ['Tue', 'Thu', 'Sun'],
      category: 'Spiritual Life Coaches'
    },
    {
      id: 'healer-6',
      name: 'Kavya Menon',
      rating: 4.6,
      reviews_count: 134,
      specialties: ['Reiki', 'Energy Healing', 'Wellness'],
      bio: 'Reiki master and energy healing specialist focused on restoring balance and promoting natural healing.',
      price: 100,
      availability: ['Mon', 'Fri', 'Sun'],
      category: 'Spiritual Life Coaches'
    },
    {
      id: 'healer-7',
      name: 'Sarika Jain',
      rating: 4.9,
      reviews_count: 165,
      specialties: ['Manifestation', 'Law of Attraction', 'Vision Boarding'],
      bio: 'Certified manifestation coach specializing in helping clients align with their desires and create their dream reality.',
      price: 140,
      availability: ['Mon', 'Wed', 'Sat'],
      category: 'Manifestation Coaches'
    }
  ]

  useEffect(() => {
    fetchHealers()
  }, [selectedCategory])

  const fetchHealers = async () => {
    setIsLoading(true)
    try {
      const url = selectedCategory === 'all' 
        ? `https://${projectId}.supabase.co/functions/v1/make-server-743d6953/healers`
        : `https://${projectId}.supabase.co/functions/v1/make-server-743d6953/healers?category=${selectedCategory}`
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setHealers(data.healers || [])
      setCurrentSlide(0)
    } catch (error) {
      // Silently use mock data as fallback when API is unavailable
      const filteredMockHealers = selectedCategory === 'all' 
        ? mockHealers 
        : mockHealers.filter(healer => healer.category === selectedCategory)
      setHealers(filteredMockHealers)
      setCurrentSlide(0)
    }
    setIsLoading(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, healers.length - 2))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, healers.length - 2)) % Math.max(1, healers.length - 2))
  }

  const getVisibleHealers = () => {
    if (healers.length <= 3) return healers
    return healers.slice(currentSlide, currentSlide + 3)
  }

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="neo-yellow p-8 neo-border neo-shadow-lg max-w-md mx-auto animate-soft-pulse">
              <div className="font-black text-black text-xl uppercase">LOADING HEALERS...</div>
              <div className="mt-4 flex justify-center space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className={`w-4 h-4 bg-black animate-gentle-float`} style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white relative overflow-hidden">
      {/* Comic-style floating healing icons */}
      <div className="absolute inset-0 opacity-15 hidden lg:block pointer-events-none">
        <div className="absolute top-10 left-10 animate-gentle-float" style={{animationDelay: '0.5s'}}>
          <Heart className="w-6 h-6 text-pink-400" />
        </div>
        <div className="absolute top-1/4 right-20 animate-gentle-float" style={{animationDelay: '1.5s'}}>
          <Sparkles className="w-5 h-5 text-yellow-400" />
        </div>
        <div className="absolute bottom-1/3 left-1/6 animate-gentle-float" style={{animationDelay: '2.5s'}}>
          <Flower2 className="w-7 h-7 text-green-400" />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-gentle-float" style={{animationDelay: '1s'}}>
          <Sun className="w-6 h-6 text-orange-400" />
        </div>
        <div className="absolute bottom-20 left-1/3 animate-gentle-float" style={{animationDelay: '3s'}}>
          <Heart className="w-4 h-4 text-cyan-400" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-black text-black mb-3 sm:mb-4 lg:mb-6 uppercase transform skew-x-2 text-hover-glow animate-soft-pulse leading-tight">
            VERIFIED & TRUSTED HEALERS
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-black max-w-3xl mx-auto uppercase tracking-wide animate-fade-in-up leading-relaxed">
            CONNECT WITH OUR MOST TRUSTED HEALERS • VERIFIED FOR EXPERTISE • COMMITTED TO YOUR WELLBEING
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-12">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 neo-border font-black uppercase text-xs sm:text-sm hover-lift hover-glow animate-fade-in-up stagger-${(index % 6) + 1} ${
                selectedCategory === category.id
                  ? 'neo-yellow neo-shadow-lg'
                  : 'bg-white hover-scale'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Healers Carousel */}
        {healers.length > 0 ? (
          <div className="relative">
            {/* Navigation Buttons - Only show on larger screens */}
            {healers.length > 3 && (
              <>
                <button
                  onClick={prevSlide}
                  className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 z-10 neo-pink p-3 lg:p-4 neo-border neo-shadow-lg hover-lift hover-scale"
                >
                  <ChevronLeft size={20} className="text-white" />
                </button>
                <button
                  onClick={nextSlide}
                  className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-8 z-10 neo-pink p-3 lg:p-4 neo-border neo-shadow-lg hover-lift hover-scale"
                >
                  <ChevronRight size={20} className="text-white" />
                </button>
              </>
            )}

            {/* Healers Grid - Updated with minimal shadow styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {getVisibleHealers().map((healer: any, index: number) => (
                <div 
                  key={healer.id} 
                  className={`bg-white border-2 border-black rounded-3xl p-0 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in-up stagger-${(index % 3) + 1} group`}
                  style={{
                    boxShadow: 'none',
                  }}
                >
                  <div className="relative">
                    {/* Featured Badge */}
                    <div className="absolute top-2 left-2 z-10">
                      <div className="neo-orange px-2 py-1 neo-border text-black font-black uppercase text-xs flex items-center space-x-1 animate-gentle-bounce">
                        <Award size={10} />
                        <span>FEATURED</span>
                      </div>
                    </div>

                    {/* Healer Image */}
                    <div className="h-24 neo-lime flex items-center justify-center">
                      <div className="w-16 h-16 neo-pink neo-border flex items-center justify-center hover-scale">
                        <span className="text-xl font-black text-white">
                          {healer.name?.charAt(0) || 'H'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3">
                    {/* Healer Info */}
                    <div className="text-center mb-3">
                      <h3 className="text-sm font-black text-black uppercase mb-2 text-hover-glow leading-tight">{healer.name}</h3>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={10} 
                              className={`${
                                i < Math.floor(healer.rating) 
                                  ? 'text-black fill-current' 
                                  : 'text-gray-400'
                              } hover-scale`} 
                            />
                          ))}
                        </div>
                        <span className="font-bold text-black uppercase text-xs">
                          {healer.rating} ({healer.reviews_count})
                        </span>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-3">
                      <div className="flex flex-wrap justify-center gap-1">
                        {healer.specialties?.slice(0, 2).map((specialty: string, index: number) => (
                          <span 
                            key={index}
                            className={`neo-cyan px-2 py-0.5 neo-border text-black font-black uppercase text-xs hover-scale animate-fade-in-up stagger-${index + 1}`}
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="font-bold text-black text-xs text-center mb-3 uppercase line-clamp-2 leading-relaxed">
                      {healer.bio?.substring(0, 80)}...
                    </p>

                    {/* Session Info */}
                    <div className="flex items-center justify-between mb-3 neo-yellow p-2 neo-border hover-glow">
                      <div className="flex items-center space-x-1 font-black text-black uppercase">
                        <Clock size={12} className="animate-gentle-rotate" />
                        <span className="text-xs">60 MIN</span>
                      </div>
                      <div className="flex items-center space-x-1 font-black text-black uppercase">
                        <DollarSign size={12} className="hover-scale" />
                        <span className="text-xs">${healer.price}</span>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-3">
                      <div className="text-xs font-black text-black mb-2 text-center uppercase">AVAILABLE:</div>
                      <div className="flex flex-wrap justify-center gap-1">
                        {healer.availability?.slice(0, 3).map((day: string, index: number) => (
                          <span 
                            key={index}
                            className={`neo-lime px-1.5 py-0.5 neo-border text-black font-black uppercase text-xs hover-scale animate-fade-in-up stagger-${index + 1}`}
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Book Button */}
                    <button
                      onClick={() => onBookHealer(healer)}
                      className="w-full neo-button px-3 py-2 flex items-center justify-center space-x-1 hover-lift min-h-[40px] text-xs"
                    >
                      <Zap size={14} className="animate-soft-pulse" />
                      <span>BOOK SESSION NOW!</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            {healers.length > 3 && (
              <div className="flex justify-center mt-8 sm:mt-12 space-x-2 sm:space-x-3">
                {Array.from({ length: Math.max(1, healers.length - 2) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 sm:w-4 h-3 sm:h-4 neo-border hover-scale ${
                      index === currentSlide 
                        ? 'neo-yellow neo-shadow w-8 sm:w-12' 
                        : 'bg-white hover-glow'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <div className="neo-orange p-6 sm:p-8 neo-border neo-shadow-lg max-w-md mx-auto hover-lift animate-fade-in-up">
              <div className="font-black text-black text-lg sm:text-xl mb-4 uppercase">NO HEALERS FOUND!</div>
              <button
                onClick={() => setSelectedCategory('all')}
                className="neo-cyan px-4 sm:px-6 py-2 sm:py-3 neo-border neo-shadow font-black text-black uppercase hover-lift hover-glow text-sm sm:text-base"
              >
                VIEW ALL HEALERS
              </button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="neo-card p-6 sm:p-8 lg:p-12 max-w-4xl mx-auto hover-lift hover-glow animate-fade-in-up">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black text-black mb-4 sm:mb-6 lg:mb-8 uppercase transform skew-x-2 text-hover-glow animate-soft-pulse leading-tight">
              READY TO START YOUR HEALING JOURNEY?
            </h3>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-black mb-4 sm:mb-6 lg:mb-8 uppercase leading-relaxed">
              JOIN THOUSANDS WHO FOUND BALANCE • PEACE • WELLNESS THROUGH OUR VERIFIED EXPERTS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button className="neo-button px-6 sm:px-8 py-3 sm:py-4 flex items-center space-x-2 sm:space-x-3 justify-center hover-lift hover-glow w-full sm:w-auto">
                <Users size={16} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">BROWSE ALL HEALERS</span>
              </button>
              <button className="neo-lime px-6 sm:px-8 py-3 sm:py-4 neo-border neo-shadow font-black text-black uppercase hover-lift hover-scale w-full sm:w-auto text-sm sm:text-base">
                BECOME A HEALER
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}