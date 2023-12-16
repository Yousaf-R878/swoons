import React from "react";
import NavbarExplore from "../../components/Navbar/NavbarExplore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SearchIcon from "../../assets/icons/SearchIcon.jsx";

const CreatePost = () => {
  return (
    <>
      <NavbarExplore />
      <div className="container mx-auto p-4">
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
