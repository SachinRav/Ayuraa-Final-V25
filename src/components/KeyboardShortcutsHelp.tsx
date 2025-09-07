import React, { useState, useEffect } from 'react'
import { Keyboard, X, Zap, Home, Users, ShoppingBag, BookOpen, MessageSquare, HelpCircle, Search, User, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'

interface KeyboardShortcutsHelpProps {
  isOpen: boolean
  onClose: () => void
}

export function KeyboardShortcutsHelp({ isOpen, onClose }: KeyboardShortcutsHelpProps) {
  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const shortcuts = [
    {
      category: 'Navigation',
      shortcuts: [
        { key: 'Alt + H', action: 'Go to Home', icon: Home },
        { key: 'Alt + S', action: 'Go to Services/Healers', icon: Users },
        { key: 'Alt + P', action: 'Go to Shop/Products', icon: ShoppingBag },
        { key: 'Alt + R', action: 'Go to Resources', icon: BookOpen },
        { key: 'Alt + C', action: 'Go to Community', icon: MessageSquare },
        { key: 'Alt + U', action: 'Go to Support', icon: HelpCircle },
      ]
    },
    {
      category: 'Quick Actions',
      shortcuts: [
        { key: 'Alt + D', action: 'Open Dashboard (if logged in)', icon: User },
        { key: 'Alt + B', action: 'Open Shopping Cart', icon: ShoppingBag },
        { key: 'Alt + /', action: 'Focus Search', icon: Search },
      ]
    },
    {
      category: 'Number Shortcuts',
      shortcuts: [
        { key: 'Alt + 1', action: 'Go to Home', icon: Home },
        { key: 'Alt + 2', action: 'Go to Healers', icon: Users },
        { key: 'Alt + 3', action: 'Go to Shop', icon: ShoppingBag },
        { key: 'Alt + 4', action: 'Go to Resources', icon: BookOpen },
        { key: 'Alt + 5', action: 'Go to Community', icon: MessageSquare },
      ]
    },
    {
      category: 'Dropdown Navigation',
      shortcuts: [
        { key: '↓', action: 'Open dropdown / Navigate down', icon: ArrowDown },
        { key: '↑', action: 'Navigate up in dropdown', icon: ArrowUp },
        { key: 'Enter', action: 'Select item', icon: Zap },
        { key: 'Escape', action: 'Close all dropdowns', icon: X },
        { key: 'Tab', action: 'Close dropdown and continue', icon: ArrowRight },
      ]
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white neo-border neo-shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b-2 border-black p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="neo-cyan p-3 neo-border">
              <Keyboard size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-black uppercase">Keyboard Shortcuts</h2>
              <p className="font-bold text-gray-600 text-sm uppercase">Navigate faster with keyboard shortcuts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="neo-pink p-3 neo-border hover-lift hover-glow transition-all"
            aria-label="Close keyboard shortcuts help"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {shortcuts.map((section, sectionIndex) => (
              <div key={section.category} className={`animate-fade-in-up stagger-${sectionIndex + 1}`}>
                <h3 className="text-xl font-black text-black uppercase mb-4 neo-yellow px-4 py-2 neo-border inline-block">
                  {section.category}
                </h3>
                <div className="space-y-3">
                  {section.shortcuts.map((shortcut, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 neo-border hover:neo-lime transition-colors hover-lift"
                    >
                      <div className="flex items-center space-x-3">
                        <shortcut.icon size={16} className="text-gray-600" />
                        <span className="font-bold text-black text-sm">{shortcut.action}</span>
                      </div>
                      <div className="neo-border bg-white px-3 py-1">
                        <code className="font-black text-xs text-black uppercase tracking-wider">
                          {shortcut.key}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pro Tips */}
          <div className="mt-8 neo-orange p-6 neo-border animate-fade-in-up stagger-5">
            <h3 className="text-xl font-black text-black uppercase mb-4 flex items-center space-x-2">
              <Zap size={20} />
              <span>Pro Tips</span>
            </h3>
            <ul className="space-y-2 font-bold text-black text-sm">
              <li>• Shortcuts work when no input fields are focused</li>
              <li>• Shortcuts are disabled when modals are open</li>
              <li>• Use Tab to navigate through dropdowns and close them</li>
              <li>• Search within dropdowns by typing after opening them</li>
              <li>• Recently viewed items appear in relevant dropdown sections</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="neo-button px-8 py-3 hover-lift hover-glow"
            >
              Got it!
            </button>
            <p className="mt-3 text-xs font-bold text-gray-600 uppercase">
              Press <code className="neo-border bg-gray-100 px-2 py-1 font-black">Escape</code> anytime to close this help
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Keyboard shortcuts help trigger button component
export function KeyboardShortcutsTrigger({ onClick }: { onClick: () => void }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        onClick={onClick}
        className="fixed bottom-20 left-4 lg:bottom-4 lg:left-20 neo-cyan p-3 neo-border neo-shadow hover-lift hover-glow transition-all z-40 animate-gentle-float"
        aria-label="Show keyboard shortcuts"
      >
        <Keyboard size={20} />
      </button>
      
      {showTooltip && (
        <div className="fixed bottom-32 left-4 lg:bottom-16 lg:left-20 bg-black text-white px-3 py-2 text-xs font-bold rounded-lg z-50 whitespace-nowrap animate-fade-in-up">
          <div className="flex items-center space-x-2">
            <Keyboard size={12} />
            <span>Keyboard Shortcuts</span>
          </div>
          <div className="absolute -bottom-1 left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
        </div>
      )}
    </div>
  )
}