import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from '@/components/ui/button';
import { Navigate, useNavigate } from 'react-router-dom';

function CarouselSection() {
    let arrayList = [
        "Frontend Developer",
        "Backend Developer",
        "UI Developer",
        "Software Engineer",
        "ML Engineer",
        "FullStack Developer",
        "Data Scientist",
        "DevOps Engineer",
        "QA Analyst"
    ];

    const navigate = useNavigate();

    return (
        <>
            <div className="main-container-carousel flex justify-center items-center mt-14">
                <Carousel className="min-w-max max-w-sm">
                    <CarouselContent className="-ml-1 w-[480px] rounded-full">
                        {arrayList.map((ele, index) => (
                            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <form onSubmit={(e)=>{
                                        e.preventDefault();
                                        navigate(`/?searchBar=${ele}`);
                                    }}>
                                    <Button className="w-full flex items-center justify-center text-center p-4 rounded-full bg-white text-black hover:bg-red-800 hover:cursor-pointer border-[1px] border-slate-300 font-semibold hover:text-white hover:border-none" name="searchBar">
                                        {ele}
                                    </Button>
                                    </form>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

        </>
    );
}

export default CarouselSection;
