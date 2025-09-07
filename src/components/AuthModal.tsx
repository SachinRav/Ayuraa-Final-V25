import React, { useState } from 'react'
import { X, Eye, EyeOff, User, Heart, Mail, Lock, UserPlus, Zap } from 'lucide-react'

interface AuthModalProps {
  onClose: () => void
  onSignIn: (email: string, password: string) => Promise<void>
  onSignUp: (email: string, password: string, name: string, role: string) => Promise<void>
}

export function AuthModal({ onClose, onSignIn, onSignUp }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'user'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Check if terms are agreed to
      if (!agreedToTerms) {
        throw new Error('YOU MUST AGREE TO THE PRIVACY TERMS & CONDITIONS!')
      }

      if (mode === 'signin') {
        await onSignIn(formData.email, formData.password)
      } else {
        if (!formData.name.trim()) {
          throw new Error('NAME IS REQUIRED!')
        }
        await onSignUp(formData.email, formData.password, formData.name, formData.role)
      }
    } catch (err: any) {
      setError(err.message || 'AN ERROR OCCURRED!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError('')
  }

  const handleModeChange = (newMode: 'signin' | 'signup') => {
    setMode(newMode)
    setError('')
    setAgreedToTerms(false) // Reset terms agreement when switching modes
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-md transition-all duration-300" 
          onClick={onClose}
        ></div>
        
        <div className="relative bg-white neo-border neo-shadow-xl max-w-sm w-full overflow-hidden animate-fade-in-up rounded-2xl">
          {/* Header */}
          <div className="neo-pink text-white p-6 text-center relative rounded-t-2xl">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 neo-orange p-2 neo-border text-black hover:scale-110 transition-transform rounded-xl"
            >
              <X size={16} />
            </button>
            
            <div className="w-16 h-16 neo-yellow neo-border flex items-center justify-center mx-auto mb-4 rounded-2xl">
              <div className="w-10 h-10 neo-cyan neo-border flex items-center justify-center rounded-xl">
                <span className="font-black text-black text-lg">A</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-black mb-3 uppercase">
              {mode === 'signin' ? 'WELCOME BACK!' : 'JOIN AYURAA!'}
            </h2>
            <p className="font-bold uppercase text-sm">
              {mode === 'signin' 
                ? 'CONTINUE YOUR HEALING JOURNEY!'
                : 'START YOUR WELLNESS TRANSFORMATION!'
              }
            </p>
          </div>

          <div className="p-6">
            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => handleModeChange('signin')}
                className={`flex-1 py-3 px-4 neo-border font-black uppercase transition-all rounded-xl ${
                  mode === 'signin'
                    ? 'neo-yellow neo-shadow text-black'
                    : 'bg-white text-black hover:neo-cyan hover:neo-shadow'
                }`}
              >
                SIGN IN
              </button>
              <button
                type="button"
                onClick={() => handleModeChange('signup')}
                className={`flex-1 py-3 px-4 neo-border font-black uppercase transition-all rounded-xl ${
                  mode === 'signup'
                    ? 'neo-yellow neo-shadow text-black'
                    : 'bg-white text-black hover:neo-cyan hover:neo-shadow'
                }`}
              >
                SIGN UP
              </button>
            </div>

            {error && (
              <div className="neo-orange p-3 neo-border neo-shadow mb-4 rounded-xl">
                <div className="font-black text-black uppercase text-xs">{error}</div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block font-black text-black mb-2 uppercase text-xs">FULL NAME</label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all rounded-xl text-xs"
                      placeholder="ENTER YOUR FULL NAME"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-black text-black mb-2 uppercase text-xs">EMAIL ADDRESS</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all rounded-xl text-xs"
                    placeholder="ENTER YOUR EMAIL"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-black text-black mb-2 uppercase text-xs">PASSWORD</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-white neo-border font-bold text-black placeholder-gray-500 uppercase focus:neo-yellow focus:neo-shadow-lg transition-all rounded-xl text-xs"
                    placeholder="ENTER YOUR PASSWORD"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:scale-110 transition-transform"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div>
                  <label className="block font-black text-black mb-3 uppercase text-xs">I WANT TO:</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleInputChange('role', 'user')}
                      className={`p-4 neo-border text-center transition-all rounded-xl ${
                        formData.role === 'user'
                          ? 'neo-lime neo-shadow-lg'
                          : 'bg-white hover:neo-cyan hover:neo-shadow'
                      }`}
                    >
                      <User size={20} className="mx-auto mb-2 text-black" />
                      <div className="font-black text-black uppercase text-xs">FIND HEALERS</div>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => handleInputChange('role', 'healer')}
                      className={`p-4 neo-border text-center transition-all rounded-xl ${
                        formData.role === 'healer'
                          ? 'neo-lime neo-shadow-lg'
                          : 'bg-white hover:neo-cyan hover:neo-shadow'
                      }`}
                    >
                      <Heart size={20} className="mx-auto mb-2 text-black" />
                      <div className="font-black text-black uppercase text-xs">OFFER HEALING</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Privacy Terms & Conditions Checkbox */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 neo-border rounded-xl bg-gray-50">
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked)
                      if (error && e.target.checked) setError('')
                    }}
                    className="w-4 h-4 mt-1 neo-border rounded accent-black focus:ring-2 focus:ring-neo-yellow"
                    required
                  />
                  <label htmlFor="terms-checkbox" className="flex-1 cursor-pointer">
                    <span className="font-black text-black uppercase text-xs leading-relaxed">
                      I AGREE TO THE{' '}
                      <button
                        type="button"
                        className="underline hover:no-underline text-black font-black"
                        onClick={() => {
                          // Open privacy policy in new tab
                          window.open('#', '_blank')
                        }}
                      >
                        PRIVACY POLICY
                      </button>
                      {' '}AND{' '}
                      <button
                        type="button"
                        className="underline hover:no-underline text-black font-black"
                        onClick={() => {
                          // Open terms in new tab
                          window.open('#', '_blank')
                        }}
                      >
                        TERMS & CONDITIONS
                      </button>
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full neo-button py-4 flex items-center justify-center space-x-2 disabled:opacity-50 transform hover:scale-105 transition-transform rounded-xl"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin rounded-full"></div>
                ) : (
                  <>
                    {mode === 'signin' ? <Zap size={16} /> : <UserPlus size={16} />}
                    <span className="text-base">{mode === 'signin' ? 'SIGN IN NOW!' : 'CREATE ACCOUNT!'}</span>
                  </>
                )}
              </button>
            </form>

            {mode === 'signin' && (
              <div className="text-center mt-4">
                <button className="neo-orange px-4 py-2 neo-border neo-shadow font-black text-black uppercase text-xs hover:transform hover:translate-x-1 hover:translate-y-1 transition-transform rounded-xl">
                  FORGOT PASSWORD?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}