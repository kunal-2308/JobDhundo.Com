import Navbar from '@/components/shared/Navbar'
import React from 'react'
import MainContainer from './MainContainer'
import AppliedJobs from './AppliedJobs'

function Profile() {
  return (
    <>
      <Navbar />
      <div className="div-1-title-container w-full flex justify-center items-center h-auto pt-10">
        <span className='text-3xl font-bold text-red-800 mr-1'>Profile</span><span className='text-3xl font-bold text-black/85'> Section</span>
      </div>
      <MainContainer />
      <AppliedJobs />
    </>
  )
}

export default Profile
