import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Boxes } from "lucide-react";


const Navbar = () => {
    const [activeTab, setActiveTab] = useState("explore");

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <nav className="bg-white p-4 text-white flex justify-between items-center">
            <div className="flex items-center">
                <Boxes
                    size={40}
                    strokeWidth={1}
                    color="#FFA39C"
                    className="h-10 w-9 mr-2"
                />
                <span className="text-black font-semibold text-xl tracking-tight">
                    Company Name
                </span>
            </div>
            <div className="flex">
                <button
                    onClick={() => setActiveTab("explore")}
                    className={`px-4 py-2 font-semibold text-lg ${
                        activeTab === "explore"
                            ? "text-secondary border-b-2 border-secondary"
                            : "text-gray-600"
                    }`}
                >
                    Explore
                </button>
                <button
                    onClick={() => setActiveTab("likes")}
                    className={`px-4 py-2 font-semibold text-lg ${
                        activeTab === "likes"
                            ? "text-secondary border-b-2 border-secondary"
                            : "text-gray-600"
                    }`}
                >
                    Likes
                </button>
                <button
                    onClick={() => setActiveTab("myposts")}
                    className={`px-4 py-2 font-semibold text-lg ${
                        activeTab === "myposts"
                            ? "text-secondary border-b-2 border-secondary"
                            : "text-gray-600"
                    }`}
                >
                    My Posts
                </button>
            </div>
            <div className="flex items-center">
                {/* NEED USER DATA PASSED HERE */}
                <span className="text-black font-semibold text-lg mr-4">
                    John Doe
                </span>
                <img
                    src="/user-profile.jpg"
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                />
            </div>
        </nav>
    );
};

export default Navbar;
