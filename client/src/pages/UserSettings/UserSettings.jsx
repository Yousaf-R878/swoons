import React, { useState } from "react";

import NavbarExplore from "@/src/components/Navbar/NavbarExplore";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";

const UserSettings = () => {
    const [user, setUser] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        bio: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // ! Submit logic here
    };

    return (
        <>
            <NavbarExplore />
            <div className="container mx-auto p-8 flex justify-between">
                <div className="w-1/2 max-w-xs bg-white shadow rounded p-6 flex flex-col items-center mr-4">
                    <div className="mb-4">
                        <Avatar
                            src={
                                user.profilePic ||
                                "/path/to/default/profile-pic.jpg"
                            }
                            alt="Profile"
                            size="lg"
                        />{" "}
                       
                    </div>
                    <Button className="mb-2">Change Picture</Button>
                    <Button variant="danger">Delete Picture</Button>
                </div>
                <div className="w-1/2 max-w-md bg-white shadow rounded p-6 ml-4">
                    <h1 className="text-2xl font-semibold mb-6">Settings</h1>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <Input
                            name="firstName"
                            value={user.firstName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <Input
                            name="lastName"
                            value={user.lastName}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <Input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Bio
                        </label>
                        <Textarea
                            name="bio"
                            value={user.bio}
                            onChange={handleInputChange}
                            rows={4}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" onClick={handleSubmit}>
                            Update Settings
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserSettings;
