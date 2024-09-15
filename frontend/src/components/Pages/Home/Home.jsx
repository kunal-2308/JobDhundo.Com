import React from 'react'
import Navbar from '../../shared/Navbar'
import HeroSection from './HeroSection'
import CarouselSection from './CarouselSection'
import LatestOpenings from './LatestOpenings'
import Footer from './Footer'

function Home() {
  return (
    <>
      <Navbar />
      <HeroSection/>
      <CarouselSection/>
      <LatestOpenings/>
      <Footer/>
    </>
  )
}

export default Home
