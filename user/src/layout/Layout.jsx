import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '../loading/Loading';

const Home = React.lazy(() => new Promise((resolve) => {
    setTimeout(() => resolve(import('../pages/Home')), 1000)
}));
const Doctors = React.lazy(() => import('../pages/Doctors'));
const Login = React.lazy(() => import('../pages/Login'));
const About = React.lazy(() => import('../pages/About'));
const Contact = React.lazy(() => import('../pages/Contact'));
const Profile = React.lazy(() => import('../pages/Profile'));
const MyAppointments = React.lazy(() => import('../pages/MyAppointments'));
const Appointment = React.lazy(() => import('../pages/Appointment'));

const Layout = ({ setToken }) => {
  return (
    <Suspense fallback={<Loading />}>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/doctors/:speciality' element={<Doctors />} />
            <Route path='/login' element={<Login setToken={setToken} />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/my-profile' element={<Profile />} />
            <Route path='/my-appointments' element={<MyAppointments />} />
            <Route path='/appointment/:docId' element={<Appointment />} />
        </Routes>
    </Suspense>
  )
}

export default Layout;