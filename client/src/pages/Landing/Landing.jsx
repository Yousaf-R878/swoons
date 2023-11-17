import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import PostCard from "@/src/components/PostCard/PostCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import LoginDialog from "../../components/Login/LoginDialog/LoginDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import "./Landing.css";

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="my-8">
        <h2 className="text-4xl text-center font-bold">Recent Activity</h2>
        <div className="relative blur-endings my-8 mx-4">
          <div className="flex justify-center items-center">
            <ScrollArea className="w-full whitespace-nowrap rounded-md border-2">
              <div className="flex w-max space-x-4 p-4">
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
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
