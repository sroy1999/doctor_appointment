import React, { useCallback, useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAToken, backendUrl } = useContext(AdminContext);

  const navigate = useNavigate();

  const handleDoctorState = useCallback(() => {
    setState('Doctor');
  }, [setState]);

  const handleAdminState = useCallback(() => {
    setState('Admin');
  }, [setState]);

  const handleEmailChange = useCallback((eve) => {
    setEmail(eve);
  }, [setEmail]);

  const handlePasswordChange = useCallback((eve) => {
    setPassword(eve);
  }, [setPassword]);

  const handleOnSubmit = useCallback(async(eve) => {
    eve.preventDefault();
    try {
      setLoading(true);
      if(state === 'Admin') {
        const { data } =  await axios.post(backendUrl + '/api/v1/admin/login', {email, password});
        if(data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success(data.message);
          setTimeout(() => {
            setLoading(false);
            //navigate('/admin-dashboard');
          }, 60000);
        } else {
          toast.error(data.message);
          setLoading(false);
        }
      } else {
        
      }
    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  }, [state, email, password, backendUrl, setAToken]);

  return (
    <form onSubmit={handleOnSubmit} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto pb-5'><span className='text-primary'>{state}</span> login</p>
        <div className='w-full'>
          <p>Email</p>
          <input value={email} name="email" onChange={(e) => handleEmailChange(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input value={password} name="password" onChange={(e) => handlePasswordChange(e.target.value)} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className={`bg-primary text-white w-full py-2 rounded-md text-base uppercase flex justify-center items-center`}>
          {
            loading ? (
              <div className="spinner-border animate-spin border-4 border-t-4 border-white rounded-full w-6 h-6"></div>
            ) : ('Login')
          }
        </button>
        {
          state === 'Admin' ? (
            <p>Doctor Login? <span className='cursor-pointer text-primary' onClick={handleDoctorState}>Click here</span></p>
          ) : (
            <p>Admin Login? <span className='cursor-pointer text-primary' onClick={handleAdminState}>Click here</span></p>
          )
        }
      </div>
    </form>
  )
}

export default Login;