import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { HOA_NAME, ROUTES } from '@/lib/constants'
import SignUpForm from '@/components/auth/SignUpForm'

const SignUpPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up - {HOA_NAME}</title>
        <meta name="description" content="Create your Lexington Commons HOA resident account to access community updates and resident services." />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Join the {HOA_NAME} community portal
            </p>
          </div>
          
          <div className="card p-8">
            <SignUpForm />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link to={ROUTES.LOGIN} className="font-medium text-grass-600 hover:text-grass-500">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
