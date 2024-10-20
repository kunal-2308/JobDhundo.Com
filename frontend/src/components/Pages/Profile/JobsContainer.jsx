import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function JobsContainer() {
    const userData = useSelector((state) => state.uLogin.user);
    const role = userData.role;
    const [visible, setVisible] = useState(false);
    const [jobArray, setJobArr] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 4; // Only show 4 jobs per page

    useEffect(() => {
        // Fetch applied jobs from the API
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/application/applied`, {
                    withCredentials: true
                });

                const jobs = response.data.applications;
                setJobArr(jobs);

                // Set visibility based on whether there are any jobs for a student
                if (jobs.length > 0 && role === 'Student') {
                    setVisible(true);
                } else {
                    setVisible(false);
                }

            } catch (error) {
                console.error("Error fetching applied jobs:", error);
                toast.error("No Applied Jobs Found");
            }
        };

        fetchJobs();
    }, [role]);

    // Calculate the jobs to display for the current page
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobArray.slice(indexOfFirstJob, indexOfLastJob);

    // Handle pagination change
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {visible ? (
                <div className='flex flex-col justify-center items-center mt-20'>
                    <div className="div-main-container w-[50%] flex flex-col justify-center items-center border-[3px] border-red-800 p-5 rounded-lg">
                        <div className="section-1 w-full pl-14 pt-2">
                            <span className='text-red-800 font-extrabold text-xl mr-1'>APPLIED</span>
                            <span className='text-black font-bold text-xl'>JOBS</span>
                        </div>
                        <div className="div-cards-section mt-3 pl-5 w-full">
                            {currentJobs.map((ele, index) => (
                                <div className="card-container w-full h-auto flex justify-between items-center mt-3 hover:shadow-xl p-5 rounded-lg hover:cursor-pointer pr-5 transform transition-transform duration-300 hover:scale-105" key={index}>
                                    <div className="div-1-card-info flex justify-center items-center gap-x-5">
                                        <div className="img-logo-company">
                                            <Avatar className="">
                                                <AvatarImage
                                                    src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg"
                                                    className="w-12 h-12 object-cover rounded-full"
                                                    alt="Company Logo"
                                                />
                                            </Avatar>
                                        </div>
                                        <div className="content-card flex flex-col justify-start items-start">
                                            <span className='text-xl font-bold text-black/80'>{ele.job?.company?.companyName}</span>
                                            <span className='text-xs font-medium text-gray-500'>{ele.job?.title}</span>
                                        </div>
                                    </div>
                                    <div className={`div-2-status flex justify-center items-center w-[90px] h-[30px] rounded-full ${ele.status === 'Pending' ? 'bg-yellow-400' : ele.status === 'Rejected' ? 'bg-red-700' : 'bg-green-600'}`}>
                                        <span className={`text-sm font-semibold ${ele.status === 'Pending' ? 'text-black/75' : 'text-white'}`}>{ele.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Component */}
                        <div className="mt-4">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" onClick={() => paginate(currentPage - 1)} />
                                    </PaginationItem>
                                    {[...Array(Math.ceil(jobArray.length / jobsPerPage)).keys()].map((number) => (
                                        <PaginationItem key={number + 1}>
                                            <PaginationLink href="#" onClick={() => paginate(number + 1)} isActive={currentPage === number + 1}>
                                                {number + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext href="#" onClick={() => paginate(currentPage + 1)} />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default JobsContainer;
