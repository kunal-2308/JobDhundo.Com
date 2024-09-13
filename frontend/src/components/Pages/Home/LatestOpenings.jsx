import React from 'react'
import Card from './Card'

function LatestOpenings() {
    let arrayList = [
        {
            name: "Google",
            category: "Development",
            location: "Pune",
            Role: "Frontend Developer",
            description: "Contributed to designing and developing user-friendly web interfaces using HTML, CSS, and JavaScript. Collaborated with the development team to implement responsive designs and optimize performance across various devices and browsers. Gained hands-on experience with modern frameworks and tools, enhancing the overall user experience and functionality of web applications.",
            positions: 10,
            jobType: "Full-Time",
            salary: "500000"
        },
        {
            name: "Microsoft",
            category: "Development",
            location: "Hyderabad",
            Role: "Backend Developer",
            description: "Contributed to designing and developing user-friendly web interfaces using HTML, CSS, and JavaScript. Collaborated with the development team to implement responsive designs and optimize performance across various devices and browsers. Gained hands-on experience with modern frameworks and tools, enhancing the overall user experience and functionality of web applications.",
            positions: 8,
            jobType: "Full-Time",
            salary: "650000"
        },
        {
            name: "Amazon",
            category: "E-Commerce",
            location: "Bangalore",
            Role: "Full Stack Developer",
            description: "Contributed to designing and developing user-friendly web interfaces using HTML, CSS, and JavaScript. Collaborated with the development team to implement responsive designs and optimize performance across various devices and browsers. Gained hands-on experience with modern frameworks and tools, enhancing the overall user experience and functionality of web applications.",
            positions: 12,
            jobType: "Part-Time",
            salary: "450000"
        },
        {
            name: "Google",
            category: "Development",
            location: "Pune",
            Role: "Frontend Developer",
            description: "Contributed to designing and developing user-friendly web interfaces using HTML, CSS, and JavaScript. Collaborated with the development team to implement responsive designs and optimize performance across various devices and browsers. Gained hands-on experience with modern frameworks and tools, enhancing the overall user experience and functionality of web applications.",
            positions: 10,
            jobType: "Full-Time",
            salary: "500000"
        },
        {
            name: "Microsoft",
            category: "Development",
            location: "Hyderabad",
            Role: "Backend Developer",
            description: "Contributed to designing and developing user-friendly web interfaces using HTML, CSS, and JavaScript. Collaborated with the development team to implement responsive designs and optimize performance across various devices and browsers. Gained hands-on experience with modern frameworks and tools, enhancing the overall user experience and functionality of web applications.",
            positions: 8,
            jobType: "Full-Time",
            salary: "650000"
        },
        {
            name: "Amazon",
            category: "E-Commerce",
            location: "Bangalore",
            Role: "Full Stack Developer",
            description: "Contributed to designing and developing user-friendly web interfaces using HTML, CSS, and JavaScript. Collaborated with the development team to implement responsive designs and optimize performance across various devices and browsers. Gained hands-on experience with modern frameworks and tools, enhancing the overall user experience and functionality of web applications.",
            positions: 12,
            jobType: "Part-Time",
            salary: "450000"
        },
    ]
    
    return (
        <>
            <div className='main-container mt-20'>
                <span className="text-4xl font-bold mr-2 text-red-800 ml-28">Latest and Top</span>
                <span className='text-4xl font-bold'>Job Openings</span>
                <div className="mt-7 grid grid-rows-2 grid-cols-3 gap-8 mx-14">
                    {
                        arrayList.map((ele, index) => {
                            return <Card jobDetails={ele} key={index} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default LatestOpenings
