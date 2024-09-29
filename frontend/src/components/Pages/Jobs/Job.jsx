import Navbar from '@/components/shared/Navbar'
import React from 'react'
import JobContainer from './JobContainer'
import Footer from '../Home/Footer'

function Job() {
  return (
    <>
    <div className="div w-auto">
    <Navbar/>
    <JobContainer/>
    <Footer/>
    </div>
  
    </>
  )
}

export default Job
