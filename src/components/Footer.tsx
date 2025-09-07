import React from 'react'
import { Heart, Shield, Phone, Mail, MapPin, Clock, Star, Users } from 'lucide-react'

interface FooterProps {
  onViewChange: (view: string) => void
}

export function Footer({ onViewChange }: FooterProps) {
  return (
    <footer className="bg-black text-white border-t-3 border-black mt-12 sm:mt-16 lg:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Crisis Support Banner */}
        <div className="neo-pink p-4 sm:p-6 neo-border mb-8 sm:mb-12 text-center hover-glow animate-subtle-glow">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3">
            <Heart className="w-5 sm:w-6 h-5 sm:h-6 text-black animate-soft-pulse" />
            <h3 className="text-black font-black text-lg sm:text-xl uppercase">Need Immediate Support?</h3>
            <Heart className="w-5 sm:w-6 h-5 sm:h-6 text-black animate-soft-pulse" />
          </div>
          <p className="text-black font-bold mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
            If you're in crisis or experiencing thoughts of self-harm, please reach out immediately:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-black" />
              <span className="text-black font-bold text-sm sm:text-base">Crisis Helpline: 1-800-HEAL-NOW</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-black" />
              <span className="text-black font-bold text-sm sm:text-base">Available 24/7</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase mb-3 sm:mb-4 text-hover-glow animate-soft-pulse">
                AYURAA
              </h2>
              <p className="text-white font-bold mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                Your trusted companion on the journey to healing, wellness, and inner peace. 
                We believe everyone deserves access to compassionate, professional healing support.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-white flex-shrink-0" />
                <span className="text-white font-bold text-xs sm:text-sm">100% Confidential & Secure</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 sm:w-5 h-4 sm:h-5 text-white flex-shrink-0" />
                <span className="text-white font-bold text-xs sm:text-sm">10,000+ Lives Transformed</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 sm:w-5 h-4 sm:h-5 text-white flex-shrink-0" />
                <span className="text-white font-bold text-xs sm:text-sm">Verified Healing Professionals</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-3 sm:w-4 h-3 sm:h-4 text-white flex-shrink-0" />
                <span className="text-white font-bold text-xs sm:text-sm">support@ayuraa.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 sm:w-4 h-3 sm:h-4 text-white flex-shrink-0" />
                <span className="text-white font-bold text-xs sm:text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-white flex-shrink-0" />
                <span className="text-white font-bold text-xs sm:text-sm">Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Healing Services */}
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white uppercase mb-4 sm:mb-6 text-hover-glow">
              Healing Services
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                'Mental Health Counseling',
                'Spiritual Healing',
                'Energy Healing',
                'Meditation Guidance',
                'Trauma Recovery',
                'Relationship Healing',
                'Addiction Support',
                'Grief Counseling'
              ].map((service, index) => (
                <button
                  key={index}
                  onClick={() => onViewChange('services')}
                  className="block text-white font-bold hover:text-yellow-400 transition-colors text-left hover-slide text-sm sm:text-base min-h-[44px] sm:min-h-auto py-1"
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Support & Resources */}
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white uppercase mb-4 sm:mb-6 text-hover-glow">
              Support & Resources
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                { text: 'Healing Library', view: 'resources' },
                { text: 'Wellness Shop', view: 'shop' },
                { text: 'Community Support', view: 'community' },
                { text: 'Self-Care Tools', view: 'resources' },
                { text: 'FAQs', view: 'faqs' },
                { text: 'Contact Support', view: 'contact' },
                { text: 'Crisis Resources', view: 'contact' },
                { text: 'Privacy & Safety', view: 'contact' }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => onViewChange(item.view)}
                  className="block text-white font-bold hover:text-cyan-400 transition-colors text-left hover-slide text-sm sm:text-base min-h-[44px] sm:min-h-auto py-1"
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>

          {/* For Healers */}
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white uppercase mb-4 sm:mb-6 text-hover-glow">
              For Healers
            </h3>
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              {[
                'Join Our Community',
                'Healer Resources',
                'Certification Support',
                'Professional Development',
                'Practice Management',
                'Client Matching',
                'Payment Processing',
                'Healer Support'
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => onViewChange('healer-registration')}
                  className="block text-white font-bold hover:text-pink-400 transition-colors text-left hover-slide text-sm sm:text-base min-h-[44px] sm:min-h-auto py-1"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Healer CTA */}
            <div className="neo-lime p-3 sm:p-4 neo-border hover-scale hover-glow">
              <p className="text-black font-bold text-xs sm:text-sm mb-2 sm:mb-3">
                Ready to share your healing gifts?
              </p>
              <button
                onClick={() => onViewChange('healer-registration')}
                className="neo-orange px-3 sm:px-4 py-2 neo-border hover-lift font-black uppercase text-xs sm:text-sm w-full min-h-[44px]"
              >
                Become a Healer
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <p className="text-white font-bold text-xs sm:text-sm text-center md:text-left">
                © 2025 Ayuraa. Healing hearts, transforming lives.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <button className="text-white font-bold hover:text-yellow-400 transition-colors text-xs sm:text-sm hover-scale min-h-[44px] sm:min-h-auto">
                Privacy Policy
              </button>
              <button className="text-white font-bold hover:text-cyan-400 transition-colors text-xs sm:text-sm hover-scale min-h-[44px] sm:min-h-auto">
                Terms of Service
              </button>
              <button className="text-white font-bold hover:text-pink-400 transition-colors text-xs sm:text-sm hover-scale min-h-[44px] sm:min-h-auto">
                Code of Ethics
              </button>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-800 border border-gray-600">
            <p className="text-gray-300 font-bold text-xs text-center leading-relaxed">
              <strong>Disclaimer:</strong> Ayuraa provides complementary healing services and should not replace 
              professional medical treatment. Always consult healthcare professionals for serious medical conditions. 
              Our healers are certified in their respective modalities but are not licensed medical practitioners unless specifically noted.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}