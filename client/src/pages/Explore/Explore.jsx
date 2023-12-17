import React, { useState } from "react";
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

const works = [
    {
        artist: "Ornella Binni",
        art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
        title: "A Cozy Start",
        description:
            "This hangout starts you off in a wonderful park, lorem ipsuming all over the place. It’s quite lorem ipsum. So much so, that the whole thing lorem ipsum’d on me and I lorem ipsum’d myself. Very great stuff!",
    },
    {
        artist: "Tom Byrom",
        art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
        title: "A Cozy Middle",
        description:
            "This hangout starts you off in a wonderful park, lorem ipsuming all over the place. It’s quite lorem ipsum. So much so, that the whole thing lorem ipsum’d on me and I lorem ipsum’d myself. Very great stuff!",
    },
    {
        artist: "Vladimir Malyavko",
        art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
        title: "A Cozy End",
        description:
            "This hangout starts you off in a wonderful park, lorem ipsuming all over the place. It’s quite lorem ipsum. So much so, that the whole thing lorem ipsum’d on me and I lorem ipsum’d myself. Very great stuff!",
    },
];

const propData = {
    _id: {
        $oid: "657e5b2df5c884180b4cf492",
    },
    title: "Audience Thing",
    tags: ["Adventurous", "Adventurous", "Cultural", "Relaxing", "Educational"],
    events: [
        {
            name: "Whose",
            location: "Port Susan",
            description: "Something power total guy process ready nor.",
            tripAdvisorLocationImages: [],
            tripAdvisorLocationUrl: "",
            tripAdvisorRating: "",
            tripAdvisorRatingImage: "",
            tripAdvisorLocationId: "",
        },
        {
            name: "Pull",
            location: "Diazhaven",
            description: "Take share western kid.",
            tripAdvisorLocationImages: [],
            tripAdvisorLocationUrl: "",
            tripAdvisorRating: "",
            tripAdvisorRatingImage: "",
            tripAdvisorLocationId: "",
        },
    ],
    likes: 0,
    comments: [],
    creator: {
        firstName: "Leonard",
        lastName: "Guzman",
        username: "vgriffin",
        picture: "../public/default_profile_pic.jpg",
    },
};

const dates = [propData];

const Explore = () => {
    const [inputValue, setInputValue] = useState("");
    const [badges, setBadges] = useState([]);
    const [selectedSort, setSelectedSort] = useState("recent");

    const hasSearch = badges.length > 0 ? true : false;

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // * This handles ENTER PRESS
    const handleInputKeyPress = (e) => {
        if (
            e.key === "Enter" &&
            inputValue &&
            inputValue.trim().length > 0 &&
            badges.length < 20
        ) {
            const formattedInputValue =
                inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
            setBadges([...badges, formattedInputValue]);
            setInputValue("");
        }
    };

    const handleRemoveBadge = (indexToRemove) => {
        setBadges(badges.filter((_, index) => index !== indexToRemove));
    };

    const handleSortChange = (e) => {
        // TODO: this should handle sorting
        setSelectedSort(e.target.value);
    };

    if (dates.length === 0) {
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
                    <Select className="w-1/5">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by.." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="recent">Recent</SelectItem>
                            <SelectItem value="rating">Rating</SelectItem>
                            <SelectItem value="recommended">
                                Recommended
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
