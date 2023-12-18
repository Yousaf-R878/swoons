import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import React, { useMemo } from "react";
import Carousel from "nuka-carousel";
import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageCircle, Forward } from "lucide-react";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { Separator } from "@radix-ui/react-select";
import ViewCardModal from "./ViewCardModal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const timeStampToDate = (timeStamp) => {
  const date = new Date(timeStamp);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const Post = ({ date }) => {
  // const { name, username, title, badges, likes, comments } = cardInfo;
  // conglomerate first image of every event into an images array
  const images = date.events.map((event) => event.tripAdvisorLocationImages[0]);
  return (
    <Card className="post-card bg-white shadow-md rounded-lg overflow-hidden max-w-md mx-auto flex flex-col">
      <CarouselCmp images={images}/>
      <CardContent className="p-4 flex-grow">
        <div className="flex flex-wrap gap-2 mb-4">
          {date.tags.map((tag, index) => (
            <Badge
              key={index}
              className="bg-blue-100 hover:bg-blue-200 transition-colors duration-300 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-md font-semibold">{date.title}</h1>
        <CardDescription className="text-sm">
          @{date.creator.username}
        </CardDescription>
        <p className="text-sm text-gray-500">
          {timeStampToDate(date.timeStamp)}
        </p>
        <p className="text-sm text-gray-600 mb-4">{date.description}</p>
      </CardContent>
      <CardFooter className="flex space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <Button
          variant="primary"
          className="flex flex-grow items-center justify-center rounded-md bg-white transition-colors duration-300 hover:bg-slate-200 text-primary p-2 text-xs"
        >
          <ThumbsUp className="h-4 w-4" /> <span>{date.likes}</span>
        </Button>
        <div className="flex flex-grow items-center justify-center rounded-md bg-white text-gray-700 p-2 text-xs">
          <MessageCircle className="h-4 w-4" />{" "}
          <span>{date.commentsCount}</span>
        </div>
          
        <Dialog>
          <DialogTrigger>
            <Button
              as="a"
              href="link-to-post"
              className="flex flex-grow items-center justify-center rounded-md bg-secondary transition-colors duration-300 hover:bg-secondary-hover text-white p-2 text-xs"
            >
              <Forward className="h-4 w-4" /> <span>View Post</span>
            </Button>
          </DialogTrigger>
          <ViewCardModal date={date} timeStampToDate={timeStampToDate} Carousel={CarouselCmp} />
        </Dialog>
        
      </CardFooter>
    </Card>
  );
};

export default Post;

export const renderCenterLeftControls = ({
  previousDisabled,
  previousSlide,
}) => (
  <button
    className={clsx(
      "bg-transparent border-none",
      "cursor-pointer disabled:cursor-not-allowed",
      "appearance-none flex items-center m-3",
      "text-black opacity-70 hover:opacity-100 disabled:opacity-30"
    )}
    disabled={previousDisabled}
    onClick={previousSlide}
    aria-label="Go to previous slide"
  >
    <BsFillArrowLeftCircleFill size={32} />
  </button>
);

export const renderCenterRightControls = ({ nextDisabled, nextSlide }) => (
  <button
    className={clsx(
      "bg-transparent border-none",
      "cursor-pointer disabled:cursor-not-allowed",
      "appearance-none flex items-center m-3",
      "text-black opacity-70 hover:opacity-100 disabled:opacity-30"
    )}
    disabled={nextDisabled}
    onClick={nextSlide}
    aria-label="Go to next slide"
  >
    <BsFillArrowRightCircleFill size={32} />
  </button>
);

const CarouselCmp = ({
  wrapAround = false,
  autoplay = false,
  startIndex = 0,
  className = "",
  classStuff = "",
  imgWidth = "54rem",
  imgHeight = "16rem",
  images = []
}) => {
  const carouselParams = useMemo(() => {
    if (typeof window === "undefined") return {};
    const searchParams = new URLSearchParams(window.location.search);
    let paramsString = searchParams.get("params");
    if (paramsString)
      paramsString = paramsString.substr(1, paramsString.length - 2);
    else return {};
    return JSON.parse(paramsString);
  }, []);

  let imagery = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

  return (
    <div className={clsx(className)}>
      <Carousel
        frameAriaLabel="Carousel Demo"
        slideIndex={startIndex}
        wrapAround={wrapAround}
        autoplay={autoplay}
        autoplayInterval={2000}
        renderCenterLeftControls={renderCenterLeftControls}
        renderCenterRightControls={renderCenterRightControls}
        {...carouselParams}
        style={imgWidth != "54rem" ? {width: imgWidth, height: imgHeight} : {}}
      >
        {images.map((image, index) => (
          <img key={index} src={image} className={classStuff} style={{width: imgWidth, height: imgHeight}} />
        ))}
      </Carousel>
    </div>
  );
};
