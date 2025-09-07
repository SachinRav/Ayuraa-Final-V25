import React, { useState, useRef, useEffect } from 'react'
import { Heart, Send, Sparkles, User, X, Leaf, ShoppingBag, Lightbulb, Smile, Star } from 'lucide-react'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import ayuChatbotImage from 'figma:asset/cb17f8a7984473cb535f04b455a9c7a13105516b.png'

interface ChatBotProps {
  user: any
}

interface Message {
  id: string
  text: string
  sender: 'user' | 'ayu'
  timestamp: Date
  suggestions?: string[]
  recommendations?: any[]
}

export function ChatBot({ user }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [ayuState, setAyuState] = useState<'idle' | 'hover' | 'active' | 'waving'>('idle')
  const [hoverPosition, setHoverPosition] = useState({ top: '-4rem', left: '-3rem' })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const ayuRef = useRef<HTMLDivElement>(null)

  const initialMessage: Message = {
    id: 'initial',
    text: "Hi there! I'm Ayu, your magical wellness companion! ✨ I'm here to help you find the perfect healer, discover amazing wellness products, or just chat about your wellness journey. What would you like to explore today?",
    sender: 'ayu',
    timestamp: new Date(),
    suggestions: [
      "🌿 Find a Healer",
      "🛍️ Shop Products", 
      "✨ Wellness Tips",
      "How are you feeling today? 😊"
    ]
  }

  const quickActions = [
    { icon: Leaf, text: "🌿 Find a Healer", action: "I'm looking for a healer to help with my wellness journey" },
    { icon: ShoppingBag, text: "🛍️ Shop Products", action: "Show me wellness products I can buy" },
    { icon: Lightbulb, text: "✨ Wellness Tips", action: "Give me some wellness tips for today" },
    { icon: Smile, text: "How are you feeling? 😊", action: "I'd like to chat about how I'm feeling today" }
  ]

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage])
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Recalculate hover position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (ayuState === 'hover') {
        calculateHoverPosition()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [ayuState])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(async () => {
      const ayuResponse = await generateAyuResponse(text.trim())
      setMessages(prev => [...prev, ayuResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAyuResponse = async (userInput: string): Promise<Message> => {
    try {
      // Call backend chat service
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-743d6953/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message: userInput,
          conversation_id: user?.id || 'anonymous'
        })
      })

      const data = await response.json()
      
      let ayuText = data.response?.message || "I understand! Let me help you with that! 💕"
      let suggestions: string[] = []
      let recommendations: any[] = []

      const input = userInput.toLowerCase()

      if (input.includes('anxiety') || input.includes('stress') || input.includes('overwhelmed') || input.includes('worried')) {
        ayuText = "I hear you, and I want you to know that what you're feeling is completely valid. 💙 Anxiety and stress can be really tough, but you're not alone in this journey. I've found some wonderful healers who specialize in anxiety support - they use gentle techniques like breathwork, meditation, and energy healing to help you find your calm. ✨"
        suggestions = [
          "Show me anxiety specialists 🌸",
          "Meditation techniques 🧘‍♀️", 
          "Calming products 🕯️",
          "Breathing exercises 🌬️"
        ]
        recommendations = [
          { type: 'healer', name: 'Dr. Sarah Chen - Anxiety Specialist', specialty: 'Mindfulness & Stress Relief' },
          { type: 'product', name: 'Lavender Calm Blend', price: '₹299' }
        ]
      } else if (input.includes('sleep') || input.includes('insomnia') || input.includes('tired') || input.includes('rest')) {
        ayuText = "Oh, sweet dreams can be so elusive sometimes! 🌙 Good sleep is like a gentle hug for your soul, and I want to help you find that peace. I know some amazing healers who work with sleep challenges using techniques like yoga nidra, sound healing, and natural remedies. Let's get you the rest you deserve! ✨"
        suggestions = [
          "Sleep specialists 🌙",
          "Yoga Nidra sessions 🧘‍♀️",
          "Natural sleep aids 🌿",
          "Bedtime routines 💤"
        ]
      } else if (input.includes('healing') || input.includes('healer') || input.includes('therapy') || input.includes('counseling')) {
        ayuText = "What a beautiful step you're taking towards healing! 🌱 Finding the right healer is like finding a kindred spirit who truly understands your journey. I have access to over 1,900 amazing certified healers, each with their own special gifts. Let me help you find someone who feels just right for you! 💕"
        suggestions = [
          "Browse all healers 🌿",
          "Energy healing 🔮",
          "Talk therapy 💬", 
          "Spiritual guidance ✨"
        ]
      } else if (input.includes('product') || input.includes('buy') || input.includes('shop') || input.includes('wellness')) {
        ayuText = "Our wellness shop is like a treasure trove of healing goodies! 🛍️✨ We've carefully curated the most beautiful, natural products to support every part of your wellness journey. From soothing herbal teas to gorgeous crystals, aromatherapy blends to natural supplements - everything is chosen with so much love! 💕"
        suggestions = [
          "Show all products 🌟",
          "Herbal supplements 🌿",
          "Essential oils 🌸",
          "Healing crystals 💎"
        ]
      } else if (input.includes('feeling') || input.includes('day') || input.includes('mood') || input.includes('how are you')) {
        ayuText = "Thank you for sharing with me! 🥰 I'm doing wonderfully - I love getting to connect with beautiful souls like you who are on their wellness journey. How has your day been treating you? Remember, every feeling you have is valid, and I'm here to listen with an open heart. 💙✨"
        suggestions = [
          "I'm feeling great! 😊",
          "Having a tough day 💙",
          "Need some encouragement 🌟",
          "Want to share more 💬"
        ]
      } else if (input.includes('tip') || input.includes('advice') || input.includes('wellness') || input.includes('help')) {
        ayuText = "I'd love to share some gentle wellness wisdom with you! 🌸 Here's a little nugget: Start your day with three deep breaths and set an intention of kindness - for yourself and others. Drink water like you're nourishing a beautiful garden (because you are!), and remember that rest isn't lazy, it's sacred. Small, loving actions create the most beautiful transformations! ✨💕"
        suggestions = [
          "More wellness tips 🌿",
          "Daily routines 🌅",
          "Self-care ideas 💆‍♀️",
          "Mindfulness practices 🧘‍♀️"
        ]
      }

      return {
        id: `ayu_${Date.now()}`,
        text: ayuText,
        sender: 'ayu',
        timestamp: new Date(),
        suggestions,
        recommendations
      }
    } catch (error) {
      return {
        id: `ayu_${Date.now()}`,
        text: "Oh sweetie, I'm having a tiny technical hiccup! 🌸 But don't worry - I'm still here with you! Tell me more about what you're looking for, and I'll do my absolute best to help! 💕",
        sender: 'ayu',
        timestamp: new Date(),
        suggestions: [
          "Find a healer 🌿",
          "Browse products 🛍️", 
          "Wellness tips ✨",
          "Try again 🔄"
        ]
      }
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const calculateHoverPosition = () => {
    if (!ayuRef.current) return

    const ayuRect = ayuRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    // Message bubble dimensions (approximate)
    const messageWidth = 240 // Approximate width of the message
    const messageHeight = 80 // Approximate height of the message
    
    let top = -80 // Default above the mascot
    let left = -120 // Default centered above mascot
    
    // Check if message would go off the left edge
    if (ayuRect.left + left < 16) {
      left = -ayuRect.left + 16 // Adjust to stay 16px from left edge
    }
    
    // Check if message would go off the right edge
    if (ayuRect.right + left + messageWidth > viewportWidth - 16) {
      left = viewportWidth - ayuRect.right - messageWidth - 16 // Adjust to stay 16px from right edge
    }
    
    // Check if message would go off the top edge
    if (ayuRect.top + top < 16) {
      top = 90 // Position below mascot instead
    }
    
    // Check if message would go off the bottom edge (when positioned below)
    if (top > 0 && ayuRect.bottom + top + messageHeight > viewportHeight - 16) {
      top = -80 // Keep above if below doesn't fit
    }
    
    setHoverPosition({
      top: `${top}px`,
      left: `${left}px`
    })
  }

  const handleMouseEnter = () => {
    setAyuState('hover')
    calculateHoverPosition()
  }

  return (
    <>
      {/* Ayu Mascot - Floating Icon */}
      {!isOpen && (
        <div 
          ref={ayuRef}
          className="relative cursor-pointer transform transition-all duration-500 hover:scale-110"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setAyuState('idle')}
          onClick={() => {
            setAyuState('waving')
            setTimeout(() => setIsOpen(true), 600)
          }}
        >
          {/* Main Ayu Image Container */}
          <div className={`w-20 h-20 rounded-full overflow-hidden transition-all duration-500 hover-lift hover-glow ${
            ayuState === 'idle' ? 'animate-gentle-float' : 
            ayuState === 'hover' ? 'animate-gentle-bounce' : 
            'animate-subtle-shake'
          }`}
          style={{
            background: 'linear-gradient(135deg, #CBA6F7 0%, #F087B8 50%, #CBA6F7 100%)',
            border: '2px solid #8B5CF6',
            boxShadow: ayuState === 'hover' ? 
              '0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(203, 166, 247, 0.4), inset 0 0 20px rgba(139, 92, 246, 0.3)' : 
              '0 0 20px rgba(139, 92, 246, 0.6), 0 8px 25px rgba(203, 166, 247, 0.3), inset 0 0 15px rgba(139, 92, 246, 0.2)'
          }}>
            
            {/* Ayu Image */}
            <img 
              src={ayuChatbotImage} 
              alt="Ayu - Your Wellness Companion" 
              className="w-full h-full object-cover"
            />
            
            {/* Floating Elements around Ayu */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {/* Sparkles */}
              <Sparkles 
                className={`absolute -top-2 right-1 w-3 h-3 text-yellow-300 transition-all duration-1000 ${
                  ayuState === 'hover' ? 'opacity-100 animate-gentle-bounce scale-110' : 'opacity-70 animate-soft-pulse'
                }`} 
                style={{animationDelay: '0.5s'}}
              />
              <Sparkles 
                className={`absolute bottom-0 -left-1 w-2 h-2 text-pink-300 transition-all duration-1000 ${
                  ayuState === 'hover' ? 'opacity-100 animate-gentle-bounce scale-110' : 'opacity-60 animate-soft-pulse'
                }`} 
                style={{animationDelay: '1.2s'}}
              />
              
              {/* Hearts */}
              <Heart 
                className={`absolute top-1 -left-2 w-2 h-2 text-pink-400 transition-all duration-1000 ${
                  ayuState === 'hover' ? 'opacity-100 animate-gentle-bounce scale-110' : 'opacity-50 animate-gentle-float'
                }`} 
                style={{animationDelay: '0.8s'}}
              />
              <Heart 
                className={`absolute -bottom-1 right-0 w-1.5 h-1.5 text-pink-300 transition-all duration-1000 ${
                  ayuState === 'hover' ? 'opacity-100 animate-gentle-bounce scale-110' : 'opacity-40 animate-gentle-float'
                }`} 
                style={{animationDelay: '1.5s'}}
              />
              
              {/* Stars */}
              <Star 
                className={`absolute top-2 right-4 w-2 h-2 text-yellow-200 transition-all duration-1000 ${
                  ayuState === 'hover' ? 'opacity-100 animate-gentle-bounce scale-110' : 'opacity-60 animate-soft-pulse'
                }`} 
                style={{animationDelay: '0.7s'}}
              />
              
              {/* Floating Leaves */}
              <Leaf 
                className={`absolute -top-3 left-2 w-2 h-2 text-green-300 transition-all duration-1000 ${
                  ayuState === 'hover' ? 'opacity-100 animate-gentle-bounce scale-110' : 'opacity-50 animate-gentle-float'
                }`} 
                style={{animationDelay: '1s'}}
              />
              <Leaf 
                className={`absolute bottom-2 -right-2 w-1.5 h-1.5 text-green-400 transition-all duration-1000 ${
                  ayuState === 'hover' ? 'opacity-100 animate-gentle-bounce scale-110' : 'opacity-40 animate-gentle-float'
                }`} 
                style={{animationDelay: '1.3s'}}
              />
              
              {/* Magical dots */}
              <div 
                className={`absolute top-4 -right-3 w-1 h-1 bg-white rounded-full transition-all duration-1000 ${
                  ayuState === 'hover' ? 'opacity-100 animate-soft-pulse scale-150' : 'opacity-70 animate-gentle-float'
                }`}
                style={{animationDelay: '0.9s'}}
              ></div>
              <div 
                className={`absolute -bottom-2 left-4 w-0.5 h-0.5 bg-yellow-200 rounded-full transition-all duration-1000 ${
                  ayuState === 'hover' ? 'opacity-100 animate-soft-pulse scale-150' : 'opacity-60 animate-gentle-float'
                }`}
                style={{animationDelay: '1.4s'}}
              ></div>
            </div>
          </div>

          {/* Enhanced Greeting Bubble */}
          {ayuState === 'hover' && (
            <div 
              className="absolute px-3 py-2 rounded-2xl animate-fade-in-up z-20 max-w-xs"
              style={{
                top: hoverPosition.top,
                left: hoverPosition.left,
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FB 50%, #FFFFFF 100%)',
                border: '2px solid #8B5CF6',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4), 0 0 15px rgba(139, 92, 246, 0.3)'
              }}
            >
              <p className="text-xs font-bold text-gray-700 whitespace-nowrap">
                ✨ Hi! I'm Ayu, your wellness companion! ✨
              </p>
              {/* Tail pointer - dynamically positioned */}
              <div 
                className={`absolute w-3 h-3 transform rotate-45 ${
                  parseFloat(hoverPosition.top) > 0 ? '-top-1.5' : '-bottom-1.5'
                }`}
                style={{
                  left: '50%',
                  marginLeft: '-6px',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FB 100%)',
                  border: '2px solid #8B5CF6',
                  borderTop: parseFloat(hoverPosition.top) > 0 ? 'none' : '2px solid #8B5CF6',
                  borderLeft: parseFloat(hoverPosition.top) > 0 ? 'none' : '2px solid #8B5CF6',
                  borderBottom: parseFloat(hoverPosition.top) > 0 ? '2px solid #8B5CF6' : 'none',
                  borderRight: parseFloat(hoverPosition.top) > 0 ? '2px solid #8B5CF6' : 'none'
                }}
              ></div>
            </div>
          )}
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-[calc(100vw-2rem)] sm:w-96 h-[70vh] sm:h-[32rem] max-w-[calc(100vw-2rem)] max-h-[70vh] sm:max-h-[32rem] flex flex-col z-40 animate-smooth-slide-in"
             style={{
               background: 'linear-gradient(135deg, #F0F9FB 0%, #FFFFFF 50%, #F0F9FB 100%)',
               border: '2px solid #8B5CF6',
               borderRadius: '24px',
               boxShadow: '0 0 30px rgba(139, 92, 246, 0.5), 0 20px 60px rgba(203, 166, 247, 0.2), inset 0 0 20px rgba(139, 92, 246, 0.1)'
             }}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-pink-100 neo-pink flex-shrink-0"
               style={{
                 borderRadius: '20px 20px 0 0'
               }}>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mini Ayu */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden neo-border"
                   style={{
                     background: 'linear-gradient(135deg, #FFFFFF 0%, #DBF0F7 100%)',
                     boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                   }}>
                <img 
                  src={ayuChatbotImage} 
                  alt="Ayu" 
                  className="w-full h-full object-cover"
                />
                <Sparkles className="absolute -top-1 -right-1 w-2 h-2 text-yellow-200 animate-gentle-bounce" />
              </div>
              
              <div>
                <h3 className="font-black text-black text-xs sm:text-sm">Ask Ayuraa AI</h3>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-soft-pulse"
                       style={{background: '#7FF2B9'}}></div>
                  <span className="text-black/90 text-xs font-bold">Online & caring</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-200 hover:scale-110 touch-manipulation"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] sm:max-w-[85%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                  
                  {/* Message Bubble */}
                  <div className={`p-2.5 sm:p-3 rounded-2xl ${
                    message.sender === 'user' 
                      ? 'rounded-br-md ml-2 neo-cyan' 
                      : 'rounded-bl-md mr-2 neo-pink'
                  }`}
                  style={{
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.5)'
                  }}>
                    
                    {message.sender === 'ayu' && (
                      <div className="flex items-start gap-2 mb-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full overflow-hidden flex-shrink-0 mt-0.5"
                             style={{
                               background: 'linear-gradient(135deg, #FFFFFF 0%, #DBF0F7 100%)'
                             }}>
                          <img 
                            src={ayuChatbotImage} 
                            alt="Ayu" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-black/90 text-xs font-bold">Ayu</span>
                      </div>
                    )}
                    
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      message.sender === 'user' ? 'text-black font-bold' : 'text-black font-bold'
                    }`}>
                      {message.text}
                    </p>
                    
                    {/* Recommendations */}
                    {message.recommendations && message.recommendations.length > 0 && (
                      <div className="mt-2 sm:mt-3 space-y-2">
                        {message.recommendations.map((rec, index) => (
                          <div key={index} className="bg-white/90 p-2 rounded-xl border border-white/50">
                            <div className="flex items-center gap-2">
                              {rec.type === 'healer' ? <Heart className="w-3 h-3 text-pink-500" /> : <ShoppingBag className="w-3 h-3 text-green-500" />}
                              <div className="text-xs">
                                <div className="font-black text-gray-700">{rec.name}</div>
                                <div className="text-gray-600 font-bold">{rec.specialty || rec.price}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 sm:mt-3 space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left p-2 bg-white/90 hover:bg-white rounded-xl border border-white/50 transition-all duration-200 hover:scale-105 touch-manipulation"
                          >
                            <span className="text-xs font-bold text-gray-700">{suggestion}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-2.5 sm:p-3 rounded-2xl rounded-bl-md mr-2 border border-pink-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center"
                         style={{
                           background: 'linear-gradient(135deg, #FFFFFF 0%, #DBF0F7 100%)'
                         }}>
                      <div className="flex justify-center gap-0.5">
                        <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
                        <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-300 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 1 && (
            <div className="px-3 sm:px-4 pb-2 flex-shrink-0">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.action)}
                    className="flex items-center gap-2 p-2 rounded-xl bg-white/60 hover:bg-white/80 border border-pink-100 transition-all duration-200 hover:scale-105 touch-manipulation"
                  >
                    <action.icon className="w-3 h-3 text-pink-500 flex-shrink-0" />
                    <span className="text-xs font-bold text-gray-700 truncate">{action.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-pink-100 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                placeholder="Share what's on your heart... 💕"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none transition-all duration-200 text-sm"
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim()}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                style={{
                  background: inputValue.trim() 
                    ? 'linear-gradient(135deg, #F087B8 0%, #CBA6F7 100%)'
                    : 'linear-gradient(135deg, #E5E7EB 0%, #D1D5DB 100%)',
                  boxShadow: inputValue.trim() 
                    ? '0 4px 15px rgba(240, 135, 184, 0.4)'
                    : 'none'
                }}
              >
                <Send className={`w-4 h-4 sm:w-5 sm:h-5 ${inputValue.trim() ? 'text-white' : 'text-gray-400'}`} />
              </button>
            </div>
            
            <div className="text-center mt-2">
              <p className="text-xs font-bold text-pink-400">
                Powered by AI • Always here with love • Completely confidential 💕
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}