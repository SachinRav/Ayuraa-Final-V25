import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, Upload, Check, Star, Clock, DollarSign, Heart, User, FileText, Calendar, MapPin } from 'lucide-react'
import { supabase } from '../utils/supabase/client'
import { projectId, publicAnonKey } from '../utils/supabase/info'

interface HealerRegistrationProps {
  user: any
  onComplete: (healerData: any) => void
}

export function HealerRegistration({ user, onComplete }: HealerRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    phone: '',
    location: '',
    bio: '',
    
    // Professional Info
    categories: [],
    specialties: [],
    certifications: [],
    experience: '',
    
    // Services & Pricing
    sessionTypes: [],
    pricing: {
      individual: '',
      group: '',
      consultation: ''
    },
    sessionDuration: '60',
    
    // Availability
    availability: [],
    timezone: 'EST',
    
    // Additional
    languages: ['English'],
    approach: '',
    credentials: []
  })

  const healerCategories = [
    {
      id: 'manifestation',
      label: 'Manifestation & Mindfulness',
      icon: '✨',
      subcategories: ['Manifestation Coaches', 'Spiritual Life Coaches', 'Sound Healing Practitioners', 'Pranic Healers', 'Crystal Healing Experts', 'Somatic Healers']
    },
    {
      id: 'body-mind',
      label: 'Body-Mind Therapists',
      icon: '🧘‍♀️',
      subcategories: ['Breathwork Coaches', 'Meditation & Yoga Nidra Instructors', 'EFT / Tapping Practitioners']
    },
    {
      id: 'root-cause',
      label: 'Root-Cause & Gut-Focused',
      icon: '🍀',
      subcategories: ['Ayurvedic Healers', 'Naturopathy Experts', 'Gut Health Coaches', 'Functional Medicine Coaches']
    },
    {
      id: 'energy-healing',
      label: 'Modern Energy Healing',
      icon: '🧬',
      subcategories: ['Akashic Record Readers', 'Theta Healers', 'Psych-K Facilitators', 'Quantum Healers']
    },
    {
      id: 'emerging',
      label: 'Emerging Specialties',
      icon: '✨',
      subcategories: ['Womb Healing Coaches', 'Feminine Embodiment & Tantra Coaches', 'Sleep Therapists', 'Astro-Healers', 'Subconscious Healing + NLP Practitioners']
    }
  ]

  const steps = [
    { id: 'personal', title: 'Personal Information', icon: User },
    { id: 'professional', title: 'Professional Background', icon: FileText },
    { id: 'services', title: 'Services & Pricing', icon: DollarSign },
    { id: 'availability', title: 'Availability', icon: Calendar },
    { id: 'review', title: 'Review & Submit', icon: Check }
  ]

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleArrayToggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Format pricing data for display
      const formattedPricing = `₹${formData.pricing.individual || '2500'}/session`;

      // Prepare healer data to pass to parent component
      const healerData = {
        bio: formData.bio,
        specialties: [...formData.categories, ...formData.specialties].filter(Boolean),
        experience: formData.experience || '3-5 years',
        pricing: formattedPricing,
        location: formData.location,
        phone: formData.phone,
        approach: formData.approach,
        certifications: formData.certifications,
        sessionTypes: formData.sessionTypes,
        availability: formData.availability,
        timezone: formData.timezone,
        languages: formData.languages,
        sessionDuration: formData.sessionDuration
      };

      // Call the completion handler with the healer data
      onComplete(healerData);
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-black mb-4 uppercase">Personal Information</h2>
        <p className="font-bold text-black uppercase">Tell us about yourself and your healing journey</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block font-bold text-black mb-2 uppercase">Full Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-4 py-3 neo-border bg-input-background text-black font-bold focus-expand focus-glow"
            placeholder="Your full name"
            required
          />
        </div>

        <div>
          <label className="block font-bold text-black mb-2 uppercase">Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-3 neo-border bg-input-background text-black font-bold focus-expand focus-glow"
            placeholder="Your phone number"
            required
          />
        </div>

        <div>
          <label className="block font-bold text-black mb-2 uppercase">Location *</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 neo-border bg-input-background text-black font-bold focus-expand focus-glow"
              placeholder="City, State/Country"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-black mb-2 uppercase">Years of Experience</label>
          <select
            value={formData.experience}
            onChange={(e) => handleInputChange('experience', e.target.value)}
            className="w-full px-4 py-3 neo-border bg-input-background text-black font-bold focus-expand focus-glow"
          >
            <option value="">Select experience</option>
            <option value="1-2">1-2 years</option>
            <option value="3-5">3-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block font-bold text-black mb-2 uppercase">Bio & Healing Philosophy *</label>
        <textarea
          value={formData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          className="w-full px-4 py-3 neo-border bg-input-background text-black font-bold focus-expand focus-glow"
          rows={4}
          placeholder="Share your story, healing philosophy, and what makes your approach unique..."
          required
        />
        <div className="font-bold text-black mt-1">{formData.bio.length}/500 characters</div>
      </div>
    </div>
  )

  const renderProfessionalInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Background</h2>
        <p className="text-gray-600">Select your healing modalities and specialties</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Healing Categories *</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {healerCategories.map(category => (
            <div key={category.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{category.label}</h4>
                </div>
              </div>
              <div className="space-y-2">
                {category.subcategories.map(sub => (
                  <label key={sub} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(sub)}
                      onChange={() => handleArrayToggle('categories', sub)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{sub}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Specific Specialties</label>
        <input
          type="text"
          value={formData.specialties.join(', ')}
          onChange={(e) => handleInputChange('specialties', e.target.value.split(', ').filter(Boolean))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="e.g., Reiki, Chakra Balancing, Distance Healing (comma separated)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Certifications & Training</label>
        <textarea
          value={formData.certifications.join('\n')}
          onChange={(e) => handleInputChange('certifications', e.target.value.split('\n').filter(Boolean))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={3}
          placeholder="List your certifications, trainings, and credentials (one per line)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Healing Approach</label>
        <textarea
          value={formData.approach}
          onChange={(e) => handleInputChange('approach', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={3}
          placeholder="Describe your unique approach to healing and what clients can expect..."
        />
      </div>
    </div>
  )

  const renderServicesAndPricing = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Services & Pricing</h2>
        <p className="text-gray-600">Configure your session types and pricing structure</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Session Types Offered *</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'individual', label: '1-on-1 Sessions', icon: User },
            { id: 'group', label: 'Group Sessions', icon: Heart },
            { id: 'consultation', label: 'Consultations', icon: FileText }
          ].map(type => {
            const IconComponent = type.icon
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => handleArrayToggle('sessionTypes', type.id)}
                className={`p-4 rounded-lg border-2 text-center transition-all ${
                  formData.sessionTypes.includes(type.id)
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300 text-gray-700'
                }`}
              >
                <IconComponent size={24} className="mx-auto mb-2" />
                <div className="text-sm font-medium">{type.label}</div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Individual Session Price ($)</label>
          <div className="relative">
            <DollarSign size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={formData.pricing.individual}
              onChange={(e) => handleInputChange('pricing.individual', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="80"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Group Session Price ($)</label>
          <div className="relative">
            <DollarSign size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={formData.pricing.group}
              onChange={(e) => handleInputChange('pricing.group', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Price ($)</label>
          <div className="relative">
            <DollarSign size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={formData.pricing.consultation}
              onChange={(e) => handleInputChange('pricing.consultation', e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="120"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Session Duration (minutes)</label>
        <select
          value={formData.sessionDuration}
          onChange={(e) => handleInputChange('sessionDuration', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="30">30 minutes</option>
          <option value="60">60 minutes</option>
          <option value="90">90 minutes</option>
          <option value="120">120 minutes</option>
        </select>
      </div>
    </div>
  )

  const renderAvailability = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Availability</h2>
        <p className="text-gray-600">Set your availability and preferences</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Available Days *</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
            <button
              key={day}
              type="button"
              onClick={() => handleArrayToggle('availability', day)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                formData.availability.includes(day)
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-purple-300 text-gray-700'
              }`}
            >
              <div className="font-medium">{day}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
        <select
          value={formData.timezone}
          onChange={(e) => handleInputChange('timezone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="EST">Eastern Time (EST)</option>
          <option value="CST">Central Time (CST)</option>
          <option value="MST">Mountain Time (MST)</option>
          <option value="PST">Pacific Time (PST)</option>
          <option value="GMT">Greenwich Mean Time (GMT)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Languages Spoken</label>
        <input
          type="text"
          value={formData.languages.join(', ')}
          onChange={(e) => handleInputChange('languages', e.target.value.split(', ').filter(Boolean))}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="e.g., English, Spanish, French"
        />
      </div>
    </div>
  )

  const renderReview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
        <p className="text-gray-600">Review your information before submitting for approval</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Location:</strong> {formData.location}</p>
            <p><strong>Experience:</strong> {formData.experience}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Categories & Specialties</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.categories.map(cat => (
              <span key={cat} className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Pricing</h4>
          <div className="text-sm text-gray-600">
            <p>Individual: ${formData.pricing.individual} | Group: ${formData.pricing.group} | Consultation: ${formData.pricing.consultation}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Availability</h4>
          <div className="flex flex-wrap gap-2">
            {formData.availability.map(day => (
              <span key={day} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Your application will be reviewed by our team</li>
          <li>• We'll verify your credentials and experience</li>
          <li>• You'll receive approval notification within 3-5 business days</li>
          <li>• Once approved, your profile will go live on the platform</li>
        </ul>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderPersonalInfo()
      case 1: return renderProfessionalInfo()
      case 2: return renderServicesAndPricing()
      case 3: return renderAvailability()
      case 4: return renderReview()
      default: return renderPersonalInfo()
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.name && formData.phone && formData.location && formData.bio
      case 1: return formData.categories.length > 0
      case 2: return formData.sessionTypes.length > 0 && formData.pricing.individual
      case 3: return formData.availability.length > 0
      case 4: return true
      default: return false
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-black mb-4 sm:mb-6 uppercase transform -skew-x-2 text-hover-glow animate-soft-pulse leading-tight">
            Healer Registration
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-bold text-black uppercase animate-fade-in-up">
            Join our verified healing community
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-6 sm:mb-8 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <React.Fragment key={step.id}>
                  <div className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 neo-border hover-scale transition-all ${
                    index <= currentStep 
                      ? 'neo-pink text-black' 
                      : 'bg-white text-black'
                  }`}>
                    <IconComponent size={16} />
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-6 sm:w-12 h-1 neo-border transition-all ${
                      index < currentStep ? 'neo-pink' : 'bg-white'
                    }`} />
                  )}
                </React.Fragment>
              )
            })}
          </div>
          <div className="text-center">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-black uppercase mb-2">
              {steps[currentStep].title}
            </h3>
            <p className="font-bold text-black uppercase text-sm sm:text-base">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="neo-card p-6 sm:p-8 mb-6 sm:mb-8 hover-lift hover-glow animate-fade-in-up">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="neo-button px-6 py-3 hover-lift hover-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            <ChevronLeft size={18} />
            <span>Previous</span>
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
              className="neo-button px-6 py-3 hover-lift hover-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || isLoading}
              className="neo-button px-8 py-3 hover-lift hover-glow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Check size={18} />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}