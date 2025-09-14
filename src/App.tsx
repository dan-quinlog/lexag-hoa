import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './lib/apollo-client'
import { AuthProvider } from './contexts/AuthContext'
import './lib/auth-config' // Initialize Amplify
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AmenitiesPage from './pages/AmenitiesPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import BoardDashboard from './pages/BoardDashboard'

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/amenities" element={<AmenitiesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/board" element={<BoardDashboard />} />
              </Routes>
            </Layout>
          </Router>
        </ApolloProvider>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
