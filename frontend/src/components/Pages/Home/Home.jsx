import React from 'react'
import Navbar from '../../shared/Navbar'
import HeroSection from './HeroSection'
import CarouselSection from './CarouselSection'
import LatestOpenings from './LatestOpenings'

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection/>
      <CarouselSection/>
      <LatestOpenings/>
    </>
  )
}

export default Home
