import { Helmet } from 'react-helmet-async'
import { HOA_NAME } from '@/lib/constants'

const AmenitiesPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Community Amenities - {HOA_NAME}</title>
        <meta name="description" content="Explore the amenities available at Lexington Commons including pool, clubhouse, and playground facilities." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Community Amenities
          </h1>
          <p className="text-lg text-gray-600">
            Discover the wonderful facilities available to all residents of Lexington Commons
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Swimming Pool */}
          <div className="card p-6">
            <div className="rounded-lg h-48 mb-4 overflow-hidden">
              <img
                src="/images/amenities/pool.jpg"
                alt="Community Swimming Pool"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.classList.add('bg-blue-100', 'flex', 'items-center', 'justify-center');
                  target.parentElement!.innerHTML = '<p class="text-blue-600 font-medium">Pool Image<br />Place: /images/amenities/pool.jpg</p>';
                }}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Swimming Pool
            </h3>
            <p className="text-gray-600 mb-4">
              Enjoy our community swimming pool with designated lap lanes and family area. 
              Open year-round with seasonal hours.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Open daily 6 AM - 10 PM</li>
              <li>• Lap swimming available</li>
              <li>• Children's shallow area</li>
              <li>• Pool deck with seating</li>
            </ul>
          </div>

          {/* Clubhouse */}
          <div className="card p-6">
            <div className="rounded-lg h-48 mb-4 overflow-hidden">
              <img
                src="/images/amenities/clubhouse.jpg"
                alt="Community Clubhouse"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.classList.add('bg-green-100', 'flex', 'items-center', 'justify-center');
                  target.parentElement!.innerHTML = '<p class="text-green-600 font-medium">Clubhouse Image<br />Place: /images/amenities/clubhouse.jpg</p>';
                }}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Community Clubhouse
            </h3>
            <p className="text-gray-600 mb-4">
              Reserve our spacious clubhouse for private events, meetings, and community gatherings. 
              Fully equipped kitchen and audio/visual system included.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Seats up to 75 people</li>
              <li>• Full kitchen facilities</li>
              <li>• A/V equipment included</li>
              <li>• Reservation required</li>
            </ul>
          </div>

          {/* Kids Playground */}
          <div className="card p-6">
            <div className="rounded-lg h-48 mb-4 overflow-hidden">
              <img
                src="/images/amenities/playground.jpg"
                alt="Kids Playground"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.classList.add('bg-yellow-100', 'flex', 'items-center', 'justify-center');
                  target.parentElement!.innerHTML = '<p class="text-yellow-600 font-medium">Playground Image<br />Place: /images/amenities/playground.jpg</p>';
                }}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Kids Playground
            </h3>
            <p className="text-gray-600 mb-4">
              Safe and fun playground equipment designed for children ages 2-12. 
              Located in a shaded area with benches for parents.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Ages 2-12 equipment</li>
              <li>• Soft surface material</li>
              <li>• Shaded seating area</li>
              <li>• Regular safety inspections</li>
            </ul>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 card p-6 bg-blue-50">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Amenity Guidelines
          </h2>
          <div className="prose prose-blue max-w-none">
            <p className="text-gray-700 mb-4">
              All community amenities are available to residents and their guests. Please follow these guidelines to ensure everyone can enjoy our facilities:
            </p>
            <ul className="text-gray-700 space-y-2">
              <li>• Residents are responsible for their guests at all times</li>
              <li>• Children under 14 must be supervised by an adult</li>
              <li>• Pool hours may vary by season - check current schedule</li>
              <li>• Clubhouse reservations must be made at least 48 hours in advance</li>
              <li>• Please clean up after use and report any maintenance issues</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default AmenitiesPage
