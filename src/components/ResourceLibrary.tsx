import React, { useState, useEffect } from 'react'
import { BookOpen, Headphones, Play, Clock, User, ArrowRight, Zap, Star } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { FloatingHealingIcons } from './FloatingHealingIcons'

interface ResourceLibraryProps {
  preview?: boolean
}

export function ResourceLibrary({ preview = false }: ResourceLibraryProps) {
  const [resources, setResources] = useState([])
  const [selectedType, setSelectedType] = useState('all')
  const [selectedResource, setSelectedResource] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const resourceTypes = [
    { id: 'all', label: 'ALL RESOURCES', icon: BookOpen },
    { id: 'article', label: 'ARTICLES', icon: BookOpen },
    { id: 'podcast', label: 'PODCASTS', icon: Headphones },
    { id: 'video', label: 'VIDEOS', icon: Play }
  ]

  // Mock resources data as fallback
  const mockResources = [
    {
      id: 'resource-1',
      title: '5 ANCIENT AYURVEDIC PRACTICES FOR MODERN WELLNESS',
      type: 'article',
      author: 'Dr. Priya Sharma',
      duration: '8 min read',
      description: 'Discover timeless Ayurvedic wisdom that can transform your daily wellness routine and bring balance to modern life.',
      rating: 4.8,
      views: 15420,
      category: 'Ayurveda'
    },
    {
      id: 'resource-2', 
      title: 'CRYSTAL HEALING FOR BEGINNERS: COMPLETE GUIDE',
      type: 'video',
      author: 'Maya Patel',
      duration: '25 min',
      description: 'Learn the fundamentals of crystal healing, including how to choose, cleanse, and use crystals for energy work.',
      rating: 4.9,
      views: 23187,
      category: 'Crystal Healing'
    },
    {
      id: 'resource-3',
      title: 'SOUND HEALING JOURNEY: TIBETAN BOWLS & MEDITATION',
      type: 'podcast',  
      author: 'Ravi Kumar',
      duration: '45 min',
      description: 'Immerse yourself in the healing vibrations of Tibetan singing bowls and guided meditation practice.',
      rating: 4.7,
      views: 11934,
      category: 'Sound Healing'
    },
    {
      id: 'resource-4',
      title: 'BREATHWORK FUNDAMENTALS: PRANAYAMA TECHNIQUES',
      type: 'video',
      author: 'Ananya Gupta', 
      duration: '30 min',
      description: 'Master essential breathwork techniques from ancient pranayama traditions for stress relief and vitality.',
      rating: 4.8,
      views: 19267,
      category: 'Breathwork'
    },
    {
      id: 'resource-5',
      title: 'MANIFESTATION & SPIRITUAL GROWTH MASTERCLASS',
      type: 'article',
      author: 'Arjun Singh',
      duration: '12 min read',
      description: 'Unlock your manifestation power through spiritual practices and conscious living techniques.',
      rating: 4.6,
      views: 8751,
      category: 'Spiritual Growth'
    },
    {
      id: 'resource-6',
      title: 'REIKI HEALING: ENERGY WORK FOR WELLNESS',
      type: 'podcast',
      author: 'Kavya Menon',
      duration: '35 min', 
      description: 'Explore the principles of Reiki healing and learn how energy work can support physical and emotional wellness.',
      rating: 4.7,
      views: 14532,
      category: 'Energy Healing'
    },
    {
      id: 'resource-7',
      title: 'MEDITATION FOR ANXIETY: GUIDED PRACTICE',
      type: 'video',
      author: 'Dr. Priya Sharma',
      duration: '20 min',
      description: 'Gentle guided meditation specifically designed to help calm anxiety and promote inner peace.',
      rating: 4.9,
      views: 31245,
      category: 'Meditation'
    },
    {
      id: 'resource-8',
      title: 'CHAKRA BALANCING: COMPLETE SYSTEM GUIDE',
      type: 'article',
      author: 'Maya Patel',
      duration: '15 min read',
      description: 'Comprehensive guide to understanding and balancing your chakra system for optimal energy flow.',
      rating: 4.8,
      views: 22156,
      category: 'Chakra Healing'
    }
  ]

  useEffect(() => {
    fetchResources()
  }, [selectedType])

  const fetchResources = async () => {
    setIsLoading(true)
    try {
      const url = selectedType === 'all' 
        ? `https://${projectId}.supabase.co/functions/v1/make-server-743d6953/resources`
        : `https://${projectId}.supabase.co/functions/v1/make-server-743d6953/resources?type=${selectedType}`
      
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
      setResources(data.resources || [])
    } catch (error) {
      // Silently use mock data as fallback when API is unavailable
      const filteredMockResources = selectedType === 'all' 
        ? mockResources 
        : mockResources.filter(resource => resource.type === selectedType)
      setResources(filteredMockResources)
    }
    setIsLoading(false)
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article': return BookOpen
      case 'podcast': return Headphones
      case 'video': return Play
      default: return BookOpen
    }
  }

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'article': return 'neo-cyan'
      case 'podcast': return 'neo-pink'
      case 'video': return 'neo-orange'
      default: return 'neo-cyan'
    }
  }

  const displayResources = preview ? resources.slice(0, 6) : resources

  if (isLoading) {
    return (
      <section className={`${preview ? 'py-16' : 'py-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="neo-lime p-8 neo-border neo-shadow-lg max-w-md mx-auto animate-soft-pulse">
              <div className="font-black text-black text-xl uppercase">LOADING RESOURCES...</div>
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
    <section className={`${preview ? 'py-16' : 'py-20'} relative overflow-hidden`}>
      {/* Floating healing icons background */}
      <FloatingHealingIcons opacity="opacity-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-black mb-6 sm:mb-8 uppercase transform -skew-x-2 text-hover-glow animate-soft-pulse leading-tight">
            {preview ? 'WELLNESS RESOURCES' : 'YOUR WELLNESS KNOWLEDGE HUB'}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl font-bold text-black max-w-3xl mx-auto uppercase tracking-wide animate-fade-in-up">
            EXPLORE CURATED CONTENT • DEEPEN YOUR UNDERSTANDING • HOLISTIC HEALTH WISDOM
          </p>
        </div>

        {/* Resource Type Filter (only show if not preview) */}
        {!preview && (
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {resourceTypes.map((type, index) => {
              const IconComponent = type.icon
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`px-6 py-3 neo-border font-black uppercase text-sm flex items-center space-x-2 hover-lift hover-glow animate-fade-in-up stagger-${(index % 4) + 1} ${
                    selectedType === type.id
                      ? 'neo-yellow neo-shadow-lg'
                      : 'bg-white hover-scale'
                  }`}
                >
                  <IconComponent size={18} />
                  <span>{type.label}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* Resources Grid */}
        {displayResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayResources.map((resource: any, index: number) => {
              const IconComponent = getResourceIcon(resource.type)
              const colorClass = getResourceColor(resource.type)
              
              return (
                <div
                  key={resource.id}
                  className={`neo-card p-4 hover-lift hover-glow animate-fade-in-up stagger-${(index % 6) + 1} group cursor-pointer`}
                >
                  {/* Resource Type Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`${colorClass} px-2 py-1 neo-border flex items-center space-x-1 text-black font-black uppercase text-xs animate-gentle-bounce`}>
                      <IconComponent size={12} />
                      <span>{resource.type}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star size={12} className="text-black fill-current" />
                      <span className="font-bold text-black text-xs">{resource.rating}</span>
                    </div>
                  </div>

                  {/* Resource Image/Placeholder */}
                  <div className={`w-full h-20 ${colorClass} neo-border mb-3 flex items-center justify-center hover-scale`}>
                    <IconComponent size={32} className="text-black animate-gentle-float" />
                  </div>

                  {/* Resource Info */}
                  <div className="space-y-3">
                    <h3 className="font-black text-black uppercase text-sm group-hover:text-hover-glow line-clamp-2 leading-tight">
                      {resource.title}
                    </h3>
                    
                    <p className="font-bold text-black text-xs line-clamp-2">
                      {resource.description?.substring(0, 100)}...
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <User size={10} className="text-black" />
                        <span className="font-bold text-black uppercase">{resource.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={10} className="text-black animate-gentle-rotate" />
                        <span className="font-bold text-black uppercase">{resource.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3" style={{ borderTop: '2px solid #000000' }}>
                      <span className="font-bold text-black uppercase text-xs">{resource.views?.toLocaleString()} VIEWS</span>
                      <button className="neo-lime px-3 py-1 neo-border font-black text-black uppercase text-xs flex items-center space-x-1 hover-lift hover-scale">
                        <span>READ MORE</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="neo-orange p-8 neo-border neo-shadow-lg max-w-md mx-auto hover-lift animate-fade-in-up">
              <div className="font-black text-black text-xl mb-4 uppercase">NO RESOURCES FOUND!</div>
              <button
                onClick={() => setSelectedType('all')}
                className="neo-cyan px-6 py-3 neo-border neo-shadow font-black text-black uppercase hover-lift hover-glow"
              >
                VIEW ALL RESOURCES
              </button>
            </div>
          </div>
        )}

        {/* View More Button (only for preview) */}
        {preview && resources.length > 6 && (
          <div className="text-center">
            <button className="neo-button px-12 py-6 text-xl flex items-center space-x-3 mx-auto hover-lift hover-glow animate-soft-pulse">
              <span>EXPLORE FULL LIBRARY</span>
              <BookOpen size={24} />
              <Zap size={24} />
            </button>
          </div>
        )}

        {/* CTA Section (only if not preview) */}
        {!preview && (
          <div className="text-center mt-20">
            <div className="neo-card p-12 max-w-4xl mx-auto hover-lift hover-glow animate-fade-in-up">
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-black mb-6 sm:mb-8 uppercase transform skew-x-2 text-hover-glow animate-soft-pulse leading-tight">
                EXPAND YOUR WELLNESS KNOWLEDGE
              </h3>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-black mb-6 sm:mb-8 uppercase">
                THOUSANDS OF CURATED RESOURCES • EXPERT-CREATED CONTENT • YOUR JOURNEY TO HOLISTIC HEALTH
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="neo-button px-8 py-4 flex items-center space-x-3 justify-center hover-lift hover-glow">
                  <BookOpen size={20} />
                  <span>BROWSE ALL ARTICLES</span>
                </button>
                <button className="neo-pink px-8 py-4 neo-border neo-shadow text-white font-black uppercase hover-lift hover-scale">
                  <Headphones size={20} className="inline mr-3" />
                  LISTEN TO PODCASTS
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}