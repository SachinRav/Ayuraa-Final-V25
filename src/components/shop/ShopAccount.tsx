import React, { useState } from 'react'
import { User, ShoppingBag, Heart, Settings, Bell, CreditCard, Truck, RotateCcw, Star, ArrowRight, Zap } from 'lucide-react'

interface ShopAccountProps {
  user: any
  userProfile: any
  onViewChange: (view: string) => void
}

export function ShopAccount({ user, userProfile, onViewChange }: ShopAccountProps) {
  const [activeTab, setActiveTab] = useState('orders')

  const tabs = [
    { id: 'orders', label: 'MY ORDERS', icon: ShoppingBag },
    { id: 'profile', label: 'PROFILE', icon: User },
    { id: 'wishlist', label: 'WISHLIST', icon: Heart },
    { id: 'settings', label: 'SETTINGS', icon: Settings }
  ]

  const mockOrders = [
    {
      id: 'WO123456',
      date: '2024-12-10',
      status: 'DELIVERED',
      total: 89.97,
      items: ['Daily Greens Powder', 'Turmeric Capsules'],
      trackingNumber: 'TRK789123456'
    },
    {
      id: 'WO123455',
      date: '2024-12-05',
      status: 'SHIPPED',
      total: 159.95,
      items: ['Immunity Boost Bundle', 'Ashwagandha Powder'],
      trackingNumber: 'TRK789123455'
    },
    {
      id: 'WO123454',
      date: '2024-11-28',
      status: 'PROCESSING',
      total: 249.99,
      items: ['Gut Restore Complex', 'Spirulina Tablets', 'Moringa Powder'],
      trackingNumber: null
    }
  ]

  const mockWishlist = [
    { id: 1, name: 'COLLAGEN PEPTIDES', price: 1599, image: 'collagen' },
    { id: 2, name: 'OMEGA-3 CAPSULES', price: 899, image: 'omega3' },
    { id: 3, name: 'PROBIOTICS BLEND', price: 1299, image: 'probiotics' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'neo-lime'
      case 'SHIPPED': return 'neo-yellow'
      case 'PROCESSING': return 'neo-orange'
      default: return 'neo-cyan'
    }
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-6">
            <div className="neo-card p-6 transform -rotate-1">
              <h3 className="text-2xl font-black text-black mb-6 uppercase">ORDER HISTORY</h3>
              
              <div className="space-y-4">
                {mockOrders.map((order, index) => (
                  <div key={order.id} className={`neo-cyan p-6 neo-border neo-shadow transform ${
                    index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-black text-black uppercase text-lg">ORDER #{order.id}</h4>
                        <p className="font-bold text-black uppercase text-sm">{order.date}</p>
                      </div>
                      <div className={`${getStatusColor(order.status)} px-4 py-2 neo-border transform rotate-3`}>
                        <span className="font-black text-black uppercase text-sm">{order.status}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="font-bold text-black uppercase text-sm mb-2">ITEMS:</p>
                      <ul className="space-y-1">
                        {order.items.map((item, i) => (
                          <li key={i} className="font-bold text-black uppercase text-sm">• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="font-black text-black text-xl">${order.total}</div>
                      <div className="flex space-x-3">
                        {order.trackingNumber && (
                          <button className="neo-yellow px-4 py-2 neo-border font-black text-black uppercase text-sm hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform">
                            TRACK ORDER
                          </button>
                        )}
                        <button className="neo-orange px-4 py-2 neo-border font-black text-black uppercase text-sm hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform">
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="neo-card p-6 transform rotate-1">
              <h3 className="text-2xl font-black text-black mb-6 uppercase">PERSONAL INFORMATION</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-black text-black mb-2 uppercase">FIRST NAME</label>
                  <input
                    type="text"
                    defaultValue={userProfile?.name?.split(' ')[0] || ''}
                    className="w-full p-4 bg-white neo-border font-bold text-black uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                  />
                </div>
                
                <div>
                  <label className="block font-black text-black mb-2 uppercase">LAST NAME</label>
                  <input
                    type="text"
                    defaultValue={userProfile?.name?.split(' ')[1] || ''}
                    className="w-full p-4 bg-white neo-border font-bold text-black uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block font-black text-black mb-2 uppercase">EMAIL</label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  className="w-full p-4 bg-white neo-border font-bold text-black uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                />
              </div>

              <div className="mt-6">
                <label className="block font-black text-black mb-2 uppercase">PHONE</label>
                <input
                  type="tel"
                  defaultValue=""
                  placeholder="ENTER PHONE NUMBER"
                  className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                />
              </div>

              <button className="mt-6 neo-button px-8 py-4 flex items-center space-x-3 transform hover:scale-105">
                <span>UPDATE PROFILE</span>
                <Zap size={20} />
              </button>
            </div>

            <div className="neo-card p-6 transform -rotate-1">
              <h3 className="text-2xl font-black text-black mb-6 uppercase">SHIPPING ADDRESS</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-black text-black mb-2 uppercase">ADDRESS</label>
                  <input
                    type="text"
                    placeholder="ENTER ADDRESS"
                    className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block font-black text-black mb-2 uppercase">CITY</label>
                    <input
                      type="text"
                      placeholder="CITY"
                      className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-black text-black mb-2 uppercase">STATE</label>
                    <input
                      type="text"
                      placeholder="STATE"
                      className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-black text-black mb-2 uppercase">ZIP CODE</label>
                    <input
                      type="text"
                      placeholder="ZIP"
                      className="w-full p-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all"
                    />
                  </div>
                </div>

                <button className="neo-button px-8 py-4 flex items-center space-x-3 transform hover:scale-105">
                  <span>SAVE ADDRESS</span>
                  <Zap size={20} />
                </button>
              </div>
            </div>
          </div>
        )

      case 'wishlist':
        return (
          <div className="space-y-6">
            <div className="neo-card p-6 transform rotate-1">
              <h3 className="text-2xl font-black text-black mb-6 uppercase">MY WISHLIST</h3>
              
              {mockWishlist.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockWishlist.map((item, index) => (
                    <div key={item.id} className={`neo-lime p-6 neo-border neo-shadow transform ${
                      index % 3 === 0 ? 'rotate-1' : index % 3 === 1 ? '-rotate-1' : 'rotate-2'
                    }`}>
                      <div className="w-full h-32 neo-orange neo-border mb-4 flex items-center justify-center">
                        <span className="text-4xl">🌿</span>
                      </div>
                      
                      <h4 className="font-black text-black uppercase mb-2">{item.name}</h4>
                      <div className="font-black text-black text-xl mb-4">${item.price}</div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 neo-yellow px-4 py-2 neo-border font-black text-black uppercase text-sm hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform">
                          ADD TO CART
                        </button>
                        <button className="neo-pink p-2 neo-border text-white hover:scale-110 transition-transform">
                          <Heart size={16} className="fill-current" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart size={64} className="mx-auto mb-6 text-black" />
                  <h4 className="font-black text-black text-xl mb-4 uppercase">YOUR WISHLIST IS EMPTY!</h4>
                  <button
                    onClick={() => onViewChange('shop')}
                    className="neo-button px-8 py-4 flex items-center space-x-3 mx-auto transform hover:scale-105"
                  >
                    <span>DISCOVER PRODUCTS</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="neo-card p-6 transform -rotate-1">
              <h3 className="text-2xl font-black text-black mb-6 uppercase">ACCOUNT SETTINGS</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between neo-cyan p-4 neo-border">
                  <div className="flex items-center space-x-3">
                    <Bell size={24} className="text-black" />
                    <span className="font-black text-black uppercase">EMAIL NOTIFICATIONS</span>
                  </div>
                  <button className="w-12 h-6 neo-lime neo-border flex items-center justify-end">
                    <div className="w-4 h-4 bg-black"></div>
                  </button>
                </div>

                <div className="flex items-center justify-between neo-lime p-4 neo-border">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag size={24} className="text-black" />
                    <span className="font-black text-black uppercase">ORDER UPDATES</span>
                  </div>
                  <button className="w-12 h-6 neo-orange neo-border flex items-center justify-end">
                    <div className="w-4 h-4 bg-black"></div>
                  </button>
                </div>

                <div className="flex items-center justify-between neo-yellow p-4 neo-border">
                  <div className="flex items-center space-x-3">
                    <CreditCard size={24} className="text-black" />
                    <span className="font-black text-black uppercase">PROMOTIONAL EMAILS</span>
                  </div>
                  <button className="w-12 h-6 bg-white neo-border flex items-center justify-start">
                    <div className="w-4 h-4 bg-black"></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="neo-card p-6 transform rotate-1">
              <h3 className="text-2xl font-black text-black mb-6 uppercase">SUBSCRIPTION PREFERENCES</h3>
              
              <div className="space-y-4">
                <div className="neo-orange p-4 neo-border">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-black text-black uppercase">DAILY GREENS POWDER</span>
                    <span className="neo-lime px-3 py-1 neo-border font-black text-black uppercase text-xs">ACTIVE</span>
                  </div>
                  <p className="font-bold text-black uppercase text-sm mb-3">DELIVERS EVERY 30 DAYS • NEXT: DEC 25</p>
                  <div className="flex space-x-3">
                    <button className="neo-cyan px-4 py-2 neo-border font-black text-black uppercase text-sm hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform">
                      MODIFY
                    </button>
                    <button className="neo-pink px-4 py-2 neo-border text-white font-black uppercase text-sm hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform">
                      CANCEL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-black mb-6 uppercase transform -skew-x-2">
            MY ACCOUNT
          </h1>
          <p className="text-xl font-bold text-black uppercase">
            WELCOME BACK, {userProfile?.name?.split(' ')[0]?.toUpperCase() || 'WELLNESS WARRIOR'}!
          </p>
        </div>

        {/* Account Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="neo-card p-6 text-center transform rotate-1">
            <ShoppingBag size={32} className="mx-auto mb-3 text-black" />
            <div className="font-black text-black text-2xl">12</div>
            <div className="font-bold text-black uppercase text-sm">ORDERS</div>
          </div>
          
          <div className="neo-card p-6 text-center transform -rotate-1">
            <Heart size={32} className="mx-auto mb-3 text-black" />
            <div className="font-black text-black text-2xl">8</div>
            <div className="font-bold text-black uppercase text-sm">WISHLIST</div>
          </div>
          
          <div className="neo-card p-6 text-center transform rotate-2">
            <Star size={32} className="mx-auto mb-3 text-black" />
            <div className="font-black text-black text-2xl">1,250</div>
            <div className="font-bold text-black uppercase text-sm">POINTS</div>
          </div>
          
          <div className="neo-card p-6 text-center transform -rotate-2">
            <Truck size={32} className="mx-auto mb-3 text-black" />
            <div className="font-black text-black text-2xl">$1,890</div>
            <div className="font-bold text-black uppercase text-sm">TOTAL SAVED</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <div className="neo-card p-6 transform rotate-1 sticky top-8">
              <h3 className="font-black text-black mb-6 uppercase text-xl">ACCOUNT MENU</h3>
              <nav className="space-y-3">
                {tabs.map((tab, index) => {
                  const IconComponent = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 p-3 neo-border font-black uppercase text-sm text-left transition-all transform ${
                        activeTab === tab.id
                          ? 'neo-yellow neo-shadow-lg rotate-1'
                          : 'bg-white hover:neo-cyan hover:neo-shadow hover:-rotate-1'
                      } ${index % 2 === 1 ? 'rotate-1' : '-rotate-1'}`}
                    >
                      <IconComponent size={20} />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}