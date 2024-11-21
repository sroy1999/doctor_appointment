import React, { startTransition, useCallback, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink, useNavigate } from 'react-router-dom';
import LazyImage from './LazyImage';
import { assets } from '../assets/assets';

const Sidebar = React.memo(() => {
  const { aToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const preloadAppointment = useCallback(() => {
    import('../pages/adminPages/Appointments');
  })

  const preloadAddDoctor = useCallback(() => {
    import('../pages/adminPages/AddDoctor');
  })

  const preloadDoctorsList = useCallback(() => {
    import('../pages/adminPages/DoctorsList');
  })

  const handleNavigation = useCallback((path) => {
    startTransition(() => {
        navigate(path);
    })
  }, [navigate]);
  return (
    <div className='min-h-screen bg-white border-r'>
        {
            aToken && <ul className='text-[#515151] mt-5'>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-4 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} rel='preload' to={'/admin-dashboard'} onClick={() => handleNavigation('/admin-dashboard')}>
                    <LazyImage src={assets.home_icon} />
                    <p>Dashboard</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-4 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} onMouseEnter={preloadAppointment} onClick={() => handleNavigation('/all-appointments')} rel='preload' to={'/all-appointments'}>
                    <LazyImage src={assets.appointment_icon} />
                    <p>Appointments</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-4 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} onMouseEnter={preloadAddDoctor} onClick={() => handleNavigation('/add-doctor')} rel='preload' to={'/add-doctor'}>
                    <LazyImage src={assets.add_icon} />
                    <p>Add doctor</p>
                </NavLink>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-4 px-4 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} onMouseEnter={preloadDoctorsList} onClick={() => handleNavigation('/doctors-list')} rel='preload' to={'/doctors-list'}>
                    <LazyImage src={assets.people_icon} />
                    <p>Doctors</p>
                </NavLink>
            </ul>
        }
    </div>
  )
});

export default Sidebar;