import { Helmet } from 'react-helmet-async'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { HOA_NAME } from '@/lib/constants'

const ContactPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - {HOA_NAME}</title>
        <meta name="description" content="Get in touch with the Lexington Commons HOA board. Find contact information and learn about our community mission." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600">
            We're here to help! Get in touch with the Lexington Commons HOA board
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Get In Touch
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600">board@lexingtoncommons.org</p>
                  <p className="text-sm text-gray-500 mt-1">
                    We typically respond within 24-48 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Leave a voicemail for non-urgent matters
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Mailing Address</h3>
                  <p className="text-gray-600">
                    Lexington Commons HOA<br />
                    1234 Community Drive<br />
                    Lexington, KY 40502
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-primary-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900">Office Hours</h3>
                  <p className="text-gray-600">
                    Board meetings: First Tuesday of each month at 7:00 PM<br />
                    Clubhouse office hours: By appointment only
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 card p-6 bg-primary-50">
              <h3 className="text-lg font-semibold text-primary-900 mb-2">
                Emergency Contacts
              </h3>
              <p className="text-primary-800 text-sm mb-2">
                For urgent maintenance or security issues:
              </p>
              <p className="text-primary-900 font-medium">
                Emergency Line: (555) 999-8888
              </p>
            </div>
          </div>

          {/* Mission Statement */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Our Mission
            </h2>
            
            <div className="card p-6">
              <p className="text-gray-700 leading-relaxed mb-6">
                The Lexington Commons Homeowners Association is dedicated to maintaining 
                and enhancing our community's quality of life through effective property 
                management, clear communication, and fostering a sense of neighborhood pride.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Our Commitment
              </h3>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Maintaining property values through consistent upkeep and improvements</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Ensuring transparent communication between the board and residents</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Providing well-maintained amenities for all residents to enjoy</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Creating policies that balance individual rights with community standards</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Building a welcoming, inclusive neighborhood environment</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 card p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Board Members
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>President:</strong> Contact through main channels above</p>
                <p><strong>Secretary:</strong> Contact through main channels above</p>
                <p><strong>Treasurer:</strong> Contact through main channels above</p>
                <p><strong>At-Large Members:</strong> Contact through main channels above</p>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Individual board member contact information available to residents upon request
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage
