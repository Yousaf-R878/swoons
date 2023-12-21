import { useEffect, useState, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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

import { X } from "lucide-react";

import { AuthorizeContext } from "../../contexts/auth";

import API from "../../services/apiClient";

const commentSchema = z.object({
    comment: z
        .string()
        .min(1, { message: "Comment must not be empty" })
        .max(140, {
            message: "Comment must be no more than 140 characters",
        })
        .trim(),
});

const ViewCardModal = ({ date, timeStampToDate, Carousel }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { currentUser } = useContext(AuthorizeContext);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(commentSchema),
    });

    const handlePostComment = async (data) => {
        setIsSubmitting(true);
        // console.log("Submitting comment:", data.comment);
        // console.log("Date ID:", date?._id);
        // console.log("User ID:", currentUser?._id);

        try {
            await API.postComment(currentUser._id, date._id, data.comment);
            reset();
            window.location.reload();
        } catch (error) {
            console.error("Failed to post comment", error);
        }
        setIsSubmitting(false);
    };

      const handleDeleteComment = async (timeStamp) => {
          try {
              await API.deleteComment(currentUser._id, date._id, timeStamp);
              window.location.reload(); // or use another method to refresh comments
          } catch (error) {
              console.error("Failed to delete comment", error);
          }
      };

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
                    <form
                        onSubmit={handleSubmit(handlePostComment)}
                        className="w-full flex justify-center items-center"
                    >
                        <Controller
                            name="comment"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="newComment"
                                    placeholder="Leave a comment..."
                                    className={`w-full active:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0 ${
                                        errors.comment ? "border-red-500" : ""
                                    }`}
                                    disabled={isSubmitting}
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="transition delay-100 duration-300 ease-in-out hover:bg-primary-hover text-xl my-2 ml-4"
                        >
                            Comment
                        </Button>
                    </form>
                    {date.comments.map((comment, index) => (
                        <div
                            key={index}
                            className="relative border-2 my-3 rounded-sm"
                        >
                            <div className="flex justify-between items-start p-4">
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {comment.firstName} {comment.lastName}
                                    </h3>
                                    <p className="text-gray-300">
                                        @{comment.username}
                                    </p>
                                    <p className="text-gray-300">
                                        {timeStampToDate(comment.time, true)}
                                    </p>
                                </div>
                                {currentUser._id === comment.userId && (
                                    <button
                                        onClick={() =>
                                            handleDeleteComment(comment.time)
                                        }
                                        className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>
                            <Separator />
                            <p className="px-4 pt-4">{comment.comment}</p>
                        </div>
                    ))}
                </div>
            </DialogFooter>
        </DialogContent>
    );
};

export default ViewCardModal;
