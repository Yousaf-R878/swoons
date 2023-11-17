import React from "react";
import THero from "../../assets/THero.png";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-secondary h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-3/5 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Lorem ipsum dolor sit amet{" "}
          </h1>
          <p className="text-white text-lg mb-6">
            Lorem ipsum dolor sit amet consectetur. Blandit etiam sed turpis
            eget feugiat nec tincidunt eget. Cras ornare scelerisque dignissim
            vel facilisi massa magna in. Pulvinar a sodales neque sed faucibus
            arcu massa nisi. Praesent eu at eu arcu massa eget. Eget a risus
            faucibus lorem vitae volutpat suspendisse tempor ut. Ut lorem.
          </p>
          {/* Add your CTA buttons here */}
        </div>
        <div className="md:w-1/3 h-full flex justify-center md:justify-end items-center">
          <img
            src={THero}
            alt="Hero"
            className="object-contain h-full w-auto md:w-full md:max-w-none"
          />
        </div>
      </div>
    </div>

    // <>
    //   <div className="flex flex-col md:flex-row items-center justify-center bg-secondary border-gray-200 border-b-2 border-t-2">
    //     <div className="w-full md:w-1/2">
    // <img
    //   src={HeroImage}
    //   alt="Hero"
    //   className="w-full h-auto object-cover"
    // />
    //     </div>
    //     <div className="w-full md:w-1/2 p-4 md:p-8 text-center">
    //       <h1 className="text-5xl font-bold mb-8 text-white">
    //         Lorem ipsum dolor sit amet{" "}
    //       </h1>
    //       <p className="text-xl mb-8 text-white">
    //         Lorem ipsum dolor sit amet consectetur. Blandit etiam sed turpis
    //         eget feugiat nec tincidunt eget. Cras ornare scelerisque dignissim
    //         vel facilisi massa magna in. Pulvinar a sodales neque sed faucibus
    //         arcu massa nisi. Praesent eu at eu arcu massa eget. Eget a risus
    //         faucibus lorem vitae volutpat suspendisse tempor ut. Ut lorem.
    //       </p>
    //       <Button className="bg-white text-black w-40 h-15 transition delay-100 duration-300 ease-in-out hover:bg-white-hover text-xl min-w-[100px] max-w-xs mb-4 sm:mb-0">
    //         Learn More
    //       </Button>
    //       {/* <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
    //         Learn More
    //       </button> */}
    //     </div>
    //   </div>
    // </>
  );
};

export default Hero;
