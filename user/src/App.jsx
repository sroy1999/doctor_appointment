import React, { useState } from 'react'
import Layout from './layout/Layout';
import Navbar from './components/Navbar';

const App = () => {
  const [token, setToken] = useState(true);
  return (
    <h1 className='mx-2 sm:mx-[5%]'>
      <Navbar token={token} setToken={setToken} />
      <Layout />
    </h1>
  )
}

export default App;