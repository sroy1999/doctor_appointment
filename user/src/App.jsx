import React, { useEffect, useState } from 'react'
import Layout from './layout/Layout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './loading/Loading';

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
    <h1 className='mx-2 sm:mx-[5%]'>
      <Navbar token={token} setToken={setToken} />
      <Layout />
      <Footer />
    </h1>
  )
}

export default App;