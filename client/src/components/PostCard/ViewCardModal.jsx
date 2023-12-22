import { useEffect, useState, useContext } from "react";
import { useForm, Controller, set } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import { AuthorizeContext } from "../../contexts/auth";
import LoginDialog from "../Login/LoginDialog/LoginDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import API from "../../services/apiClient";
import { DialogDescription } from "@radix-ui/react-dialog";

const commentSchema = z.object({
    comment: z
        .string()
        .min(1, { message: "Comment must not be empty" })
        .max(140, {
            message: "Comment must be no more than 140 characters",
        })
        .trim(),
});

const ViewCardModal = ({
    date,
    timeStampToDate,
    Carousel,
    handleLike,
    isLiked,
    likesCount,
    setIsLiked,
    setLikesCount,
    showLoginDialog,
    setShowLoginDialog
}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { currentUser } = useContext(AuthorizeContext);
    const [notSubmitted, setNotSubmitted] = useState(true);
    const [commentDialogue, setCommentDialogue] = useState("Comment successfully posted!");

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(commentSchema),
    });

    useEffect(() => {
        if (!currentUser) {
            // console.log("No user is signed in.");
        }
    }, [currentUser]);

    const handlePostComment = async (data) => {
        if (!currentUser) {
            setShowLoginDialog(true);
            return;
        }
        setIsSubmitting(true);
        // console.log("Submitting comment:", data.comment);
        // console.log("Date ID:", date?._id);
        // console.log("User ID:", currentUser?._id);

        try {
            await API.postComment(currentUser._id, date._id, data.comment);
            reset();
            setNotSubmitted(false);
            setCommentDialogue("Comment successfully posted!");
            //window.location.reload();
            setTimeout(() => {
                window.location.reload(true);
            }, 2000);
        } catch (error) {
            setCommentDialogue("Something went wrong. Please try again!");
            console.error("Failed to post comment", error);
            setTimeout(() => {
                window.location.reload(true);
            }, 2000);
        }
        setIsSubmitting(false);
    };

    const handleDeleteComment = async (timeStamp) => {
        if (!currentUser) {
            return;
        }

        try {
            await API.deleteComment(currentUser._id, date._id, timeStamp);
            setNotSubmitted(false);
            setCommentDialogue("Comment successfully deleted!");
            setTimeout(() => {
                window.location.reload(true);
            }, 2000);
            //window.location.reload(); // or use another method to refresh comments
        } catch (error) {
            setCommentDialogue("Something went wrong. Please try again!");
            console.error("Failed to delete comment", error);
            setTimeout(() => {
                window.location.reload(true);
            }, 2000);
        }
    };

    return (
        <>
        {notSubmitted && (<DialogContent className="flex gap-8 max-w-[925px] max-h-[700px] overflow-y-auto">
            <div className="flex flex-col w-3/5 space-y-2 overflow-y-auto max-h-[700px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">
                        {date.title}
                    </DialogTitle>
                    <div className="text-md text-gray-600">
                        {date.creator.firstName} {date.creator.lastName}
                    </div>
                    <div className="text-md text-gray-300">
                        @{date.creator.username} •{" "}
                        {timeStampToDate(date.timeStamp)}
                    </div>

                    <div className="flex flex-wrap gap-2 my-2">
                        {date.tags.map((tag, index) => (
                            <Badge
                                key={index}
                                className="bg-blue-100 hover:bg-blue-200 transition-colors duration-300 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </DialogHeader>

                {date.events.map((event, index) => (
                    <div key={index} className="flex gap-4 py-4">
                        <Carousel
                            images={event.tripAdvisorLocationImages}
                            classStuff="w-28 h-28 rounded-sm"
                            imgWidth="112px"
                            imgHeight="112px"
                        />
                        <div className="flex flex-col">
                            <h2 className="text-xl font-semibold ">
                                {event.name}
                            </h2>
                            <p className="text-gray-600">{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-2/5 space-y-4 overflow-y-auto max-h-[700px]">
                <div className="flex items-center gap-2">
                    <div className="flex flex-grow items-center justify-center rounded-md bg-white text-gray-700 p-2 text-xs">
                        <MessageCircle className="h-4 w-4 mr-1" />{" "}
                        <span>{date.commentsCount}</span>
                    </div>
                    <Dialog
                        onClose={() => setShowLoginDialog(false)}
                        open={showLoginDialog}
                    >
                        <Button
                            variant="primary"
                            className="flex flex-grow items-center justify-center rounded-md bg-white transition-colors duration-300 hover:bg-slate-200 text-primary p-2 text-xs"
                            onClick={handleLike}
                        >
                            <Heart
                                className={`h-4 w-4 mr-1`}
                                fill={isLiked ? "#FFA39C" : "none"}
                            />
                            <span>{likesCount}</span>
                        </Button>

                        <LoginDialog
                            closeDialog={() => setShowLoginDialog(false)}
                        />
                    </Dialog>
                </div>

                <Separator />

                {/* New Comment Form */}
                {currentUser && (
                    <form
                        onSubmit={handleSubmit(handlePostComment)}
                        className="flex gap-2"
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
                            variant="outline"
                            className="transition delay-100 duration-300 ease-in-out text-white border-2 text-base py-2 px-4 bg-secondary hover:bg-secondary-hover hover:text-white"
                        >
                            Comment
                        </Button>
                    </form>
                )}

                {/* Comments List */}
                {date.comments.map((comment, index) => (
                    <div
                        key={index}
                        className="relative border-2 my-3 rounded-sm p-4"
                    >
                        <div className="flex justify-between items-center  w-full">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {comment.firstName} {comment.lastName}
                                </h3>
                                <div className="flex items-center">
                                    <p className="text-xs text-gray-500 mr-2">
                                        @{comment.username}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {timeStampToDate(comment.time, true)}
                                    </p>
                                    <div className="flex items-end">
                                        {currentUser &&
                                            currentUser._id ===
                                                comment.userId && (
                                                <button
                                                    onClick={() =>
                                                        handleDeleteComment(
                                                            comment.time
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-700 transition duration-150 ease-in-out"
                                                >
                                                    <X size={16} />
                                                </button>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm mt-2">{comment.comment}</p>
                    </div>
                ))}
            </div>
        </DialogContent>
    )}
    {!notSubmitted && (
        <DialogContent>
            <DialogTitle>Posting Comment</DialogTitle>
            <DialogDescription>
                {commentDialogue}
            </DialogDescription>
        </DialogContent>
    )}
    </>
    );
};

export default ViewCardModal;
