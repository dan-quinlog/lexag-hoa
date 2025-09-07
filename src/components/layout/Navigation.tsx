import { Link, useLocation } from 'react-router-dom'
import { Home, Building, Phone, LogIn, UserPlus } from 'lucide-react'
import { ROUTES } from '@/lib/constants'

interface NavigationProps {
  isMobile: boolean
  isOpen: boolean
  onClose: () => void
}

const Navigation: React.FC<NavigationProps> = ({ isMobile, isOpen, onClose }) => {
  const location = useLocation()
  
  // TODO: Replace with actual auth state
  const user = null
  
  const navItems = [
    { href: ROUTES.HOME, label: 'Home', icon: Home },
    { href: ROUTES.AMENITIES, label: 'Amenities', icon: Building },
    { href: ROUTES.CONTACT, label: 'Contact', icon: Phone },
  ]

  const authItems = user 
    ? [
        { href: '/dashboard', label: 'Dashboard', icon: Home },
        { href: '#', label: 'Sign Out', icon: LogIn, action: 'signout' },
      ]
    : [
        { href: ROUTES.LOGIN, label: 'Sign In', icon: LogIn },
        { href: ROUTES.SIGNUP, label: 'Sign Up', icon: UserPlus },
      ]

  const isActive = (href: string) => location.pathname === href

  if (isMobile) {
    return (
      <div className={`
        ${isOpen ? 'block' : 'hidden'} 
        border-t border-grass-400 bg-grass-200
      `}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`
                  ${isActive(item.href) 
                    ? 'bg-grass-100 text-grass-900 border-r-2 border-grass-700' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-grass-100'
                  }
                  group flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors
                `}
                onClick={onClose}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
          
          <div className="border-t border-grass-400 mt-3 pt-3">
            {authItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`
                    ${isActive(item.href) 
                      ? 'bg-grass-100 text-grass-900' 
                      : 'text-gray-700 hover:text-gray-900 hover:bg-grass-100'
                    }
                    group flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors
                  `}
                  onClick={onClose}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Desktop Navigation
  return (
    <nav className="flex items-center space-x-8">
      <div className="flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`
              ${isActive(item.href) 
                ? 'text-grass-900 border-b-2 border-grass-700' 
                : 'text-gray-700 hover:text-gray-900'
              }
              px-3 py-2 text-sm font-medium transition-colors border-b-2 border-transparent
            `}
          >
            {item.label}
          </Link>
        ))}
      </div>
      
      <div className="flex items-center space-x-4">
        {authItems.map((item, index) => (
          <Link
            key={item.href}
            to={item.href}
            className={`
              ${index === authItems.length - 1 && !user
                ? 'btn-primary' // Sign Up button
                : 'text-gray-600 hover:text-gray-900'
              }
              ${index === 0 && !user 
                ? 'px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900' // Sign In button
                : ''
              }
              transition-colors
            `}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navigation
