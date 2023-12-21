import React, { useState, useEffect, useContext } from "react";
import Post from "@/src/components/PostCard/Post";
import PostSkeleton from "@/src/components/PostCard/PostSkeleton";
import API from "../../services/apiClient";
import { AuthorizeContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import CreatePost from "@/src/components/CreatePost/CreatePost";

const MyPosts = () => {
    const { currentUser } = useContext(AuthorizeContext);
    const [likedDates, setLikedDates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // console.log(currentUser);

    useEffect(() => {
        const fetchLikedDates = async () => {
            setIsLoading(true);
            try {
                const response = await API.getLikedDates(currentUser._id);
                if (response.data) {
                    setLikedDates(response.data);
                    // console.log(response.data)
                } else {
                    console.error(
                        "Failed to fetch user's liked dates:",
                        response.error
                    );
                }
                // console.log(response.data)
            } catch (error) {
                console.error(
                    "There was an error fetching the user's liked dates:",
                    error
                );
            }
            setIsLoading(false);
        };
        if (currentUser) {
            fetchLikedDates();
        }
    }, [currentUser]);

    return (
        <div className="container mx-auto p-4">
            <div className="my-4 mb-8">
                <h2 className="text-4xl text-center font-bold">
                    Your taste is impeccable :{")"}
                </h2>
                <div className="flex justify-center">
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
                            {[...Array(3)].map((_, index) => (
                                <PostSkeleton key={index} />
                            ))}
                        </div>
                    ) : likedDates.length === 0 ? (
                        <div className="text-2xl font-semibold mb-2">
                            You have not liked any dates yet :{"("} <br />
                            <Link to="/explore" className="underline">
                                Browse dates
                            </Link>
                        </div>
                    ) : (
                        <div className="">
                            <p className="text-center text-gray-600 mb-4">
                                {" "}
                                Here are all the dates you've liked:{" "}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
                                {likedDates.map((date) => (
                                    <Post key={date._id} date={date} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPosts;
