import React from 'react'
import Card from './Card'
import FilterCard from './FilterCard';

function JobContainer() {
    let jobArray = [
        {
            "_id": "66d7396066a9fa41cb2e045e",
            "category": "Development",
            "title": "Frontend Developer",
            "description": "Contributed to designing and developing user-friendly web interfaces using HTML, CSS, and JavaScript. Collaborated with the development team to implement responsive designs and optimize performance across various devices and browsers. Gained hands-on experience with modern frameworks and tools, enhancing the overall user experience and functionality of web applications.",
            "requirements": [
                "HTML",
                "CSS",
                "JavaScript",
                "React"
            ],
            "salary": 2200000,
            "experience": "3",
            "location": "Pune",
            "jobType": "Full-Time",
            "position": 2,
            "company": {
                "_id": "66d70b10381dfb7349021491",
                "companyName": "Google",
                "createdBy": "66d70a10381dfb734902148c",
                "createdAt": "2024-09-03T13:11:44.467Z",
                "updatedAt": "2024-09-03T13:28:57.643Z",
                "__v": 0,
                "description": "Google is a global technology leader known for its search engine, innovative products, and commitment to advancing AI and cloud computing. Founded in 1998, it continues to shape the digital landscape through its wide array of services and cutting-edge research.",
                "website": "https://www.google.com"
            },
            "contactPerson": null,
            "applications": [
                "66d74e45871693841819c73d"
            ],
            "createdAt": "2024-09-03T16:29:20.867Z",
            "updatedAt": "2024-09-03T17:58:29.411Z",
            "__v": 0
        },
        {
            "_id": "66d738672415d637f4a60256",
            "category": "Machine learning",
            "title": "Data Engineer",
            "description": "Assisting in designing and maintaining data pipelines to ensure the efficient collection, storage, and processing of large datasets.",
            "requirements": [
                "SQL",
                "NoSQL",
                "SQLite",
                "AWS",
                "Tableau",
                "PowerBI"
            ],
            "salary": 30000,
            "experience": "2",
            "location": "Mumbai",
            "jobType": "Internship",
            "position": 10,
            "company": {
                "_id": "66d70f9ea65e299843f9492d",
                "companyName": "Meta India",
                "createdBy": "66d70a10381dfb734902148c",
                "createdAt": "2024-09-03T13:31:10.202Z",
                "updatedAt": "2024-09-03T13:44:46.474Z",
                "__v": 0,
                "description": "Meta India focuses on expanding the company's reach and impact across the Indian market, driving innovation in social media, virtual reality, and digital commerce. It plays a key role in connecting users, businesses, and communities through Meta's platforms like Facebook, Instagram, and WhatsApp.",
                "website": "https://about.meta.com/metaverse/"
            },
            "contactPerson": null,
            "applications": [
                "66d7526b5d732e8d0cca0a47",
                "66d81f5cb6c4e50aa6bad115",
                "66d94894aff3b1e9ddb7f12e"
            ],
            "createdAt": "2024-09-03T16:25:11.738Z",
            "updatedAt": "2024-09-05T14:58:56.573Z",
            "__v": 0
        },
        {
            "_id": "66d738672415d637f4a60256",
            "category": "Machine learning",
            "title": "Data Engineer",
            "description": "Assisting in designing and maintaining data pipelines to ensure the efficient collection, storage, and processing of large datasets.",
            "requirements": [
                "SQL",
                "NoSQL",
                "SQLite",
                "AWS",
                "Tableau",
                "PowerBI"
            ],
            "salary": 30000,
            "experience": "2",
            "location": "Mumbai",
            "jobType": "Internship",
            "position": 10,
            "company": {
                "_id": "66d70f9ea65e299843f9492d",
                "companyName": "Meta India",
                "createdBy": "66d70a10381dfb734902148c",
                "createdAt": "2024-09-03T13:31:10.202Z",
                "updatedAt": "2024-09-03T13:44:46.474Z",
                "__v": 0,
                "description": "Meta India focuses on expanding the company's reach and impact across the Indian market, driving innovation in social media, virtual reality, and digital commerce. It plays a key role in connecting users, businesses, and communities through Meta's platforms like Facebook, Instagram, and WhatsApp.",
                "website": "https://about.meta.com/metaverse/"
            },
            "contactPerson": null,
            "applications": [
                "66d7526b5d732e8d0cca0a47",
                "66d81f5cb6c4e50aa6bad115",
                "66d94894aff3b1e9ddb7f12e"
            ],
            "createdAt": "2024-09-03T16:25:11.738Z",
            "updatedAt": "2024-09-05T14:58:56.573Z",
            "__v": 0
        },
        {
            "_id": "66d738672415d637f4a60256",
            "category": "Machine learning",
            "title": "Data Engineer",
            "description": "Assisting in designing and maintaining data pipelines to ensure the efficient collection, storage, and processing of large datasets.",
            "requirements": [
                "SQL",
                "NoSQL",
                "SQLite",
                "AWS",
                "Tableau",
                "PowerBI"
            ],
            "salary": 30000,
            "experience": "2",
            "location": "Mumbai",
            "jobType": "Internship",
            "position": 10,
            "company": {
                "_id": "66d70f9ea65e299843f9492d",
                "companyName": "Meta India",
                "createdBy": "66d70a10381dfb734902148c",
                "createdAt": "2024-09-03T13:31:10.202Z",
                "updatedAt": "2024-09-03T13:44:46.474Z",
                "__v": 0,
                "description": "Meta India focuses on expanding the company's reach and impact across the Indian market, driving innovation in social media, virtual reality, and digital commerce. It plays a key role in connecting users, businesses, and communities through Meta's platforms like Facebook, Instagram, and WhatsApp.",
                "website": "https://about.meta.com/metaverse/"
            },
            "contactPerson": null,
            "applications": [
                "66d7526b5d732e8d0cca0a47",
                "66d81f5cb6c4e50aa6bad115",
                "66d94894aff3b1e9ddb7f12e"
            ],
            "createdAt": "2024-09-03T16:25:11.738Z",
            "updatedAt": "2024-09-05T14:58:56.573Z",
            "__v": 0
        }, 
        {
            "_id": "66d738672415d637f4a60256",
            "category": "Machine learning",
            "title": "Data Engineer",
            "description": "Assisting in designing and maintaining data pipelines to ensure the efficient collection, storage, and processing of large datasets.",
            "requirements": [
                "SQL",
                "NoSQL",
                "SQLite",
                "AWS",
                "Tableau",
                "PowerBI"
            ],
            "salary": 30000,
            "experience": "2",
            "location": "Mumbai",
            "jobType": "Internship",
            "position": 10,
            "company": {
                "_id": "66d70f9ea65e299843f9492d",
                "companyName": "Meta India",
                "createdBy": "66d70a10381dfb734902148c",
                "createdAt": "2024-09-03T13:31:10.202Z",
                "updatedAt": "2024-09-03T13:44:46.474Z",
                "__v": 0,
                "description": "Meta India focuses on expanding the company's reach and impact across the Indian market, driving innovation in social media, virtual reality, and digital commerce. It plays a key role in connecting users, businesses, and communities through Meta's platforms like Facebook, Instagram, and WhatsApp.",
                "website": "https://about.meta.com/metaverse/"
            },
            "contactPerson": null,
            "applications": [
                "66d7526b5d732e8d0cca0a47",
                "66d81f5cb6c4e50aa6bad115",
                "66d94894aff3b1e9ddb7f12e"
            ],
            "createdAt": "2024-09-03T16:25:11.738Z",
            "updatedAt": "2024-09-05T14:58:56.573Z",
            "__v": 0
        },

    ];
    return (
        <>
        <div className='flex p-10 items-start gap-20 ml-20'>
              <FilterCard/>
                <div className="main-container grid grid-cols-2">
                    {
                        jobArray.map((ele, index) => {
                            return <Card jobDetails={ele} key={index}></Card>
                        })
                    }
                </div>
            </div>

        </>
    )
}

export default JobContainer
