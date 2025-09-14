import React from 'react';
import { User, Home, FileText, DollarSign, Clock } from 'lucide-react';
import { PermissionSet } from '@/lib/permissions';

interface ActivityItem {
  id: string;
  type: 'user' | 'property' | 'bulletin' | 'payment';
  action: string;
  target: string;
  actor: string;
  timestamp: string;
}

interface RecentActivityProps {
  permissions: PermissionSet;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ permissions }) => {
  // Mock data - will be replaced with GraphQL queries
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'user',
      action: 'New resident signup',
      target: 'Maria Rodriguez (2025003)',
      actor: 'Self Registration',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'property',
      action: 'Property delegation updated',
      target: '1250 Hulon Circle',
      actor: 'John Smith',
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      type: 'bulletin',
      action: 'Published bulletin',
      target: 'Pool Season Opens May 1st',
      actor: 'Sarah Johnson (Media)',
      timestamp: '1 day ago'
    },
    {
      id: '4',
      type: 'payment',
      action: 'HOA dues payment received',
      target: '$150.00 from 1260 Hulon Circle',
      actor: 'Auto Payment',
      timestamp: '2 days ago'
    },
    {
      id: '5',
      type: 'user',
      action: 'Profile created by admin',
      target: 'Michael Brown (2025004)',
      actor: 'Jane Doe (Secretary)',
      timestamp: '3 days ago'
    }
  ];

  // Filter activities based on permissions
  const visibleActivities = activities.filter(activity => {
    switch (activity.type) {
      case 'user':
        return permissions.viewAllUsers;
      case 'property':
        return permissions.viewAllProperties;
      case 'bulletin':
        return permissions.createBulletins || permissions.editAllBulletins;
      case 'payment':
        return permissions.viewFinancials;
      default:
        return false;
    }
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="h-5 w-5 text-blue-500" />;
      case 'property':
        return <Home className="h-5 w-5 text-green-500" />;
      case 'bulletin':
        return <FileText className="h-5 w-5 text-purple-500" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user':
        return 'bg-blue-50 border-blue-200';
      case 'property':
        return 'bg-green-50 border-green-200';
      case 'bulletin':
        return 'bg-purple-50 border-purple-200';
      case 'payment':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (visibleActivities.length === 0) {
    return (
      <div className="card p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <p className="text-gray-500">No recent activity to display.</p>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <button className="text-sm text-grass-600 hover:text-grass-700">
          View All
        </button>
      </div>

      <div className="flow-root">
        <ul className="-mb-8">
          {visibleActivities.map((activity, activityIdx) => (
            <li key={activity.id}>
              <div className="relative pb-8">
                {activityIdx !== visibleActivities.length - 1 ? (
                  <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  <div className={`
                    relative px-1 py-1 rounded-full ring-8 ring-white border-2
                    ${getActivityColor(activity.type)}
                  `}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{activity.action}</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-700">
                      <span className="font-medium">{activity.target}</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {activity.actor} • {activity.timestamp}
                    </div>
                  </div>
                  <div className="flex-shrink-0 self-center">
                    <button className="text-xs text-grass-600 hover:text-grass-700">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentActivity;
