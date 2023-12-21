import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NavbarExplore from "../../components/Navbar/NavbarExplore";
import Hero from "../../components/Hero/Hero";
import Post from "@/src/components/PostCard/Post";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import LoginDialog from "../../components/Login/LoginDialog/LoginDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import "./Landing.css";
import { AuthorizeContext } from "@/src/contexts/auth";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";

import API from "../../services/apiClient";

const Landing = () => {
  const { currentUser } = useContext(AuthorizeContext);
  const [mostLikedDates, setMostLikedDates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchMostLikedDates = async () => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 100));
      try {
        const response = await API.getDates([], "likes");
        if (response.data) {
          setMostLikedDates(response.data.dates.slice(0, 3)); // Take the top 3 most liked dates
        } else {
          console.error("Failed to fetch dates:", response.error);
        }
      } catch (error) {
        console.error("There was an error fetching the dates:", error);
      }
      setIsLoading(false);
    };
    fetchMostLikedDates();
  }, []);

  return (
    <>
      <Hero />
      <div className="my-8">
        <h2 className="text-4xl text-center font-bold">Trending</h2>
        <div className="relative my-8 mx-10">
          <div className="flex justify-center items-center">
            {isLoading ? (
              <LoadingProgress />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
                {mostLikedDates.map((date) => (
                  <Post key={date._id} date={date} />
                ))}
              </div>
            )}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex justify-center">
              <Button className="w-40 h-15 transition delay-100 duration-300 ease-in-out hover:bg-primary-hover text-xl min-w-[100px] max-w-xs mb-4 sm:mb-0">
                See More
              </Button>
            </div>
          </DialogTrigger>
          <LoginDialog />
        </Dialog>
      </div>
    </>
  );
};

export default Landing;
