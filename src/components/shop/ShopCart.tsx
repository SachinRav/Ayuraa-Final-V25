import React from 'react'
import { ArrowLeft, Plus, Minus, X, ShoppingBag, Truck, CreditCard, Zap, Heart } from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'

interface ShopCartProps {
  cartItems: any[]
  onViewChange: (view: string) => void
  onUpdateCart: (cartId: string, updates: any) => void
  onRemoveFromCart: (cartId: string) => void
}

export function ShopCart({ cartItems, onViewChange, onUpdateCart, onRemoveFromCart }: ShopCartProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = cartItems.reduce((sum, item) => sum + (item.subscription ? item.price * item.quantity * 0.15 : 0), 0)
  const freeShippingThreshold = 499
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 49
  const total = subtotal - discount + shippingCost

  const updateQuantity = (cartId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveFromCart(cartId)
    } else {
      onUpdateCart(cartId, { quantity: newQuantity })
    }
  }

  const toggleSubscription = (cartId: string, currentSubscription: boolean) => {
    onUpdateCart(cartId, { subscription: !currentSubscription })
  }

  const recommendedProducts = [
    { id: 'rec1', name: 'ASHWAGANDHA POWDER', price: 899, image: 'ashwagandha' },
    { id: 'rec2', name: 'TURMERIC CAPSULES', price: 699, image: 'turmeric' },
    { id: 'rec3', name: 'SPIRULINA TABLETS', price: 1299, image: 'spirulina' }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => onViewChange('shop')}
            className="flex items-center space-x-2 neo-cyan px-6 py-3 neo-border neo-shadow font-black text-black uppercase hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform"
          >
            <ArrowLeft size={20} />
            <span>CONTINUE SHOPPING</span>
          </button>
          
          <h1 className="text-5xl font-black text-black uppercase transform -skew-x-2">
            YOUR CART ({cartItems.length})
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="neo-card p-12 max-w-md mx-auto transform rotate-2">
              <ShoppingBag size={64} className="mx-auto mb-6 text-black" />
              <h2 className="text-3xl font-black text-black mb-6 uppercase">YOUR CART IS EMPTY!</h2>
              <p className="font-bold text-black mb-8 uppercase">DISCOVER OUR AMAZING WELLNESS PRODUCTS</p>
              <button
                onClick={() => onViewChange('shop')}
                className="neo-button px-8 py-4 flex items-center space-x-3 mx-auto transform hover:scale-105"
              >
                <ShoppingBag size={20} />
                <span>START SHOPPING!</span>
                <Zap size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="neo-card p-6 transform -rotate-1">
                <h2 className="text-2xl font-black text-black mb-6 uppercase">CART ITEMS</h2>
                
                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div key={item.cartId} className={`neo-lime p-6 neo-border neo-shadow transform ${
                      index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                    }`}>
                      <div className="flex space-x-6">
                        {/* Product Image */}
                        <div className="w-24 h-24 neo-orange neo-border flex items-center justify-center flex-shrink-0">
                          <ImageWithFallback
                            src={`/images/products/${item.image}.jpg`}
                            alt={item.name}
                            className="w-20 h-20 object-cover"
                            fallback={
                              <div className="text-center">
                                <div className="text-3xl">🌿</div>
                                <div className="font-black text-black text-xs uppercase">{item.name}</div>
                              </div>
                            }
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="font-black text-black uppercase text-lg mb-2">{item.name}</h3>
                          <div className="flex items-center space-x-4 mb-4">
                            <span className="neo-cyan px-3 py-1 neo-border font-black text-black uppercase text-xs">
                              {item.size}
                            </span>
                            {item.subscription && (
                              <span className="neo-pink px-3 py-1 neo-border text-white font-black uppercase text-xs">
                                SUBSCRIBE & SAVE 15%
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                className="neo-orange p-2 neo-border hover:scale-110 transition-transform"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-12 text-center font-black text-black text-lg">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                className="neo-orange p-2 neo-border hover:scale-110 transition-transform"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="text-2xl font-black text-black">
                                ${(item.price * item.quantity * (item.subscription ? 0.85 : 1)).toFixed(2)}
                              </div>
                              {item.subscription && (
                                <div className="text-sm font-bold text-black line-through">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-4 mt-4">
                            <button
                              onClick={() => toggleSubscription(item.cartId, item.subscription)}
                              className={`px-4 py-2 neo-border font-black uppercase text-xs hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform ${
                                item.subscription ? 'neo-yellow text-black' : 'bg-white text-black'
                              }`}
                            >
                              {item.subscription ? 'REMOVE SUBSCRIPTION' : 'ADD SUBSCRIPTION (-15%)'}
                            </button>
                            
                            <button
                              onClick={() => onRemoveFromCart(item.cartId)}
                              className="neo-pink p-2 neo-border text-white hover:scale-110 transition-transform"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Products */}
              <div className="neo-card p-6 transform rotate-1">
                <h3 className="text-xl font-black text-black mb-6 uppercase">YOU MIGHT ALSO LIKE</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {recommendedProducts.map((product, index) => (
                    <div key={product.id} className={`neo-cyan p-4 neo-border text-center transform ${
                      index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                    }`}>
                      <div className="w-16 h-16 neo-orange neo-border mx-auto mb-3 flex items-center justify-center">
                        <span className="text-2xl">🌿</span>
                      </div>
                      <h4 className="font-black text-black uppercase text-sm mb-2">{product.name}</h4>
                      <div className="font-black text-black text-lg mb-3">${product.price}</div>
                      <button className="neo-yellow px-3 py-1 neo-border font-black text-black uppercase text-xs hover:scale-110 transition-transform">
                        ADD TO CART
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="neo-card p-6 transform rotate-1 sticky top-8">
                <h3 className="text-2xl font-black text-black mb-6 uppercase">ORDER SUMMARY</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold text-black uppercase">SUBTOTAL</span>
                    <span className="font-black text-black text-lg">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span className="font-bold text-black uppercase">SUBSCRIPTION DISCOUNT</span>
                      <span className="font-black text-black text-lg">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="font-bold text-black uppercase">SHIPPING</span>
                    <span className="font-black text-black text-lg">
                      {shippingCost === 0 ? 'FREE' : `$${shippingCost}`}
                    </span>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {subtotal < freeShippingThreshold && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-black uppercase text-sm">FREE SHIPPING AT ${freeShippingThreshold}</span>
                      <span className="neo-orange px-2 py-1 neo-border text-black font-black uppercase text-xs">
                        ${(freeShippingThreshold - subtotal).toFixed(2)} TO GO
                      </span>
                    </div>
                    <div className="w-full bg-white neo-border h-3">
                      <div 
                        className="neo-lime h-3 transition-all duration-300"
                        style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="pt-4 mb-6" style={{ borderTop: '3px solid #000000' }}>
                  <div className="flex justify-between">
                    <span className="text-xl font-black text-black uppercase">TOTAL</span>
                    <span className="text-3xl font-black text-black">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => onViewChange('checkout')}
                  className="w-full neo-button py-6 text-xl flex items-center justify-center space-x-3 mb-4 transform hover:scale-105"
                >
                  <CreditCard size={24} />
                  <span>PROCEED TO CHECKOUT</span>
                  <Zap size={24} />
                </button>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="neo-lime p-3 neo-border text-center">
                    <Truck size={20} className="mx-auto mb-1 text-black" />
                    <div className="font-black text-black uppercase text-xs">FREE SHIPPING</div>
                  </div>
                  <div className="neo-cyan p-3 neo-border text-center">
                    <Heart size={20} className="mx-auto mb-1 text-black" />
                    <div className="font-black text-black uppercase text-xs">SECURE PAYMENT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}