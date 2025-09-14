import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { HOA_NAME, ROUTES } from '@/lib/constants'
import LoginForm from '@/components/auth/LoginForm'

const LoginPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sign In - {HOA_NAME}</title>
        <meta name="description" content="Sign in to your Lexington Commons HOA resident account to access community updates and manage your profile." />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Access your {HOA_NAME} resident portal
            </p>
          </div>
          
          <div className="card p-8">
            <LoginForm />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to={ROUTES.SIGNUP} className="font-medium text-grass-600 hover:text-grass-500">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
