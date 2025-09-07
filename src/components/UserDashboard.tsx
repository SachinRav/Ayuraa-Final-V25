import React, { useState, useEffect } from 'react'
import { Calendar, Heart, ShoppingBag, User, Clock, Star, Settings, CreditCard, BarChart3, Bell, Target, Plus, X, Edit3, Check, Trash2, AlertCircle, ShoppingCart } from 'lucide-react'

interface UserDashboardProps {
  user: any
  userProfile: any
  onUpdateProfile: (profile: any) => void
  onViewChange?: (view: string) => void
}

export function UserDashboard({ user, userProfile, onUpdateProfile, onViewChange }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [bookings, setBookings] = useState([
    { id: 1, healer_name: 'Dr. Sarah Chen', service_type: 'Reiki Healing', date: new Date('2025-01-15'), time: '2:00 PM IST', status: 'confirmed', price: '2500' },
    { id: 2, healer_name: 'Michael Rodriguez', service_type: 'Energy Healing', date: new Date('2025-01-20'), time: '10:00 AM IST', status: 'pending', price: '3000' },
    { id: 3, healer_name: 'Emma Wilson', service_type: 'Chakra Balancing', date: new Date('2025-01-25'), time: '3:00 PM IST', status: 'completed', price: '2200' }
  ])
  
  // Enhanced wishlist with full product integration
  const [wishlist, setWishlist] = useState([
    {
      id: 'daily-greens',
      name: 'DAILY GREENS POWDER',
      price: 1299,
      originalPrice: 1599,
      image: 'greens-powder',
      category: 'Powders',
      description: 'COMPLETE SUPERFOOD BLEND',
      rating: 4.8,
      reviews: 234
    },
    {
      id: 'immunity-boost',
      name: 'IMMUNITY BOOST BUNDLE',
      price: 2199,
      originalPrice: 2799,
      image: 'immunity-bundle',
      category: 'Supplements',
      description: 'COMPREHENSIVE IMMUNE SUPPORT',
      rating: 4.9,
      reviews: 156
    },
    {
      id: 'ashwagandha',
      name: 'ASHWAGANDHA POWDER',
      price: 699,
      originalPrice: 899,
      image: 'ashwagandha-powder',
      category: 'Powders',
      description: 'STRESS RELIEF & ENERGY',
      rating: 4.5,
      reviews: 198
    }
  ])
  
  // Notifications system
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'session',
      title: 'Session Reminder',
      message: 'Your Reiki Healing session with Dr. Sarah Chen is tomorrow at 2:00 PM',
      time: '1 hour ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'goal',
      title: 'Goal Progress',
      message: 'You are 70% complete with your meditation challenge!',
      time: '3 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'product',
      title: 'Wishlist Update',
      message: 'Daily Greens Powder from your wishlist is now on sale!',
      time: '1 day ago',
      read: true,
      priority: 'low'
    }
  ])
  
  // Custom goals system
  const [goals, setGoals] = useState([
    { id: 1, goal: 'Complete 10 Meditation Sessions', progress: 7, total: 10, color: 'neo-cyan', category: 'Mindfulness', deadline: '2025-02-01' },
    { id: 2, goal: 'Try 3 Different Healing Modalities', progress: 2, total: 3, color: 'neo-pink', category: 'Exploration', deadline: '2025-01-30' },
    { id: 3, goal: 'Read 5 Wellness Articles', progress: 5, total: 5, color: 'neo-lime', category: 'Learning', deadline: '2025-01-25' }
  ])
  
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({
    name: userProfile?.name || '',
    bio: userProfile?.bio || '',
    goals: ''
  })
  
  // Goal management states
  const [showGoalForm, setShowGoalForm] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [newGoal, setNewGoal] = useState({
    goal: '',
    total: 1,
    category: 'Personal',
    deadline: '',
    color: 'neo-cyan'
  })

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'sessions', label: 'My Sessions', icon: Calendar },
    { id: 'earnings', label: 'Earnings', icon: CreditCard },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  // Wishlist functions
  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId))
  }

  const addToCart = (product: any) => {
    // This would integrate with the main app's cart system
    console.log('Adding to cart:', product)
    // You could call a parent function here if needed
    if (onViewChange) {
      onViewChange('shop/cart')
    }
  }

  // Notification functions
  const markNotificationAsRead = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    )
  }

  const clearNotification = (notificationId: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId))
  }

  // Goal management functions
  const addGoal = () => {
    if (newGoal.goal.trim() && newGoal.total > 0) {
      const goal = {
        id: Date.now(),
        goal: newGoal.goal.trim(),
        progress: 0,
        total: newGoal.total,
        color: newGoal.color,
        category: newGoal.category,
        deadline: newGoal.deadline
      }
      setGoals(prev => [...prev, goal])
      setNewGoal({ goal: '', total: 1, category: 'Personal', deadline: '', color: 'neo-cyan' })
      setShowGoalForm(false)
    }
  }

  const updateGoalProgress = (goalId: number, newProgress: number) => {
    setGoals(prev =>
      prev.map(goal =>
        goal.id === goalId ? { ...goal, progress: Math.max(0, Math.min(newProgress, goal.total)) } : goal
      )
    )
  }

  const deleteGoal = (goalId: number) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId))
  }

  const startEditingGoal = (goal: any) => {
    setEditingGoal(goal.id)
    setNewGoal({
      goal: goal.goal,
      total: goal.total,
      category: goal.category,
      deadline: goal.deadline,
      color: goal.color
    })
  }

  const saveEditedGoal = () => {
    if (editingGoal && newGoal.goal.trim()) {
      setGoals(prev =>
        prev.map(goal =>
          goal.id === editingGoal
            ? { ...goal, goal: newGoal.goal, total: newGoal.total, category: newGoal.category, deadline: newGoal.deadline, color: newGoal.color }
            : goal
        )
      )
      setEditingGoal(null)
      setNewGoal({ goal: '', total: 1, category: 'Personal', deadline: '', color: 'neo-cyan' })
    }
  }

  const renderOverview = () => (
    <div className="space-y-6 sm:space-y-8">
      <div className="user-dashboard-card p-6 sm:p-8 hover-lift hover-glow animate-fade-in-up">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black mb-4 uppercase">Welcome back, {userProfile?.name || 'User'}! ✨</h3>
        <p className="font-bold text-black uppercase text-sm">Continue your wellness journey with personalized healing sessions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="user-dashboard-card p-4 sm:p-6 hover-lift hover-glow animate-fade-in-up stagger-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 neo-cyan user-dashboard-border flex items-center justify-center">
              <Calendar size={20} className="text-black" />
            </div>
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl font-black text-black">{bookings.length}</div>
              <div className="font-bold text-black uppercase text-xs">Total Sessions</div>
            </div>
          </div>
        </div>

        <div className="user-dashboard-card p-4 sm:p-6 hover-lift hover-glow animate-fade-in-up stagger-2">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 neo-pink user-dashboard-border flex items-center justify-center">
              <Heart size={20} className="text-black" />
            </div>
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl font-black text-black">{wishlist.length}</div>
              <div className="font-bold text-black uppercase text-xs">Wishlist Items</div>
            </div>
          </div>
        </div>

        <div className="user-dashboard-card p-4 sm:p-6 hover-lift hover-glow animate-fade-in-up stagger-3">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 neo-lime user-dashboard-border flex items-center justify-center">
              <Star size={20} className="text-black" />
            </div>
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl font-black text-black">4.8</div>
              <div className="font-bold text-black uppercase text-xs">Avg Experience</div>
            </div>
          </div>
        </div>
      </div>

      <div className="user-dashboard-card p-6 sm:p-8 hover-lift hover-glow animate-fade-in-up">
        <h4 className="text-sm sm:text-base lg:text-lg font-black text-black mb-4 sm:mb-6 uppercase">Recent Sessions</h4>
        <div className="space-y-3 sm:space-y-4">
          {bookings.slice(0, 3).map((booking) => (
            <div key={booking.id} className="user-dashboard-card p-4 hover-scale animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div>
                  <div className="font-black text-black uppercase">{booking.healer_name}</div>
                  <div className="font-bold text-black text-sm">{booking.service_type}</div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} className="text-black" />
                      <span className="font-bold text-black text-sm">{booking.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} className="text-black" />
                      <span className="font-bold text-black text-sm">{booking.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <div className={`px-3 py-1 user-dashboard-border font-black text-black uppercase inline-block mb-2 text-xs ${
                    booking.status === 'confirmed' ? 'neo-lime' :
                    booking.status === 'pending' ? 'neo-yellow' :
                    'bg-white'
                  }`}>
                    {booking.status}
                  </div>
                  <div className="font-black text-black neo-yellow px-2 py-1 user-dashboard-border inline-block text-xs">₹{booking.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="user-dashboard-card p-6 sm:p-8 hover-lift hover-glow animate-fade-in-up">
        <h4 className="text-sm sm:text-base lg:text-lg font-black text-black mb-4 sm:mb-6 uppercase">Wellness Goals</h4>
        <div className="space-y-4">
          {[
            { goal: 'Complete 10 Meditation Sessions', progress: 7, total: 10, color: 'neo-cyan' },
            { goal: 'Try 3 Different Healing Modalities', progress: 2, total: 3, color: 'neo-pink' },
            { goal: 'Read 5 Wellness Articles', progress: 5, total: 5, color: 'neo-lime' }
          ].map((item, index) => (
            <div key={index} className={`${item.color} p-4 user-dashboard-border hover-scale animate-fade-in-up`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <span className="font-black text-black uppercase text-sm">{item.goal}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 sm:w-32 h-2 bg-white user-dashboard-border">
                    <div 
                      className="h-full bg-black" 
                      style={{ width: `${(item.progress / item.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-black text-black text-sm">{item.progress}/{item.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6 sm:space-y-8">
            {/* Notifications Panel */}
            <div className="user-dashboard-card p-6 sm:p-8 hover-lift hover-glow animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black uppercase flex items-center space-x-2">
                  <Bell size={24} />
                  <span>Notifications</span>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="neo-yellow px-2 py-1 user-dashboard-border font-black text-black text-xs">
                      {notifications.filter(n => !n.read).length} NEW
                    </span>
                  )}
                </h3>
              </div>

              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div 
                    key={notification.id}
                    className={`user-dashboard-card p-4 hover-scale animate-fade-in-up cursor-pointer ${
                      !notification.read ? 'neo-yellow' : 'bg-white'
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex items-start justify-between space-x-3">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 user-dashboard-border ${
                          notification.type === 'session' ? 'neo-cyan' :
                          notification.type === 'goal' ? 'neo-lime' : 'neo-pink'
                        }`}>
                          {notification.type === 'session' && <Calendar size={16} />}
                          {notification.type === 'goal' && <Target size={16} />}
                          {notification.type === 'product' && <ShoppingCart size={16} />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-black text-black uppercase text-sm">{notification.title}</h4>
                          <p className="font-bold text-black text-sm">{notification.message}</p>
                          <span className="font-bold text-black text-xs opacity-70">{notification.time}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          clearNotification(notification.id)
                        }}
                        className="user-dashboard-border p-1 hover-scale bg-white"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Information */}
            <div className="user-dashboard-card p-6 sm:p-8 hover-lift hover-glow animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                <h3 className="text-sm sm:text-base lg:text-lg font-black text-black uppercase">Profile Information</h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="user-dashboard-button px-4 py-2 hover-lift hover-glow w-full sm:w-auto"
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block font-bold text-black mb-2 uppercase text-xs">Name</label>
                  <input
                    type="text"
                    value={isEditing ? editedProfile.name : (userProfile?.name || '')}
                    onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 user-dashboard-border bg-input-background text-black font-bold focus-expand focus-glow disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black mb-2 uppercase text-xs">Email</label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full px-4 py-3 user-dashboard-border bg-input-background text-black font-bold opacity-50"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black mb-2 uppercase text-xs">Wellness Goals</label>
                  <textarea
                    value={isEditing ? editedProfile.goals : (editedProfile.goals || 'Share your wellness goals and aspirations...')}
                    onChange={(e) => setEditedProfile({...editedProfile, goals: e.target.value})}
                    placeholder="What are your wellness goals?"
                    disabled={!isEditing}
                    className="w-full px-4 py-3 user-dashboard-border bg-input-background text-black font-bold focus-expand focus-glow disabled:opacity-50"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      case 'sessions':
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="neo-card p-6 sm:p-8 hover-lift hover-glow animate-fade-in-up">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black mb-6 uppercase">My Sessions</h3>
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="neo-card p-4 sm:p-6 hover-scale animate-fade-in-up">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                        <div className="flex-1">
                          <h4 className="font-black text-black uppercase">{booking.healer_name}</h4>
                          <p className="font-bold text-black text-sm">{booking.service_type}</p>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <Calendar size={14} className="text-black" />
                              <span className="font-bold text-black text-sm">{booking.date.toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock size={14} className="text-black" />
                              <span className="font-bold text-black text-sm">{booking.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-left lg:text-right flex flex-row lg:flex-col lg:items-end space-x-2 lg:space-x-0 lg:space-y-2">
                          <div className={`px-3 py-1 neo-border font-black text-black uppercase text-xs ${
                            booking.status === 'confirmed' ? 'neo-lime' :
                            booking.status === 'pending' ? 'neo-yellow' :
                            'bg-white'
                          }`}>
                            {booking.status}
                          </div>
                          <div className="font-black text-black neo-yellow px-2 py-1 neo-border text-xs">₹{booking.price}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar size={48} className="mx-auto mb-4 text-black" />
                  <p className="font-bold text-black uppercase">No sessions booked yet</p>
                </div>
              )}
            </div>
          </div>
        )
      case 'earnings':
        return (
          <div className="space-y-6 sm:space-y-8">
            {/* Goal Management Section */}
            <div className="neo-card p-6 sm:p-8 hover-lift hover-glow animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                <h3 className="text-sm sm:text-base lg:text-lg font-black text-black uppercase flex items-center space-x-2">
                  <Target size={24} />
                  <span>Custom Wellness Goals</span>
                </h3>
                <button
                  onClick={() => setShowGoalForm(true)}
                  className="neo-button px-4 py-2 hover-lift hover-glow w-full sm:w-auto flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Add Goal</span>
                </button>
              </div>

              {/* Goal Form */}
              {showGoalForm && (
                <div className="neo-yellow p-6 neo-border mb-6 animate-fade-in-up">
                  <h4 className="font-black text-black uppercase mb-4">
                    {editingGoal ? 'Edit Goal' : 'Create New Goal'}
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block font-bold text-black mb-2 uppercase text-xs">Goal Description</label>
                      <input
                        type="text"
                        value={newGoal.goal}
                        onChange={(e) => setNewGoal({...newGoal, goal: e.target.value})}
                        placeholder="Enter your wellness goal..."
                        className="w-full px-4 py-3 neo-border bg-input-background text-black font-bold focus-expand focus-glow"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-black mb-2 uppercase text-xs">Target</label>
                        <input
                          type="number"
                          min="1"
                          value={newGoal.total}
                          onChange={(e) => setNewGoal({...newGoal, total: parseInt(e.target.value) || 1})}
                          className="w-full px-4 py-3 neo-border bg-input-background text-black font-bold focus-expand focus-glow"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-black mb-2 uppercase text-xs">Category</label>
                        <select
                          value={newGoal.category}
                          onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                          className="w-full px-4 py-3 neo-border bg-input-background text-black font-bold focus-expand focus-glow"
                        >
                          <option value="Personal">Personal</option>
                          <option value="Mindfulness">Mindfulness</option>
                          <option value="Health">Health</option>
                          <option value="Learning">Learning</option>
                          <option value="Exploration">Exploration</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-black mb-2 uppercase text-xs">Color</label>
                        <select
                          value={newGoal.color}
                          onChange={(e) => setNewGoal({...newGoal, color: e.target.value})}
                          className="w-full px-4 py-3 neo-border bg-input-background text-black font-bold focus-expand focus-glow"
                        >
                          <option value="neo-cyan">Cyan</option>
                          <option value="neo-pink">Pink</option>
                          <option value="neo-lime">Lime</option>
                          <option value="neo-orange">Orange</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block font-bold text-black mb-2 uppercase text-xs">Deadline (Optional)</label>
                      <input
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                        className="w-full px-4 py-3 neo-border bg-input-background text-black font-bold focus-expand focus-glow"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                      <button
                        onClick={editingGoal ? saveEditedGoal : addGoal}
                        className="neo-button px-6 py-3 hover-lift hover-glow flex items-center space-x-2"
                      >
                        <Check size={16} />
                        <span>{editingGoal ? 'Save Changes' : 'Create Goal'}</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowGoalForm(false)
                          setEditingGoal(null)
                          setNewGoal({ goal: '', total: 1, category: 'Personal', deadline: '', color: 'neo-cyan' })
                        }}
                        className="neo-border px-6 py-3 bg-white hover-lift hover-glow font-black text-black uppercase"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Goals List */}
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.id} className={`${goal.color} p-4 neo-border hover-scale animate-fade-in-up`}>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-black text-black uppercase block">{goal.goal}</span>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="neo-border px-2 py-1 bg-white font-black text-black uppercase text-xs">
                                {goal.category}
                              </span>
                              {goal.deadline && (
                                <span className="neo-border px-2 py-1 bg-white font-black text-black uppercase text-xs">
                                  Due: {new Date(goal.deadline).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => startEditingGoal(goal)}
                              className="neo-border p-2 bg-white hover-scale"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => deleteGoal(goal.id)}
                              className="neo-border p-2 bg-white hover-scale text-red-600"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateGoalProgress(goal.id, goal.progress - 1)}
                            className="neo-border p-1 bg-white hover-scale"
                            disabled={goal.progress <= 0}
                          >
                            <X size={12} />
                          </button>
                          <div className="w-24 sm:w-32 h-3 bg-white neo-border">
                            <div 
                              className="h-full bg-black transition-all duration-300" 
                              style={{ width: `${(goal.progress / goal.total) * 100}%` }}
                            ></div>
                          </div>
                          <button
                            onClick={() => updateGoalProgress(goal.id, goal.progress + 1)}
                            className="neo-border p-1 bg-white hover-scale"
                            disabled={goal.progress >= goal.total}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-black text-black">{goal.progress}/{goal.total}</span>
                        {goal.progress === goal.total && (
                          <span className="neo-lime px-2 py-1 neo-border font-black text-black uppercase text-xs animate-gentle-bounce">
                            ✓ Complete!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spending Summary */}
            <div className="neo-card p-6 sm:p-8 text-center hover-lift hover-glow animate-fade-in-up">
              <CreditCard size={48} className="mx-auto mb-4 text-black" />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black mb-4 uppercase">Spending & Savings</h3>
              <p className="font-bold text-black mb-6 uppercase">Track your wellness investments and rewards</p>
              <button className="neo-button px-6 py-3 hover-lift hover-glow">
                View Spending History
              </button>
            </div>
          </div>
        )
      case 'wishlist':
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="neo-card p-6 sm:p-8 hover-lift hover-glow animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
                <h3 className="text-sm sm:text-base lg:text-lg font-black text-black uppercase">My Wishlist</h3>
                <button
                  onClick={() => onViewChange && onViewChange('shop')}
                  className="neo-button px-4 py-2 hover-lift hover-glow w-full sm:w-auto flex items-center space-x-2"
                >
                  <ShoppingBag size={16} />
                  <span>Browse Products</span>
                </button>
              </div>
              
              {wishlist.length > 0 ? (
                <div className="space-y-4">
                  {wishlist.map((item) => (
                    <div key={item.id} className="neo-card p-6 hover-scale animate-fade-in-up">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className="w-16 h-16 neo-orange neo-border flex items-center justify-center">
                            <span className="text-2xl animate-gentle-float">🌿</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-black text-black uppercase text-lg">{item.name}</h4>
                            <p className="font-bold text-black uppercase text-sm">{item.description}</p>
                            <p className="font-bold text-black uppercase text-sm opacity-70">{item.category}</p>
                            
                            {/* Rating Display */}
                            <div className="flex items-center space-x-2 mt-2">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={14} 
                                    className={`${i < Math.floor(item.rating) ? 'text-black fill-current' : 'text-gray-400'}`}
                                  />
                                ))}
                              </div>
                              <span className="font-bold text-black uppercase text-xs">
                                {item.rating} ({item.reviews} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-left lg:text-right flex flex-col sm:flex-row lg:flex-col lg:items-end space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-black text-black">₹{item.price}</span>
                            {item.originalPrice && (
                              <>
                                <span className="text-sm font-bold text-black line-through">₹{item.originalPrice}</span>
                                <span className="neo-cyan px-2 py-1 neo-border font-black text-black uppercase text-xs">
                                  {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                                </span>
                              </>
                            )}
                          </div>
                          
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                            <button 
                              onClick={() => addToCart(item)}
                              className="neo-button px-4 py-2 hover-lift hover-glow w-full sm:w-auto flex items-center space-x-2"
                            >
                              <ShoppingCart size={16} />
                              <span>Add to Cart</span>
                            </button>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="neo-border px-4 py-2 bg-white hover-lift hover-scale font-black text-black uppercase w-full sm:w-auto flex items-center space-x-2"
                            >
                              <X size={16} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart size={48} className="mx-auto mb-4 text-black" />
                  <p className="font-bold text-black uppercase mb-4">Your wishlist is empty</p>
                  <button 
                    onClick={() => onViewChange && onViewChange('shop')}
                    className="neo-button px-6 py-3 hover-lift hover-glow"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      case 'settings':
        return (
          <div className="neo-card p-6 sm:p-8 text-center hover-lift hover-glow animate-fade-in-up">
            <Settings size={48} className="mx-auto mb-4 text-black" />
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black mb-4 uppercase">Account Settings</h3>
            <p className="font-bold text-black mb-6 uppercase">Configure notifications and account preferences</p>
            <button className="neo-button px-6 py-3 hover-lift hover-glow">
              Manage Settings
            </button>
          </div>
        )
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-black mb-4 sm:mb-6 uppercase transform -skew-x-2 text-hover-glow animate-soft-pulse leading-tight">
            My Dashboard
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-bold text-black uppercase animate-fade-in-up">
            Manage your wellness journey and track your progress
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="neo-card p-4 sm:p-6 hover-lift hover-glow animate-fade-in-up">
              <h3 className="text-lg sm:text-xl font-black text-black mb-4 sm:mb-6 uppercase">Navigation</h3>
              
              {/* Overview Button */}
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 p-3 sm:p-4 mb-2 transition-all font-black text-black uppercase neo-border hover-lift hover-glow ${
                  activeTab === 'overview'
                    ? 'neo-pink'
                    : 'bg-white hover:neo-yellow'
                }`}
              >
                <BarChart3 size={20} />
                <span>Overview</span>
              </button>

              {/* Vertical Navigation Items */}
              <div className="space-y-2">
                {tabs.map(tab => {
                  const IconComponent = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 p-3 sm:p-4 transition-all font-black text-black uppercase neo-border hover-lift hover-glow ${
                        activeTab === tab.id
                          ? 'neo-pink'
                          : 'bg-white hover:neo-yellow'
                      }`}
                    >
                      <IconComponent size={20} />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {activeTab === 'overview' ? renderOverview() : renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}