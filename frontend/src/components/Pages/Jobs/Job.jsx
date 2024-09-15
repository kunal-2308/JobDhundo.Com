import Navbar from '@/components/shared/Navbar'
import React from 'react'
import Results from './Results'
import JobContainer from './JobContainer'

function Job() {
  return (
    <>
    <div className="div">
    <Navbar/>
    <Results/> {/*Send Props for total Length */}
    <JobContainer/>
    </div>
  
    </>
  )
}

export default Job
