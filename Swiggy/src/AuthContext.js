import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from './firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (name, email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name });
    const userData = {
      uid: result.user.uid,
      name,
      email,
      location: 'Mysuru',
      orders: []
    };
    localStorage.setItem(`user_${result.user.uid}`, JSON.stringify(userData));
    return result;
  };

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const getUserData = () => {
    if (!user) return null;
    const data = localStorage.getItem(`user_${user.uid}`);
    return data ? JSON.parse(data) : {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      location: 'Mysuru',
      orders: []
    };
  };

  const updateLocation = (location) => {
    if (!user) return;
    const data = getUserData();
    data.location = location;
    localStorage.setItem(`user_${user.uid}`, JSON.stringify(data));
  };

  const saveOrder = (order) => {
    if (!user) return;
    const data = getUserData();
    data.orders = [order, ...(data.orders || [])];
    localStorage.setItem(`user_${user.uid}`, JSON.stringify(data));
  };

  const getOrders = () => {
    const data = getUserData();
    return data ? (data.orders || []) : [];
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    user,
    register,
    login,
    logout,
    getUserData,
    updateLocation,
    saveOrder,
    getOrders
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}