import React, { useState, useEffect } from 'react'
import { ArrowLeft, Filter, Grid, List, Star, Heart, ShoppingBag, Search, SlidersHorizontal, Zap, X, ArrowRight } from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'

interface ProductListingPageProps {
  filters: any
  onViewChange: (view: string) => void
  onAddToCart: (product: any, options?: any) => void
}

export function ProductListingPage({ filters, onViewChange, onAddToCart }: ProductListingPageProps) {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { id: 'Powders', label: 'HERBAL POWDERS', count: 24 },
    { id: 'Oils', label: 'ESSENTIAL OILS', count: 18 },
    { id: 'Teas', label: 'WELLNESS TEAS', count: 15 },
    { id: 'Supplements', label: 'SUPPLEMENTS', count: 32 },
    { id: 'Crystals', label: 'HEALING CRYSTALS', count: 12 }
  ]

  const needs = [
    { id: 'gut', label: 'GUT HEALTH', color: 'neo-lime' },
    { id: 'skin', label: 'SKIN GLOW', color: 'neo-pink' },
    { id: 'energy', label: 'ENERGY', color: 'neo-yellow' },
    { id: 'immunity', label: 'IMMUNITY', color: 'neo-cyan' }
  ]

  // Mock products data
  const mockProducts = [
    {
      id: 'daily-greens',
      name: 'DAILY GREENS POWDER',
      price: 1299,
      originalPrice: 1599,
      rating: 4.8,
      reviews: 234,
      category: 'Powders',
      need: 'energy',
      image: 'greens-powder',
      badge: 'BESTSELLER',
      description: 'COMPLETE SUPERFOOD BLEND WITH 21 ORGANIC GREENS'
    },
    {
      id: 'immunity-boost',
      name: 'IMMUNITY BOOST BUNDLE',
      price: 2199,
      originalPrice: 2799,
      rating: 4.9,
      reviews: 156,
      category: 'Supplements',
      need: 'immunity',
      image: 'immunity-bundle',
      badge: 'BUNDLE',
      description: 'COMPREHENSIVE IMMUNE SUPPORT SYSTEM'
    },
    {
      id: 'gut-restore',
      name: 'GUT RESTORE COMPLEX',
      price: 1799,
      originalPrice: 2199,
      rating: 4.7,
      reviews: 189,
      category: 'Supplements',
      need: 'gut',
      image: 'gut-complex',
      badge: 'NEW',
      description: 'ADVANCED DIGESTIVE HEALTH FORMULA'
    },
    {
      id: 'turmeric-gold',
      name: 'TURMERIC GOLD POWDER',
      price: 899,
      originalPrice: 1199,
      rating: 4.6,
      reviews: 312,
      category: 'Powders',
      need: 'immunity',
      image: 'turmeric-powder',
      badge: null,
      description: 'ORGANIC TURMERIC WITH BLACK PEPPER'
    },
    {
      id: 'collagen-glow',
      name: 'COLLAGEN GLOW PEPTIDES',
      price: 1599,
      originalPrice: 1999,
      rating: 4.8,
      reviews: 267,
      category: 'Supplements',
      need: 'skin',
      image: 'collagen-powder',
      badge: 'POPULAR',
      description: 'PREMIUM MARINE COLLAGEN FOR RADIANT SKIN'
    },
    {
      id: 'ashwagandha',
      name: 'ASHWAGANDHA POWDER',
      price: 699,
      originalPrice: 899,
      rating: 4.5,
      reviews: 198,
      category: 'Powders',
      need: 'energy',
      image: 'ashwagandha-powder',
      badge: null,
      description: 'ADAPTOGENIC HERB FOR STRESS & ENERGY'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setIsLoading(true)
    setTimeout(() => {
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Filter by need
    if (filters.need) {
      filtered = filtered.filter(product => product.need === filters.need)
    }

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category)
    }

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => selectedCategories.includes(product.category))
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => b.badge === 'NEW' ? 1 : -1)
        break
      default:
        // Keep original order for 'featured'
        break
    }

    setFilteredProducts(filtered)
  }, [products, filters, selectedCategories, searchQuery, priceRange, sortBy])

  const getPageTitle = () => {
    if (filters.need) {
      const need = needs.find(n => n.id === filters.need)
      return need ? need.label : 'WELLNESS PRODUCTS'
    }
    if (filters.category && filters.category !== 'all') {
      const category = categories.find(c => c.id === filters.category)
      return category ? category.label : 'ALL PRODUCTS'
    }
    return 'ALL PRODUCTS'
  }

  const getBreadcrumb = () => {
    if (filters.need) {
      const need = needs.find(n => n.id === filters.need)
      return need ? 'SHOP BY NEED / ' + need.label : 'SHOP'
    }
    if (filters.category && filters.category !== 'all') {
      const category = categories.find(c => c.id === filters.category)
      return category ? 'CATEGORIES / ' + category.label : 'SHOP'
    }
    return 'ALL PRODUCTS'
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  // Calculate grid classes
  const getGridClasses = () => {
    if (viewMode !== 'grid') return 'space-y-6'
    
    const baseClasses = 'grid gap-3 lg:gap-4'
    const responsiveClasses = showFilters 
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
      : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
    
    return baseClasses + ' ' + responsiveClasses
  }

  const ProductCard = ({ product, index }: { product: any, index: number }) => {
    let badgeColor = 'neo-cyan'
    if (product.badge === 'BESTSELLER') badgeColor = 'neo-yellow'
    if (product.badge === 'BUNDLE') badgeColor = 'neo-pink'
    if (product.badge === 'NEW') badgeColor = 'neo-lime'

    return (
      <div
        className="neo-card p-3 hover-lift hover-glow group cursor-pointer relative transition-all"
        onClick={() => onViewChange('shop/product/' + product.id)}
      >
        {/* Badge */}
        {product.badge && (
          <div className={'absolute -top-2 -right-2 ' + badgeColor + ' px-2 py-0.5 neo-border font-black text-black uppercase text-xs z-10'}>
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-2 left-2 neo-orange p-1 neo-border hover:hover-scale transition-transform z-10">
          <Heart size={12} className="text-black" />
        </button>

        {/* Product Image */}
        <div className="w-full h-24 neo-orange neo-border mb-3 flex items-center justify-center hover:hover-scale transition-transform">
          <ImageWithFallback
            src={'/images/products/' + product.image + '.jpg'}
            alt={product.name}
            className="w-20 h-20 object-cover"
            fallback={
              <div className="text-center">
                <div className="text-3xl mb-1">🌿</div>
                <div className="font-black text-black text-xs uppercase">{product.name}</div>
              </div>
            }
          />
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <h3 className="font-black text-black uppercase text-sm group-hover:text-hover-glow">
            {product.name}
          </h3>
          
          <p className="font-bold text-black uppercase text-xs line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => {
                const starClassName = (i < Math.floor(product.rating) ? 'text-black fill-current' : 'text-gray-400') + ' hover:hover-scale transition-transform'
                return (
                  <Star 
                    key={i} 
                    size={12} 
                    className={starClassName}
                  />
                )
              })}
            </div>
            <span className="font-bold text-black uppercase text-xs">
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-lg font-black text-black group-hover:hover-scale">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm font-bold text-black line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="neo-cyan px-1 py-0.5 neo-border font-black text-black uppercase text-xs">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart(product)
            }}
            className="w-full neo-button py-2 flex items-center justify-center space-x-2 hover-lift text-sm transition-all"
          >
            <ShoppingBag size={16} />
            <span>ADD TO CART</span>
            <Zap size={16} />
          </button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="neo-yellow p-8 neo-border neo-shadow-lg max-w-md mx-auto transform rotate-2 animate-bounce">
              <div className="font-black text-black text-xl uppercase">LOADING PRODUCTS...</div>
              <div className="mt-4 flex justify-center space-x-2">
                {[1,2,3].map(i => {
                  const delayStyle = { animationDelay: (i * 0.2) + 's' }
                  return (
                    <div key={i} className="w-4 h-4 bg-black animate-pulse transform rotate-45" style={delayStyle}></div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8 gap-6">
          <button
            onClick={() => onViewChange('shop')}
            className="flex items-center space-x-2 neo-cyan px-6 py-3 neo-border neo-shadow font-black text-black uppercase hover-lift hover-glow animate-fade-in-up"
          >
            <ArrowLeft size={20} />
            <span>BACK TO SHOP</span>
          </button>
          
          <div className="text-center animate-fade-in-up stagger-2">
            <h1 className="text-3xl lg:text-5xl font-black text-black uppercase transform -skew-x-2 animate-soft-pulse leading-tight">
              {getPageTitle()}
            </h1>
            <p className="font-bold text-black uppercase text-sm mt-2 animate-fade-in-up">{getBreadcrumb()}</p>
          </div>

          {/* Mobile Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden neo-pink px-6 py-3 neo-border neo-shadow font-black text-black uppercase hover-lift hover-scale animate-fade-in-up stagger-3"
          >
            <SlidersHorizontal size={20} className="inline mr-2" />
            FILTERS
          </button>
        </div>

        {/* Search & Sort Bar */}
        <div className="neo-card p-6 mb-8 hover-glow animate-fade-in-up stagger-2">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black z-10" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH PRODUCTS..."
                  className="w-full pl-12 pr-4 py-3 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus-expand focus-glow"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* View Mode */}
              <div className="flex neo-border">
                <button
                  onClick={() => setViewMode('grid')}
                  className={'p-3 font-black uppercase hover-scale transition-all ' + (
                    viewMode === 'grid' 
                      ? 'neo-yellow text-black' 
                      : 'bg-white text-black hover-glow'
                  )}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={'p-3 font-black uppercase hover-scale transition-all ' + (
                    viewMode === 'list' 
                      ? 'neo-yellow text-black' 
                      : 'bg-white text-black hover-glow'
                  )}
                >
                  <List size={20} />
                </button>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white neo-border font-bold text-black uppercase focus-expand focus-glow hover-scale"
              >
                <option value="featured">FEATURED</option>
                <option value="price-low">PRICE: LOW TO HIGH</option>
                <option value="price-high">PRICE: HIGH TO LOW</option>
                <option value="rating">HIGHEST RATED</option>
                <option value="newest">NEWEST FIRST</option>
              </select>

              {/* Desktop Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={'hidden lg:flex items-center px-6 py-3 neo-border neo-shadow font-black text-black uppercase hover-lift hover-scale transition-all ' + (
                  showFilters 
                    ? 'neo-pink text-black' 
                    : 'neo-cyan text-black hover-glow'
                )}
              >
                <SlidersHorizontal size={20} className="mr-2" />
                FILTERS
                {showFilters && <X size={20} className="ml-2" />}
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 pt-6 border-t-2 border-black">
            <p className="font-bold text-black uppercase animate-fade-in-up">
              SHOWING {filteredProducts.length} OF {products.length} PRODUCTS
            </p>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <>
              {/* Mobile Backdrop */}
              <div 
                className="lg:hidden fixed inset-0 bg-black bg-opacity-75 z-40 animate-fade-in"
                onClick={() => setShowFilters(false)}
              />
              
              {/* Filter Panel */}
              <div className="fixed lg:relative inset-y-0 left-0 lg:inset-y-auto w-full max-w-sm lg:w-80 bg-background z-50 lg:z-30 overflow-y-auto lg:overflow-visible shadow-2xl lg:shadow-none lg:flex-shrink-0 animate-smooth-slide-in lg:animate-none">
                
                {/* Filter Header */}
                <div className="neo-card p-4 lg:p-4 mb-4 lg:mb-6 sticky top-0 z-20 bg-background lg:relative lg:z-auto border-b-2 border-black lg:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg lg:text-xl font-black text-black uppercase flex items-center">
                      <span className="text-xl lg:text-2xl mr-2">🎛️</span>
                      FILTERS
                    </h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden neo-orange p-2 neo-border hover:hover-scale transition-transform"
                    >
                      <X size={16} className="text-black" />
                    </button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3 lg:gap-3">
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        setSelectedCategories([])
                        setPriceRange([0, 5000])
                      }}
                      className="neo-orange px-3 lg:px-4 py-2 lg:py-2 neo-border font-black text-black uppercase hover:hover-lift transition-transform text-sm lg:text-sm"
                    >
                      🗑️ CLEAR ALL
                    </button>
                    
                    <button
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden neo-button px-3 py-2 text-sm"
                    >
                      ✓ APPLY
                    </button>
                  </div>
                </div>

                {/* Filter Content */}
                <div className="space-y-4 lg:space-y-6 px-4 lg:px-0 pb-24 lg:pb-6 relative z-10">
                  {/* Categories */}
                  <div className="neo-card p-4 lg:p-6 hover:hover-glow transition-all relative z-10">
                    <h3 className="font-black text-black uppercase text-base lg:text-lg mb-4 lg:mb-4 flex items-center">
                      <span className="text-lg lg:text-xl mr-2">🏷️</span>
                      CATEGORIES
                    </h3>
                    <div className="space-y-2 lg:space-y-3">
                      {categories.map((category, index) => {
                        const categoryClassName = 'w-full flex items-center justify-between p-3 lg:p-3 neo-border text-left hover:hover-lift transition-all relative z-10 ' + (
                          selectedCategories.includes(category.id)
                            ? 'neo-lime neo-shadow-lg'
                            : 'bg-white hover:neo-cyan'
                        )
                        
                        return (
                          <button
                            key={category.id}
                            onClick={() => toggleCategory(category.id)}
                            className={categoryClassName}
                          >
                            <span className="font-bold text-black uppercase text-sm lg:text-sm">{category.label}</span>
                            <span className="neo-orange px-2 lg:px-2 py-1 lg:py-1 neo-border font-black text-black uppercase text-xs hover:hover-scale transition-transform">
                              {category.count}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="neo-card p-4 lg:p-6 hover:hover-glow transition-all relative z-10">
                    <h3 className="font-black text-black uppercase text-base lg:text-lg mb-4 lg:mb-4 flex items-center">
                      <span className="text-lg lg:text-xl mr-2">💰</span>
                      PRICE RANGE
                    </h3>
                    <div className="space-y-4 lg:space-y-4 w-full max-w-full overflow-hidden">
                      <div className="flex items-center space-x-3 w-full">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                          placeholder="MIN"
                          className="flex-1 min-w-0 p-2 lg:p-2 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase hover:hover-lift transition-transform text-sm lg:text-sm"
                        />
                        <span className="font-black text-black text-sm lg:text-sm flex-shrink-0">TO</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
                          placeholder="MAX"
                          className="flex-1 min-w-0 p-2 lg:p-2 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase hover:hover-lift transition-transform text-sm lg:text-sm"
                        />
                      </div>
                      
                      {/* Visual Price Range */}
                      <div className="space-y-2 w-full max-w-full">
                        <div className="flex items-center justify-between w-full">
                          <span className="font-bold text-black text-sm lg:text-sm">₹{priceRange[0]}</span>
                          <span className="font-bold text-black text-sm lg:text-sm">₹{priceRange[1]}</span>
                        </div>
                        <div className="w-full max-w-full">
                          <div className="w-full h-3 lg:h-3 bg-white neo-border overflow-hidden hover:hover-glow transition-all">
                            <div 
                              className="neo-lime h-full transition-all duration-300"
                              style={{ width: Math.min(100, Math.max(0, (priceRange[1] / 5000) * 100)) + '%' }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-black w-full">
                          <span>₹0</span>
                          <span>₹2,500</span>
                          <span>₹5,000</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 5000 || searchQuery) && (
                    <div className="neo-card p-4 lg:p-6 hover:hover-glow transition-all relative z-10">
                      <h3 className="font-black text-black uppercase text-base lg:text-lg mb-4 lg:mb-4 flex items-center">
                        <span className="text-lg lg:text-xl mr-2">🔍</span>
                        ACTIVE FILTERS
                      </h3>
                      <div className="space-y-2">
                        {selectedCategories.map((categoryId) => {
                          const category = categories.find(c => c.id === categoryId);
                          return category ? (
                            <div 
                              key={categoryId}
                              className="flex items-center justify-between neo-yellow px-3 lg:px-3 py-2 lg:py-2 neo-border hover:hover-lift transition-transform relative z-10"
                            >
                              <span className="font-bold text-black uppercase text-sm">{category.label}</span>
                              <button
                                onClick={() => toggleCategory(categoryId)}
                                className="neo-orange p-1 lg:p-1 neo-border hover:hover-scale transition-transform relative z-10"
                              >
                                <X size={12} className="text-black" />
                              </button>
                            </div>
                          ) : null;
                        })}
                        
                        {(priceRange[0] > 0 || priceRange[1] < 5000) && (
                          <div className="flex items-center justify-between neo-pink px-3 lg:px-3 py-2 lg:py-2 neo-border hover:hover-lift transition-transform relative z-10">
                            <span className="font-bold text-black uppercase text-sm">
                              PRICE: ₹{priceRange[0]} - ₹{priceRange[1]}
                            </span>
                            <button
                              onClick={() => setPriceRange([0, 5000])}
                              className="neo-orange p-1 lg:p-1 neo-border hover:hover-scale transition-transform relative z-10"
                            >
                              <X size={12} className="text-black" />
                            </button>
                          </div>
                        )}
                        
                        {searchQuery && (
                          <div className="flex items-center justify-between neo-cyan px-3 lg:px-3 py-2 lg:py-2 neo-border hover:hover-lift transition-transform relative z-10">
                            <span className="font-bold text-black uppercase text-sm">
                              SEARCH: "{searchQuery}"
                            </span>
                            <button
                              onClick={() => setSearchQuery('')}
                              className="neo-orange p-1 lg:p-1 neo-border hover:hover-scale transition-transform relative z-10"
                            >
                              <X size={12} className="text-black" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Products Grid */}
          <div className={'flex-1 relative z-0 ' + (showFilters ? 'lg:block hidden lg:block' : 'block')}>
            {/* Mobile: Hide products when filters are open */}
            <div className={showFilters ? 'hidden lg:block' : 'block'}>
              {filteredProducts.length > 0 ? (
                <div className={getGridClasses()}>
                  {filteredProducts.map((product, index) => (
                    viewMode === 'grid' ? (
                      <ProductCard key={product.id} product={product} index={index} />
                    ) : (
                      <div key={product.id} className="neo-card p-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 hover-lift hover-glow transition-all duration-300 animate-fade-in-up">
                        <div className="w-full sm:w-32 h-32 neo-orange neo-border flex items-center justify-center flex-shrink-0 hover:hover-scale transition-transform">
                          <ImageWithFallback
                            src={'/images/products/' + product.image + '.jpg'}
                            alt={product.name}
                            className="w-24 h-24 object-cover"
                            fallback={
                              <span className="text-4xl animate-gentle-float">🌿</span>
                            }
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <h3 className="font-black text-black uppercase text-xl hover:text-hover-glow">{product.name}</h3>
                          <p className="font-bold text-black uppercase text-sm">{product.description}</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => {
                                const starClassName = (i < Math.floor(product.rating) ? 'text-black fill-current' : 'text-gray-400') + ' hover:hover-scale transition-transform'
                                return (
                                  <Star 
                                    key={i} 
                                    size={16} 
                                    className={starClassName}
                                  />
                                )
                              })}
                            </div>
                            <span className="font-bold text-black uppercase text-sm">({product.reviews})</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-black text-black hover:hover-scale">₹{product.price}</span>
                            {product.originalPrice && (
                              <>
                                <span className="text-lg font-bold text-black line-through">₹{product.originalPrice}</span>
                                <span className="neo-cyan px-2 py-1 neo-border font-black text-black uppercase text-xs">
                                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            onAddToCart(product)
                          }}
                          className="neo-button px-6 py-3 flex items-center space-x-2 hover-lift transition-all self-start sm:self-center"
                        >
                          <ShoppingBag size={20} />
                          <span>ADD TO CART</span>
                          <Zap size={20} />
                        </button>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="neo-card p-8 text-center hover:hover-glow transition-all animate-fade-in-up">
                  <div className="text-6xl mb-4 animate-gentle-bounce">🔍</div>
                  <h3 className="font-black text-black uppercase text-xl mb-4">NO PRODUCTS FOUND</h3>
                  <p className="font-bold text-black uppercase text-sm mb-6">TRY ADJUSTING YOUR FILTERS OR SEARCH TERMS</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategories([])
                      setPriceRange([0, 5000])
                    }}
                    className="neo-button px-6 py-3 hover-lift"
                  >
                    CLEAR ALL FILTERS
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}