import React, { useState, useEffect, useRef } from "react";
import NavbarExplore from "../../components/Navbar/NavbarExplore";
import Post from "@/src/components/PostCard/Post";
import LoadingProgress from "../../components/LoadingProgress/LoadingProgress";
import PostSkeleton from "@/src/components/PostCard/PostSkeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import SearchIcon from "../../assets/icons/SearchIcon.jsx";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import API from "../../services/apiClient";

const Explore = () => {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedSort, setSelectedSort] = useState("disabled");
  const [dates, setDates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const cardListRef = useRef(null); // Create a ref for the card list container
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 100));
      try {
        const response = await API.getDates(tags, selectedSort, currentPage);
        if (response.data) {
          setDates(response.data.dates);
          setTotalPages(response.data.totalPages);
        } else {
          console.error("Failed to fetch dates:", response.error);
        }
      } catch (error) {
        console.error("There was an error fetching the dates:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [tags, selectedSort, currentPage]);
  useEffect(() => {
    // Whenever currentPage changes, scroll to the top of the card list
    if (cardListRef.current) {
      window.scrollTo({
        top: cardListRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const hasSearch = tags.length > 0 ? true : false;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim().length > 0 && tags.length < 20) {
      const formattedInputValue = inputValue
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      if (tags.includes(formattedInputValue)) {
        return;
      }
      setTags([...tags, formattedInputValue]);
      setInputValue("");
      setCurrentPage(1);
    }
  };

  const handleRemoveBadge = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSortChange = (newValue) => {
    setSelectedSort(newValue);
  };

  return (
    <>
      <div className="container mx-auto p-4" ref={cardListRef}>
        <div className="w-full max-w-lg mx-auto">
          <div className="relative mb-2">
            <Input
              className="w-full text-lg pl-3 pr-10"
              placeholder="Search for dates!"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleInputKeyPress}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <SearchIcon className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((badge, index) => (
              <Badge
                key={index}
                className="bg-blue-100 hover:bg-blue-200 transition-colors duration-300 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full"
              >
                {badge}
                <button
                  onClick={() => handleRemoveBadge(index)}
                  className="ml-1"
                >
                  <X size={17} />
                </button>
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center my-10">
          <h2 className="text-2xl font-semibold">
            {hasSearch ? "Found Results" : "Recent Activity"}
          </h2>
          <Select
            className="w-1/5"
            value={selectedSort}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by.." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="disabled">Sort by..</SelectItem>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="likes">Most Likes</SelectItem>
              <SelectItem value="comments">Most Comments</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
              {[...Array(12)].map((_, index) => (
                <PostSkeleton key={index} />
              ))}
            </div>
          ) : (dates.length === 0) ? (
            <h2>No Posts Found</h2>
          ): (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
              {dates.map((date) => (
                <Post key={date._id} date={date} />
              ))}
            </div>)
          }
        </div>
        {dates.length !== 0 &&<div className="mt-4 flex items-center justify-center space-x-1">
          {currentPage !== 1 &&<button
            className="flex items-center px-4 py-2 text-gray-500 bg-white rounded-md hover:bg-gray-100"
            disabled={currentPage === 1}
            onClick={goToPreviousPage}
          >
            Previous
          </button>}
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              className={`px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100 ${
                currentPage === number + 1 ? "bg-gray-200" : ""
              }`}
              onClick={() => setCurrentPage(number + 1)}
            >
              {number + 1}
            </button>
          ))}
          {currentPage !== totalPages && <button
            className="flex items-center px-4 py-2 text-gray-500 bg-white rounded-md hover:bg-gray-100"
            disabled={currentPage === totalPages}
            onClick={goToNextPage}
          >
            Next
          </button>}
        </div>}
      </div>
    </>
  );
};

export default Explore;
