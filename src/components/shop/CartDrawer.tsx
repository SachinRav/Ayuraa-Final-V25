import React from 'react'
import { X, Plus, Minus, Truck, ShoppingBag, ArrowRight, Zap } from 'lucide-react'
import { ImageWithFallback } from '../figma/ImageWithFallback'

interface CartDrawerProps {
  cartItems: any[]
  onClose: () => void
  onViewChange: (view: string) => void
  onUpdateCart: (cartId: string, updates: any) => void
  onRemoveFromCart: (cartId: string) => void
}

export function CartDrawer({ cartItems, onClose, onViewChange, onUpdateCart, onRemoveFromCart }: CartDrawerProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const freeShippingThreshold = 499
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 49
  const total = subtotal + shippingCost

  const updateQuantity = (cartId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveFromCart(cartId)
    } else {
      onUpdateCart(cartId, { quantity: newQuantity })
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white neo-border neo-shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 neo-pink text-white">
            <div className="flex items-center space-x-3">
              <ShoppingBag size={24} className="text-white" />
              <h2 className="text-xl font-black uppercase">
                YOUR CART ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="neo-orange p-2 neo-border text-black hover:scale-110 transition-transform"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag size={64} className="text-black mx-auto mb-6" />
                <h3 className="text-2xl font-black text-black mb-4 uppercase">YOUR CART IS EMPTY!</h3>
                <p className="font-bold text-black mb-8 uppercase">ADD SOME WELLNESS PRODUCTS TO GET STARTED!</p>
                <button
                  onClick={() => {
                    onViewChange('shop')
                    onClose()
                  }}
                  className="neo-button px-8 py-4 flex items-center space-x-3 mx-auto transform hover:scale-105"
                >
                  <Zap size={20} />
                  <span>START SHOPPING!</span>
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <div key={item.cartId} className={`neo-lime p-4 neo-border neo-shadow transform ${
                    index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                  }`}>
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 neo-cyan neo-border flex items-center justify-center flex-shrink-0">
                        <ImageWithFallback
                          src={`/images/products/${item.image}.jpg`}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                          fallback={
                            <div className="text-center">
                              <div className="text-2xl">🌿</div>
                              <div className="font-black text-black text-xs uppercase">{item.name}</div>
                            </div>
                          }
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-black uppercase text-sm truncate">{item.name}</h4>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="font-bold text-black uppercase text-xs">{item.size}</span>
                          {item.subscription && (
                            <span className="neo-orange px-2 py-1 neo-border text-black font-black uppercase text-xs">
                              SUBSCRIBE & SAVE
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="neo-orange p-2 neo-border hover:scale-110 transition-transform"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center font-black text-black">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="neo-orange p-2 neo-border hover:scale-110 transition-transform"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-black text-black text-lg">₹{item.price * item.quantity}</p>
                            <button
                              onClick={() => onRemoveFromCart(item.cartId)}
                              className="neo-pink px-2 py-1 neo-border text-white font-black uppercase text-xs mt-1 hover:scale-110 transition-transform"
                            >
                              REMOVE
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="p-6" style={{ borderTop: '3px solid #000000' }}>
              {subtotal < freeShippingThreshold && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-black uppercase text-sm">FREE SHIPPING ON ORDERS ABOVE ₹{freeShippingThreshold}</span>
                    <span className="neo-orange px-2 py-1 neo-border text-black font-black uppercase text-xs">₹{freeShippingThreshold - subtotal} TO GO</span>
                  </div>
                  <div className="w-full bg-white neo-border h-4">
                    <div 
                      className="neo-lime h-4 transition-all duration-300"
                      style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {subtotal >= freeShippingThreshold && (
                <div className="flex items-center neo-lime p-3 neo-border neo-shadow mb-6">
                  <Truck size={20} className="mr-3" />
                  <span className="font-black text-black uppercase">YOU'VE QUALIFIED FOR FREE SHIPPING! 🎉</span>
                </div>
              )}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="font-bold text-black uppercase">SUBTOTAL</span>
                  <span className="font-black text-black text-lg">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-black uppercase">SHIPPING</span>
                  <span className="font-black text-black text-lg">
                    {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between pt-3" style={{ borderTop: '2px solid #000000' }}>
                  <span className="font-black text-black uppercase text-xl">TOTAL</span>
                  <span className="font-black text-black text-2xl">₹{total}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => {
                    onViewChange('shop/cart')
                    onClose()
                  }}
                  className="w-full neo-cyan px-6 py-4 neo-border neo-shadow font-black text-black uppercase hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform"
                >
                  VIEW CART
                </button>
                
                <button
                  onClick={() => {
                    onViewChange('checkout')
                    onClose()
                  }}
                  className="w-full neo-button py-4 flex items-center justify-center space-x-3 transform hover:scale-105"
                >
                  <span>CHECKOUT NOW!</span>
                  <ArrowRight size={20} />
                </button>
              </div>

              <div className="flex justify-center space-x-6 mt-6">
                <span className="neo-orange px-3 py-2 neo-border font-black text-black uppercase text-xs">🔒 SECURE</span>
                <span className="neo-yellow px-3 py-2 neo-border font-black text-black uppercase text-xs">📦 FAST</span>
                <span className="neo-lime px-3 py-2 neo-border font-black text-black uppercase text-xs">↩️ RETURNS</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}