import React, { useState, useEffect, useRef } from 'react'
import { ShoppingBag, Filter, Star, Heart, Plus, Minus, X, CreditCard, Zap, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { FloatingHealingIcons } from './FloatingHealingIcons'

interface ProductStoreProps {
  onAddToCart: (product: any) => void
  cartItems: any[]
  setCartItems: (items: any[]) => void
  preview?: boolean
}

export function ProductStore({ onAddToCart, cartItems, setCartItems, preview = false }: ProductStoreProps) {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showCart, setShowCart] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const categories = [
    { id: 'all', label: 'ALL PRODUCTS' },
    { id: 'Powders', label: 'HERBAL POWDERS' },
    { id: 'Oils', label: 'ESSENTIAL OILS' },
    { id: 'Teas', label: 'WELLNESS TEAS' },
    { id: 'Supplements', label: 'SUPPLEMENTS' },
    { id: 'Crystals', label: 'HEALING CRYSTALS' }
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
      image: 'greens-powder',
      badge: 'BESTSELLER',
      description: 'COMPLETE SUPERFOOD BLEND'
    },
    {
      id: 'immunity-boost',
      name: 'IMMUNITY BOOST BUNDLE',
      price: 2199,
      originalPrice: 2799,
      rating: 4.9,
      reviews: 156,
      category: 'Supplements',
      image: 'immunity-bundle',
      badge: 'BUNDLE',
      description: 'COMPREHENSIVE IMMUNE SUPPORT'
    },
    {
      id: 'gut-restore',
      name: 'GUT RESTORE COMPLEX',
      price: 1799,
      originalPrice: 2199,
      rating: 4.7,
      reviews: 189,
      category: 'Supplements',
      image: 'gut-complex',
      badge: 'NEW',
      description: 'ADVANCED DIGESTIVE HEALTH'
    },
    {
      id: 'turmeric-gold',
      name: 'TURMERIC GOLD POWDER',
      price: 899,
      originalPrice: 1199,
      rating: 4.6,
      reviews: 312,
      category: 'Powders',
      image: 'turmeric-powder',
      badge: null,
      description: 'ORGANIC ANTI-INFLAMMATORY'
    },
    {
      id: 'ashwagandha',
      name: 'ASHWAGANDHA POWDER',
      price: 699,
      originalPrice: 899,
      rating: 4.5,
      reviews: 198,
      category: 'Powders',
      image: 'ashwagandha-powder',
      badge: null,
      description: 'STRESS RELIEF & ENERGY'
    },
    {
      id: 'omega-oil',
      name: 'OMEGA-3 FISH OIL',
      price: 1099,
      originalPrice: 1399,
      rating: 4.7,
      reviews: 145,
      category: 'Oils',
      image: 'omega-oil',
      badge: 'POPULAR',
      description: 'HEART & BRAIN HEALTH'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setProducts(mockProducts)
  }, [selectedCategory])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -240, // Approximate width of one card + gap (224px + 16px)
        behavior: 'smooth'
      })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 240, // Approximate width of one card + gap (224px + 16px)
        behavior: 'smooth'
      })
    }
  }

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const updateCartQuantity = (productId: string, change: number) => {
    setCartItems(prev => {
      const updated = prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null
        }
        return item
      }).filter(Boolean)
      return updated
    })
  }

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const displayProducts = preview ? filteredProducts.slice(0, 6) : filteredProducts

  return (
    <section className={`${preview ? 'py-16' : 'py-20'} relative overflow-hidden`}>
      {/* Floating healing icons background */}
      <FloatingHealingIcons opacity="opacity-8" />

      {/* Full Width Header with Gradient Background */}
      <div className="w-full bg-gradient-to-r from-neo-yellow via-neo-lime to-neo-cyan py-12 sm:py-16 lg:py-20 mb-12 sm:mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-black mb-6 sm:mb-8 uppercase transform skew-x-2 text-hover-glow animate-soft-pulse leading-tight">
            {preview ? 'WELLNESS STORE' : 'NATURAL WELLNESS PRODUCTS'}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl font-bold text-black max-w-3xl mx-auto uppercase tracking-wide animate-fade-in-up">
            DISCOVER CAREFULLY CURATED NATURAL PRODUCTS • SUPPORT YOUR HEALING JOURNEY • DAILY WELLNESS RITUALS
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter (only show if not preview) */}
        {!preview && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 neo-border font-black uppercase text-sm hover-lift hover-glow animate-fade-in-up stagger-${index + 1} ${
                  selectedCategory === category.id
                    ? 'neo-yellow neo-shadow-lg'
                    : 'bg-white hover-scale'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}

        {/* Horizontal Scrollable Products Grid with Navigation Buttons */}
        <div className="relative">
          {/* Left Navigation Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 neo-button p-3 hover-lift hover-glow focus-expand"
            style={{ marginLeft: '-60px' }}
          >
            <ChevronLeft size={24} />
          </button>

          {/* Right Navigation Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 neo-button p-3 hover-lift hover-glow focus-expand"
            style={{ marginRight: '-60px' }}
          >
            <ChevronRight size={24} />
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 mb-12"
          >
            {displayProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex-none w-56 neo-card p-4 hover-lift hover-glow animate-fade-in-up group cursor-pointer relative"
                style={{ minWidth: '224px' }}
              >
                {/* Badge */}
                {product.badge && (
                  <div className={`absolute -top-2 -right-2 ${
                    product.badge === 'BESTSELLER' ? 'neo-yellow' :
                    product.badge === 'BUNDLE' ? 'neo-pink text-white' :
                    product.badge === 'NEW' ? 'neo-lime' :
                    'neo-cyan'
                  } px-2 py-1 neo-border font-black text-black uppercase text-xs z-10 animate-gentle-bounce`}>
                    {product.badge}
                  </div>
                )}

                {/* Wishlist Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleWishlist(product.id)
                  }}
                  className={`absolute top-3 left-3 p-1.5 neo-border hover-scale z-10 ${
                    wishlist.includes(product.id) ? 'neo-pink text-white' : 'neo-orange'
                  }`}
                >
                  <Heart size={14} className={wishlist.includes(product.id) ? 'fill-current' : ''} />
                </button>

                {/* Product Image */}
                <div className="w-full h-32 neo-orange neo-border mb-4 flex items-center justify-center hover-scale">
                  <ImageWithFallback
                    src={`/images/products/${product.image}.jpg`}
                    alt={product.name}
                    className="w-24 h-24 object-cover"
                    fallback={
                      <div className="text-center">
                        <div className="text-4xl mb-1 animate-gentle-float">🌿</div>
                        <div className="font-black text-black text-xs uppercase">{product.name}</div>
                      </div>
                    }
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <h3 className="font-black text-black uppercase text-sm group-hover:text-hover-glow leading-tight">
                    {product.name}
                  </h3>
                  
                  <p className="font-bold text-black uppercase text-xs">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={`${i < Math.floor(product.rating) ? 'text-black fill-current' : 'text-gray-400'} hover-scale`}
                        />
                      ))}
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
                    className="w-full neo-button py-2 flex items-center justify-center space-x-2 hover-lift text-xs"
                  >
                    <ShoppingBag size={16} />
                    <span>ADD TO CART</span>
                    <Zap size={16} className="animate-soft-pulse" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More Button (only for preview) */}
        {preview && (
          <div className="text-center">
            <button className="neo-button px-12 py-6 text-xl flex items-center space-x-3 mx-auto hover-lift hover-glow animate-soft-pulse">
              <span>EXPLORE FULL STORE</span>
              <ArrowRight size={24} />
              <Zap size={24} />
            </button>
          </div>
        )}

        {/* Cart Summary (only show if not preview and has items) */}
        {!preview && cartItems.length > 0 && (
          <div className="neo-card p-8 hover-lift hover-glow animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black uppercase leading-tight">YOUR CART ({cartItems.length})</h3>
              <button
                onClick={() => setShowCart(!showCart)}
                className="neo-pink px-6 py-3 neo-border neo-shadow text-white font-black uppercase hover-lift hover-scale"
              >
                {showCart ? 'HIDE CART' : 'SHOW CART'}
              </button>
            </div>

            {showCart && (
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className={`neo-lime p-4 neo-border flex items-center space-x-4 hover-lift animate-fade-in-up stagger-${(index % 3) + 1}`}>
                    <div className="w-16 h-16 neo-orange neo-border flex items-center justify-center">
                      <span className="text-2xl animate-gentle-float">🌿</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-black uppercase">{item.name}</h4>
                      <p className="font-bold text-black uppercase text-sm">₹{item.price} × {item.quantity}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="neo-orange p-2 neo-border hover-scale"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-black text-black">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="neo-orange p-2 neo-border hover-scale"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="neo-pink p-2 neo-border text-white hover-scale"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="text-3xl font-black text-black uppercase">
                TOTAL: ₹{getTotalPrice()}
              </div>
              <button className="neo-button px-8 py-4 text-xl flex items-center space-x-3 hover-lift hover-glow">
                <CreditCard size={24} />
                <span>CHECKOUT</span>
                <Zap size={24} className="animate-soft-pulse" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}