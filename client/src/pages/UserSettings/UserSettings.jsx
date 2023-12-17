import React, { useState } from "react";

import NavbarExplore from "@/src/components/Navbar/NavbarExplore";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    Form,
    FormControl,
    FormLabel,
    FormMessage,
    FormField,
    FormItem,
} from "@/components/ui/form";

import profilePic from "../../assets/profile.png";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name required" }),
    lastName: z.string().min(1, { message: "Last name required" }),
    password: z.string().min(1, { message: "Password required" }),
    bio: z.string().min(1, { message: "Bio required" }),
});

const fakeUser = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: "password",
    profilePic: profilePic,
    accountCreationDate: "2021-10-01T00:00:00.000Z",
    bio: "",
};

const timeStampToDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
};

const UserSettings = () => {
    const [user, setUser] = useState(fakeUser);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: fakeUser.firstName,
            lastName: fakeUser.lastName,
            email: fakeUser.email,
            password: "", // Clear the password field
            accountCreationDate: fakeUser.accountCreationDate,
            bio: fakeUser.bio,
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <NavbarExplore />
            <div className="container mx-auto p-8 flex justify-between">
                <div className="w-1/2  h-1/2 bg-white shadow rounded p-6 flex flex-col items-center mr-4">
                    <h1 className="text-2xl font-semibold mb-6">
                        Profile Picture
                    </h1>
                    <div className="mb-4">
                        <Avatar className="w-24 h-24">
                            <AvatarImage
                                src={fakeUser.profilePic}
                                alt="Profile"
                            />
                            <AvatarFallback>
                                {fakeUser.firstName[0]}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <Button className="mb-2">Change Picture</Button>
                    <Button variant="danger">Delete Picture</Button>
                    <p className="text-gray-600 text-xs">
                        Your account was created on{" "}
                        {timeStampToDate(fakeUser.accountCreationDate)}
                    </p>
                </div>
                <div className="w-1/2 max-w-md bg-white shadow rounded p-6 ml-4">
                    <h1 className="text-2xl font-semibold mb-6">Settings</h1>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                name="email"
                                                disabled
                                                {...form.register("email")}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end mt-4">
                                <Button type="submit">Update Settings</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default UserSettings;
