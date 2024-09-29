import React, { useEffect, useState } from 'react';
import Card from './Card';
import axios from 'axios';
import { toast } from 'sonner';

function LatestOpenings() {
    const [arrayList, setArrayList] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/job/user/joblist', {
                    withCredentials: true,
                });

                // Ensure the response data is an array before setting it
                if (Array.isArray(response.data.jobList)) {
                    setArrayList(response.data.jobList);
                } else {
                    toast.error('Invalid data format received from the API');
                }
            } catch (error) {
                console.log(error);
                toast.error('Failed to fetch job listings');
            }
        };
        getData();
    }, []);

    return (
        <>
            <div className="main-container mt-20">
                <span className="text-4xl font-bold mr-2 text-red-800 ml-28">Latest and Top</span>
                <span className="text-4xl font-bold">Job Openings</span>
                <div className="mt-7 grid grid-rows-2 grid-cols-3 gap-8 mx-14">
                    {arrayList.length > 0 ? (
                        arrayList.slice(0, 6).map((ele, index) => <Card jobDetails={ele} key={index} />)
                    ) : (
                        <p>No job openings available</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default LatestOpenings;
