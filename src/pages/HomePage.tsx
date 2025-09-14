import { Helmet } from 'react-helmet-async'
import { HOA_NAME } from '@/lib/constants'
import BulletinList from '@/components/bulletins/BulletinList'

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
            <div className="rounded-lg overflow-hidden h-64 md:h-80">
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
            <div className="rounded-lg overflow-hidden h-64 md:h-80">
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

          {/* Real-time bulletin board powered by GraphQL */}
          <BulletinList />

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
