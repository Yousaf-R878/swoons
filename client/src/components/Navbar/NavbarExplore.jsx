import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Boxes } from "lucide-react";
import CreatePost from "../CreatePost/CreatePost";
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import profilePic from "../../assets/profile.png";
import { AuthorizeContext } from "@/src/contexts/auth";
import { useContext } from "react";

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
  
  const { currentUser, logoutUser } = useContext(AuthorizeContext);

  const NavItem = ({ name, pathname }) => {
    const location = useLocation();
    return (
      <Link
        to={pathname}
        className={`text-lg cursor-pointer flex items-center mx-4 ${
          location.pathname === pathname
            ? "text-secondary border-b-2 border-secondary"
            : "text-gray-600"
        }`}
      >
        {name}
      </Link>
    );
  };

  return (
    <nav className="bg-white p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-lg cursor-pointer flex items-center ">
        <Boxes
          size={40}
          strokeWidth={1}
          color="#FFA39C"
          className="h-10 w-9 mr-2"
        />
        <span className="text-black font-semibold text-xl tracking-tight">
          Swoons
        </span>
      </Link>
      <div className="flex">
        {LinkItems.map((link) => (
          <NavItem key={link.name} name={link.name} pathname={link.pathname} />
        ))}
        <CreatePost />
      </div>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center">
            <Avatar className="mr-2">
              <AvatarImage src={currentUser.profilePic} alt="Profile" />
              <AvatarFallback>{currentUser.firstName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <div className="flex flex-col text-left">
                <p className="text-black font-semibold text-md">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <p className="text-gray-400 text-xs -mt-1">{currentUser.username}</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logoutUser();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
