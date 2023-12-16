import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Boxes } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import profilePic from "../../assets/profile.png" 

const LinkItems = [
    { name: "Explore", pathname: "/explore" },
    { name: "Likes", pathname: "/likes" },
    { name: "My Posts", pathname: "/myposts" },
];

const fakeUser = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "password",
    profilePic: profilePic,
};

const Navbar = () => {
    const [activeTab, setActiveTab] = useState("Explore");

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    const NavItem = ({ name, pathname }) => {
        const location = useLocation();
        return (
            <Link to={pathname}>
                <div
                    className={`${
                        location.pathname === pathname
                            ? "text-secondary border-b-2 border-secondary"
                            : "text-gray-600"
                    } text-lg mr-8 cursor-pointer`}
                    onClick={() => handleTabChange(name)}
                >
                    {name}
                </div>
            </Link>
        );
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
                    Swoons
                </span>
            </div>
            <div className="flex">
                {LinkItems.map((link) => (
                    <NavItem
                        key={link.name}
                        name={link.name}
                        pathname={link.pathname}
                    />
                ))}
            </div>
            <div className="flex items-center">
                <Link to={`/settings`} className="flex items-center">
                    <span className="text-black font-semibold text-lg mr-4">
                        {fakeUser.firstName} {fakeUser.lastName}
                    </span>
                    <Avatar>
                        <AvatarImage
                            src={fakeUser.profilePic}
                            alt="Profile"
                        />
                        <AvatarFallback>{fakeUser.firstName[0]}</AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
