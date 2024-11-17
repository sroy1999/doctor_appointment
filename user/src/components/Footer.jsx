import React from 'react';
import { assets } from '../assets/assets';
import Visa from '../assets/Visa.png';
import Mastercard from '../assets/Mastercard.jpg';
import Rupay from '../assets/Rupay-Logo.png';
import UPI from '../assets/UPI.webp';
import Amex from '../assets/Amex.jpg';
import Gpay from '../assets/Gpay.png';

const Footer = () => {
  return (
    <div className='md:mx-10 static bottom-0'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/** Left */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus facere maxime delectus, nihil officia aliquid ipsam repudiandae rerum pariatur architecto magni soluta vero enim beatae esse! Distinctio tenetur aut nisi?</p>
            </div>
            {/** Center */}
            <div>
                <p className='uppercase text-xl font-medium mb-5'>Company</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            {/** Right */}
            <div>
                <p className='uppercase text-xl font-medium mb-5'>Get in touch</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+91-7609815319</li>
                    <li>roysuvam1999@gmail.com</li>
                </ul>
            </div>
            <div>
                <p className='uppercase text-xl font-medium mb-5'>Accepted</p>
                <ul className='flex gap-x-1 items-center'>
                    <li><img className='w-20' src={Visa} alt="" /></li>
                    <li><img className='w-20' src={Mastercard} alt="" /></li>
                    <li><img className='w-20' src={Rupay} alt="" /></li>
                    <li><img className='w-20' src={UPI} alt="" /></li>
                    <li><img className='w-20' src={Amex} alt="" /></li>
                    <li><img className='w-20' src={Gpay} alt="" /></li>
                </ul>
            </div>
        </div>
        {/** Copyright */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright {new Date().getFullYear()}@ Prescripto - All Rights Reserved.</p>
        </div>
    </div>
  )
}

export default Footer;