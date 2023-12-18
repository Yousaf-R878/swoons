import React, { useState, useEffect, useContext } from "react";
import NavbarExplore from "../../components/Navbar/NavbarExplore";
import PostCard from "@/src/components/PostCard/PostCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import API from "../../services/apiClient";
import { AuthorizeContext, AuthorizeProvider } from "../../contexts/auth";

const Liked = () => {
    const [likedDates, setLikedDates] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(AuthorizeContext);

    useEffect(() => {
        const fetchLikedDates = async () => {
            setIsLoading(true);
            try {
                const response = await API.getLikedDates(user._id);
                if (response.data) {
                    setLikedDates(response.data.dates);
                } else {
                    console.error(
                        "Failed to fetch liked dates:",
                        response.error
                    );
                }
            } catch (error) {
                console.error(
                    "There was an error fetching the liked dates:",
                    error
                );
            }
            setIsLoading(false);
        };
        if (user) {
            fetchLikedDates();
        }
    }, [user]);

    return (
        <>
            <NavbarExplore />
            <div className="my-8">
                <h2 className="text-4xl text-center font-bold">Liked Dates</h2>
                <div className="flex justify-center">
                    {isLoading ? (
                        <LoadingProgress />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
                            {likedDates.map((date) => (
                                <PostCard key={date._id} date={date} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Liked;