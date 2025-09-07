import React, { useState } from 'react'
import { X, Calendar, Clock, DollarSign, User, MessageCircle, Zap } from 'lucide-react'
import { supabase } from '../utils/supabase/client'
import { projectId, publicAnonKey } from '../utils/supabase/info'

interface BookingModalProps {
  healer: any
  user: any
  onClose: () => void
}

export function BookingModal({ healer, user, onClose }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const availableDates = [
    '2024-12-15',
    '2024-12-16', 
    '2024-12-17',
    '2024-12-18',
    '2024-12-19'
  ]

  const availableTimes = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM'
  ]

  const handleBookSession = async () => {
    if (!selectedDate || !selectedTime) {
      alert('PLEASE SELECT BOTH DATE AND TIME!')
      return
    }

    setIsLoading(true)

    try {
      // Get current session token
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.access_token) {
        throw new Error('NO VALID SESSION FOUND!')
      }

      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-743d6953/book`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          healer_id: healer.id,
          healer_name: healer.name,
          service_type: healer.specialties?.[0] || 'Healing Session',
          date: selectedDate,
          time: selectedTime,
          price: healer.price,
          message
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        alert('SESSION BOOKED SUCCESSFULLY!')
        onClose()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('FAILED TO BOOK SESSION. PLEASE TRY AGAIN!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="absolute inset-0 bg-black bg-opacity-70" onClick={onClose}></div>
        
        <div className="relative bg-white neo-border neo-shadow-xl max-w-2xl w-full overflow-hidden transform -rotate-1">
          {/* Header */}
          <div className="neo-pink text-white p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 neo-orange p-2 neo-border text-black hover:scale-110 transition-transform"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 neo-yellow neo-border flex items-center justify-center transform rotate-12">
                <span className="text-3xl font-black text-black transform -rotate-12">{healer.name?.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase">{healer.name}</h2>
                <p className="font-bold uppercase text-lg">{healer.specialties?.[0] || 'HEALING PRACTITIONER'}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Session Details */}
            <div className="neo-cyan p-6 neo-border neo-shadow mb-8 transform rotate-1">
              <h3 className="font-black text-black mb-4 uppercase text-xl">SESSION DETAILS</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <Clock size={20} className="text-black" />
                  <span className="font-bold text-black uppercase">60 MINUTES</span>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign size={20} className="text-black" />
                  <span className="font-bold text-black uppercase">${healer.price}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <User size={20} className="text-black" />
                  <span className="font-bold text-black uppercase">1-ON-1</span>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-8">
              <h4 className="font-black text-black mb-4 uppercase text-xl">SELECT DATE</h4>
              <div className="grid grid-cols-5 gap-3">
                {availableDates.map((date, index) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`p-4 neo-border font-black uppercase text-sm transition-all transform ${
                      selectedDate === date
                        ? 'neo-yellow neo-shadow-lg rotate-2'
                        : 'bg-white hover:neo-lime hover:neo-shadow hover:-rotate-1'
                    } ${index % 2 === 1 ? 'rotate-1' : '-rotate-1'}`}
                  >
                    {new Date(date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    }).toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-8">
              <h4 className="font-black text-black mb-4 uppercase text-xl">SELECT TIME</h4>
              <div className="grid grid-cols-3 gap-3">
                {availableTimes.map((time, index) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-4 neo-border font-black uppercase text-sm transition-all transform ${
                      selectedTime === time
                        ? 'neo-orange neo-shadow-lg rotate-2'
                        : 'bg-white hover:neo-cyan hover:neo-shadow hover:rotate-1'
                    } ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <h4 className="font-black text-black mb-4 uppercase text-xl">MESSAGE (OPTIONAL)</h4>
              <div className="relative">
                <MessageCircle size={20} className="absolute left-4 top-4 text-black" />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="TELL THE HEALER ABOUT YOUR GOALS OR CONCERNS..."
                  className="w-full pl-12 pr-4 py-4 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all resize-none"
                  rows={4}
                />
              </div>
            </div>

            {/* Total */}
            <div className="neo-lime p-6 neo-border neo-shadow mb-8 transform -rotate-1">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-black uppercase">TOTAL AMOUNT</span>
                <span className="text-4xl font-black text-black">${healer.price}</span>
              </div>
              <p className="font-bold text-black mt-2 uppercase">
                PAYMENT PROCESSED AFTER SESSION COMPLETION!
              </p>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBookSession}
              disabled={isLoading || !selectedDate || !selectedTime}
              className="w-full neo-button py-6 flex items-center justify-center space-x-3 disabled:opacity-50 transform hover:scale-105 transition-transform mb-4"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-black border-t-transparent animate-spin"></div>
              ) : (
                <>
                  <Calendar size={24} />
                  <span className="text-xl">BOOK SESSION NOW!</span>
                  <Zap size={24} />
                </>
              )}
            </button>

            <div className="neo-orange p-4 neo-border text-center transform rotate-1">
              <p className="font-black text-black uppercase text-sm">
                CANCEL OR RESCHEDULE UP TO 24 HOURS BEFORE SESSION!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}