import React, { useState, useRef, useEffect } from 'react'
import { Search, ShoppingBag, User, Menu, X, Heart, Calendar, Plus, ChevronDown, Zap, Smile, Sun, Flower2, BookOpen, Headphones, Play, MessageSquare, Users, Star, HelpCircle, Phone, FileText, Settings, DollarSign, Wrench, MessageCircle, Sparkles, Activity, Leaf, Brain, Wind, Gem, Target, Stethoscope, ShoppingCart, Package, Shield, Battery, Home, Filter, Clock } from 'lucide-react'
import ayuraaLogo from 'figma:asset/cb17f8a7984473cb535f04b455a9c7a13105516b.png'

interface NavigationProps {
  currentView: string
  onViewChange: (view: string, params?: any) => void
  user: any
  userProfile: any
  onSignIn: () => void
  onSignOut: () => void
  onHealerRegistration: () => void
  cartItems: any[]
  onToggleCart: () => void
  showAuthModal?: boolean
  showBookingModal?: boolean
}

// Safe icon wrapper function
const SafeIcon = ({ icon: IconComponent, fallback = Home, ...props }) => {
  // Check if IconComponent is a valid React component
  if (!IconComponent || typeof IconComponent !== 'function') {
    const FallbackIcon = fallback
    return <FallbackIcon {...props} />
  }
  
  try {
    return <IconComponent {...props} />
  } catch (error) {
    console.warn('Error rendering icon, using fallback:', error)
    const FallbackIcon = fallback
    return <FallbackIcon {...props} />
  }
}

export function Navigation({ 
  currentView, 
  onViewChange, 
  user, 
  userProfile,
  onSignIn, 
  onSignOut,
  onHealerRegistration,
  cartItems,
  onToggleCart,
  showAuthModal,
  showBookingModal
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [dropdownStates, setDropdownStates] = useState({
    shop: false,
    services: false,
    resources: false,
    community: false,
    contact: false
  })
  
  const [hoverTimeouts, setHoverTimeouts] = useState({})
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [focusedIndices, setFocusedIndices] = useState({
    shop: -1,
    services: -1,
    resources: -1,
    community: -1,
    contact: -1
  })
  
  // Search functionality state
  const [searchQueries, setSearchQueries] = useState({
    shop: '',
    services: '',
    resources: '',
    community: '',
    contact: ''
  })
  
  // Recently viewed tracking
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('ayuraa-recently-viewed')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  
  // Refs for dropdown containers and buttons
  const dropdownRefs = useRef({
    shop: null,
    services: null,
    resources: null,
    community: null,
    contact: null
  })
  
  const buttonRefs = useRef({
    shop: null,
    services: null,
    resources: null,
    community: null,
    contact: null
  })

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // Track recently viewed pages
  useEffect(() => {
    const trackPageView = () => {
      const pageInfo = getPageInfo(currentView)
      if (pageInfo) {
        setRecentlyViewed(prev => {
          const filtered = prev.filter(item => item.id !== pageInfo.id)
          const updated = [pageInfo, ...filtered].slice(0, 5) // Keep only 5 recent items
          
          try {
            localStorage.setItem('ayuraa-recently-viewed', JSON.stringify(updated))
          } catch {}
          
          return updated
        })
      }
    }

    trackPageView()
  }, [currentView])

  // Get page info for recently viewed tracking
  const getPageInfo = (view) => {
    const pageMap = {
      'home': { id: 'home', label: 'HOME', icon: Home, category: 'general' },
      'services': { id: 'services', label: 'ALL HEALERS', icon: Users, category: 'healers' },
      'shop': { id: 'shop', label: 'SHOP HOME', icon: ShoppingCart, category: 'shop' },
      'resources': { id: 'resources', label: 'ALL RESOURCES', icon: BookOpen, category: 'resources' },
      'community': { id: 'community', label: 'COMMUNITY HOME', icon: MessageSquare, category: 'community' },
      'contact': { id: 'contact', label: 'CONTACT US', icon: Phone, category: 'support' },
      'faqs': { id: 'faqs', label: 'FAQ', icon: HelpCircle, category: 'support' }
    }
    
    const pageInfo = pageMap[view]
    if (pageInfo) {
      // Ensure icon is a valid React component
      return {
        ...pageInfo,
        icon: pageInfo.icon || Home
      }
    }
    return null
  }

  // Filter menu items based on search query
  const filterMenuItems = (items, searchQuery) => {
    if (!searchQuery.trim()) return items
    return items.filter(item => 
      item.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Clear search query
  const clearSearchQuery = (dropdownType) => {
    setSearchQueries(prev => ({
      ...prev,
      [dropdownType]: ''
    }))
  }

  // Detect touch device
  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    
    checkTouchDevice()
    window.addEventListener('resize', checkTouchDevice)
    
    return () => window.removeEventListener('resize', checkTouchDevice)
  }, [])

  // Handle dropdown open/close
  const setDropdownOpen = (dropdownType, isOpen) => {
    setDropdownStates(prev => ({
      ...prev,
      [dropdownType]: isOpen
    }))
    
    if (!isOpen) {
      setFocusedIndices(prev => ({
        ...prev,
        [dropdownType]: -1
      }))
      clearSearchQuery(dropdownType)
    }
  }

  // Handle hover with proper delays
  const handleMouseEnter = (dropdownType) => {
    if (isTouchDevice) return
    
    // Clear all timeouts
    Object.keys(hoverTimeouts).forEach(key => {
      if (hoverTimeouts[key]) {
        clearTimeout(hoverTimeouts[key])
      }
    })
    setHoverTimeouts({})
    
    // Open dropdown
    setDropdownOpen(dropdownType, true)
  }

  const handleMouseLeave = (dropdownType) => {
    if (isTouchDevice) return
    
    const timeout = setTimeout(() => {
      setDropdownOpen(dropdownType, false)
    }, 150)
    
    setHoverTimeouts(prev => ({
      ...prev,
      [dropdownType]: timeout
    }))
  }

  // Handle click for touch devices
  const handleDropdownToggle = (dropdownType) => {
    // Close all other dropdowns
    const newStates = {}
    Object.keys(dropdownStates).forEach(key => {
      newStates[key] = key === dropdownType ? !dropdownStates[key] : false
    })
    setDropdownStates(newStates)
    
    // Reset all focus indices
    const newIndices = {}
    Object.keys(focusedIndices).forEach(key => {
      newIndices[key] = -1
    })
    setFocusedIndices(newIndices)
    
    // Clear search queries
    if (!newStates[dropdownType]) {
      clearSearchQuery(dropdownType)
    }
  }

  // Keyboard navigation
  const handleKeyDown = (e, dropdownType) => {
    const items = navItems.find(item => item.id === dropdownType)?.submenu || []
    const filteredItems = filterMenuItems(items, searchQueries[dropdownType])
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!dropdownStates[dropdownType]) {
          setDropdownOpen(dropdownType, true)
          setFocusedIndices(prev => ({ ...prev, [dropdownType]: 0 }))
        } else {
          setFocusedIndices(prev => ({
            ...prev,
            [dropdownType]: prev[dropdownType] < filteredItems.length - 1 ? prev[dropdownType] + 1 : 0
          }))
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (!dropdownStates[dropdownType]) {
          setDropdownOpen(dropdownType, true)
          setFocusedIndices(prev => ({ ...prev, [dropdownType]: filteredItems.length - 1 }))
        } else {
          setFocusedIndices(prev => ({
            ...prev,
            [dropdownType]: prev[dropdownType] > 0 ? prev[dropdownType] - 1 : filteredItems.length - 1
          }))
        }
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (!dropdownStates[dropdownType]) {
          setDropdownOpen(dropdownType, true)
          setFocusedIndices(prev => ({ ...prev, [dropdownType]: 0 }))
        } else if (focusedIndices[dropdownType] >= 0) {
          const selectedItem = filteredItems[focusedIndices[dropdownType]]
          if (selectedItem) {
            onViewChange(selectedItem.id)
            setDropdownOpen(dropdownType, false)
          }
        }
        break
      case 'Escape':
        e.preventDefault()
        setDropdownOpen(dropdownType, false)
        buttonRefs.current[dropdownType]?.focus()
        break
      case 'Tab':
        if (dropdownStates[dropdownType]) {
          setDropdownOpen(dropdownType, false)
        }
        break
    }
  }

  // Handle dropdown item click
  const handleDropdownItemClick = (itemId, dropdownType) => {
    onViewChange(itemId)
    setDropdownOpen(dropdownType, false)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs.current).forEach(key => {
        if (dropdownRefs.current[key] && !dropdownRefs.current[key].contains(event.target)) {
          setDropdownOpen(key, false)
        }
      })
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      Object.values(hoverTimeouts).forEach(timeout => {
        if (timeout) clearTimeout(timeout)
      })
    }
  }, [hoverTimeouts])

  // Global keyboard shortcuts for quick navigation
  useEffect(() => {
    const handleGlobalKeyboard = (e) => {
      // Only trigger shortcuts when no input is focused and not in a modal
      const isInputFocused = document.activeElement && (
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA' ||
        document.activeElement.tagName === 'SELECT' ||
        document.activeElement.contentEditable === 'true'
      )
      
      const isModalOpen = document.querySelector('[role="dialog"]') || 
                         document.querySelector('.modal') ||
                         showAuthModal || showBookingModal
      
      if (isInputFocused || isModalOpen) return

      // Check for Alt/Option + key combinations for quick navigation
      if (e.altKey && !e.ctrlKey && !e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'h': // Alt + H = Home
            e.preventDefault()
            onViewChange('home')
            break
          case 's': // Alt + S = Services/Healers
            e.preventDefault()
            onViewChange('services')
            break
          case 'p': // Alt + P = Shop (Products)
            e.preventDefault()
            onViewChange('shop')
            break
          case 'r': // Alt + R = Resources
            e.preventDefault()
            onViewChange('resources')
            break
          case 'c': // Alt + C = Community
            e.preventDefault()
            onViewChange('community')
            break
          case 'u': // Alt + U = Support
            e.preventDefault()
            onViewChange('contact')
            break
          case 'd': // Alt + D = Dashboard (if logged in)
            e.preventDefault()
            if (user) {
              if (userProfile?.role === 'healer') {
                onViewChange('healer-dashboard')
              } else {
                onViewChange('user-dashboard')
              }
            } else {
              onSignIn()
            }
            break
          case 'b': // Alt + B = Cart/Bag
            e.preventDefault()
            onToggleCart()
            break
          case '/': // Alt + / = Search (focus search button)
            e.preventDefault()
            const searchButton = document.querySelector('button:has(svg[data-lucide="search"])')
            if (searchButton) {
              searchButton.focus()
              // Add visual feedback
              searchButton.classList.add('animate-gentle-bounce')
              setTimeout(() => {
                searchButton.classList.remove('animate-gentle-bounce')
              }, 2000)
            }
            break
        }
      }

      // Escape key to close all dropdowns
      if (e.key === 'Escape') {
        const newStates = {}
        Object.keys(dropdownStates).forEach(key => {
          newStates[key] = false
        })
        setDropdownStates(newStates)
        
        // Clear all search queries
        setSearchQueries({
          shop: '',
          services: '',
          resources: '',
          community: '',
          contact: ''
        })
      }

      // Quick number keys for popular actions (when Alt is held)
      if (e.altKey && !e.ctrlKey && !e.metaKey && !isNaN(e.key)) {
        const num = parseInt(e.key)
        switch (num) {
          case 1: // Alt + 1 = Home
            e.preventDefault()
            onViewChange('home')
            break
          case 2: // Alt + 2 = Healers
            e.preventDefault()
            onViewChange('services')
            break
          case 3: // Alt + 3 = Shop
            e.preventDefault()
            onViewChange('shop')
            break
          case 4: // Alt + 4 = Resources
            e.preventDefault()
            onViewChange('resources')
            break
          case 5: // Alt + 5 = Community
            e.preventDefault()
            onViewChange('community')
            break
        }
      }
    }

    document.addEventListener('keydown', handleGlobalKeyboard)
    return () => document.removeEventListener('keydown', handleGlobalKeyboard)
  }, [user, userProfile, dropdownStates, onViewChange, onSignIn, onToggleCart, showAuthModal, showBookingModal])

  // Keyboard shortcut help tooltip component
  const KeyboardShortcutTooltip = ({ shortcut, description, className = "" }) => (
    <div className={`hidden lg:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 ${className}`}>
      <div className="flex items-center space-x-2">
        <span className="text-neo-yellow">{shortcut}</span>
        <span>•</span>
        <span>{description}</span>
      </div>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
    </div>
  )

  const navItems = [
    { id: 'home', label: 'HOME', public: true },
    { 
      id: 'services', 
      label: 'HEALERS', 
      public: true,
      hasSubmenu: true,
      submenu: [
        { id: 'services', label: 'ALL HEALERS', icon: Users },
        { id: 'services#spiritual', label: 'SPIRITUAL COACHES', icon: Sparkles },
        { id: 'services#ayurveda', label: 'AYURVEDIC HEALERS', icon: Leaf },
        { id: 'services#sound', label: 'SOUND HEALING', icon: Activity },
        { id: 'services#breathwork', label: 'BREATHWORK COACHES', icon: Wind },
        { id: 'services#crystal', label: 'CRYSTAL HEALING', icon: Gem },
        { id: 'services#manifestation', label: 'MANIFESTATION', icon: Target },
        { id: 'services#symptoms', label: 'FIND BY SYMPTOMS', icon: Stethoscope }
      ]
    },
    { 
      id: 'shop', 
      label: 'SHOP', 
      public: true,
      hasSubmenu: true,
      submenu: [
        { id: 'shop', label: 'SHOP HOME', icon: Home },
        { id: 'shop/all', label: 'ALL PRODUCTS', icon: Package },
        { id: 'shop/need/gut', label: 'GUT HEALTH', icon: Heart },
        { id: 'shop/need/skin', label: 'SKIN GLOW', icon: Sun },
        { id: 'shop/need/energy', label: 'ENERGY', icon: Battery },
        { id: 'shop/need/immunity', label: 'IMMUNITY', icon: Shield }
      ]
    },
    { 
      id: 'resources', 
      label: 'RESOURCES', 
      public: true,
      hasSubmenu: true,
      submenu: [
        { id: 'resources', label: 'ALL RESOURCES', icon: BookOpen },
        { id: 'resources#articles', label: 'ARTICLES', icon: FileText },
        { id: 'resources#podcasts', label: 'PODCASTS', icon: Headphones },
        { id: 'resources#videos', label: 'VIDEOS', icon: Play },
        { id: 'resources#guides', label: 'HEALING GUIDES', icon: Sparkles },
        { id: 'resources#meditation', label: 'MEDITATION', icon: Brain },
        { id: 'resources#nutrition', label: 'NUTRITION', icon: Leaf }
      ]
    },
    { 
      id: 'community', 
      label: 'COMMUNITY', 
      public: true,
      hasSubmenu: true,
      submenu: [
        { id: 'community', label: 'COMMUNITY HOME', icon: Home },
        { id: 'community#discussions', label: 'DISCUSSIONS', icon: MessageSquare },
        { id: 'community#events', label: 'EVENTS', icon: Calendar },
        { id: 'community#stories', label: 'SUCCESS STORIES', icon: Star },
        { id: 'community#influencers', label: 'WELLNESS INFLUENCERS', icon: Users },
        { id: 'community#groups', label: 'SUPPORT GROUPS', icon: Heart }
      ]
    },
    { 
      id: 'contact', 
      label: 'SUPPORT', 
      public: true,
      hasSubmenu: true,
      submenu: [
        { id: 'contact', label: 'CONTACT US', icon: Phone },
        { id: 'faqs', label: 'FAQ', icon: HelpCircle },
        { id: 'support#help', label: 'HELP CENTER', icon: Settings },
        { id: 'support#billing', label: 'BILLING SUPPORT', icon: DollarSign },
        { id: 'support#technical', label: 'TECHNICAL HELP', icon: Wrench },
        { id: 'support#feedback', label: 'FEEDBACK', icon: MessageCircle }
      ]
    }
  ]

  const dashboardItems = user ? [
    ...(userProfile?.role === 'healer' ? [
      { id: 'healer-dashboard', label: 'HEALER DASHBOARD', icon: Heart }
    ] : []),
    { id: 'user-dashboard', label: 'MY DASHBOARD', icon: User },
    { id: 'shop-account', label: 'MY ORDERS', icon: ShoppingBag }
  ].map(item => ({
    ...item,
    icon: item.icon || Home // Ensure icon fallback
  })) : []

  // Get recently viewed items for a specific category
  const getRecentlyViewedForCategory = (dropdownType) => {
    const categoryMap = {
      'shop': 'shop',
      'services': 'healers', 
      'resources': 'resources',
      'community': 'community',
      'contact': 'support'
    }
    
    return recentlyViewed
      .filter(item => item.category === categoryMap[dropdownType])
      .slice(0, 3)
  }

  return (
    <nav className="bg-white neo-border-bottom sticky top-0 z-50" style={{ borderBottom: '4px solid #000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left Section - Logo */}
          <div 
            className="flex items-center cursor-pointer flex-shrink-0"
            onClick={() => onViewChange('home')}
          >
            <div className="w-8 sm:w-12 h-8 sm:h-12 neo-pink neo-border flex items-center justify-center mr-2 sm:mr-4 transform rotate-12 hover-scale overflow-hidden">
              <img 
                src={ayuraaLogo}
                alt="Ayuraa mascot"
                className="w-full h-full object-cover transform -rotate-12"
              />
            </div>
            <span className="font-black text-xl sm:text-2xl lg:text-3xl text-black uppercase tracking-wider text-hover-glow">
              AYURAA
            </span>
          </div>

          {/* Center Section - Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center space-x-2">
              {navItems.map((item, index) => {
                const isOpen = dropdownStates[item.id]
                const focusedIndex = focusedIndices[item.id]

                return (
                  <div key={item.id} className="relative">
                    {item.hasSubmenu ? (
                      <div
                        ref={el => dropdownRefs.current[item.id] = el}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(item.id)}
                        onMouseLeave={() => handleMouseLeave(item.id)}
                      >
                        <button
                          ref={el => buttonRefs.current[item.id] = el}
                          onClick={() => {
                            if (isTouchDevice) {
                              handleDropdownToggle(item.id)
                            } else {
                              onViewChange(item.id)
                            }
                          }}
                          onKeyDown={(e) => handleKeyDown(e, item.id)}
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                          aria-label={`${item.label} menu`}
                          className={`flex items-center space-x-2 px-4 lg:px-6 py-3 neo-border font-black text-sm uppercase transition-all hover-lift focus:outline-none focus:ring-2 focus:ring-neo-yellow focus:ring-offset-2 ${
                            currentView === item.id
                              ? 'neo-yellow neo-shadow'
                              : 'bg-white hover:neo-cyan hover:neo-shadow'
                          } ${
                            isOpen 
                              ? 'neo-shadow-lg transform translate-y-[-1px]' 
                              : ''
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown 
                            size={16} 
                            className={`transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`} 
                            aria-hidden="true"
                          />
                        </button>
                        
                        {isOpen && (
                          <div 
                            className="absolute top-full left-0 mt-0 w-72 bg-white neo-border neo-shadow-lg py-2 z-50 animate-fade-in-up"
                            onMouseEnter={() => handleMouseEnter(item.id)}
                            onMouseLeave={() => handleMouseLeave(item.id)}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby={`${item.id}-button`}
                          >
                            {/* Search Input */}
                            <div className="px-4 py-2 border-b-2 border-black">
                              <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                                <input
                                  type="text"
                                  placeholder={`Search ${item.label.toLowerCase()}...`}
                                  value={searchQueries[item.id]}
                                  onChange={(e) => setSearchQueries(prev => ({
                                    ...prev,
                                    [item.id]: e.target.value
                                  }))}
                                  className="w-full pl-10 pr-4 py-2 bg-white neo-border font-bold text-black text-sm placeholder-gray-500 focus:neo-yellow focus:outline-none transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                />
                              </div>
                            </div>

                            {/* Recently Viewed Section */}
                            {getRecentlyViewedForCategory(item.id).length > 0 && (
                              <>
                                <div className="px-4 py-2 border-b border-gray-200">
                                  <div className="flex items-center space-x-2 text-xs font-black text-gray-600 uppercase">
                                    <Clock size={12} />
                                    <span>Recently Viewed</span>
                                  </div>
                                </div>
                                <div className="max-h-32 overflow-y-auto">
                                  {getRecentlyViewedForCategory(item.id).map((recentItem, index) => {
                                    return (
                                      <button
                                        key={`recent-${recentItem.id}`}
                                        onClick={() => handleDropdownItemClick(recentItem.id, item.id)}
                                        className="w-full text-left px-6 py-2 font-bold text-gray-600 text-xs flex items-center space-x-3 hover:neo-lime transition-colors"
                                      >
                                        <SafeIcon 
                                          icon={recentItem.icon} 
                                          size={14} 
                                          className="text-gray-400" 
                                        />
                                        <span>{recentItem.label}</span>
                                      </button>
                                    )
                                  })}
                                </div>
                                <div className="border-b border-gray-200 my-2"></div>
                              </>
                            )}

                            {/* Main Menu Items */}
                            <div className="max-h-80 overflow-y-auto">
                              {filterMenuItems(item.submenu, searchQueries[item.id]).map((subItem, index) => {
                                const isFocused = index === focusedIndex
                                
                                return (
                                  <button
                                    key={subItem.id}
                                    onClick={() => handleDropdownItemClick(subItem.id, item.id)}
                                    onMouseEnter={() => setFocusedIndices(prev => ({
                                      ...prev,
                                      [item.id]: index
                                    }))}
                                    role="menuitem"
                                    tabIndex={isFocused ? 0 : -1}
                                    className={`w-full text-left px-6 py-3 font-bold text-black uppercase text-sm transition-all duration-200 hover:neo-lime focus:neo-lime focus:outline-none flex items-center space-x-3 ${
                                      isFocused 
                                        ? 'neo-lime neo-shadow transform translate-x-1' 
                                        : 'hover:transform hover:translate-x-1'
                                    }`}
                                  >
                                    <SafeIcon 
                                      icon={subItem.icon}
                                      size={16} 
                                      className={`${isFocused ? 'animate-gentle-bounce' : ''} transition-transform`} 
                                    />
                                    <span className={`${isFocused ? 'animate-gentle-bounce' : ''}`}>
                                      {subItem.label}
                                    </span>
                                  </button>
                                )
                              })}
                            </div>

                            {/* No Results Message */}
                            {searchQueries[item.id] && filterMenuItems(item.submenu, searchQueries[item.id]).length === 0 && (
                              <div className="px-6 py-4 text-center">
                                <div className="neo-orange p-4 neo-border">
                                  <div className="text-black font-black text-sm mb-2">
                                    NO RESULTS FOUND
                                  </div>
                                  <div className="text-black font-bold text-xs mb-3">
                                    for "{searchQueries[item.id]}"
                                  </div>
                                  <button
                                    onClick={() => clearSearchQuery(item.id)}
                                    className="neo-cyan px-3 py-1 neo-border font-black text-xs uppercase hover-lift"
                                  >
                                    Clear Search
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => onViewChange(item.id)}
                        className={`px-4 lg:px-6 py-3 neo-border font-black text-sm uppercase transition-all hover-lift ${
                          currentView === item.id
                            ? 'neo-yellow neo-shadow'
                            : 'bg-white hover:neo-cyan hover:neo-shadow'
                        }`}
                      >
                        {item.label}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Section - Search, Cart, User */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            {/* Search Button */}
            <button className="neo-cyan p-2 sm:p-3 neo-border neo-shadow hover-lift hover-glow transition-all min-h-[44px] min-w-[44px] flex items-center justify-center">
              <Search size={16} className="sm:w-5 sm:h-5" />
            </button>

            {/* Cart Button */}
            <button 
              className="relative neo-orange p-2 sm:p-3 neo-border neo-shadow hover-lift hover-glow transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={onToggleCart}
            >
              <ShoppingBag size={16} className="sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 neo-pink w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center text-white font-black text-xs neo-border animate-gentle-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 sm:space-x-3 neo-yellow p-2 sm:p-3 neo-border neo-shadow hover-lift hover-glow transition-all min-h-[44px]"
                >
                  <div className="w-6 sm:w-8 h-6 sm:h-8 neo-pink neo-border flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm font-black">
                      {userProfile?.name?.charAt(0) || user.email?.charAt(0)}
                    </span>
                  </div>
                  <span className="hidden sm:block font-black text-xs sm:text-sm uppercase whitespace-nowrap">
                    {userProfile?.name || 'USER'}
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white neo-border neo-shadow-lg py-2 z-50">
                    {dashboardItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onViewChange(item.id)
                          setIsProfileOpen(false)
                        }}
                        className="flex items-center space-x-3 w-full px-6 py-3 text-left font-bold text-black uppercase text-sm hover:neo-lime transition-colors"
                      >
                        <SafeIcon icon={item.icon} size={16} />
                        <span>{item.label}</span>
                      </button>
                    ))}
                    
                    {userProfile?.role !== 'healer' && (
                      <>
                        <div className="h-1 bg-black mx-4 my-2"></div>
                        <button
                          onClick={() => {
                            onHealerRegistration()
                            setIsProfileOpen(false)
                          }}
                          className="flex items-center space-x-3 w-full px-6 py-3 text-left font-bold text-black uppercase text-sm hover:neo-cyan transition-colors"
                        >
                          <Plus size={16} />
                          <span>BECOME A HEALER</span>
                        </button>
                      </>
                    )}
                    
                    <div className="h-1 bg-black mx-4 my-2"></div>
                    <button
                      onClick={() => {
                        onSignOut()
                        setIsProfileOpen(false)
                      }}
                      className="w-full px-6 py-3 text-left font-bold text-black uppercase text-sm hover:bg-red-500 hover:text-white transition-colors"
                    >
                      SIGN OUT
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 neo-border font-black text-xs sm:text-sm uppercase neo-yellow neo-shadow flex items-center space-x-1 sm:space-x-2 transition-all hover-lift hover-glow whitespace-nowrap min-h-[44px]"
              >
                <Zap size={16} className="sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="hidden sm:inline">SIGN IN</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden neo-pink p-2 sm:p-3 neo-border neo-shadow hover-lift hover-glow transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {isMenuOpen ? <X size={16} className="text-white sm:w-5 sm:h-5" /> : <Menu size={16} className="text-white sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white neo-border py-4 sm:py-6 mobile-px-safe animate-fade-in-up" style={{ borderTop: '3px solid #000000' }}>
            <div className="space-y-2 sm:space-y-3">
              {navItems.map(item => (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      onViewChange(item.id)
                      setIsMenuOpen(false)
                    }}
                    className={`block w-full text-left px-4 sm:px-6 py-3 sm:py-4 font-black uppercase text-sm transition-colors min-h-[44px] hover-lift ${
                      currentView === item.id
                        ? 'neo-yellow neo-shadow'
                        : 'bg-white hover:neo-cyan active:neo-cyan'
                    }`}
                  >
                    {item.label}
                  </button>
                  {item.hasSubmenu && (
                    <div className="ml-2 sm:ml-4 mt-2 space-y-1 sm:space-y-2">
                      {item.submenu?.map(subItem => {
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              onViewChange(subItem.id)
                              setIsMenuOpen(false)
                            }}
                            className="w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-sm font-bold text-black uppercase hover:neo-lime active:neo-lime transition-colors min-h-[44px] flex items-center space-x-3"
                          >
                            <SafeIcon icon={subItem.icon} size={16} />
                            <span>{subItem.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
              
              {user && dashboardItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id)
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center space-x-3 w-full px-4 sm:px-6 py-3 sm:py-4 text-left font-bold text-black uppercase text-sm hover:neo-orange active:neo-orange transition-colors min-h-[44px]"
                >
                  <SafeIcon icon={item.icon} size={16} />
                  <span>{item.label}</span>
                </button>
              ))}
              
              {(!user || userProfile?.role !== 'healer') && (
                <button
                  onClick={() => {
                    onHealerRegistration()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center space-x-3 w-full px-4 sm:px-6 py-3 sm:py-4 text-left neo-lime font-bold uppercase text-sm min-h-[44px] hover-lift"
                >
                  <Plus size={16} />
                  <span>BECOME A HEALER</span>
                </button>
              )}
              
              {!user && (
                <button
                  onClick={() => {
                    onSignIn()
                    setIsMenuOpen(false)
                  }}
                  className="neo-button w-full mt-4 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-center space-x-2 min-h-[44px] hover-lift hover-glow"
                >
                  <Zap size={18} />
                  <span>SIGN IN</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}