import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import LazyImage from './LazyImage';

const Navbar = React.memo(() => {
  const { aToken, setAToken } = useContext(AdminContext);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  const handleLogout = useCallback(() => {
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
    navigate('/');
  })
  return (
    <div className={`flex justify-between items-center px-4 sm:px-10 py-3 border-b-gray-400 left-0 top-0 z-[999] sticky w-full transition-colors duration-300 ${scrolled ? 'bg-white text-black shadow-lg' : 'bg-transparent text-black'}`}>
      <div className='flex items-center gap-3 text-xs'>
        <LazyImage className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" effect="blur" />
        <p className='bg-primary rounded-full px-2 py-0.5 text-white lowercase'>{aToken ? 'Admin' : 'Doctor'}</p>
      </div>
      <button onClick={handleLogout} className='bg-primary text-white text-sm px-10 py-2 rounded-md'>Logout</button>
    </div>
  )
});

export default Navbar;