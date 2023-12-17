import React, { useState, useEffect } from "react";
import NavbarExplore from "../../components/Navbar/NavbarExplore";
import PostCard from "@/src/components/PostCard/PostCard";
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
    const [badges, setBadges] = useState([]);
    const [selectedSort, setSelectedSort] = useState("disabled");
    const [dates, setDates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await API.getDates(badges, selectedSort);
                if (response.data) {
                    setDates(response.data);
                } else {
                    console.error("Failed to fetch dates:", response.error);
                }
            } catch (error) {
                console.error("There was an error fetching the dates:", error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [badges, selectedSort]);

    const hasSearch = badges.length > 0 ? true : false;

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyPress = (e) => {
        if (
            e.key === "Enter" &&
            inputValue.trim().length > 0 &&
            badges.length < 20
        ) {
            const formattedInputValue = inputValue
                .toLowerCase()
                .trim()
                .replace(/\s+/g, "-");

            if (badges.includes(formattedInputValue)) {
                return;
            }
            setBadges([...badges, formattedInputValue]);
            setInputValue("");
        }
    };

    const handleRemoveBadge = (indexToRemove) => {
        setBadges(badges.filter((_, index) => index !== indexToRemove));
    };

    const handleSortChange = (newValue) => {
        setSelectedSort(newValue);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavbarExplore />
            <div className="container mx-auto p-4">
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
                        {badges.map((badge, index) => (
                            <div
                                key={index}
                                className="flex items-center bg-palecyan text-sm py-1 px-2.5 rounded-full mr-1 text-gray-500"
                            >
                                {badge}
                                <button
                                    onClick={() => handleRemoveBadge(index)}
                                    className="ml-1"
                                >
                                    <X size={17} />
                                </button>
                            </div>
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
                            <SelectItem value="comments">
                                Most Comments
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
                        {dates.map((date) => (
                            <PostCard key={date._id} date={date} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Explore;
