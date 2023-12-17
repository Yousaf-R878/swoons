import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { StarHalf } from "lucide-react";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MessagesSquare } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ViewCardModal from "./ViewCardModal";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

const timeStampToDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

const PostCard = ({ date }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Card className="w-[350px]">
                    <CardHeader>
                        <div className="flex items-center">
                            <Avatar className="w-10 h-10 mr-2">
                                <AvatarImage src="" alt="@shadcn" />
                                <AvatarFallback>
                                    {date.creator.firstName[0]}
                                    {date.creator.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <span>
                                <CardTitle className="text-xl">
                                    {date.title}
                                </CardTitle>
                                <CardDescription className="text-sm">
                                    @{date.creator.username}
                                </CardDescription>
                            </span>
                        </div>
                        <Separator />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            {timeStampToDate(date.timeStamp)}
                        </p>
                        {date.tags.map((tag, index) => (
                            <Badge
                                key={index}
                                className="bg-palecyan mx-1 my-2 h-5 text-xs text-gray-500"
                            >
                                {tag}
                            </Badge>
                        ))}
                        <ScrollArea className="w-full h-40 whitespace-nowrap rounded-md border">
                            <div className="flex w-max space-x-4 p-4">
                                {/* {works.map((artwork) => (
                                    <figure
                                        key={artwork.artist}
                                        className="shrink-0"
                                    >
                                        <div className="overflow-hidden rounded-md">
                                            <img
                                                src={artwork.art}
                                                alt={`Photo by ${artwork.artist}`}
                                                className="h-28 w-28 object-cover"
                                            />
                                        </div>
                                    </figure>
                                ))} */}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="">
                        <Heart size={25} color="#FFA39C" className="mr-2" />
                        <span>{date.likes}</span>
                        {/* Maybe make comments blue? */}
                        <MessagesSquare
                            size={25}
                            color="gray"
                            className="ml-2 mr-2"
                        />
                        <span>{date.commentsCount}</span>
                    </CardFooter>
                </Card>
            </DialogTrigger>
            {/* <ViewCardModal
                // works={works}
                // cardInfo={cardInfo}
                comments={date.comments}
            /> */}
        </Dialog>
    );
};

export default PostCard;
