import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser) {
        setUser(JSON.parse(currentUser));
      }
    } catch (e) {
      console.error('Failed to restore token', e);
    } finally {
      setLoading(false);
    }
  };

  const authContext = {
    user,
    loading,
    signIn: async (email, password) => {
      try {
        const existingUsers = await AsyncStorage.getItem('users');
        const users = existingUsers ? JSON.parse(existingUsers) : [];
        const foundUser = users.find(
          (u) =>
            String(u.email).toLowerCase() === String(email).toLowerCase() &&
            u.password === password
        );
        if (foundUser) {
          setUser(foundUser);
          await AsyncStorage.setItem('currentUser', JSON.stringify(foundUser));
          return true;
        }
        return false;
      } catch (e) {
        console.error('Login error', e);
        return false;
      }
    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('currentUser');
        setUser(null);
      } catch (e) {
        console.error('Logout error', e);
      }
    },
    signUp: async (name, email, password) => {
      try {
        const existingUsers = await AsyncStorage.getItem('users');
        const users = existingUsers ? JSON.parse(existingUsers) : [];
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password,
        };
        users.push(newUser);
        await AsyncStorage.setItem('users', JSON.stringify(users));
        setUser(newUser);
        await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
        return true;
      } catch (e) {
        console.error('Sign up error', e);
        return false;
      }
    },
  };

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}