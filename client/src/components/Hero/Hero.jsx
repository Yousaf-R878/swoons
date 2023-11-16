import React from "react";
import HeroImage from "../../assets/Hero.jpg";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center bg-secondary">
        {/* Image Container */}
        <div className="w-full md:w-1/2">
          <img
            src={HeroImage}
            alt="Hero"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Text Container */}
        <div className="w-full md:w-1/2 p-4 md:p-8 text-center">
          <h1 className="text-5xl font-bold mb-8 text-white">
            Lorem ipsum dolor sit amet{" "}
          </h1>
          <p className="text-xl mb-8 text-white">
            Lorem ipsum dolor sit amet consectetur. Blandit etiam sed turpis
            eget feugiat nec tincidunt eget. Cras ornare scelerisque dignissim
            vel facilisi massa magna in. Pulvinar a sodales neque sed faucibus
            arcu massa nisi. Praesent eu at eu arcu massa eget. Eget a risus
            faucibus lorem vitae volutpat suspendisse tempor ut. Ut lorem.
          </p>
          <Button className="bg-white text-black w-1/4 h-15 transition delay-100 duration-300 ease-in-out hover:bg-white-hover text-xl">
            Learn More
          </Button>
          {/* <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
            Learn More
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Hero;
