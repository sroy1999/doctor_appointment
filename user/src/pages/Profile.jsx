import React, { useCallback, useState } from 'react';
import { assets } from '../assets/assets';
import LazyImage from '../components/LazyImage';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "Suvam Roy",
    image: assets.profile_pic,
    email: "roysuvam1999@gmail.com",
    phone: "+91-7609815319",
    address: {
      line1: "#74, vanivilas, H.B.C.S Layout",
      line2: "Manchegowdana Koppalu, 570016"
    },
    gender: "Male",
    dob: "1999-08-01"
  });
  const [edit, setEdit] = useState(false);

  const handleNameChange = useCallback((event) => {
    setUserData(prev => ({...prev, name: event.target.value}))
  }, []);

  const handleEmailChange = useCallback((event) => {
    setUserData(prev => ({...prev, email: event.target.value}))
  }, []);

  const handlePhoneChange = useCallback((event) => {
    setUserData(prev => ({...prev, phone: event.target.value}))
  }, []);

  const handleAddressLine1Change = useCallback((event) => {
    setUserData(prev => ({...prev.address, line1: event.target.value}))
  }, []);

  const handleAddressLine2Change = useCallback((event) => {
    setUserData(prev => ({...prev.address, line2: event.target.value}))
  }, []);

  const handleGenderChange = useCallback((event) => {
    setUserData(prev => ({...prev, gender: event.target.value}))
  }, []);

  const handleDobChange = useCallback((event) => {
    setUserData(prev => ({...prev, dob: event.target.value}))
  }, []);

  const handleEdits = useCallback((eve) => {
    setEdit(eve);
  }, [setEdit]);
  
  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <div className='w-36'>
        <LazyImage className='rounded-full' src={userData.image} alt="" />
      </div>
      {
        edit ? (
          <input className='bg-gray-200 p-2 rounded text-3xl font-medium max-w-60 mt-4' type='text' value={userData.name} onChange={handleNameChange} />
        ) : (
          <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
        )
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='uppercase text-neutral-500 underline mt-3'>Contact information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-4'>
          <p className='font-medium'>Email: </p>
          {
            edit ? (
              <input type="email" className='bg-gray-200 max-w-52 p-1 rounded' value={userData.email} onChange={handleEmailChange} />
            ) : (
              <p className='text-blue-500'>{userData.email}</p>
            )
          }
          <p className='font-medium'>Phone: </p>
          {
            edit ? (
              <input className='bg-gray-200 max-w-52 p-1 rounded' type="tel" value={userData.phone} onChange={handlePhoneChange} />
            ) : (
              <p className='text-blue-400'>{userData.phone}</p>
            )
          }
          <p className='font-medium'>Address: </p>
          {
            edit ? (
              <p>
                <input className='bg-gray-200 max-w-52 p-1 mb-2 rounded' type="text" value={userData.address.line1} onChange={handleAddressLine1Change} />
                <br className='' />
                <input className='bg-gray-200 max-w-52 p-1 rounded' type="text" value={userData.address.line2} onChange={handleAddressLine2Change} />
              </p>
            ) : (
              <p className='text-gray-500'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )
          }
        </div>
      </div>
      <div>
        <p className='uppercase text-neutral-500 underline mt-4'>Basic information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender: </p>
          {
            edit ? (
              <select className='max-w-20 bg-gray-200 rounded' value={userData.gender} onChange={handleGenderChange}>
                <option value={"Male"}>Male</option>
                <option value={"Female"}>Female</option>
                <option value={"Others"}>Others</option>
              </select>
            ) : (
              <p className='text-gray-400'>{userData.gender}</p>
            )
          }
          <p className='font-medium'>Date of birth: </p>
          {
            edit ? (
              <input className='max-w-28 bg-gray-200 rounded' type='date' value={userData.dob} onChange={handleDobChange} />
            ) : (
              <p className='text-gray-400'>{userData.dob}</p>
            )
          }
        </div>
      </div>
      <div className='mt-10'>
        {
          edit ? (
            <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => handleEdits(false)}>Save information</button>
          ) : (
            <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => handleEdits(true)}>Edit</button>
          )
        }
      </div>
    </div>
  )
}

export default Profile;