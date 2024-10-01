import { AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Avatar } from '@radix-ui/react-avatar';
import { Bookmark } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({ jobDetails }) {
    let desc = jobDetails.description;
    const truncatedDescription = desc.split(' ').slice(0, 20).join(' ') + '...';
    const navigate = useNavigate();
    let handleClick = (e) =>{
        e.preventDefault();
        navigate(`/jobs/description/${jobDetails._id}`);
    }
    return (
        <>
            <div className="main-card-container w-[420px] h-auto shadow-xl rounded-lg p-6 mt-8 transition-transform duration-300 hover:scale-105 bg-white hover:z-10">
                <div className="div-1 flex justify-between items-center mb-4">
                    <span className="text-sm text-slate-400">1 day ago</span>
                    <button className="bg-slate-300 rounded-full p-2 transition-transform duration-200 hover:cursor-pointer focus:outline-none">
                        <Bookmark size="23px" />
                    </button>
                </div>


                <div className="div-2-row-2 flex items-center gap-4 mb-6">
                    <Avatar className="w-16 h-16">
                        <AvatarImage
                            src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg"
                            className="h-full w-full object-cover rounded-full"
                            alt="Company Logo"
                        />
                    </Avatar>
                    <div className="infoDiv-1-b flex flex-col justify-start">
                        <span className="text-2xl font-semibold">{jobDetails.company.companyName}</span>
                        <span className="text-xs font-semibold text-slate-400">{jobDetails.location}</span>
                    </div>
                </div>


                <div className="div-3 ml-2">
                    <span className="text-xl font-bold">{jobDetails.title}</span>
                </div>
                <div className="div-4-desc ml-2 mt-3 w-[80%]">
                    <span className='text-sm font-medium text-slate-500'>{truncatedDescription}</span>
                </div>
                <div className="div-5 mt-5 flex items-center gap-x-4 gap-y-2 w-[100%] flex-wrap">
                    {
                            jobDetails.requirements.map((ele, index) => {
                            return (
                                <div
                                    className="div-a-1 min-w-auto h-auto rounded-full border-[1px] flex items-center justify-center px-3 py-2"
                                    key={index}
                                >
                                    <span
                                        className={`text-xs font-extrabold whitespace-nowrap ${index % 2 === 0 ? 'text-red-700' : 'text-purple-800'} w-auto`}
                                    >
                                        {ele}
                                    </span>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="div-5 mt-6 flex items-center gap-x-4">
                    <div className="div-a-1  rounded-full border-[1px] flex items-center justify-center p-3 h-5 w-max">
                        <span className='text-xs font-extrabold text-purple-800'>{jobDetails.position} Positions</span>
                    </div>
                    <div className="div-a-1 p-3 h-5 w-max rounded-full border-[1px] flex items-center justify-center">
                        <span className='text-xs font-extrabold text-red-700'>{jobDetails.jobType}</span>
                    </div>
                    <div className="div-a-1 p-3 h-5 w-max rounded-full border-[1px] flex items-center justify-center">
                        <span className='text-xs font-extrabold text-purple-800'>₹{jobDetails.salary}</span>
                    </div>
                </div>
                <div className="div-6 mt-7 flex justify-evenly items-center">
                    <Button className='bg-white border-[1px] border-slate-200 text-slate-800 font-semibold hover:bg-white hover:border-slate-800 hover:cursor-pointer' onClick={handleClick}>More Details</Button>
                    <Button className='bg-red-800 hover:bg-red-900 font-semibold'>Save For Later</Button>
                </div>

            </div>
        </>
    );
}

export default Card;
