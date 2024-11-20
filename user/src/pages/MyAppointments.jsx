import React, { useCallback, useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import LazyImage from '../components/LazyImage';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleCancelClick = useCallback((appointment) => {
    setSelectedAppointment(appointment);
    setShowPopup(true);
  }, [setSelectedAppointment, setShowPopup]);

  const handleConfirmCancel = useCallback(() => {
    console.log(`Cancelled appointment with ${selectedAppointment}`);
    setShowPopup(false);
    setSelectedAppointment(null);
  }, [setShowPopup, setSelectedAppointment]);

  const handleCancelPopup = useCallback(() => {
    setShowPopup(false);
    setSelectedAppointment(null);
  }, []);

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
      <div>
        {
          doctors.slice(0, 3).map((item, index) => (
            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div className='w-32 bg-indigo-100 object-cover'>
                <LazyImage className='w-full h-full' src={item.image} alt="" effect="blur" style={{ objectFit: "cover" }} />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.name}</p>
                <p>{item.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address: </p>
                <p className='text-xs'>{item.address.line1}</p>
                <p className='text-xs'>{item.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date and time: </span>17 Nov, 2024 | 7:46 AM</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end'>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay online</button>
                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-700 hover:text-white transition-all duration-300' onClick={() => handleCancelClick(item)}>Cancel appointment</button>
              </div>
            </div>
          ))
        }
      </div>
      {/** popup */}
      {
        showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className={`bg-white p-6 rounded shadow-lg transform transition-all duration-300 ${
              showPopup ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}>
              <p className="text-lg font-semibold text-gray-800">Do you really want to cancel this appointment?</p>
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={handleConfirmCancel}
                  className=" min-w-36 px-4 py-2 bg-primary text-white rounded hover:bg-white hover:text-black hover:border hover:border-zinc-300 transition-all duration-300"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelPopup}
                  className=" min-w-36 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-red-700 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default MyAppointments