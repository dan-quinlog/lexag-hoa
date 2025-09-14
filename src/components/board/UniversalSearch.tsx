import React, { useState, useEffect } from 'react';
import { Search, User, Home, Receipt, X, Filter } from 'lucide-react';
import { PermissionSet } from '@/lib/permissions';

interface SearchResult {
  id: string;
  type: 'user' | 'property' | 'invoice';
  title: string;
  subtitle: string;
  metadata?: string;
}

interface UniversalSearchProps {
  value: string;
  onChange: (value: string) => void;
  permissions: PermissionSet;
}

const UniversalSearch: React.FC<UniversalSearchProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock search results - will be replaced with GraphQL queries
  const mockResults: SearchResult[] = [
    {
      id: '2025001',
      type: 'user',
      title: 'John Smith',
      subtitle: 'john.smith@email.com',
      metadata: 'Owner • 1250 Hulon Circle'
    },
    {
      id: '2025002', 
      type: 'user',
      title: 'Jane Doe',
      subtitle: 'jane.doe@email.com',
      metadata: 'Resident • 1260 Hulon Circle'
    },
    {
      id: '1250',
      type: 'property',
      title: '1250 Hulon Circle',
      subtitle: 'Single Family Home',
      metadata: 'Owned by John Smith • $150/month'
    },
    {
      id: '1260',
      type: 'property', 
      title: '1260 Hulon Circle',
      subtitle: 'Townhouse',
      metadata: 'Owned by Jane Doe • $125/month'
    }
  ];

  useEffect(() => {
    if (value.length >= 2) {
      setLoading(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = mockResults.filter(result => 
          result.title.toLowerCase().includes(value.toLowerCase()) ||
          result.subtitle.toLowerCase().includes(value.toLowerCase()) ||
          result.id.includes(value)
        );
        setResults(filtered);
        setLoading(false);
        setIsOpen(true);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [value]);

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'property':
        return <Home className="h-4 w-4 text-green-500" />;
      case 'invoice':
        return <Receipt className="h-4 w-4 text-yellow-500" />;
      default:
        return <Search className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setIsOpen(false);
    onChange('');
    // TODO: Navigate to detailed view of the selected item
    console.log('Navigate to:', result.type, result.id);
  };

  const clearSearch = () => {
    onChange('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search residents, properties, invoices..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.length >= 2 && setIsOpen(true)}
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-grass-500 focus:border-grass-500 sm:text-sm"
        />
        {value && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-96 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {loading ? (
            <div className="px-4 py-3 text-gray-500">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b">
                Search Results ({results.length})
              </div>
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 hover:bg-gray-50 flex items-start space-x-3 text-left"
                >
                  <div className="mt-0.5">
                    {getResultIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {result.title}
                      </p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {result.id}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {result.subtitle}
                    </p>
                    {result.metadata && (
                      <p className="text-xs text-gray-400 truncate">
                        {result.metadata}
                      </p>
                    )}
                  </div>
                </button>
              ))}
              
              {/* Search filters/options */}
              <div className="border-t px-3 py-2">
                <button className="text-xs text-grass-600 hover:text-grass-700 flex items-center space-x-1">
                  <Filter className="h-3 w-3" />
                  <span>Advanced Search</span>
                </button>
              </div>
            </>
          ) : value.length >= 2 ? (
            <div className="px-4 py-3 text-gray-500">
              No results found for "{value}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default UniversalSearch;
