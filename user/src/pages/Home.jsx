import React from 'react';
import Banner from '../components/Banner';
import Speciality from '../components/Speciality';
import TopDoctors from '../components/TopDoctors';
import Banner2 from '../components/Banner2';

const Home = ({ token }) => {
  return (
    <div>
      <Banner />
      <Speciality />
      <TopDoctors />
      <Banner2 />
    </div>
  )
}

export default Home;