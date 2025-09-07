import React, { useState } from 'react'
import { ArrowLeft, CreditCard, Truck, Shield, Lock, CheckCircle, Zap } from 'lucide-react'

interface CheckoutProps {
  cartItems: any[]
  user: any
  onViewChange: (view: string) => void
  onUpdateCart: (cartId: string, updates: any) => void
  onRemoveFromCart: (cartId: string) => void
}

export function Checkout({ cartItems, user, onViewChange, onUpdateCart, onRemoveFromCart }: CheckoutProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const discount = cartItems.reduce((sum, item) => sum + (item.subscription ? item.price * item.quantity * 0.15 : 0), 0)
  const shippingCost = subtotal >= 499 ? 0 : 49
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + shippingCost + tax

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
    }, 3000)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="neo-card p-12 transform rotate-2">
            <div className="w-20 h-20 neo-lime neo-border mx-auto mb-6 flex items-center justify-center transform -rotate-12">
              <CheckCircle size={40} className="text-black" />
            </div>
            
            <h1 className="text-4xl font-black text-black mb-6 uppercase">ORDER CONFIRMED!</h1>
            <p className="font-bold text-black mb-8 uppercase text-lg">
              YOUR ORDER #WO{Date.now().toString().slice(-6)} HAS BEEN PLACED SUCCESSFULLY!
            </p>
            
            <div className="neo-yellow p-6 neo-border neo-shadow mb-8 transform -rotate-1">
              <h3 className="font-black text-black mb-4 uppercase">WHAT'S NEXT?</h3>
              <div className="space-y-2 text-left">
                <p className="font-bold text-black uppercase text-sm">• CONFIRMATION EMAIL SENT</p>
                <p className="font-bold text-black uppercase text-sm">• ORDER PROCESSING BEGINS</p>
                <p className="font-bold text-black uppercase text-sm">• SHIPPING IN 1-2 BUSINESS DAYS</p>
                <p className="font-bold text-black uppercase text-sm">• TRACKING INFO WILL BE EMAILED</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onViewChange('shop-account')}
                className="neo-cyan px-8 py-4 neo-border neo-shadow font-black text-black uppercase hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform"
              >
                VIEW ORDER STATUS
              </button>
              <button
                onClick={() => onViewChange('shop')}
                className="neo-button px-8 py-4 flex items-center space-x-3 transform hover:scale-105"
              >
                <span>CONTINUE SHOPPING</span>
                <Zap size={20} />
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
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={() => onViewChange('shop/cart')}
            className="flex items-center space-x-2 neo-cyan px-6 py-3 neo-border neo-shadow font-black text-black uppercase hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform"
          >
            <ArrowLeft size={20} />
            <span>BACK TO CART</span>
          </button>
          
          <h1 className="text-5xl font-black text-black uppercase transform -skew-x-2">CHECKOUT</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[
              { id: 1, label: 'SHIPPING' },
              { id: 2, label: 'PAYMENT' },
              { id: 3, label: 'REVIEW' }
            ].map((stepItem, index) => (
              <React.Fragment key={stepItem.id}>
                <div className={`flex flex-col items-center transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}>
                  <div className={`w-12 h-12 neo-border flex items-center justify-center font-black text-lg ${
                    step >= stepItem.id ? 'neo-yellow neo-shadow-lg text-black' : 'bg-white text-black'
                  }`}>
                    {stepItem.id}
                  </div>
                  <span className="font-black text-black uppercase text-sm mt-2">{stepItem.label}</span>
                </div>
                {index < 2 && (
                  <div className={`w-16 h-2 neo-border transform -rotate-12 ${
                    step > stepItem.id ? 'neo-lime' : 'bg-white'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="neo-card p-8 transform -rotate-1">
                  <h2 className="text-2xl font-black text-black mb-8 uppercase">SHIPPING INFORMATION</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-black text-black mb-2 uppercase">FIRST NAME</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                        placeholder="ENTER FIRST NAME"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block font-black text-black mb-2 uppercase">LAST NAME</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                        placeholder="ENTER LAST NAME"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block font-black text-black mb-2 uppercase">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                      placeholder="ENTER EMAIL"
                      required
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block font-black text-black mb-2 uppercase">PHONE NUMBER</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                      placeholder="ENTER PHONE"
                      required
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block font-black text-black mb-2 uppercase">ADDRESS</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                      placeholder="ENTER ADDRESS"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <label className="block font-black text-black mb-2 uppercase">CITY</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                        placeholder="CITY"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block font-black text-black mb-2 uppercase">STATE</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                        placeholder="STATE"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block font-black text-black mb-2 uppercase">ZIP CODE</label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                        placeholder="ZIP"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full mt-8 neo-button py-4 text-xl flex items-center justify-center space-x-3 transform hover:scale-105"
                  >
                    <span>CONTINUE TO PAYMENT</span>
                    <Zap size={24} />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="neo-card p-8 transform rotate-1">
                  <h2 className="text-2xl font-black text-black mb-8 uppercase">PAYMENT INFORMATION</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <button
                      type="button"
                      onClick={() => handleInputChange('paymentMethod', 'card')}
                      className={`p-6 neo-border font-black uppercase transition-all ${
                        formData.paymentMethod === 'card' ? 'neo-yellow neo-shadow-lg' : 'bg-white hover:neo-cyan hover:neo-shadow'
                      }`}
                    >
                      <CreditCard size={32} className="mx-auto mb-2 text-black" />
                      CREDIT CARD
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleInputChange('paymentMethod', 'cod')}
                      className={`p-6 neo-border font-black uppercase transition-all ${
                        formData.paymentMethod === 'cod' ? 'neo-yellow neo-shadow-lg' : 'bg-white hover:neo-cyan hover:neo-shadow'
                      }`}
                    >
                      <Truck size={32} className="mx-auto mb-2 text-black" />
                      CASH ON DELIVERY
                    </button>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-6">
                      <div>
                        <label className="block font-black text-black mb-2 uppercase">CARD NUMBER</label>
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 focus:neo-yellow focus:neo-shadow-lg transition-all"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-black text-black mb-2 uppercase">NAME ON CARD</label>
                        <input
                          type="text"
                          value={formData.nameOnCard}
                          onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                          className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                          placeholder="ENTER NAME"
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block font-black text-black mb-2 uppercase">EXPIRY DATE</label>
                          <input
                            type="text"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 focus:neo-yellow focus:neo-shadow-lg transition-all"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block font-black text-black mb-2 uppercase">CVV</label>
                          <input
                            type="text"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 focus:neo-yellow focus:neo-shadow-lg transition-all"
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 neo-pink px-6 py-4 neo-border neo-shadow text-white font-black uppercase hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform"
                    >
                      BACK TO SHIPPING
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 neo-button py-4 text-xl flex items-center justify-center space-x-3 transform hover:scale-105"
                    >
                      <span>REVIEW ORDER</span>
                      <Zap size={20} />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="neo-card p-8 transform -rotate-1">
                  <h2 className="text-2xl font-black text-black mb-8 uppercase">REVIEW YOUR ORDER</h2>
                  
                  <div className="space-y-6">
                    {cartItems.map((item, index) => (
                      <div key={item.cartId} className={`neo-lime p-4 neo-border flex items-center space-x-4 transform ${
                        index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                      }`}>
                        <div className="w-16 h-16 neo-orange neo-border flex items-center justify-center">
                          <span className="text-2xl">🌿</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-black uppercase">{item.name}</h4>
                          <p className="font-bold text-black uppercase text-sm">{item.size} × {item.quantity}</p>
                        </div>
                        <div className="font-black text-black text-lg">
                          ${(item.price * item.quantity * (item.subscription ? 0.85 : 1)).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 neo-pink px-6 py-4 neo-border neo-shadow text-white font-black uppercase hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform"
                    >
                      BACK TO PAYMENT
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 neo-button py-4 text-xl flex items-center justify-center space-x-3 disabled:opacity-50 transform hover:scale-105"
                    >
                      {isProcessing ? (
                        <span>PROCESSING...</span>
                      ) : (
                        <>
                          <Lock size={20} />
                          <span>PLACE ORDER</span>
                          <Zap size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="neo-card p-6 transform rotate-1 h-fit sticky top-8">
            <h3 className="text-xl font-black text-black mb-6 uppercase">ORDER SUMMARY</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="font-bold text-black uppercase">SUBTOTAL</span>
                <span className="font-black text-black">${subtotal.toFixed(2)}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="font-bold text-black uppercase">SUBSCRIPTION DISCOUNT</span>
                  <span className="font-black text-black">-${discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="font-bold text-black uppercase">SHIPPING</span>
                <span className="font-black text-black">{shippingCost === 0 ? 'FREE' : `$${shippingCost}`}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="font-bold text-black uppercase">TAX</span>
                <span className="font-black text-black">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4 mb-6" style={{ borderTop: '3px solid #000000' }}>
              <div className="flex justify-between">
                <span className="text-xl font-black text-black uppercase">TOTAL</span>
                <span className="text-2xl font-black text-black">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Security Badges */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 neo-lime p-3 neo-border">
                <Shield size={20} className="text-black" />
                <span className="font-black text-black uppercase text-sm">SSL SECURE CHECKOUT</span>
              </div>
              <div className="flex items-center space-x-3 neo-cyan p-3 neo-border">
                <Truck size={20} className="text-black" />
                <span className="font-black text-black uppercase text-sm">FREE SHIPPING OVER $499</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}