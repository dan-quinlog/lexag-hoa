import React from 'react'
import { useQuery } from '@apollo/client'
import { LIST_PUBLIC_BULLETINS } from '@/graphql/queries'

interface Author {
  firstName: string;
  lastName: string;
}

interface Bulletin {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  author: Author | null;
}

interface BulletinConnection {
  items: Bulletin[];
  nextToken: string | null;
}

const BulletinList: React.FC = () => {
  const { data, loading, error } = useQuery<{ listPublicBulletins: BulletinConnection }>(
    LIST_PUBLIC_BULLETINS,
    {
      variables: { limit: 10 }
    }
  );

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="card p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="space-y-2 mb-4">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    console.error('GraphQL Error:', error);
    return (
      <div className="card p-6 bg-red-50 border-red-200">
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Unable to Load Bulletins
        </h3>
        <p className="text-red-600 mb-4">
          We're having trouble connecting to the server. Please try again later.
        </p>
        <p className="text-sm text-red-500">
          Error: {error.message}
        </p>
      </div>
    );
  }

  const bulletins = data?.listPublicBulletins?.items || [];

  if (bulletins.length === 0) {
    return (
      <div className="card p-6 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          No Bulletins Available
        </h3>
        <p className="text-gray-600">
          There are no community updates at this time. Check back later for the latest news and announcements.
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAuthorName = (author: Author | null) => {
    if (!author) return 'HOA Board';
    return `${author.firstName} ${author.lastName}`;
  };

  return (
    <div className="space-y-6">
      {bulletins.map((bulletin) => (
        <div key={bulletin.id} className="card p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {bulletin.title}
          </h3>
          <div className="prose prose-gray max-w-none mb-4">
            <p className="text-gray-700 whitespace-pre-wrap">
              {bulletin.content}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500">
              <span>By {getAuthorName(bulletin.author)}</span>
            </div>
            <div className="text-sm text-gray-500">
              Published on {formatDate(bulletin.publishedAt)}
            </div>
          </div>
        </div>
      ))}
      
      {/* Load more button placeholder */}
      {data?.listPublicBulletins?.nextToken && (
        <div className="text-center">
          <button className="btn btn-secondary">
            Load More Bulletins
          </button>
        </div>
      )}
    </div>
  );
};

export default BulletinList;
