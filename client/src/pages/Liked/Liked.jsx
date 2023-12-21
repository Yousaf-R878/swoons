import React, { useState, useEffect, useContext } from "react";
import Post from "@/src/components/PostCard/Post";
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
          console.error("Failed to fetch liked dates:", response.error);
        }
      } catch (error) {
        console.error("There was an error fetching the liked dates:", error);
      }
      setIsLoading(false);
    };
    if (user) {
      fetchLikedDates();
    }
  }, [user]);

  return (
      <div className="container mx-auto p-4">
          <div className="my-8">
              <h2 className="text-4xl text-center font-bold">Liked Dates</h2>
              <div className="flex justify-center">
                  {isLoading ? (
                      <LoadingProgress />
                  ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
                          {likedDates.map((date) => (
                              <Post key={date._id} date={date} />
                          ))}
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
};

export default Liked;
