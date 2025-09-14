// HOA Board Role-Based Permission System
import React from 'react';

export type BoardRole = 'president' | 'secretary' | 'treasurer' | 'media' | 'board';
export type UserRole = 'resident' | 'owner' | BoardRole | 'authorized_user';

export interface PermissionSet {
  // User Management
  viewAllUsers: boolean;
  editUserProfiles: boolean;
  createUsers: boolean;
  deleteUsers: boolean;
  manageUserGroups: boolean;
  
  // Property Management
  viewAllProperties: boolean;
  editPropertyDetails: boolean;
  managePropertyDelegations: boolean;
  viewPropertyFinancials: boolean;
  
  // Bulletin Management
  createBulletins: boolean;
  editAllBulletins: boolean;
  deleteBulletins: boolean;
  manageBulletinTags: boolean;
  scheduleBulletins: boolean;
  
  // Financial Management
  viewFinancials: boolean;
  editFinancials: boolean;
  processPayments: boolean;
  generateReports: boolean;
  
  // System Administration
  manageSystemSettings: boolean;
  viewAuditLogs: boolean;
  exportData: boolean;
}

export const ROLE_PERMISSIONS: Record<BoardRole, PermissionSet> = {
  president: {
    // Full admin access
    viewAllUsers: true,
    editUserProfiles: true,
    createUsers: true,
    deleteUsers: true,
    manageUserGroups: true,
    viewAllProperties: true,
    editPropertyDetails: true,
    managePropertyDelegations: true,
    viewPropertyFinancials: true,
    createBulletins: true,
    editAllBulletins: true,
    deleteBulletins: true,
    manageBulletinTags: true,
    scheduleBulletins: true,
    viewFinancials: true,
    editFinancials: true,
    processPayments: true,
    generateReports: true,
    manageSystemSettings: true,
    viewAuditLogs: true,
    exportData: true,
  },
  secretary: {
    // User management focus
    viewAllUsers: true,
    editUserProfiles: true,
    createUsers: true,
    deleteUsers: false,
    manageUserGroups: true,
    viewAllProperties: true,
    editPropertyDetails: true,
    managePropertyDelegations: false,
    viewPropertyFinancials: false,
    createBulletins: true,
    editAllBulletins: false,
    deleteBulletins: false,
    manageBulletinTags: false,
    scheduleBulletins: false,
    viewFinancials: false,
    editFinancials: false,
    processPayments: false,
    generateReports: true,
    manageSystemSettings: false,
    viewAuditLogs: true,
    exportData: true,
  },
  treasurer: {
    // Financial management focus
    viewAllUsers: true,
    editUserProfiles: false,
    createUsers: false,
    deleteUsers: false,
    manageUserGroups: false,
    viewAllProperties: true,
    editPropertyDetails: false,
    managePropertyDelegations: true,
    viewPropertyFinancials: true,
    createBulletins: false,
    editAllBulletins: false,
    deleteBulletins: false,
    manageBulletinTags: false,
    scheduleBulletins: false,
    viewFinancials: true,
    editFinancials: true,
    processPayments: true,
    generateReports: true,
    manageSystemSettings: false,
    viewAuditLogs: true,
    exportData: true,
  },
  media: {
    // Bulletin management focus
    viewAllUsers: true,
    editUserProfiles: false,
    createUsers: false,
    deleteUsers: false,
    manageUserGroups: false,
    viewAllProperties: true,
    editPropertyDetails: false,
    managePropertyDelegations: false,
    viewPropertyFinancials: false,
    createBulletins: true,
    editAllBulletins: true,
    deleteBulletins: true,
    manageBulletinTags: true,
    scheduleBulletins: true,
    viewFinancials: false,
    editFinancials: false,
    processPayments: false,
    generateReports: false,
    manageSystemSettings: false,
    viewAuditLogs: false,
    exportData: false,
  },
  board: {
    // General board member access
    viewAllUsers: true,
    editUserProfiles: false,
    createUsers: false,
    deleteUsers: false,
    manageUserGroups: false,
    viewAllProperties: true,
    editPropertyDetails: false,
    managePropertyDelegations: false,
    viewPropertyFinancials: false,
    createBulletins: false,
    editAllBulletins: false,
    deleteBulletins: false,
    manageBulletinTags: false,
    scheduleBulletins: false,
    viewFinancials: false,
    editFinancials: false,
    processPayments: false,
    generateReports: false,
    manageSystemSettings: false,
    viewAuditLogs: false,
    exportData: false,
  },
};

export function getUserPermissions(userGroups: string[]): PermissionSet | null {
  // Check in order of priority: president -> secretary -> treasurer -> media -> board
  const roleHierarchy: BoardRole[] = ['president', 'secretary', 'treasurer', 'media', 'board'];
  
  for (const role of roleHierarchy) {
    if (userGroups.includes(role)) {
      return ROLE_PERMISSIONS[role];
    }
  }
  
  return null; // Not a board member
}

export function isBoardMember(userGroups: string[]): boolean {
  return getUserPermissions(userGroups) !== null;
}

export function hasPermission(userGroups: string[], permission: keyof PermissionSet): boolean {
  const permissions = getUserPermissions(userGroups);
  return permissions ? permissions[permission] : false;
}

// UI Helper function for conditional rendering
export function PermissionGate({ 
  userGroups, 
  permission, 
  children 
}: {
  userGroups: string[];
  permission: keyof PermissionSet;
  children: React.ReactNode;
}) {
  if (!hasPermission(userGroups, permission)) {
    return null;
  }
  
  return <>{children}</>;
}
