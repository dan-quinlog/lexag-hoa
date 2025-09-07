import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { HOA_NAME, ROUTES } from '@/lib/constants'
import Navigation from './Navigation'

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-grass-300 shadow-sm border-b border-grass-400">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              to={ROUTES.HOME}
              className="text-xl font-bold text-grass-900 hover:text-grass-800 transition-colors"
            >
              {HOA_NAME}
            </Link>
            <Navigation isMobile={false} isOpen={false} onClose={() => {}} />
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link 
              to={ROUTES.HOME}
              className="text-lg font-bold text-grass-900"
            >
              {HOA_NAME}
            </Link>
            <button
              type="button"
              className="p-2 text-grass-800 hover:text-grass-900 hover:bg-grass-200 rounded-md transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <Navigation 
          isMobile={true} 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      </div>
    </header>
  )
}

export default Header
