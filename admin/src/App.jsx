import React, { useState, useEffect, useContext } from 'react';
import Loading from './loading/Loading';
import Layout from './Layout/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [])

  if(loading) {
    return <Loading />;
  }
 
  return (
    <>
      <Layout />
      <ToastContainer />
    </>
  )
}

export default App
