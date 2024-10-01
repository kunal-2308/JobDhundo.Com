import React, { useEffect, useState } from 'react';
import Card from '../Jobs/Card';
import axios from 'axios';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';

function JobContainer() {
    const location = useLocation();
    const [jobArray, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Parse the query parameters
        const searchParams = new URLSearchParams(location.search);
        const keyword = searchParams.get('keyword');

        // Decide the API URL based on the presence of the 'keyword'
        let apiURL = 'http://localhost:8000/api/v1/job/user/joblist/';
        if (keyword) {
            apiURL = `${apiURL}?keyword=${keyword}`;
        }

        // Fetch jobs from the API
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await axios.get(apiURL,{withCredentials:true});
                setJobs(response.data.jobList);  // Assuming the response contains 'jobs' data
            } catch (error) {
                console.error('Error fetching job data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [location.search]);  // Runs when the URL changes




    return (
        <>
        {!loading ? <div className="div">
                <div className="div-main-results w-full mt-20 ml-44">
                    <span className="font-bold text-xl">Search Results ({jobArray.length})</span>
                </div>
                <div className="main-container flex justify-center mt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            jobArray.length > 0 ? (
                                jobArray.map((ele, index) => (
                                    <Card jobDetails={ele} key={index} />
                                ))
                            ) : (
                                <span>No jobs found</span> // Show message if no jobs are found
                            )
                        }
                    </div>
                </div>
            </div>:
            <div className='loading-container flex flex-row w-full justify-center items-center mt-10'>
                    <Loader className='animate-spin'></Loader>
                    <span>Loading...</span>
                </div>}
            
        </>
    );
}

export default JobContainer;
