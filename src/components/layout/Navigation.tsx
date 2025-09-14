import { Link, useLocation } from 'react-router-dom'
import { Home, Building, Phone, LogIn, UserPlus, LogOut, User } from 'lucide-react'
import { ROUTES } from '@/lib/constants'
import { useAuth } from '@/contexts/AuthContext'

interface NavigationProps {
  isMobile: boolean
  isOpen: boolean
  onClose: () => void
}

const Navigation: React.FC<NavigationProps> = ({ isMobile, isOpen, onClose }) => {
  const location = useLocation()
  const { user, isAuthenticated, signOut } = useAuth()
  
  console.log('🔍 Navigation render - Auth:', { isAuthenticated, user: user?.username || 'none' })
  
  const navItems = [
    { href: ROUTES.HOME, label: 'Home', icon: Home },
    { href: ROUTES.AMENITIES, label: 'Amenities', icon: Building },
    { href: ROUTES.CONTACT, label: 'Contact', icon: Phone },
  ]

  const handleSignOut = () => {
    console.log('🚪 Sign out clicked');
    signOut();
    onClose();
  };

  const authItems = isAuthenticated 
    ? [
        { href: '/profile', label: 'Profile', icon: User },
        { href: '#', label: 'Sign Out', icon: LogOut, action: 'signout', onClick: handleSignOut },
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
              
              if (item.action === 'signout') {
                return (
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="text-gray-700 hover:text-gray-900 hover:bg-grass-100 group flex items-center w-full px-3 py-2 text-base font-medium rounded-md transition-colors"
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </button>
                )
              }
              
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
        {authItems.map((item, index) => {
          if (item.action === 'signout') {
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className="text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </button>
            )
          }
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`
                ${index === authItems.length - 1 && !isAuthenticated
                  ? 'btn-primary' // Sign Up button
                  : 'text-gray-600 hover:text-gray-900'
                }
                ${index === 0 && !isAuthenticated 
                  ? 'px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900' // Sign In button
                  : ''
                }
                transition-colors
              `}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navigation
