import React, { useState } from "react";
import NavbarExplore from "../../components/Navbar/NavbarExplore";
import PostCard from "@/src/components/PostCard/PostCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const Explore = () => {
    const [inputValue, setInputValue] = useState("");
    const [badges, setBadges] = useState([]);
    const [selectedSort, setSelectedSort] = useState("recent");

    const hasSearch = badges.length > 0;

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // * This handles ENTER PRESS
    const handleInputKeyPress = (e) => {
        if (e.key === "Enter" && inputValue && inputValue.trim().length > 0) {
            setBadges([...badges, inputValue]);
            setInputValue("");
        }
    };

    const handleSortChange = (e) => {
        // TODO: this should handle sorting
        setSelectedSort(e.target.value);
    };

    return (
        <>
            <NavbarExplore />
            <div className="container mx-auto p-4">
                <div className="relative">
                    <Input
                        className="w-1/3" // Adjust width as needed
                        placeholder="Search for dates!"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleInputKeyPress}
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 my-4 ">
                    {badges.map((badge, index) => (
                        <Badge className="bg-palecyan " key={index}>
                            {badge}
                        </Badge>
                    ))}
                </div>
                <div className="flex justify-between items-center my-10">
                    <h2 className="text-xl font-semibold">
                        {hasSearch ? "Found Results" : "Recent Activity"}
                    </h2>
                    <Select
                        className="w-1/5"
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by.." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recent">Recent</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                            <SelectItem value="recommended">Recommended</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {" "}
                    <PostCard />
                    <PostCard />
                    <PostCard />
                </div>
            </div>
        </>
    );
};

export default Explore;
