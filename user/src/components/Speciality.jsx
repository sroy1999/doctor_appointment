import React, { useCallback } from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

const Speciality = React.memo(() => {
  const handleScroll = useCallback(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-6 text-gray-800'>
        <h1 className='text-3xl font-medium'>Find by speciality</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extesive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll'>
            {
                specialityData.map((item, index) => (
                    <Link onClick={handleScroll} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:-translate-y-2 transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
                        <LazyImage style={{ width: "6rem", height: "6rem" }} className='w-16 sm:w-24 mb-2 object-contain' src={item.image} alt="" effect='blur' />
                        <p>{item.speciality}</p>
                    </Link>
                ))
            }
        </div>
    </div>
  )
});

export default Speciality;