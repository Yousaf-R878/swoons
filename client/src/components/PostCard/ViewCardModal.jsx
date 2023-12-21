import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

const ViewCardModal = ({ date, timeStampToDate, Carousel }) => {
    useEffect(() => {
        // console.log(date);
    });

    return (
        <DialogContent className="sm:max-w-[925px] sm:max-h-[700px] overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="text-2xl text-center">
                    {date.title}
                </DialogTitle>
                <div className="flex flex-col justify-center items-center">
                    <p className="text-xl mr-2 text-gray-300">
                        By: {date.creator.username}
                    </p>
                    <div className="flex flex-row">
                        {date.tags.map((badge, index) => (
                            <Badge
                                key={index}
                                className="bg-palecyan my-2 mx-1 h-5 text-xs text-gray-500"
                            >
                                {badge}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex flex-row">
                        <Heart size={30} color="#FFA39C" className="mr-2" />
                        <span>{date.likes}</span>
                        {/* Maybe make comments blue? */}
                        <MessagesSquare
                            size={30}
                            color="gray"
                            className="ml-2 mr-2"
                        />
                        <span>{date.commentsCount}</span>
                    </div>
                </div>
                <Separator />
            </DialogHeader>
            <div className="flex items-center my-4 flex-col">
                {date.events.map((event, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center w-full py-10"
                    >
                        <Carousel
                            images={event.tripAdvisorLocationImages}
                            classStuff="w-56 h-56 mr-4  rounded-sm"
                            imgWidth="14rem"
                            imgHeight="14rem"
                        />
                        <div className="flex w-full flex-col px-10">
                            <div className="flex flex-col justify-center items-start text-xl font-bold">
                                <h2>{event.name}</h2>
                                <Separator />
                            </div>
                            <p className="pt-4">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Separator />
            <DialogFooter>
                <div className="flex flex-col w-full">
                    <div className="flex justify-center items-center w-full">
                        <Input
                            id="newComment"
                            placeholder="Leave a comment..."
                            className="w-full active:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0"
                        />
                        <Button className="transition delay-100 duration-300 ease-in-out hover:bg-primary-hover text-xl my-2 ml-4">
                            Comment
                        </Button>
                    </div>
                    {date.comments.map((comment, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center w-full py-5 my-3 rounded-sm border-2"
                        >
                            <div className="flex w-full flex-col px-2">
                                <div className="flex flex-col justify-center items-start">
                                    <h3 className="text-xl font-bold">
                                        {comment.username}
                                    </h3>
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <p className="mr-2 text-gray-300">
                                            {comment.username}
                                        </p>
                                        <p className="text-gray-300">
                                            {timeStampToDate(comment.time)}
                                        </p>
                                    </div>
                                </div>
                                <Separator />
                                <p className="pt-4">{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogFooter>
        </DialogContent>
    );
};

export default ViewCardModal;
