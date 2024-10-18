import React, { useEffect, useState } from 'react';
import Card from './Card';
import FilterCard from './FilterCard';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function JobContainer() {
    const [jobArray, setJobArray] = useState([]);
    const location = useLocation();

    const getQueryParams = () => {
        const params = new URLSearchParams(location.search);
        const filters = {
            location: params.get('location') || 'All',
            role: params.get('role') || 'All',
            jobType: params.get('jobType') || 'All'
        };
        return filters;
    };

    useEffect(() => {
        const filters = getQueryParams();
        const queryString = Object.keys(filters)
            .map((key) => (filters[key] !== 'All' ? `${key}=${filters[key]}` : null))
            .filter((param) => param)
            .join('&');

        const fetchJobs = async () => {
            try {
                const response = await axios.get(
                    queryString ? `http://localhost:8000/api/v1/job/search?${queryString}` : 'http://localhost:8000/api/v1/job/search',
                    { withCredentials: true }
                );

                console.log('API Response:', response.data);

                if (Array.isArray(response.data.jobList)) {
                    setJobArray(response.data.jobList);
                } else {
                    console.error('Expected an array, but received:', response.data);
                    setJobArray([]);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setJobArray([]);
            }
        };

        fetchJobs();
    }, [location.search]);

    return (
        <>
            <div className="div-main-results w-full mt-20 ml-32">
                <span className='font-bold text-xl'>Search Results ({jobArray.length})</span>
            </div>
            <div className='flex p-10 items-start gap-20 ml-5'>
                <FilterCard />
                <div className="main-container grid grid-cols-2 justify-center items-center gap-x-10">
                    {jobArray.map((ele, index) => {
                        return <Card jobDetails={ele} key={index}></Card>
                    })}
                </div>
            </div>
        </>
    );
}

export default JobContainer;
