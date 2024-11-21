import React, { Suspense, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';

const Login = React.lazy(() => import('../pages/Login'));
const Navbar = React.lazy(() => import('../components/Navbar'));
const Sidebar= React.lazy(() => import('../components/Sidebar'));
const Dashboard = React.lazy(() => import('../pages/adminPages/Dashboard'));
const Appointments = React.lazy(() => import('../pages/adminPages/Appointments'));
const AddDoctor = React.lazy(() => import('../pages/adminPages/AddDoctor'));
const DoctorList = React.lazy(() => import('../pages/adminPages/DoctorsList'));


const Layout = () => {
  const { aToken } = useContext(AdminContext);
  return (
    <Suspense fallback={<></>}>
      <div>
        {
          aToken && <Navbar />
        }
        <div className={`${aToken ? 'flex items-start' : 'items-center'} min-h-screen`}>
          {
            aToken && <Sidebar />
          }
          <main>
            <Routes>
              {
                aToken ? (
                  <>
                    <Route path='/' element={<Navigate to='/admin-dashboard' />} />
                    <Route path='/admin-dashboard' element={<Dashboard />} />
                    <Route path='/all-appointments' element={<Appointments />} />
                    <Route path='/add-doctor' element={<AddDoctor />} />
                    <Route path='/doctors-list' element={<DoctorList />} />
                  </>
                ) : (
                  <Route path='/' element={<Login />} />
                )
              }
            </Routes>
          </main>
        </div>
      </div>
    </Suspense>
  )
}

export default Layout;