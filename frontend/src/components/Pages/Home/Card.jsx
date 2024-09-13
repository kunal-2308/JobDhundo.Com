import { Lightbulb, WandSparkles } from 'lucide-react'
import React from 'react'

function Card({ jobDetails }) {
    // Slice the description to 20 words
    const truncatedDescription = jobDetails.description.split(' ').slice(0, 20).join(' ') + '...';

    return (
        <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-[410px] h-max">
            <div className="div-row-1 min-w-max flex flex-row justify-between items-center">
                <span className='text-lg font-bold'>{jobDetails.name}</span>
                <div className="div-row-a-1 bg-red-800 p-1 text-white rounded-full flex flex-row justify-center items-center gap-1">
                    <Lightbulb size={16}></Lightbulb>
                    <span className='text-xs font-medium'>
                        {jobDetails.category}
                    </span>
                </div>
            </div>
            
            <div className="div-row-2 mt-0 flex flex-col">
                <span className='text-[10px] font-bold text-slate-400'>{jobDetails.location}</span>
                <span className='text-lg font-bold text-black mt-4'>{jobDetails.Role}</span>
            </div>
            
            <div className="div-row-3 mt-2">
                <span className='text-[12px] font-normal text-slate-500'>{truncatedDescription}</span>
            </div>
            
            <div className="div-row-4 mt-5 flex justify-start items-center gap-3">
                <div className="div-a-1 h-[20px] w-[90px] rounded-full border-[1px] flex items-center justify-center">
                    <span className='text-xs font-extrabold text-purple-800'>{jobDetails.positions} Positions</span>
                </div>
                <div className="div-a-1 h-[20px] w-[90px] rounded-full border-[1px] flex items-center justify-center">
                    <span className='text-xs font-extrabold text-red-700'>{jobDetails.jobType}</span>
                </div>
                <div className="div-a-1 h-[20px] w-[90px] rounded-full border-[1px] flex items-center justify-center">
                    <span className='text-xs font-extrabold text-purple-800'>₹{jobDetails.salary}</span>
                </div>

            </div>
        </div>
    )
}

export default Card
