import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './contexts/AuthContext'
import './lib/auth-config' // Initialize Amplify
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import AmenitiesPage from './pages/AmenitiesPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/amenities" element={<AmenitiesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
