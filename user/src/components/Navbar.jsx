import React, { startTransition, useCallback, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdMenuOpen } from "react-icons/md";
import Loading from '../loading/Loading';
import { LuLogOut } from "react-icons/lu";
import LazyImage from "./LazyImage";

const Navbar = React.memo(({ token, setToken }) => {
  const preloadComponent = (componentImport) => {
    componentImport().then((module) => module.default);
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // to show dropdown menu on clicking the avatar after login
  const [showMenu, setShowMenu] = useState(false);
  // It ensures that the user is logged in
  //const [token, setToken] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const goToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const gotoMyProfile = useCallback(()=> {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/my-profile');
    }, 1000);
  }, [navigate]);

  const gotoMyAppointments = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/my-appointments');
    }, 1000);
  }, [navigate]);

  const handleNavigation = useCallback((path) => {
    startTransition(() => {
        navigate(path);
    })
  }, [navigate]);

  const logout = useCallback(() => {
    setToken(false);
  }, []);

  const returnToHome = useCallback(() => {
    navigate('/');
    scrollTo(0, 0);
  }, [navigate, scrollTo]);

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

  const handleShowMenu = useCallback(() => {
    setShowMenu(true);
  }, [setShowMenu]);

  const handleCloseMenu = useCallback(() => {
    setShowMenu(false);
  }, []);

  const preloadDoctors = useCallback(() => {
    import('../pages/Doctors');
  });

  const preloadAbout = useCallback(() => {
    import('../pages/About');
  });

  const preloadContact = useCallback(() => {
    import('../pages/Contact');
  });

  return (
    <div className={`flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 left-0 top-0 z-[999] sticky w-full transition-colors duration-300 ${scrolled ? 'bg-white text-black shadow-lg' : 'bg-transparent text-black'}`}>
      {loading && <Loading />}
        <LazyImage onClick={returnToHome} className='w-44 cursor-pointer' src={assets.logo} alt='logo' effect="blur" />
        <ul className='hidden md:flex items-start gap-5 font-medium uppercase'>
            <NavLink rel='preload' to='/' onClick={() => handleNavigation('/')}>
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink rel='preload' to='/doctors' onMouseEnter={preloadDoctors} onClick={() => handleNavigation('/doctors')}>
                <li className='py-1'>Our Doctors</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink rel='preload' to='/about' onMouseEnter={preloadAbout} onClick={() => handleNavigation('/about')}>
                <li className='py-1'>About</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink rel='preload' to='/contact' onMouseEnter={preloadContact} onClick={() => handleNavigation('/contact')}>
                <li className='py-1'>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
                token ? (<div className='flex items-center gap-3 cursor-pointer group relative'>
                    <LazyImage className='w-8 rounded-full' src={assets.profile_pic} alt='profile' effect='blur' style={{ width: "3rem", height: "3rem", borderRadius: "50%" }} />
                    <LazyImage className='w-2.5' src={assets.dropdown_icon} alt="" />
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-500 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={gotoMyProfile} className='hover:text-black cursor-pointer'>My profile</p>
                            <p onClick={gotoMyAppointments} className='hover:text-black cursor-pointer'>My appointments</p>
                            <p onClick={logout} className='hover:text-black cursor-pointer flex items-center gap-3'>Logout <LuLogOut className='text-red-600 font-semibold' /></p>
                        </div>
                    </div>
                </div>) : (
                    <button className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block' onClick={goToLogin} disabled={token}>Sign up</button>
                )
            }
            <MdMenuOpen className='md:hidden' onClick={handleShowMenu} />
            {/** Mobile menu */}
            <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
              <div className='flex items-center justify-between px-5 py-6'>
                <LazyImage className='w-36' src={assets.logo} alt="" effect='blur' />
                <LazyImage className='w-7' onClick={handleCloseMenu} src={assets.cross_icon} alt="" effect="blur" />
              </div>
              <ul className='uppercase flex flex-col items-center gap-3 mt-7 px-5 text-lg font-medium'>
                <NavLink onClick={handleCloseMenu} to={'/'}><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                <NavLink onClick={handleCloseMenu} onMouseEnter={preloadDoctors} to={'/doctors'}><p className='px-4 py-2 rounded inline-block'>Doctors</p></NavLink>
                <NavLink onClick={handleCloseMenu} onMouseEnter={preloadAbout} to={'/about'}><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
                <NavLink onClick={handleCloseMenu} onMouseEnter={preloadContact} to={'/contact'}><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
              </ul>
            </div>
        </div>
    </div>
  )
})

export default Navbar;