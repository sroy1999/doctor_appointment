import React, { createContext, useMemo, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllDoctors = async() => {
    try {
      const { data } = await axios.post(backendUrl + '/api/v1/admin/all-doctors', {}, {
        headers: { aToken }
      });
      if(data.success === true) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  }



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
    backendUrl, 
    doctors,
    getAllDoctors
  }), [aToken, backendUrl, doctors]);

  return (
    <AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider;