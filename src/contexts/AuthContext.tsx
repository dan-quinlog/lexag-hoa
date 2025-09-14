import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, signOut, AuthUser } from 'aws-amplify/auth';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      console.log('✅ User authenticated:', currentUser.username);
      setUser(currentUser);
    } catch (error) {
      console.log('❌ No authenticated user');
      setUser(null);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      console.log('✅ User signed out');
      setUser(null);
    } catch (error) {
      console.error('❌ Sign out error:', error);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔄 Initializing authentication...');
      try {
        await refreshUser();
      } catch (error) {
        console.log('No authenticated user on init');
      } finally {
        setIsLoading(false);
        console.log('✅ Auth initialization complete');
      }
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signOut: handleSignOut,
    refreshUser
  };

  console.log('🔍 AuthContext state:', { 
    hasUser: !!user, 
    isLoading, 
    isAuthenticated: !!user 
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
