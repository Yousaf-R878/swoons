import React, { useState, useEffect, useContext } from "react";
import Post from "@/src/components/PostCard/Post";
import PostSkeleton from "@/src/components/PostCard/PostSkeleton";
import API from "../../services/apiClient";
import { AuthorizeContext } from "../../contexts/auth";
import CreatePost from "@/src/components/CreatePost/CreatePost";
import { Search, Smile} from 'lucide-react';

const MyPosts = () => {
    const { currentUser } = useContext(AuthorizeContext);
    const [userDates, setUserDates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // console.log(currentUser);

    useEffect(() => {
        const fetchUserDates = async () => {
            setIsLoading(true);
            try {
                const response = await API.getUserDates(currentUser._id);
                if (response.data) {
                    setUserDates(response.data);
                } else {
                    console.error(
                        "Failed to fetch user's dates:",
                        response.error
                    );
                }
                // console.log(response.data)
            } catch (error) {
                console.error(
                    "There was an error fetching the user's dates:",
                    error
                );
            }
            setIsLoading(false);
        };
        if (currentUser) {
            fetchUserDates();
        }
    }, [currentUser]);

    return (
        <div className="container mx-auto p-4">
            <div className="my-4 mb-8">
                {(userDates.length === 0) ? 
                (<div className="flex items-center justify-center text-4xl text-center font-bold">
                    <h2>You have not created any dates yet :{"("}</h2>
                </div>
                ) : (
                    <div className="flex items-center justify-center text-4xl text-center font-bold">
                        <h2>Your lovely creations</h2>
                    </div>
                )}
                <div className="flex justify-center">
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
                            {[...Array(3)].map((_, index) => (
                                <PostSkeleton key={index} />
                            ))}
                        </div>
                    ) : (userDates.length === 0) ? (
                        <div className="flex flex-col items-center justify-center text-2xl font-semibold mb-2 text-center">
                            Create one now! <br />
                            <Search className="mb-2" size={48} />
                            <CreatePost />
                        </div>
                    ) : (
                        <div className="">
                            <p className="text-center text-gray-600 mb-4">
                                {" "}
                                Here are all the dates you've created:{" "}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
                                {userDates.map((date) => (
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
