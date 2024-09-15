import { AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Avatar } from '@radix-ui/react-avatar';
import { Bookmark } from 'lucide-react';
import React from 'react';

function Card() {
    let desc = "Contributed to designing and developing user-friendly web interfaces using HTML, CSS, and JavaScript. Collaborated with the development team to implement responsive designs and optimize performance across various devices and browsers. Gained hands-on experience with modern frameworks and tools, enhancing the overall user experience and functionality of web applications.";
    const truncatedDescription = desc.split(' ').slice(0, 20).join(' ') + '...';
    let requirements = [
        "HTML",
        "CSS",
        "JavaScript",
        "React"
    ];
    return (
        <>
            <div className="main-card-container max-w-min max-h-min shadow-xl rounded-lg p-6 mt-8 mr-8 transition-transform duration-300 hover:scale-105 bg-white ">
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
                        <span className="text-2xl font-semibold">Google</span>
                        <span className="text-xs font-semibold text-slate-400">Hyderabad</span>
                    </div>
                </div>


                <div className="div-3 ml-2">
                    <span className="text-xl font-bold">Frontend Developer</span>
                </div>
                <div className="div-4-desc ml-2 mt-3">
                    <span className='text-sm font-medium text-slate-500'>{truncatedDescription}</span>
                </div>
                <div className="div-5 mt-5 flex items-center gap-4">
                    {
                        requirements.map((ele, index) => {
                            return (index % 2 == 0 ? <div className="div-a-1 h-5 w-max rounded-full border-[1px] flex items-center justify-center p-3" key={index}>
                                <span className='text-xs font-extrabold text-red-700'>{ele}</span>
                            </div> : <div className="div-a-1 h-5 w-max rounded-full border-[1px] flex items-center justify-center p-3" key={index}>
                                <span className='text-xs font-extrabold text-purple-800'>{ele}</span>
                            </div>)

                        })
                    }
                </div>
                <div className="div-5 mt-3 flex items-center gap-4">
                    <div className="div-a-1  rounded-full border-[1px] flex items-center justify-center p-3 h-5 w-max">
                        <span className='text-xs font-extrabold text-purple-800'>10 Positions</span>
                    </div>
                    <div className="div-a-1 p-3 h-5 w-max rounded-full border-[1px] flex items-center justify-center">
                        <span className='text-xs font-extrabold text-red-700'>Full-Time</span>
                    </div>
                    <div className="div-a-1 p-3 h-5 w-max rounded-full border-[1px] flex items-center justify-center">
                        <span className='text-xs font-extrabold text-purple-800'>₹3000000</span>
                    </div>
                </div>
                <div className="div-6 mt-5 flex justify-evenly items-center">
                    <Button className='bg-white border-[1px] border-slate-200 text-slate-800 font-semibold hover:bg-white hover:border-slate-800 hover:cursor-pointer'>More Details</Button>
                    <Button className='bg-red-800 hover:bg-red-900 font-semibold'>Save For Later</Button>
                </div>

            </div>
        </>
    );
}

export default Card;
