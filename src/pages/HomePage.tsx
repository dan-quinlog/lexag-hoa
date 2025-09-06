import { Helmet } from 'react-helmet-async'
import { HOA_NAME } from '@/lib/constants'

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>{HOA_NAME} - Community Hub</title>
        <meta name="description" content="Welcome to Lexington Commons HOA community portal. Stay updated with community news and announcements." />
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Images Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-lg overflow-hidden h-64">
              <img
                src="/images/home/welcome-1.jpg"
                alt="Welcome to Lexington Commons HOA"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.classList.add('bg-gray-200', 'flex', 'items-center', 'justify-center');
                  target.parentElement!.innerHTML = '<p class="text-gray-500">Welcome Image 1<br />Place: /images/home/welcome-1.jpg</p>';
                }}
              />
            </div>
            <div className="rounded-lg overflow-hidden h-64">
              <img
                src="/images/home/welcome-2.jpg"
                alt="Lexington Commons Community Overview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.classList.add('bg-gray-200', 'flex', 'items-center', 'justify-center');
                  target.parentElement!.innerHTML = '<p class="text-gray-500">Welcome Image 2<br />Place: /images/home/welcome-2.jpg</p>';
                }}
              />
            </div>
          </div>
        </section>

        {/* Bulletins Section */}
        <section>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Community Updates
            </h1>
            <p className="text-gray-600">
              Stay informed with the latest announcements from your HOA
            </p>
          </div>

          {/* TODO: Replace with actual BulletinList component */}
          <div className="space-y-6">
            {/* Placeholder bulletin cards */}
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Sample Bulletin {index + 1}
                </h3>
                <p className="text-gray-600 mb-4">
                  This is a placeholder for bulletin content. The actual content will be rich text 
                  from the GraphQL API with proper formatting and subject tags.
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Community
                  </span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Updates
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Published on September 4, 2025
                </p>
              </div>
            ))}
          </div>

          {/* Load More Button (will be replaced with infinite scroll) */}
          <div className="text-center mt-8">
            <button className="btn-success">
              Load More Updates
            </button>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage
