import React, { createContext, useMemo, useState, useEffect } from 'react';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const handleStorageChange = () => {
      setAToken(localStorage.getItem('aToken')); // Update the token from localStorage
    };
    window.addEventListener('storage', handleStorageChange); // Listen for changes to localStorage
    return () => {
      window.removeEventListener('storage', handleStorageChange); // Clean up the listener when the component is unmounted
    };
  }, []);

  const value = useMemo(() => ({
    aToken,
    setAToken,
    backendUrl
  }), [aToken, backendUrl]);

  return (
    <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider;