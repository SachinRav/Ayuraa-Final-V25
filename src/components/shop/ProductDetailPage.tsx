import React, { useState, useEffect } from 'react'
import { ArrowLeft, Star, Heart, ShoppingBag, Truck, Shield, RotateCcw, Zap, Plus, Minus } from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'
import { projectId, publicAnonKey } from '../../utils/supabase/info'

interface ProductDetailPageProps {
  handle: string
  onViewChange: (view: string) => void
  onAddToCart: (product: any, options: any) => void
}

export function ProductDetailPage({ handle, onViewChange, onAddToCart }: ProductDetailPageProps) {
  const [product, setProduct] = useState<any>(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [subscription, setSubscription] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [handle])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-4cca1616/products/${handle}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.product) {
        setProduct(data.product)
        setSelectedSize(data.product.sizes?.[0] || data.product.defaultSize || '100g')
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product, {
        size: selectedSize,
        quantity,
        subscription
      })
    }
  }

  const tabs = [
    { id: 'description', label: 'DESCRIPTION' },
    { id: 'ingredients', label: 'INGREDIENTS' },
    { id: 'usage', label: 'HOW TO USE' },
    { id: 'reviews', label: 'REVIEWS' }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="neo-yellow p-8 neo-border neo-shadow-lg max-w-md mx-auto transform rotate-2 animate-bounce">
              <div className="font-black text-black text-xl uppercase">LOADING PRODUCT...</div>
              <div className="mt-4 flex justify-center space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className={`w-4 h-4 bg-black animate-pulse transform rotate-45`} style={{ animationDelay: `${i * 0.2}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="neo-orange p-8 neo-border neo-shadow-lg max-w-md mx-auto transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="text-6xl mb-4 animate-gentle-bounce">🔍</div>
              <div className="font-black text-black text-xl mb-4 uppercase">PRODUCT NOT FOUND!</div>
              <button
                onClick={() => onViewChange('shop')}
                className="neo-cyan px-6 py-3 neo-border neo-shadow font-black text-black uppercase hover-lift hover-scale transition-all"
              >
                <span className="mr-2">🏠</span>
                BACK TO SHOP
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <button
            onClick={() => onViewChange('shop')}
            className="flex items-center space-x-2 neo-cyan px-4 py-2 neo-border neo-shadow font-black text-black uppercase hover-lift hover-glow transition-all animate-fade-in-up"
          >
            <ArrowLeft size={20} />
            <span>BACK TO SHOP</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-6 animate-fade-in-up stagger-1">
            <div className="w-full h-80 lg:h-96 neo-lime neo-border neo-shadow-lg flex items-center justify-center transform hover:rotate-1 transition-transform duration-300 hover-glow">
              <ImageWithFallback
                src={`/images/products/${product.image}.jpg`}
                alt={product.name}
                className="w-full h-full object-cover"
                fallback={
                  <div className="text-center">
                    <div className="text-8xl mb-4 animate-gentle-float">🌿</div>
                    <div className="font-black text-black text-lg uppercase">{product.name}</div>
                  </div>
                }
              />
            </div>
            
            {/* Additional Images */}
            <div className="grid grid-cols-4 gap-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className={`w-full h-20 lg:h-24 neo-orange neo-border flex items-center justify-center transition-all duration-300 hover-scale cursor-pointer ${
                  i % 2 === 0 ? 'transform rotate-2 hover:-rotate-1' : 'transform -rotate-2 hover:rotate-1'
                }`}>
                  <span className="text-2xl animate-gentle-float">🌿</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8 animate-fade-in-up stagger-2">
            <div>
              <div className="neo-pink px-4 py-2 neo-border font-black text-black uppercase text-sm mb-4 inline-block transform -rotate-1 hover:rotate-0 transition-transform duration-300 animate-gentle-bounce">
                {product.category}
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-black mb-4 uppercase leading-tight">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={20} 
                      className={`${i < Math.floor(product.rating || 4.5) ? 'text-black fill-current' : 'text-gray-400'} hover-scale`} 
                    />
                  ))}
                </div>
                <span className="font-bold text-black uppercase">({product.reviews || 127} REVIEWS)</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="text-3xl font-black text-black hover-scale">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl font-bold text-black line-through">₹{product.originalPrice}</span>
                    <span className="neo-orange px-3 py-1 neo-border font-black text-black text-sm uppercase animate-gentle-bounce">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-black text-black mb-4 uppercase text-xl flex items-center">
                <span className="text-2xl mr-2 animate-gentle-float">📏</span>
                SIZE
              </h3>
              <div className="flex flex-wrap gap-3">
                {(product.sizes || ['100g', '250g', '500g']).map((size: string, index: number) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 neo-border font-black uppercase transition-all duration-300 hover-lift ${
                      selectedSize === size
                        ? 'neo-yellow neo-shadow-lg transform rotate-1 animate-subtle-glow'
                        : 'bg-white hover:neo-cyan hover:neo-shadow hover:-rotate-1'
                    } ${index % 2 === 1 ? 'rotate-1' : '-rotate-1'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-black text-black mb-4 uppercase text-xl flex items-center">
                <span className="text-2xl mr-2 animate-gentle-float">🔢</span>
                QUANTITY
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="neo-orange p-3 neo-border neo-shadow hover-scale hover-lift transition-all"
                >
                  <Minus size={20} />
                </button>
                <span className="text-2xl font-black text-black w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="neo-orange p-3 neo-border neo-shadow hover-scale hover-lift transition-all"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Subscription */}
            <div className="neo-card p-6 transform hover:-rotate-1 transition-transform duration-300 hover-glow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-black mb-2 uppercase flex items-center">
                    <span className="text-2xl mr-2 animate-gentle-float">💝</span>
                    SUBSCRIBE & SAVE 15%
                  </h3>
                  <p className="font-bold text-black uppercase text-sm">NEVER RUN OUT • CANCEL ANYTIME</p>
                </div>
                <button
                  onClick={() => setSubscription(!subscription)}
                  className={`w-12 h-6 neo-border flex items-center transition-all duration-300 hover-scale ${
                    subscription ? 'neo-lime justify-end' : 'bg-white justify-start'
                  }`}
                >
                  <div className="w-4 h-4 bg-black"></div>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full neo-button py-6 text-lg lg:text-xl flex items-center justify-center space-x-3 hover-lift hover-glow transition-all"
              >
                <ShoppingBag size={24} />
                <span>ADD TO CART - ₹{(product.price * quantity * (subscription ? 0.85 : 1)).toFixed(2)}</span>
                <Zap size={24} className="animate-soft-pulse" />
              </button>
              
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-full px-6 py-4 neo-border neo-shadow font-black text-black uppercase hover-lift hover-scale transition-all ${
                  isWishlisted ? 'neo-pink animate-subtle-glow' : 'bg-white hover-glow'
                }`}
              >
                <Heart size={20} className={`inline mr-2 ${isWishlisted ? 'fill-current animate-gentle-float' : ''}`} />
                {isWishlisted ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="neo-cyan p-4 neo-border text-center transform hover:rotate-1 transition-transform duration-300 hover-glow animate-fade-in-up stagger-1">
                <Truck size={24} className="mx-auto mb-2 text-black animate-gentle-float" />
                <div className="font-black text-black uppercase text-xs">FREE SHIPPING</div>
              </div>
              <div className="neo-lime p-4 neo-border text-center transform hover:-rotate-1 transition-transform duration-300 hover-glow animate-fade-in-up stagger-2">
                <Shield size={24} className="mx-auto mb-2 text-black animate-gentle-float" />
                <div className="font-black text-black uppercase text-xs">LAB TESTED</div>
              </div>
              <div className="neo-orange p-4 neo-border text-center transform hover:rotate-1 transition-transform duration-300 hover-glow animate-fade-in-up stagger-3">
                <RotateCcw size={24} className="mx-auto mb-2 text-black animate-gentle-float" />
                <div className="font-black text-black uppercase text-xs">30 DAY RETURN</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="neo-card p-6 lg:p-8 transform hover:rotate-1 transition-transform duration-500 hover-glow animate-fade-in-up stagger-3">
          <div className="flex flex-wrap gap-2 mb-8 border-b-2 border-black pb-4">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 lg:px-6 py-3 neo-border font-black uppercase text-sm transition-all duration-300 hover-lift ${
                  activeTab === tab.id
                    ? 'neo-yellow neo-shadow-lg transform rotate-1 animate-subtle-glow'
                    : 'bg-white hover:neo-cyan hover:neo-shadow hover:-rotate-1'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {activeTab === 'description' && (
              <div className="animate-fade-in-up">
                <p className="font-bold text-black text-lg uppercase mb-6">
                  {product.description || 'PREMIUM QUALITY WELLNESS PRODUCT CRAFTED WITH CARE FOR YOUR HEALTH AND VITALITY.'}
                </p>
                
                {product.benefits && (
                  <div>
                    <h4 className="font-black text-black mb-4 uppercase text-xl flex items-center">
                      <span className="text-2xl mr-2 animate-gentle-float">✨</span>
                      KEY BENEFITS:
                    </h4>
                    <ul className="space-y-3">
                      {product.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="flex items-center space-x-3 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                          <div className="w-3 h-3 bg-black transform rotate-45"></div>
                          <span className="font-bold text-black uppercase">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="animate-fade-in-up">
                <h4 className="font-black text-black mb-4 uppercase text-xl flex items-center">
                  <span className="text-2xl mr-2 animate-gentle-float">🧪</span>
                  INGREDIENTS:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(product.ingredients || ['Organic Ingredient 1', 'Natural Extract 2', 'Pure Compound 3']).map((ingredient: string, index: number) => (
                    <div 
                      key={index} 
                      className={`neo-lime p-4 neo-border transform transition-all duration-300 hover-lift hover-glow animate-fade-in-up ${
                        index % 2 === 0 ? 'rotate-1 hover:-rotate-1' : '-rotate-1 hover:rotate-1'
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="font-black text-black uppercase">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'usage' && (
              <div className="animate-fade-in-up">
                <h4 className="font-black text-black mb-4 uppercase text-xl flex items-center">
                  <span className="text-2xl mr-2 animate-gentle-float">📋</span>
                  HOW TO USE:
                </h4>
                <div className="space-y-4">
                  {(product.usage || [
                    'Take 1 teaspoon (5g) daily',
                    'Mix with water, juice, or smoothie',
                    'Best taken on empty stomach',
                    'Store in cool, dry place'
                  ]).map((instruction: string, index: number) => (
                    <div 
                      key={index} 
                      className="flex items-center space-x-4 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-8 h-8 neo-orange neo-border flex items-center justify-center font-black text-black hover-scale">
                        {index + 1}
                      </div>
                      <span className="font-bold text-black uppercase">{instruction}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-fade-in-up">
                <h4 className="font-black text-black mb-6 uppercase text-xl flex items-center">
                  <span className="text-2xl mr-2 animate-gentle-float">⭐</span>
                  CUSTOMER REVIEWS:
                </h4>
                <div className="space-y-6">
                  {[
                    { name: 'SARAH M.', rating: 5, comment: 'AMAZING QUALITY! NOTICED IMPROVEMENT IN ENERGY LEVELS WITHIN DAYS.' },
                    { name: 'MIKE R.', rating: 5, comment: 'PURE AND POTENT. EXACTLY WHAT I WAS LOOKING FOR.' },
                    { name: 'LISA K.', rating: 4, comment: 'GREAT PRODUCT, FAST SHIPPING. WILL ORDER AGAIN!' }
                  ].map((review, index) => (
                    <div 
                      key={index} 
                      className={`neo-cyan p-6 neo-border transform transition-all duration-300 hover-lift hover-glow animate-fade-in-up ${
                        index % 2 === 0 ? 'rotate-1 hover:-rotate-1' : '-rotate-1 hover:rotate-1'
                      }`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-black text-black uppercase">{review.name}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={`${i < review.rating ? 'text-black fill-current' : 'text-gray-400'} hover-scale`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="font-bold text-black uppercase text-sm">"{review.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}