import React, { useState, useCallback, useContext} from 'react';
import LazyImage from '../../components/LazyImage';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [doctorImage, setDoctorImage] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState(''); 

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleDocImageChange = useCallback((eve) => {
    setDoctorImage(eve);
  }, []);

  const handleNameChange = useCallback((eve) => {
    setName(eve);
  }, []);

  const handleEmailChange = useCallback((eve) => {
    setEmail(eve);
  }, []);

  const handlePasswordChange = useCallback((eve) => {
    setPassword(eve);
  }, []);

  const handleExperienceChange = useCallback((eve) => {
    setExperience(eve);
  }, []);

  const handleFeesChange = useCallback((eve) => {
    setFees(eve);
  }, []);

  const handleAboutChange = useCallback((eve) => {
    setAbout(eve);
  }, []);

  const handleSpecialityChange = useCallback((eve) => {
    setSpeciality(eve);
  }, []);

  const handleDegreeChange = useCallback((eve) => {
    setDegree(eve);
  }, []);

  const handleAddressChange1 = useCallback((eve) => {
    setAddress1(eve);
  }, []);

  const handleAddressChange2 = useCallback((eve) => {
    setAddress2(eve);
  }, []);

  const handleSubmit = useCallback(async(eve) => {
    eve.preventDefault();
    try {
      if(!doctorImage) {
        toast.error("Image not selected");
        return;
      }
      const formData = new FormData();
      formData.append('image', doctorImage);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({line1: address1, line2: address2}));

      // console log form data
      /*formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      })*/
     const { data } = await axios.post(backendUrl + '/api/v1/admin/add-doctors', formData, {
        headers: { 
          aToken
        }
     })
     if(data.success === true) {
      toast.success(data.message);
      setDoctorImage(false);
      setName('');
      setEmail('');
      setPassword('');
      setAddress1('');
      setAddress2('');
      setDegree('');
      setAbout('');
      setFees('');
     } else {
      toast.error(data.message);
     }
    } catch (error) {
      toast.error(error);
    }
  }, [doctorImage, name, email, password, experience, fees, about, speciality, degree, address1, address2, backendUrl, aToken]);


  return (
    <form className='w-full m-5' onSubmit={handleSubmit}>
      <p className='mb-3 text-lg font-medium'>Add doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-image">
            <LazyImage className='w-16 bg-gray-100 rounded-full cursor-pointer' src={doctorImage ? URL.createObjectURL(doctorImage) : assets.upload_area} />
          </label>
          <input onChange={(e) => handleDocImageChange(e.target.files[0])} type="file" id="doc-image" hidden />
          <p>Upload picture</p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Name</p>
              <input value={name} onChange={(e) => handleNameChange(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='Full name' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Email</p>
              <input value={email} onChange={(e) => handleEmailChange(e.target.value)} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Password</p>
              <input value={password} onChange={(e) => handlePasswordChange(e.target.value)} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select value={experience} onChange={(e) => handleExperienceChange(e.target.value)} className='border rounded px-3 py-2' name="">
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="4 years">4 years</option>
                <option value="5 years">5 years</option>
                <option value="6 years">6 years</option>
                <option value="7 years">7 years</option>
                <option value="8 years">8 years</option>
                <option value="9 years">9 years</option>
                <option value="10 years">10 years</option>
                <option value="11 years">11 years</option>
                <option value="12 years">12 years</option>
                <option value="13 years">13 years</option>
                <option value="14 years">14 years</option>
                <option value="15 years">15 years</option>
                <option value="16 years">16 years</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input value={fees} onChange={(e) => handleFeesChange(e.target.value)} className='border rounded px-3 py-2' type="number" placeholder='Fees' required />
            </div>
          </div>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select value={speciality} onChange={(e) => handleSpecialityChange(e.target.value)} className='border rounded px-3 py-2' name="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input value={degree} onChange={(e) => handleDegreeChange(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='Education' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input value={address1} onChange={(e) => handleAddressChange1(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='Address line 1' required />
              <input value={address2} onChange={(e) => handleAddressChange2(e.target.value)} className='border rounded px-3 py-2' type="text" placeholder='Address line 2' required />
            </div>
          </div>
        </div>
        <div>
          <p className='mt-4 mb-2'>About doctor</p>
          <textarea value={about} onChange={(e) => handleAboutChange(e.target.value)} className='w-full px-4 pt-2 border rounded' placeholder='Write about doctor' rows={6} required />
        </div>
        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-md'>Add doctor</button>
      </div>
    </form>
  )
}

export default AddDoctor;