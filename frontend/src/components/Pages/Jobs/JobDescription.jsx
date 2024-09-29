import Navbar from '@/components/shared/Navbar';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function JobDescription() {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);  // Initialize as null to handle loading state
  const [applyState, setApplyState] = useState(false);
  let jobList = useSelector((state) => state.jobSlice.jobApplied);
  const dispatch = useDispatch();
  let [date, setDate] = useState('');

  useEffect(() => {
    let getData = async () => {
      let response = await axios.get('http://localhost:8000/api/v1/application/applied', {
        withCredentials: true,
      });

      let applicationArray = response.data.applications;
      let jobArray = [];
      for (let i = 0; i < applicationArray.length; i++) {
        jobArray.push(applicationArray[i].job._id);
      }
      localStorage.setItem('jobList', JSON.stringify(jobArray));
    }
    getData();
  }, [applyState, id]);


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/job/description/${id}`, {
          withCredentials: true,
        });
        setJobData(response.data);
        toast.success('Job details fetched successfully!');
        let prior = response.data.jobDetails.createdAt.split('T')[0];
        setDate(prior);
      } catch (error) {
        toast.error('Failed to fetch job details');
        console.error('Error fetching job details:', error);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    const hasApplied = jobList.some(job => job === id); // Check if the job has been applied for
    setApplyState(hasApplied);
  }, [jobList, id]); // Update applyState whenever jobList or id changes

  if (!jobData || !jobData.jobDetails) {
    return (
      <div className="main-Container w-full flex flex-row justify-center items-center mt-16 gap-x-2">
        <Loader className='animate-spin'></Loader>
        <span>Loading...</span>
      </div>
    );
  }
  const handleApply = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`http://localhost:8000/api/v1/application/apply/${id}`, {}, {
        withCredentials: true, // Include this if your server needs credentials
      });
      toast.success(response.data.message);
      // dispatch(applyJob(id));
      setApplyState(true); // Update applyState to reflect the change
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while applying. Please try again.';
      toast.error(errorMessage);
      console.error('Error applying for job:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-Container w-full flex flex-col justify-center items-center mt-16">
        <div className="div-card-container w-[80%] h-auto border-b-2 border-gray-300 pb-2">
          <div className="div-1-sec-a flex justify-between items-center">
            <span className='text-2xl font-bold'>{jobData.jobDetails.title}</span>
            {!applyState ? (
              <Button className='bg-purple-800 text-white' onClick={handleApply}>Apply Now</Button>
            ) : (
              <Button disabled className="disabled:bg-gray-700 disabled:cursor-not-allowed">
                Already Applied
              </Button>
            )}
          </div>
          <div className="div-2-sec-b flex gap-x-2 mt-3">
            <div className="div-tag-1 border-[1px] w-[100px] flex justify-center items-center rounded-full p-1 h-[25px]">
              <span className='text-sm font-bold text-blue-800'>{jobData.jobDetails.position} Positions</span>
            </div>
            <div className="div-tag-1 border-[1px] w-[100px] flex justify-center items-center rounded-full p-1 h-[25px]">
              <span className='text-sm font-bold text-red-800'>{jobData.jobDetails.jobType}</span>
            </div>
            <div className="div-tag-1 border-[1px] w-[100px] flex justify-center items-center rounded-full p-1 h-[25px]">
              <span className='text-sm font-bold text-purple-800'>₹{jobData.jobDetails.salary}</span>
            </div>
            <div className="div-tag-1 border-[1px] w-auto flex justify-center items-center rounded-full p-1 h-[25px] pl-3 pr-3">
              <span className='text-sm font-bold text-red-800'>{jobData.jobDetails.category}</span>
            </div>
          </div>
          <div className="div-3-sec-b mt-8">
            <span className='text-base font-bold text-black/80'>Job Description</span>
          </div>
        </div>
        <div className="div-card-container-content w-[80%] h-auto flex flex-col mt-5 justify-start items-start gap-y-3">
          <div className="div-content flex justify-center items-center min-w-max">
            <span className='font-extrabold text-base mr-3'>Role:</span>
            <span className='text-base font-normal text-black/50'>{jobData.jobDetails.title}</span>
          </div>
          <div className="div-content flex flex-row">
            <span className='font-extrabold text-base mr-3'>Company:</span>
            <span className='text-base font-normal text-black/50'>{jobData.jobDetails.company.companyName}</span>
          </div>
          <div className="div-content flex flex-row">
            <span className='font-extrabold text-base mr-3'>Location:</span>
            <span className='text-base font-normal text-black/50'>{jobData.jobDetails.location}</span>
          </div>
          <div className="div-content flex flex-row w-[90%]">
            <span className='font-extrabold text-base mr-3'>Description:</span>
            <span className='text-base font-normal text-black/50'>{jobData.jobDetails.description}</span>
          </div>
          <div className="div-content flex flex-row">
            <span className='font-extrabold text-base mr-3'>Experience:</span>
            <span className='text-base font-normal text-black/50'>{jobData.jobDetails.experience}</span>
          </div>
          <div className="div-content flex flex-row">
            <span className='font-extrabold text-base mr-3'>Salary:</span>
            <span className='text-base font-normal text-black/50'>₹{jobData.jobDetails.salary}</span>
          </div>
          <div className="div-content flex flex-row">
            <span className='font-extrabold text-base mr-3'>Total Applicants:</span>
            <span className='text-base font-normal text-black/50'>{jobData.jobDetails.applications.length}</span>
          </div>
          <div className="div-content flex flex-row">
            <span className='font-extrabold text-base mr-3'>Posted Date:</span>
            <span className='text-base font-normal text-black/50'>{date}</span> {/* Use actual posted date */}
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDescription;
