import React, { startTransition, useCallback, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = React.memo(({ token, setToken }) => {
  const navigate = useNavigate();

  // to show dropdown menu on clicking the avatar after login
  const [showMenu, setShowMenu] = useState(false);
  // It ensures that the user is logged in
  //const [token, setToken] = useState(true);

  const goToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const gotoMyProfile = useCallback(()=> {
    navigate('/my-profile');
  }, [navigate]);

  const gotoMyAppointments = useCallback(() => {
    navigate('/my-appointments');
  }, [navigate]);

  const handleNavigation = useCallback((path) => {
    startTransition(() => {
        navigate(path);
    })
  }, [navigate]);

  const logout = useCallback(() => {
    setToken(false);
  }, []);

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 left-0 top-0 z-[999] sticky'>
        <img className='w-44 cursor-pointer' src={assets.logo} alt='logo' />
        <ul className='hidden md:flex items-start gap-5 font-medium uppercase'>
            <NavLink rel='preload' to='/' onClick={() => handleNavigation('/')}>
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink rel='preload' to='/doctors' onClick={() => handleNavigation('/doctors')}>
                <li className='py-1'>Our Doctors</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink rel='preload' to='/about' onClick={() => handleNavigation('/about')}>
                <li className='py-1'>About</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink rel='preload' to='/contact' onClick={() => handleNavigation('/contact')}>
                <li className='py-1'>Contact</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
        </ul>
        <div className='flex items-center gap-4'>
            {
                token ? (<div className='flex items-center gap-3 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' src={assets.profile_pic} alt='profile' />
                    <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-500 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={gotoMyProfile} className='hover:text-black cursor-pointer'>My profile</p>
                            <p onClick={gotoMyAppointments} className='hover:text-black cursor-pointer'>My appointments</p>
                            <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div>) : (
                    <button className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block' onClick={goToLogin} disabled={token}>Sign in</button>
                )
            }
        </div>
    </div>
  )
})

export default Navbar;