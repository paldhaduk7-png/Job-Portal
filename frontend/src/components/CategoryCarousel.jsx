import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";


const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Science",
  "AI / ML",
  "Cyber Security",
  "Cloud",
  "DevOps",
  "UI/UX Designer",
  "Mobile Developer"
];

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-xl  mx-auto my-28">
        <CarouselContent>
          
                  {
                    category.map((cat,index)=>(
          
                      <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3">
                               <Button variant="outline" className="rounded-full ">{cat}</Button>
                           </CarouselItem>
                      
                    ))
                  }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
