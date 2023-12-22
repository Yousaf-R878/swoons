import React from "react";
import THero from "../../assets/THero.png";
import { Button } from "@/components/ui/button";

const Hero = ({scrollToLearnMore}) => {
  return (
    <div className="bg-secondary h-[50vh] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-3/5 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-white leading-tight mb-6">
          Unforgettable Moments, Seamless Dates.{" "}
          </h1>
          <p className="text-white text-lg mb-6">
          Welcome to Swoons, where every date becomes a curated experience! Create and share your perfect moments with ease, as Swoons takes you on a journey of seamless connections. From charming cafes to scenic strolls, craft your ideal date by selecting from a variety of handpicked events and places. Elevate your dating game with Swoons – because extraordinary connections deserve extraordinary experiences. Get ready to embark on unforgettable dates, one Swoon at a time!
          </p>
          <Button onMouseUp={scrollToLearnMore} className="bg-white text-black w-40 h-15 transition delay-100 duration-300 ease-in-out hover:bg-white-hover text-xl min-w-[100px] max-w-xs mb-4 sm:mb-0">
            Learn More
          </Button>
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

  );
};

export default Hero;
