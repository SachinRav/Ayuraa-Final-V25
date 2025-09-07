import React from 'react'
import { ArrowRight, Star, Shield, Truck, Phone, Beaker, Leaf, Heart, Zap } from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'

interface ShopLandingProps {
  onViewChange: (view: string) => void
}

export function ShopLanding({ onViewChange }: ShopLandingProps) {
  const collections = [
    {
      id: 'gut',
      title: 'GUT HEALTH',
      description: 'DIGESTIVE WELLNESS & MICROBIOME SUPPORT',
      image: 'gut-health-powder',
      icon: '🌱',
      products: 12,
      color: 'neo-lime'
    },
    {
      id: 'skin',
      title: 'SKIN GLOW',
      description: 'NATURAL RADIANCE FROM WITHIN',
      image: 'glow-supplements',
      icon: '✨',
      products: 8,
      color: 'neo-pink'
    },
    {
      id: 'energy',
      title: 'ENERGY',
      description: 'NATURAL VITALITY & STAMINA BOOSTERS',
      image: 'energy-powders',
      icon: '⚡',
      products: 10,
      color: 'neo-yellow'
    },
    {
      id: 'immunity',
      title: 'IMMUNITY',
      description: 'STRENGTHEN YOUR NATURAL DEFENSES',
      image: 'immunity-supplements',
      icon: '🛡️',
      products: 15,
      color: 'neo-cyan'
    }
  ]

  const ingredients = [
    {
      id: 'beetroot',
      name: 'BEETROOT',
      description: 'NATURAL NITRATES FOR ENERGY',
      image: 'beetroot-powder',
      products: 3
    },
    {
      id: 'moringa',
      name: 'MORINGA',
      description: 'COMPLETE SUPERFOOD NUTRITION',
      image: 'moringa-powder',
      products: 5
    },
    {
      id: 'amla',
      name: 'AMLA',
      description: 'VITAMIN C POWERHOUSE',
      image: 'amla-powder',
      products: 4
    },
    {
      id: 'curcumin',
      name: 'CURCUMIN',
      description: 'ANTI-INFLAMMATORY SUPPORT',
      image: 'turmeric-powder',
      products: 6
    }
  ]

  const bestSellers = [
    {
      id: 'daily-greens',
      name: 'DAILY GREENS POWDER',
      price: 1299,
      originalPrice: 1599,
      rating: 4.8,
      reviews: 234,
      image: 'greens-powder',
      badge: 'BESTSELLER'
    },
    {
      id: 'immunity-boost',
      name: 'IMMUNITY BOOST BUNDLE',
      price: 2199,
      originalPrice: 2799,
      rating: 4.9,
      reviews: 156,
      image: 'immunity-bundle',
      badge: 'BUNDLE'
    },
    {
      id: 'gut-restore',
      name: 'GUT RESTORE COMPLEX',
      price: 1799,
      originalPrice: 2199,
      rating: 4.7,
      reviews: 189,
      image: 'gut-complex',
      badge: 'NEW'
    }
  ]

  const usps = [
    {
      icon: Beaker,
      title: 'LAB TESTED',
      description: 'THIRD-PARTY TESTED FOR PURITY & POTENCY'
    },
    {
      icon: Leaf,
      title: 'NO FILLERS',
      description: 'PURE INGREDIENTS, NO ARTIFICIAL ADDITIVES'
    },
    {
      icon: Truck,
      title: 'FREE SHIPPING',
      description: 'ON ORDERS ABOVE ₹499'
    },
    {
      icon: Phone,
      title: 'COD AVAILABLE',
      description: 'CASH ON DELIVERY ACROSS INDIA'
    }
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="font-bold text-black uppercase animate-fade-in-up">
          <button 
            onClick={() => onViewChange('home')} 
            className="hover:neo-orange hover:px-2 hover:py-1 hover:neo-border transition-all hover-scale"
          >
            HOME
          </button>
          <span className="mx-3 text-2xl animate-gentle-float">🏠</span>
          <span className="neo-yellow px-2 py-1 neo-border animate-gentle-bounce">SHOP</span>
        </nav>
      </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-black mb-8 uppercase transform -skew-x-2 animate-soft-pulse leading-tight">
            WELLNESS STORE
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-12 max-w-4xl mx-auto uppercase tracking-wide animate-fade-in-up">
            PREMIUM NATURAL PRODUCTS • SCIENTIFICALLY FORMULATED • TRANSFORM YOUR HEALTH TODAY
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 mb-16">
            <button
              onClick={() => onViewChange('shop/all')}
              className="neo-button px-8 py-4 text-xl flex items-center justify-center space-x-3 hover-lift hover-glow animate-fade-in-up stagger-1"
            >
              <span>SHOP ALL PRODUCTS</span>
              <ArrowRight size={24} />
            </button>
            
            <button className="neo-pink px-8 py-4 neo-border neo-shadow font-black text-black uppercase text-xl hover-lift hover-scale animate-fade-in-up stagger-2">
              <Heart size={24} className="inline mr-3 animate-gentle-float" />
              VIEW BESTSELLERS
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {usps.map((usp, index) => {
              const IconComponent = usp.icon
              return (
                <div
                  key={index}
                  className={`neo-card p-6 text-center hover-lift hover-glow animate-fade-in-up stagger-${index + 1}`}
                >
                  <IconComponent size={32} className="mx-auto mb-3 text-black hover-scale animate-gentle-float" />
                  <h3 className="font-black text-black uppercase text-sm mb-2">{usp.title}</h3>
                  <p className="font-bold text-black uppercase text-xs">{usp.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-black mb-8 uppercase transform skew-x-2 text-hover-glow animate-soft-pulse leading-tight">
              SHOP BY NEED
            </h2>
            <p className="text-lg sm:text-xl font-bold text-black max-w-3xl mx-auto uppercase tracking-wide animate-fade-in-up">
              TARGETED SOLUTIONS FOR YOUR WELLNESS JOURNEY • SCIENTIFICALLY BACKED • RESULTS GUARANTEED
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {collections.map((collection, index) => (
              <button
                key={collection.id}
                onClick={() => onViewChange(`shop/need/${collection.id}`)}
                className={`group ${collection.color} p-8 neo-border neo-shadow-lg text-center hover-lift hover-glow animate-fade-in-up stagger-${index + 1} transition-all duration-300`}
              >
                <div className="text-6xl mb-6 animate-gentle-float">
                  {collection.icon}
                </div>
                
                <h3 className="text-xl lg:text-2xl font-black text-black mb-4 uppercase group-hover:text-hover-glow">
                  {collection.title}
                </h3>
                
                <p className="font-bold text-black uppercase text-sm mb-6">
                  {collection.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="neo-orange px-3 py-1 neo-border font-black text-black uppercase text-xs animate-gentle-bounce">
                    {collection.products} PRODUCTS
                  </span>
                  <ArrowRight 
                    size={24} 
                    className="text-black group-hover:hover-slide" 
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-black mb-8 uppercase transform -skew-x-2 text-hover-glow animate-soft-pulse leading-tight">
              BESTSELLERS
            </h2>
            <p className="text-lg sm:text-xl font-bold text-black max-w-3xl mx-auto uppercase tracking-wide animate-fade-in-up">
              CUSTOMER FAVORITES • PROVEN RESULTS • LIMITED TIME OFFERS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map((product, index) => (
              <div
                key={product.id}
                className={`neo-card p-6 hover-lift hover-glow animate-fade-in-up stagger-${index + 1} group cursor-pointer relative`}
                onClick={() => onViewChange(`shop/product/${product.id}`)}
              >
                <div className={`absolute -top-3 -right-3 ${
                  product.badge === 'BESTSELLER' ? 'neo-yellow' :
                  product.badge === 'BUNDLE' ? 'neo-pink' :
                  'neo-lime'
                } px-3 py-1 neo-border font-black text-black uppercase text-xs animate-gentle-bounce`}>
                  {product.badge}
                </div>

                <div className="w-full h-48 neo-orange neo-border mb-6 flex items-center justify-center hover-scale">
                  <ImageWithFallback
                    src={`/images/products/${product.image}.jpg`}
                    alt={product.name}
                    className="w-40 h-40 object-cover"
                    fallback={
                      <div className="text-center">
                        <div className="text-6xl mb-2 animate-gentle-float">🌿</div>
                        <div className="font-black text-black text-sm uppercase">{product.name}</div>
                      </div>
                    }
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-black text-black uppercase text-lg group-hover:text-hover-glow">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={`${i < Math.floor(product.rating) ? 'text-black fill-current' : 'text-gray-400'} hover-scale`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-black uppercase text-sm">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-black text-black group-hover:hover-scale">
                      ₹{product.price}
                    </span>
                    <span className="text-lg font-bold text-black line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="neo-cyan px-2 py-1 neo-border font-black text-black uppercase text-xs">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </div>

                  <button className="w-full neo-button py-3 flex items-center justify-center space-x-3 hover-lift">
                    <span>ADD TO CART</span>
                    <Zap size={20} className="animate-soft-pulse" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-black mb-8 uppercase transform skew-y-1 text-hover-glow animate-soft-pulse leading-tight">
              SHOP BY INGREDIENT
            </h2>
            <p className="text-lg sm:text-xl font-bold text-black max-w-3xl mx-auto uppercase tracking-wide animate-fade-in-up">
              PURE • POTENT • SCIENTIFICALLY SOURCED SUPERFOODS
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ingredients.map((ingredient, index) => (
              <button
                key={ingredient.id}
                onClick={() => onViewChange(`shop/ingredient/${ingredient.id}`)}
                className={`neo-lime p-6 neo-border neo-shadow text-center hover-lift hover-glow animate-fade-in-up stagger-${index + 1} group transition-all duration-300`}
              >
                <div className="w-16 h-16 neo-orange neo-border mx-auto mb-4 flex items-center justify-center hover-scale">
                  <span className="text-2xl animate-gentle-float">🌿</span>
                </div>
                
                <h4 className="font-black text-black uppercase mb-2 group-hover:text-hover-glow">
                  {ingredient.name}
                </h4>
                
                <p className="font-bold text-black uppercase text-sm mb-4">
                  {ingredient.description}
                </p>
                
                <span className="neo-cyan px-3 py-1 neo-border font-black text-black uppercase text-xs hover-scale animate-gentle-bounce">
                  {ingredient.products} PRODUCTS
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="neo-card p-8 lg:p-12 text-center hover-lift hover-glow animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-8 uppercase transform -skew-x-1 text-hover-glow animate-soft-pulse leading-tight">
              START YOUR WELLNESS JOURNEY
            </h2>
            
            <p className="text-lg sm:text-xl font-bold text-black mb-8 max-w-2xl mx-auto uppercase">
              JOIN 50,000+ HAPPY CUSTOMERS • TRANSFORM YOUR HEALTH • MONEY-BACK GUARANTEE
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => onViewChange('shop/all')}
                className="neo-button px-8 lg:px-12 py-4 lg:py-6 text-lg lg:text-xl flex items-center justify-center space-x-3 hover-lift hover-glow"
              >
                <span>EXPLORE ALL PRODUCTS</span>
                <ArrowRight size={24} />
              </button>
              
              <button className="neo-pink px-8 lg:px-12 py-4 lg:py-6 neo-border neo-shadow font-black text-black uppercase text-lg lg:text-xl hover-lift hover-scale">
                <Shield size={24} className="inline mr-3 animate-gentle-rotate" />
                30-DAY GUARANTEE
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}