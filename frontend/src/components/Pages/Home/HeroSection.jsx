import { Search } from 'lucide-react'
import React from 'react'

function HeroSection() {
  return (
    <>
      <div className="div-main-container flex flex-col justify-center items-center mt-24 gap-5">
        <div className="div-1-brand-name bg-slate-100 w-max p-[10px] rounded-full flex justify-center items-center">
          <span className='font-bold text-sm text-red-700'>India's Top Oncampus Placement Portal!</span>
        </div>
        <div className="div-2-main-heading flex flex-col justify-center items-center mt-1">
          <div className="div-2-1 flex justify-center items-center"><span className='font-bold text-5xl'>Search, Apply & </span></div>
          <div className="div-2-2  mt-2 flex justify-center items-center"><span className='font-bold text-5xl'>Find Your <span className='font-extrabold text-5xl mt-2 text-red-800'>Dream Job!</span></span>
          </div>
        </div>
        <div className="div-3-content-brand flex flex-col justify-center items-center mt-2">
          <span className='text-sm font-medium text-slate-600'>Your gateway to seamless campus placements</span>
          <span className='text-sm font-medium text-slate-600'> We connect students with top companies, offering tailored job opportunities across a wide range of industries.</span>
        </div>
        <div className="div-4-input-search-box mt-4 w-[480px] h-[50px] border-slate-400 border rounded-full flex">
          <form className="flex w-full h-full">
            <input
              type="text"
              name="searchBar"
              id="searchBar"
              className="w-[400px] h-full bg-white rounded-l-full p-4 focus:outline-none"
              placeholder="Search jobs..."
            />
            <button
              type="submit"
              className="w-[80px] h-full bg-red-800 flex justify-center items-center rounded-r-full hover:bg-red-900"
            >
              <Search className='text-white font-semibold text-lg'></Search>
            </button>
          </form>
        </div>
      </div>

    </>
  )
}

export default HeroSection
