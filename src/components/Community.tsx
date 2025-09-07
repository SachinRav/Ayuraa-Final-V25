import React, { useState } from 'react'
import { Users, MessageSquare, Heart, Calendar, Star, TrendingUp, Award, BookOpen, Smile, Sun, Flower2, Sparkles, Zap } from 'lucide-react'
import { FloatingHealingIcons } from './FloatingHealingIcons'

interface CommunityProps {
  user?: any
  onSignIn?: () => void
}

export function Community({ user, onSignIn }: CommunityProps) {
  const [activeTab, setActiveTab] = useState('discussions')

  // Floating healing icons
  const healingIcons = [
    { Icon: Sun, top: '10%', left: '5%', delay: '0s', rotation: '12deg' },
    { Icon: Smile, top: '20%', right: '8%', delay: '0.5s', rotation: '-8deg' },
    { Icon: Flower2, top: '70%', left: '3%', delay: '1s', rotation: '15deg' },
    { Icon: Heart, top: '80%', right: '5%', delay: '1.5s', rotation: '-12deg' },
    { Icon: Sparkles, top: '40%', left: '2%', delay: '2s', rotation: '8deg' },
    { Icon: Zap, top: '60%', right: '3%', delay: '2.5s', rotation: '-15deg' }
  ]

  const communityStats = [
    { icon: Users, label: 'Active Members', value: '12,500+', color: 'neo-cyan' },
    { icon: MessageSquare, label: 'Daily Discussions', value: '850+', color: 'neo-lime' },
    { icon: Heart, label: 'Success Stories', value: '3,200+', color: 'neo-pink' },
    { icon: Award, label: 'Certified Healers', value: '420+', color: 'neo-orange' }
  ]

  const discussions = [
    {
      id: 1,
      title: 'Morning meditation routines that changed my life',
      author: 'Sarah M.',
      replies: 23,
      likes: 156,
      tag: 'Meditation',
      color: 'neo-cyan',
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Ayurvedic recipes for better digestion',
      author: 'Raj K.',
      replies: 45,
      likes: 289,
      tag: 'Nutrition',
      color: 'neo-lime',
      time: '4 hours ago'
    },
    {
      id: 3,
      title: 'Energy healing experience - before and after',
      author: 'Maya P.',
      replies: 67,
      likes: 412,
      tag: 'Energy Healing',
      color: 'neo-pink',
      time: '6 hours ago'
    },
    {
      id: 4,
      title: 'Finding the right healer for anxiety management',
      author: 'Alex J.',
      replies: 34,
      likes: 198,
      tag: 'Mental Health',
      color: 'neo-orange',
      time: '8 hours ago'
    }
  ]

  const events = [
    {
      id: 1,
      title: 'Community Meditation Circle',
      date: 'Dec 15, 2024',
      time: '7:00 PM IST',
      participants: 45,
      type: 'Virtual',
      color: 'neo-cyan'
    },
    {
      id: 2,
      title: 'Healing Stories Sharing Session',
      date: 'Dec 18, 2024',
      time: '6:00 PM IST',
      participants: 32,
      type: 'Virtual',
      color: 'neo-lime'
    },
    {
      id: 3,
      title: 'Wellness Workshop with Dr. Priya',
      date: 'Dec 22, 2024',
      time: '4:00 PM IST',
      participants: 78,
      type: 'Hybrid',
      color: 'neo-pink'
    }
  ]

  const successStories = [
    {
      id: 1,
      name: 'Priya S.',
      story: 'After 6 months with my Ayuraa healer, I\'ve overcome chronic anxiety and found inner peace.',
      improvement: 'Mental Health',
      duration: '6 months',
      color: 'neo-cyan'
    },
    {
      id: 2,
      name: 'Rahul M.',
      story: 'The energy healing sessions transformed my chronic pain into renewed vitality.',
      improvement: 'Physical Wellness',
      duration: '4 months',
      color: 'neo-lime'
    },
    {
      id: 3, 
      name: 'Anjali K.',
      story: 'Found my life purpose through spiritual guidance. Forever grateful to this community.',
      improvement: 'Spiritual Growth',
      duration: '8 months',
      color: 'neo-pink'
    }
  ]

  const influencers = [
    {
      id: 1,
      name: 'Dr. Meera Wellness',
      title: 'Ayurvedic Medicine Expert',
      followers: '125K',
      specialty: 'Holistic Nutrition',
      featured: 'Ancient wisdom meets modern living',
      color: 'neo-cyan',
      verified: true,
      posts: 1240
    },
    {
      id: 2,
      name: 'Mindful Maya',
      title: 'Meditation & Mindfulness Coach',
      followers: '89K',
      specialty: 'Daily Meditation',
      featured: '10-minute morning meditations that transform lives',
      color: 'neo-lime',
      verified: true,
      posts: 856
    },
    {
      id: 3,
      name: 'Energy Healer Ravi',
      title: 'Crystal & Energy Healing Specialist',
      followers: '67K',
      specialty: 'Crystal Therapy',
      featured: 'Unlocking your energy potential through crystals',
      color: 'neo-pink',
      verified: true,
      posts: 642
    },
    {
      id: 4,
      name: 'Spiritual Sara',
      title: 'Life Purpose & Manifestation Guide',
      followers: '94K',
      specialty: 'Manifestation',
      featured: 'Helping you manifest your highest self',
      color: 'neo-orange',
      verified: true,
      posts: 923
    }
  ]

  return (
    <div className="min-h-screen py-12 sm:py-20 relative overflow-hidden">
      {/* Floating healing icons */}
      <FloatingHealingIcons />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-black mb-4 sm:mb-6 uppercase transform -skew-x-2 text-hover-glow animate-soft-pulse leading-tight">
            Wellness Community
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-black uppercase animate-fade-in-up mb-6 sm:mb-8">
            Connect, Share, Heal Together
          </p>
          <p className="text-base sm:text-lg font-bold text-black max-w-3xl mx-auto animate-fade-in-up">
            Join thousands of wellness seekers sharing their healing journeys, connecting with like-minded souls, and supporting each other's transformation.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {communityStats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} p-4 sm:p-6 neo-border neo-shadow-lg text-center hover-lift hover-glow animate-fade-in-up stagger-${index + 1}`}
            >
              <stat.icon size={32} className="mx-auto mb-2 sm:mb-3 text-black" />
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-black mb-1 sm:mb-2 leading-none">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-black uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Influencers Section */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-black mb-4 sm:mb-6 uppercase transform skew-x-2 text-hover-glow animate-soft-pulse leading-tight">
              Wellness Influencers
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-black max-w-3xl mx-auto uppercase tracking-wide animate-fade-in-up leading-relaxed">
              Follow our community leaders • Learn from expert voices • Get inspired daily
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {influencers.map((influencer, index) => (
              <div
                key={influencer.id}
                className={`${influencer.color} p-4 sm:p-6 neo-border neo-shadow-lg hover-lift hover-glow animate-fade-in-up stagger-${index + 1} text-center`}
              >
                {/* Profile Image */}
                <div className="relative mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-white neo-border flex items-center justify-center hover-scale">
                    <span className="text-2xl sm:text-3xl font-black text-black">
                      {influencer.name.charAt(0)}
                    </span>
                  </div>
                  {influencer.verified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-white neo-border flex items-center justify-center animate-gentle-bounce">
                      <Award size={12} className="text-black" />
                    </div>
                  )}
                </div>

                {/* Influencer Info */}
                <div className="space-y-2 sm:space-y-3 mb-4">
                  <h3 className="text-sm sm:text-base font-black text-black uppercase leading-tight">
                    {influencer.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-black uppercase">
                    {influencer.title}
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-xs font-bold text-black">
                    <div className="flex items-center space-x-1">
                      <Users size={12} />
                      <span>{influencer.followers}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen size={12} />
                      <span>{influencer.posts}</span>
                    </div>
                  </div>
                </div>

                {/* Featured Content */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-black leading-relaxed italic">
                    "{influencer.featured}"
                  </p>
                </div>

                {/* Specialty Badge */}
                <div className="mb-4">
                  <span className="bg-white neo-border px-2 py-1 text-xs font-black text-black uppercase">
                    {influencer.specialty}
                  </span>
                </div>

                {/* Follow Button */}
                <button className="w-full neo-button px-3 py-2 text-xs hover-lift flex items-center justify-center space-x-1">
                  <TrendingUp size={12} className="animate-soft-pulse" />
                  <span>Follow</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex flex-wrap gap-2 sm:gap-4 bg-white neo-border neo-shadow-lg p-2 sm:p-4">
            {[
              { id: 'discussions', label: 'Discussions', icon: MessageSquare },
              { id: 'events', label: 'Events', icon: Calendar },
              { id: 'stories', label: 'Success Stories', icon: Star }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 neo-border font-black text-xs sm:text-sm uppercase transition-all hover-lift ${
                  activeTab === tab.id
                    ? 'neo-yellow neo-shadow'
                    : 'bg-white hover:neo-cyan hover:neo-shadow'
                }`}
              >
                <tab.icon size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-5xl mx-auto">
          {activeTab === 'discussions' && (
            <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-4 uppercase">
                  Community Discussions
                </h2>
                <p className="text-sm sm:text-base font-bold text-black">
                  Join the conversation and share your wellness journey
                </p>
              </div>

              {!user && (
                <div className="neo-yellow p-6 sm:p-8 neo-border neo-shadow-lg text-center mb-8">
                  <h3 className="text-lg sm:text-xl font-black text-black mb-4 uppercase">
                    Join the Community
                  </h3>
                  <p className="font-bold text-black mb-6 text-sm sm:text-base">
                    Sign in to participate in discussions, share your story, and connect with healers
                  </p>
                  <button
                    onClick={onSignIn}
                    className="neo-button px-6 py-3 hover-lift hover-glow"
                  >
                    <Zap size={18} className="inline mr-2" />
                    Sign In to Join
                  </button>
                </div>
              )}

              <div className="grid gap-4 sm:gap-6">
                {discussions.map((discussion, index) => (
                  <div
                    key={discussion.id}
                    className={`${discussion.color} p-4 sm:p-6 neo-border neo-shadow-lg hover-lift hover-glow animate-fade-in-up stagger-${index + 1}`}
                  >
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg lg:text-xl font-black text-black mb-2 leading-tight">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-xs sm:text-sm font-bold text-black">
                          <span>By {discussion.author}</span>
                          <span>{discussion.time}</span>
                        </div>
                      </div>
                      <span className="neo-border bg-white px-2 sm:px-3 py-1 text-xs font-black text-black">
                        {discussion.tag}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm font-bold text-black">
                      <div className="flex items-center space-x-1">
                        <MessageSquare size={14} />
                        <span>{discussion.replies} replies</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart size={14} />
                        <span>{discussion.likes} likes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-4 uppercase">
                  Upcoming Events
                </h2>
                <p className="text-sm sm:text-base font-bold text-black">
                  Join our community events and workshops
                </p>
              </div>

              <div className="grid gap-4 sm:gap-6">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className={`${event.color} p-4 sm:p-6 neo-border neo-shadow-lg hover-lift hover-glow animate-fade-in-up stagger-${index + 1}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                      <div className="flex-1 mb-4 sm:mb-0">
                        <h3 className="text-base sm:text-lg lg:text-xl font-black text-black mb-2 leading-tight">
                          {event.title}
                        </h3>
                        <div className="space-y-1 text-xs sm:text-sm font-bold text-black">
                          <div className="flex items-center space-x-2">
                            <Calendar size={14} />
                            <span>{event.date} at {event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users size={14} />
                            <span>{event.participants} participants</span>
                          </div>
                        </div>
                      </div>
                      <span className="neo-border bg-white px-2 sm:px-3 py-1 text-xs font-black text-black self-start">
                        {event.type}
                      </span>
                    </div>
                    <button className="w-full sm:w-auto neo-button px-4 py-2 text-xs sm:text-sm hover-lift">
                      Join Event
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stories' && (
            <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-4 uppercase">
                  Success Stories
                </h2>
                <p className="text-sm sm:text-base font-bold text-black">
                  Real transformations from our community members
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {successStories.map((story, index) => (
                  <div
                    key={story.id}
                    className={`${story.color} p-4 sm:p-6 neo-border neo-shadow-lg hover-lift hover-glow animate-fade-in-up stagger-${index + 1}`}
                  >
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 mx-auto mb-3 bg-white neo-border flex items-center justify-center">
                        <Heart size={24} className="text-black" />
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-black mb-1">
                        {story.name}
                      </h3>
                      <span className="text-xs font-bold text-black">
                        {story.duration} journey
                      </span>
                    </div>
                    <blockquote className="text-xs sm:text-sm font-bold text-black mb-4 italic leading-relaxed">
                      "{story.story}"
                    </blockquote>
                    <div className="text-center">
                      <span className="neo-border bg-white px-2 py-1 text-xs font-black text-black">
                        {story.improvement}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="neo-card p-6 sm:p-12 hover-lift hover-glow animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black mb-4 sm:mb-6 uppercase">
              Ready to Start Your Journey?
            </h2>
            <p className="text-base sm:text-lg font-bold text-black mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join our thriving community of wellness seekers and connect with certified healers who can guide your transformation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {!user && (
                <button
                  onClick={onSignIn}
                  className="neo-button px-6 sm:px-8 py-3 sm:py-4 hover-lift hover-glow flex items-center justify-center space-x-2"
                >
                  <Users size={20} />
                  <span>Join Community</span>
                </button>
              )}
              <button className="neo-cyan px-6 sm:px-8 py-3 sm:py-4 neo-border neo-shadow hover-lift hover-glow flex items-center justify-center space-x-2 font-black text-sm uppercase">
                <BookOpen size={20} />
                <span>Browse Healers</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}