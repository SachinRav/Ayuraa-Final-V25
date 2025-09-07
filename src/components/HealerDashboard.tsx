import React, { useState } from 'react'
import { DollarSign, Calendar, Users, Star, Settings, Plus, CreditCard, FileText, BarChart3 } from 'lucide-react'

interface HealerDashboardProps {
  user: any
  userProfile: any
}

export function HealerDashboard({ user, userProfile }: HealerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'profile', label: 'Profile', icon: Settings },
    { id: 'sessions', label: 'Sessions', icon: FileText },
    { id: 'earnings', label: 'Earnings', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: BarChart3 }
  ]

  const renderOverview = () => (
    <div className="space-y-6 sm:space-y-8">
      <div className="healer-dashboard-card p-6 sm:p-8 hover-lift hover-glow animate-fade-in-up">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black mb-4 uppercase">Welcome, {userProfile?.name || 'Healer'}!</h3>
        <p className="font-bold text-black uppercase text-sm">Manage your healing practice and help others on their wellness journey.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="healer-dashboard-card p-4 sm:p-6 hover-lift hover-glow animate-fade-in-up stagger-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 neo-pink healer-dashboard-border flex items-center justify-center">
              <DollarSign size={20} className="text-black" />
            </div>
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl font-black text-black">₹1,240</div>
              <div className="font-bold text-black uppercase text-xs">This Month</div>
            </div>
          </div>
        </div>

        <div className="healer-dashboard-card p-4 sm:p-6 hover-lift hover-glow animate-fade-in-up stagger-2">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 neo-cyan healer-dashboard-border flex items-center justify-center">
              <Calendar size={20} className="text-black" />
            </div>
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl font-black text-black">12</div>
              <div className="font-bold text-black uppercase text-xs">Sessions</div>
            </div>
          </div>
        </div>

        <div className="healer-dashboard-card p-4 sm:p-6 hover-lift hover-glow animate-fade-in-up stagger-3">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 neo-lime healer-dashboard-border flex items-center justify-center">
              <Users size={20} className="text-black" />
            </div>
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl font-black text-black">8</div>
              <div className="font-bold text-black uppercase text-xs">Active Clients</div>
            </div>
          </div>
        </div>

        <div className="healer-dashboard-card p-4 sm:p-6 hover-lift hover-glow animate-fade-in-up stagger-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 neo-yellow healer-dashboard-border flex items-center justify-center">
              <Star size={20} className="text-black" />
            </div>
            <div>
              <div className="text-lg sm:text-xl lg:text-2xl font-black text-black">4.9</div>
              <div className="font-bold text-black uppercase text-xs">Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="healer-dashboard-card p-6 sm:p-8 hover-lift hover-glow animate-fade-in-up">
        <h4 className="text-sm sm:text-base lg:text-lg font-black text-black mb-4 sm:mb-6 uppercase">Recent Bookings</h4>
        <div className="space-y-3 sm:space-y-4">
          {[
            { name: 'Sarah Johnson', service: 'Reiki Healing Session', time: 'Today 2:00 PM IST', amount: '₹2,500' },
            { name: 'Michael Chen', service: 'Energy Healing', time: 'Tomorrow 10:00 AM IST', amount: '₹3,000' },
            { name: 'Emma Wilson', service: 'Chakra Balancing', time: 'Dec 15, 3:00 PM IST', amount: '₹2,200' }
          ].map((booking, i) => (
            <div key={i} className="healer-dashboard-card p-4 hover-scale animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div>
                  <div className="font-black text-black uppercase text-sm">{booking.name}</div>
                  <div className="font-bold text-black text-sm">{booking.service}</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="font-bold text-black text-sm">{booking.time}</div>
                  <div className="font-black text-black neo-yellow px-2 py-1 healer-dashboard-border inline-block text-xs">{booking.amount}</div>
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
      case 'calendar':
        return (
          <div className="healer-dashboard-card p-6 sm:p-8 text-center hover-lift hover-glow animate-fade-in-up">
            <Calendar size={48} className="mx-auto mb-4 text-black" />
            <h3 className="text-sm sm:text-base lg:text-lg font-black text-black mb-4 uppercase">Calendar Management</h3>
            <p className="font-bold text-black mb-6 uppercase text-sm">Set your availability and manage appointments</p>
            <button className="healer-dashboard-button px-6 py-3 hover-lift hover-glow">
              Configure Calendar
            </button>
          </div>
        )
      case 'clients':
        return (
          <div className="healer-dashboard-card p-6 sm:p-8 text-center hover-lift hover-glow animate-fade-in-up">
            <Users size={48} className="mx-auto mb-4 text-black" />
            <h3 className="text-sm sm:text-base lg:text-lg font-black text-black mb-4 uppercase">Client Management</h3>
            <p className="font-bold text-black mb-6 uppercase text-sm">View and manage your client relationships</p>
            <button className="healer-dashboard-button px-6 py-3 hover-lift hover-glow">
              Manage Clients
            </button>
          </div>
        )
      case 'profile':
        return (
          <div className="healer-dashboard-card p-6 sm:p-8 text-center hover-lift hover-glow animate-fade-in-up">
            <Settings size={48} className="mx-auto mb-4 text-black" />
            <h3 className="text-sm sm:text-base lg:text-lg font-black text-black mb-4 uppercase">Profile Settings</h3>
            <p className="font-bold text-black mb-6 uppercase text-sm">Update your healer profile and services</p>
            <button className="healer-dashboard-button px-6 py-3 hover-lift hover-glow">
              Edit Profile
            </button>
          </div>
        )
      case 'sessions':
        return (
          <div className="healer-dashboard-card p-6 sm:p-8 text-center hover-lift hover-glow animate-fade-in-up">
            <FileText size={48} className="mx-auto mb-4 text-black" />
            <h3 className="text-sm sm:text-base lg:text-lg font-black text-black mb-4 uppercase">Session Management</h3>
            <p className="font-bold text-black mb-6 uppercase text-sm">Track and manage your healing sessions</p>
            <button className="healer-dashboard-button px-6 py-3 hover-lift hover-glow">
              View Sessions
            </button>
          </div>
        )
      case 'earnings':
        return (
          <div className="healer-dashboard-card p-6 sm:p-8 text-center hover-lift hover-glow animate-fade-in-up">
            <CreditCard size={48} className="mx-auto mb-4 text-black" />
            <h3 className="text-sm sm:text-base lg:text-lg font-black text-black mb-4 uppercase">Earnings & Payouts</h3>
            <p className="font-bold text-black mb-6 uppercase text-sm">Monitor your income and payment history</p>
            <button className="healer-dashboard-button px-6 py-3 hover-lift hover-glow">
              View Earnings
            </button>
          </div>
        )
      case 'settings':
        return (
          <div className="healer-dashboard-card p-6 sm:p-8 text-center hover-lift hover-glow animate-fade-in-up">
            <BarChart3 size={48} className="mx-auto mb-4 text-black" />
            <h3 className="text-sm sm:text-base lg:text-lg font-black text-black mb-4 uppercase">Account Settings</h3>
            <p className="font-bold text-black mb-6 uppercase text-sm">Configure notifications and account preferences</p>
            <button className="healer-dashboard-button px-6 py-3 hover-lift hover-glow">
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
            Healer Dashboard
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-bold text-black uppercase animate-fade-in-up">
            Manage your healing practice and connect with clients
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="healer-dashboard-card p-4 sm:p-6 hover-lift hover-glow animate-fade-in-up">
              <h3 className="text-lg sm:text-xl font-black text-black mb-4 sm:mb-6 uppercase">Navigation</h3>
              
              {/* Overview Button */}
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 p-3 sm:p-4 mb-2 transition-all font-black text-black uppercase healer-dashboard-border hover-lift hover-glow ${
                  activeTab === 'overview'
                    ? 'neo-pink'
                    : 'bg-white hover:neo-yellow'
                }`}
              >
                <DollarSign size={20} />
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
                      className={`w-full flex items-center space-x-3 p-3 sm:p-4 transition-all font-black text-black uppercase healer-dashboard-border hover-lift hover-glow ${
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