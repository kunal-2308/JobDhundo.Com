import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@radix-ui/react-label';
import React from 'react';

function FilterCard() {
  let cardArray = [
    {
      name: "Location",
      radios: ['All', 'Banglore', 'Hyderabad', 'Pune', 'Delhi', 'Kochi']
    },
    {
      name: 'Category',
      radios: ['Frontend Developer', 'Backend Developer', 'ML Engineer', 'Data Engineer', 'UI UX Designer']
    },
    {
      name: 'Salary',
      radios: ['0-50000', '50001-100000', '110000+'],
    },
    {
      name: 'Job Type',
      radios: ['Full-Time', 'Internship', 'Hybrid', 'Remote']
    }
  ];
  
  
  return (
    <>
      <div className="main-filter-card-container w-[260px] h-[900px] shadow-xl rounded-xl mt-8 ml-11 bg-white">
        <div className="div-1 flex items-center border-b-[1px] border-slate-300 p-4 m-2">
          <span className='font-bold text-xl'>Filter Jobs</span>
        </div>
        <div className="div-2-1 flex flex-col justify-center items-start pl-7">
          {
            cardArray.map((ele, index) => {
              return (
                <div className='div-1-filter-head mt-5' key={index}>
                  <span className='font-bold text-xl'>{ele.name}</span>
                  <div className="div-2-filter-content mt-3">
                    <RadioGroup defaultValue="All">
                      {ele.radios.map((item, radioIndex) => {
                        return (
                          <div className='filter-radio-items' key={radioIndex}>
                            <RadioGroupItem value={item} className='mr-1' />
                            <Label htmlFor={item} className='text-base font-medium text-slate-600'>{item}</Label>
                          </div>
                        );
                      })}
                    </RadioGroup>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
}

export default FilterCard;
