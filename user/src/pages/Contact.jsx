import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div>
      <div className='text-center text-3xl pt-10 text-gray-500'>
        <p>Contact <span className='text-gray-700 font-medium'>us</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='uppercase font-semibold text-lg text-gray-600'>Our office</p>
          <p className='text-gray-500'>9/10-16, Wheeler Rd, <br /> Cleveland Town, Pulikeshi Nagar, Bengaluru, Karnataka 560005, India</p>
          <p className='text-gray-500'>Mobile: +91-7609815319 <br /> Email: roysuvam1999@gmail.com</p>
          <p className='uppercase font-semibold text-lg text-gray-600'>Careers at prescripto</p>
          <p className='text-gray-500'>Learn more about our teams and job openings</p>
          <button className='border border-black px-8 py-4 text-sm rounded-full hover:bg-black hover:text-white transition-all duration-500'>Explore jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact;