import React, { useState } from "react";
import AWS from "aws-sdk";
import { useContext } from "react";
import { AuthorizeContext } from "../../contexts/auth";

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
import axios from "axios";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name required" }),
  lastName: z.string().min(1, { message: "Last name required" }),
  password: z.string().min(1, { message: "Password required" }),
});

const timeStampToDate = (timeStamp) => {
  const date = new Date(timeStamp);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const UserProfile = () => {
  const { currentUser } = useContext(AuthorizeContext);
  const [user, setUser] = useState(currentUser);
  const [file, setFile] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      password: "", // Clear the password field
      accountCreationDate: currentUser.accountCreationDate,
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
}

  const uploadFile = async () => {
    if (!file) {
        return;
    } else {
        //S3 Bucket Name
        const S3_BUCKET = "swoons-photos";

        //Bucket Region
        const REGION = "us-east-1";

        //Authenticate with AWS
        AWS.config.update({
            accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
            secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
        });

        //Initialize S3 Bucket Object
        const s3 = new AWS.S3({
            params: { Bucket: S3_BUCKET },
            region: REGION,
        });

        //File params
        const params = {
            Bucket: S3_BUCKET,
            Key: `${currentUser._id}_${file.name}`,
            Body: file,
        };

        let upload = s3
            .putObject(params)
            .on("httpUploadProgress", (evt) => {
                // File uploading progress
                console.log(
                "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
                );
            })
            .promise();

        await upload.then(async (err, data) => {
            console.log(err);
            console.log(data);
            let url = `https://${S3_BUCKET}.s3.amazonaws.com/${params.Key}`;
            let apiUrl = import.meta.env.VITE_API_URL + `/users/user/${currentUser._id}`
            let changeUser = await axios({
              method: 'post',
              url: apiUrl,
              headers: {},
              data: {
                url: url
              }
            })
            currentUser.profilePic = `https://${S3_BUCKET}.s3.amazonaws.com/${params.Key}`
        
            // File successfully uploaded
            alert("File uploaded successfully.");
            setFile(null);
            });
    }
}

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="container mx-auto p-8 flex justify-between">
        <div className="w-1/2  h-1/2 bg-white shadow rounded p-6 flex flex-col items-center mr-4">
          <h1 className="text-2xl font-semibold mb-6">Profile Picture</h1>
          <div className="mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={currentUser.profilePic} alt="Profile" />
              <AvatarFallback>{currentUser.firstName[0]}</AvatarFallback>
            </Avatar>
          </div>
          <input type="file" onChange={handleFileChange} />
          <Button className="mb-2" onClick={uploadFile} >Change Picture</Button>
          <Button variant="danger">Delete Picture</Button>
          <p className="text-gray-600 text-xs">
            Your account was created on{" "}
            {currentUser && timeStampToDate(currentUser.accountCreationDate)}
          </p>
        </div>
        <div className="w-1/2 max-w-md bg-white shadow rounded p-6 ml-4">
          <h1 className="text-2xl font-semibold mb-6">Settings</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

export default UserProfile;
