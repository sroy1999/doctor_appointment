import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import LazyImage from './LazyImage';

const RelatedDoctors = React.memo(({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if(doctors.length > 0 && speciality) {
        // Not displaying the current doctor of a particular speciality
        // Instead displaying the other doctors related to that speciality
        const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
        setRelatedDoctors(doctorsData);
    }
  }, [doctors, docId, speciality])

  const handleNavigation = useCallback((item) => {
    navigate(item);
    scrollTo(0, 0);
  }, [navigate, scrollTo]);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Related doctors</h1>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {
          relatedDoctors.slice(0, 5).map((item, index) => (
            <div onClick={() => handleNavigation(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <LazyImage className='bg-blue-50' src={item.image} alt="" effect="blur" />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
})

export default RelatedDoctors;