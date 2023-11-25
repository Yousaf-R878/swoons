import Navbar from "@/src/components/Navbar/Navbar";
import PostCard from "@/src/components/PostCard/PostCard";
import React from "react";
import NavbarExplore from "../../components/Navbar/NavbarExplore";

import { Input, Badge, Select } from "@/components/ui/input";

const Explore = () => {
    return (
        <>
            <NavbarExplore />
            <Input placeholder="Search for dates!" />
        </>
    );
};

export default Explore;
