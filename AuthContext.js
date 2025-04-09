import React, { createContext, useContext } from 'react';
import secureLocalStorage from 'react-secure-storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  const login = (token) => {

    secureLocalStorage.setItem('token',token);
  };

  const logout = () => {
    secureLocalStorage.clear();
  };

  return (
    <AuthContext.Provider value={{login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 