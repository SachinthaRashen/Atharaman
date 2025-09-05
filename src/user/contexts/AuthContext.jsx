import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProfile, logoutUser } from '../../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
          
          // Verify token is still valid by fetching profile
          try {
            await getProfile();
          } catch (error) {
            // Token is invalid, clear auth state
            console.error('Token validation failed:', error);
            logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (userData, authToken) => {
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  // In your AuthContext.js, update the logout function:
  const logout = async () => {
    try {
      if (token) {
        await logoutUser();
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear local state regardless of API call success
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      
      // Redirect to home page after logout
      window.location.href = '/'; // This ensures a full page reload and clears any state
    }
  };

  const updateUser = (updatedUserData) => {
    const newUserData = { ...user, ...updatedUserData };
    localStorage.setItem('user', JSON.stringify(newUserData));
    setUser(newUserData);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Optional: Higher Order Component for protected routes
export const withAuth = (Component) => {
  return function WithAuthComponent(props) {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    
    if (!isAuthenticated) {
      // Redirect to login or show unauthorized message
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
            <p className="text-gray-600">Please log in to access this page.</p>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
};

// Optional: Hook for role-based access
export const useRole = () => {
  const { user } = useAuth();
  
  const hasRole = (role) => {
    return user?.role === role;
  };
  
  const isAdmin = () => {
    return user?.role === 'Admin';
  };
  
  const isUser = () => {
    return user?.role === 'User';
  };
  
  return {
    hasRole,
    isAdmin,
    isUser,
    role: user?.role
  };
};