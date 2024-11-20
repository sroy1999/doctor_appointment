import React, { useCallback } from 'react';
import { assets } from '../assets/assets';
import LazyImage from './LazyImage';

const Banner = React.memo(() => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>
        {/** Left side contents */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointment <br /> with trusted Doctors</p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <LazyImage className='w-28' src={assets.group_profiles} alt="" effect="blur" />
                <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
            </div>
            <a className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300' href='#speciality' id='#speciality'>
                Book appointment <LazyImage className='w-3' src={assets.arrow_icon} alt="arrow" effect='blur' />
            </a>
        </div>
        {/** Right side contents */}
        <div className='md:w-[45%] relative min-h-[500px]' >
            <picture>
                <source srcSet={assets.header_img} type='image/webp' />
                <img className='w-full h:auto md:absolute bottom-0 h-auto rounded-lg object-cover' src={assets.header_img} alt="doctors" effect="blur" loading='lazy' />
            </picture>
        </div>
    </div>
  )
});

export default Banner;