import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import LazyImage from '../../components/LazyImage';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors } = useContext(AdminContext);
  const [ visibleDoctors, setVisibleDoctors ] = useState([]);

  useEffect(() => {
    if(aToken) {
      getAllDoctors();
    }
  }, [aToken])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          setVisibleDoctors((prev) => [...prev, entry.target]);
        }
      });
    }, { threshold: 0.1 });

    const doctorItems = document.querySelectorAll('.doctor-item');
    doctorItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      doctorItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, [doctors]);

  const doctorMemoized = useMemo(() => doctors, [doctors]);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctorMemoized.map((item, index) => (
            <div className='doctor-item border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <LazyImage className='bg-indigo-50 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" effect="blur" />
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>Dr. {item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-2 text-sm'>
                  <input type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList;