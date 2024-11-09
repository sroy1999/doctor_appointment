import React from 'react';
import Banner from '../components/Banner';
import Speciality from '../components/Speciality';
import TopDoctors from '../components/TopDoctors';

const Home = ({ token }) => {
  return (
    <div>
      <Banner />
      <Speciality />
      <TopDoctors />
    </div>
  )
}

export default Home;