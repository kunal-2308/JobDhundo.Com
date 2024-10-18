import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@radix-ui/react-label';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function FilterCard() {
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedJobType, setSelectedJobType] = useState('All');

  const cityRadios = ['All', 'Bangalore', 'Hyderabad', 'Pune', 'Delhi', 'Mumbai'];
  const roleRadios = ['Frontend Developer', 'Backend Developer', 'ML Engineer', 'Data Engineer', 'UI Developer'];
  const jobRadios = ['Full-Time', 'Internship', 'Hybrid', 'Remote'];

  const navigate = useNavigate();

  const updateURL = () => {
    const params = new URLSearchParams();

    // Append query parameters for each filter if not 'All'
    if (selectedLocation !== 'All') {
      params.append('location', selectedLocation);
    }
    if (selectedRole !== 'All') {
      params.append('role', selectedRole.split(' ').join('+')); // Handle spaces in role
    }
    if (selectedJobType !== 'All') {
      params.append('jobType', selectedJobType);
    }

    // Navigate to the new URL with the updated query parameters
    navigate(`/jobs/?${params.toString()}`);
  };

  // Call updateURL whenever any filter changes
  useEffect(() => {
    updateURL();
  }, [selectedLocation, selectedRole, selectedJobType]);

  const handleRadioChange = (value, filterType) => {
    switch (filterType) {
      case 'location':
        setSelectedLocation(value);
        break;
      case 'role':
        setSelectedRole(value);
        break;
      case 'jobType':
        setSelectedJobType(value);
        break;
      default:
        console.error('Invalid filter type:', filterType);
    }
  };

  return (
    <div className="main-filter-card-container min-w-[260px] w-auto min-h-[900px] h-auto shadow-xl rounded-xl mt-8 ml-11 bg-white">
      <div className="div-1 flex items-center border-b-[1px] border-slate-300 p-4 m-2">
        <span className="font-bold text-xl">Filter Jobs</span>
      </div>
      <div className="div-2-container-radios pl-2 pr-3">
        {/* Location filter */}
        <div className="div-s-1 flex flex-col justify-start items-start">
          <div className="div-title-section">
            <span>Location</span>
          </div>
          <RadioGroup
            value={selectedLocation}
            onValueChange={(value) => handleRadioChange(value, 'location')}
          >
            {cityRadios.map((ele, index) => (
              <div className="div-sec" key={index}>
                <RadioGroupItem id={`location-${index}`} value={ele} />
                <Label htmlFor={`location-${index}`}>{ele}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Role filter */}
        <div className="div-s-1 flex flex-col justify-start items-start mt-4">
          <div className="div-title-section">
            <span>Role</span>
          </div>
          <RadioGroup
            value={selectedRole}
            onValueChange={(value) => handleRadioChange(value, 'role')}
          >
            {roleRadios.map((ele, index) => (
              <div className="div-sec" key={index}>
                <RadioGroupItem id={`role-${index}`} value={ele} />
                <Label htmlFor={`role-${index}`}>{ele}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Job Type filter */}
        <div className="div-s-1 flex flex-col justify-start items-start mt-4">
          <div className="div-title-section">
            <span>Job Type</span>
          </div>
          <RadioGroup
            value={selectedJobType}
            onValueChange={(value) => handleRadioChange(value, 'jobType')}
          >
            {jobRadios.map((ele, index) => (
              <div className="div-sec" key={index}>
                <RadioGroupItem id={`jobType-${index}`} value={ele} />
                <Label htmlFor={`jobType-${index}`}>{ele}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

export default FilterCard;
