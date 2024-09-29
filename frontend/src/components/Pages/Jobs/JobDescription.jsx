import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

function JobDescription() {
  const { id } = useParams();  // Correcting the parameter to match the route
  const [company, setCompany] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/job/description/${id}`,{
          withCredentials:true
        });
        const data = response.data.jobDetails[0].company.companyName;
        setCompany(data);
        toast.success("Job details fetched successfully!");
      } catch (error) {
        toast.error("Failed to fetch job details");
        console.error("Error fetching job details:", error);
      }
    };

    getData();
  }, [id]);  // Adding jobId to the dependency array

  return (
    <div>
      <h1>{company ? `Company: ${company}` : "Loading company details..."}</h1>
    </div>
  );
}

export default JobDescription;
