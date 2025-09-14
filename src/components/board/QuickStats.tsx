import React from 'react';
import { Users, Home, FileText, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { PermissionSet } from '@/lib/permissions';

interface QuickStatsProps {
  permissions: PermissionSet;
}

const QuickStats: React.FC<QuickStatsProps> = ({ permissions }) => {
  // Mock data - will be replaced with GraphQL queries
  const stats = [
    {
      name: 'Total Residents',
      value: '347',
      change: '+12 this month',
      changeType: 'positive' as const,
      icon: Users,
      show: permissions.viewAllUsers,
    },
    {
      name: 'Active Properties',
      value: '156',
      change: '2 pending sales',
      changeType: 'neutral' as const,
      icon: Home,
      show: permissions.viewAllProperties,
    },
    {
      name: 'Published Bulletins',
      value: '24',
      change: '4 this week',
      changeType: 'positive' as const,
      icon: FileText,
      show: permissions.createBulletins || permissions.editAllBulletins,
    },
    {
      name: 'Monthly Revenue',
      value: '$23,400',
      change: '+5.2% vs last month',
      changeType: 'positive' as const,
      icon: DollarSign,
      show: permissions.viewFinancials,
    },
    {
      name: 'Collection Rate',
      value: '94.2%',
      change: '6 overdue accounts',
      changeType: 'warning' as const,
      icon: TrendingUp,
      show: permissions.viewFinancials,
    },
    {
      name: 'Open Issues',
      value: '8',
      change: '3 urgent',
      changeType: 'warning' as const,
      icon: AlertCircle,
      show: permissions.viewAllUsers,
    },
  ].filter(stat => stat.show);

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6">Community Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          
          return (
            <div key={stat.name} className="card p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Icon className="h-8 w-8 text-grass-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              
              <div className="mt-4">
                <div className={`
                  text-sm flex items-center
                  ${stat.changeType === 'positive' ? 'text-green-600' : ''}
                  ${stat.changeType === 'warning' ? 'text-yellow-600' : ''}
                  ${stat.changeType === 'neutral' ? 'text-gray-500' : ''}
                `}>
                  {stat.change}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickStats;
