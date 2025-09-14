import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Home, DollarSign, FileText, Settings, BarChart3 } from 'lucide-react';
import { HOA_NAME } from '@/lib/constants';
import { useAuth } from '@/contexts/AuthContext';
import { getUserPermissions, hasPermission, PermissionGate } from '@/lib/permissions';
import UniversalSearch from '@/components/board/UniversalSearch';
import QuickStats from '@/components/board/QuickStats';
import RecentActivity from '@/components/board/RecentActivity';

type DashboardTab = 'overview' | 'users' | 'properties' | 'financials' | 'bulletins' | 'reports';

const BoardDashboard: React.FC = () => {
  const { } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get user's Cognito groups - in real implementation this comes from user attributes
  const userGroups = ['board', 'president']; // Mock for now - will come from Cognito
  const permissions = getUserPermissions(userGroups);
  
  if (!permissions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="card p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You must be a board member to access this dashboard.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview' as const, name: 'Overview', icon: BarChart3, show: true },
    { id: 'users' as const, name: 'Residents', icon: Users, show: hasPermission(userGroups, 'viewAllUsers') },
    { id: 'properties' as const, name: 'Properties', icon: Home, show: hasPermission(userGroups, 'viewAllProperties') },
    { id: 'financials' as const, name: 'Financials', icon: DollarSign, show: hasPermission(userGroups, 'viewFinancials') },
    { id: 'bulletins' as const, name: 'Bulletins', icon: FileText, show: hasPermission(userGroups, 'createBulletins') || hasPermission(userGroups, 'editAllBulletins') },
    { id: 'reports' as const, name: 'Reports', icon: BarChart3, show: hasPermission(userGroups, 'generateReports') },
  ].filter(tab => tab.show);

  return (
    <>
      <Helmet>
        <title>Board Dashboard - {HOA_NAME}</title>
        <meta name="description" content="HOA Board management dashboard for Lexington Commons community administration." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Board Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">
                  {HOA_NAME} Management Portal
                </p>
              </div>
              
              {/* Universal Search */}
              <div className="flex-1 max-w-lg mx-8">
                <UniversalSearch 
                  value={searchQuery}
                  onChange={setSearchQuery}
                  permissions={permissions}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <PermissionGate userGroups={userGroups} permission="manageSystemSettings">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100">
                    <Settings className="h-5 w-5" />
                  </button>
                </PermissionGate>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      ${activeTab === tab.id
                        ? 'border-grass-500 text-grass-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <QuickStats permissions={permissions} />
              <RecentActivity permissions={permissions} />
            </div>
          )}
          
          {activeTab === 'users' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Resident Management</h2>
              <div className="card p-6">
                <p className="text-gray-600">User management interface coming soon...</p>
              </div>
            </div>
          )}
          
          {activeTab === 'properties' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Property Management</h2>
              <div className="card p-6">
                <p className="text-gray-600">Property management interface coming soon...</p>
              </div>
            </div>
          )}
          
          {activeTab === 'financials' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Financial Management</h2>
              <div className="card p-6">
                <p className="text-gray-600">Financial management interface coming soon...</p>
              </div>
            </div>
          )}
          
          {activeTab === 'bulletins' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Bulletin Management</h2>
              <div className="card p-6">
                <p className="text-gray-600">Bulletin management interface coming soon...</p>
              </div>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Reports & Analytics</h2>
              <div className="card p-6">
                <p className="text-gray-600">Reports interface coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BoardDashboard;
