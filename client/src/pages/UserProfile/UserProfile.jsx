import React, { useState } from "react";
import { useContext } from "react";
import { AuthorizeContext } from "../../contexts/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(50, { message: "First name must be less than 50 characters long" })
    .regex(/^[a-zA-Z'-]+$/, { message: "Invalid first name format" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(50, { message: "Last name must be less than 50 characters long" })
    .regex(/^[a-zA-Z'-]+$/, { message: "Invalid last name format" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 2 characters long" })
    .max(20, { message: "Username must be less than 20 characters long" })
    .regex(/^[a-z0-9]+$/i, { message: "Invalid username format" }),
});

const timeStampToDate = (timeStamp) => {
  const date = new Date(timeStamp);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const UserProfile = () => {
  const { currentUser, updateUser } = useContext(AuthorizeContext);
  const [file, setFile] = useState(null);
  const [fileName, setfileName] = useState("No file chosen");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      password: "", // Clear the password field
      username: currentUser.username,
      accountCreationDate: currentUser.accountCreationDate,
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setfileName(file.name);
    setFile(file);
  };

  const uploadFile = async () => {
    if (!file) {
      return;
    } else {
      //S3 Bucket Name
      const S3_BUCKET = "swoons-photos";

      //Bucket Region
      const REGION = "us-east-1";

      //Authenticate with AWS
      const s3Client = new S3Client({
        region: REGION,
        credentials: {
          accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
          secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
        },
      });

      //File params
      const params = {
        Bucket: S3_BUCKET,
        Key: `${currentUser._id}_${file.name}.png`,
        Body: file,
      };

      try {
        const data = await s3Client.send(new PutObjectCommand(params));
        console.log("File uploaded successfully", data);
        // Additional code for handling the successful upload

        let url = `https://${S3_BUCKET}.s3.amazonaws.com/${params.Key}`;
        let apiUrl =
          import.meta.env.VITE_API_URL + `/users/user/${currentUser._id}`;
        let changeUser = await axios({
          method: "post",
          url: apiUrl,
          headers: {},
          data: {
            url: url,
          },
        });
        let updatedUser = { ...currentUser, picture: url };
        updateUser(updatedUser);
        setFile(null);
        setfileName("No file chosen");
      } catch (err) {
        console.error("Error uploading the file", err);
      }
    }
  };

  const resetPic = async () => {
    //  //S3 Bucket Name
    //  const S3_BUCKET = "swoons-photos";

    //  //Bucket Region
    //  const REGION = "us-east-1";

    //  //Authenticate with AWS
    //  AWS.config.update({
    //      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
    //      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    //  });

    //  //Initialize S3 Bucket Object
    //  const s3 = new AWS.S3({
    //      params: { Bucket: S3_BUCKET },
    //      region: REGION,
    //  });

    //  //Delete Params
    //  const params = {
    //      Bucket: S3_BUCKET,
    //      Key: `${currentUser._id}_profile_pic.png`,
    //  };

    //  let deleteFile = s3
    //  .deleteObject(params)
    //  .on("httpUploadProgress", (evt) => {
    //      // File uploading progress
    //      console.log(
    //      "Deleting " + parseInt((evt.loaded * 100) / evt.total) + "%"
    //      );
    //  })
    //  .promise();

    //  await deleteFile.then(async (err, data) => {
    //     console.log(data);
    //     if (err) {
    //       console.log(err)
    //       console.log("File not there");
    //     } else {
    //       console.log("File deleted");
    //     }

    //   })

    let apiUrl =
      import.meta.env.VITE_API_URL + `/users/user/${currentUser._id}`;
    let changeUser = await axios({
      method: "post",
      url: apiUrl,
      headers: {},
      data: {
        url: "https://swoons-photos.s3.amazonaws.com/default_profile.png",
      },
    });
    //console.log("Profile Pic deleted");
    let updatedUser = {
      ...currentUser,
      picture: "https://swoons-photos.s3.amazonaws.com/default_profile.png",
    };
    updateUser(updatedUser);
  };

  const onSubmit = async (data) => {
    console.log(data);
    let firstName = data.firstName;
    let lastName = data.lastName;
    let username = data.username;

    let apiUrl =
      import.meta.env.VITE_API_URL + `/users/user/${currentUser._id}`;
    let changeUser = await axios({
      method: "patch",
      url: apiUrl,
      headers: {},
      data: {
        firstName: firstName,
        lastName: lastName,
        username: username,
      },
    });

    let updatedUser = {
      ...currentUser,
      firstName: firstName,
      lastName: lastName,
      username: username,
    };
    updateUser(updatedUser);
  };

  return (
    <>
      <div className="container mx-auto p-8 flex justify-between">
        <div className="w-1/2  h-1/2 bg-white shadow rounded p-6 flex flex-col items-center mr-4">
          <h1 className="text-2xl font-semibold mb-6">Profile Picture</h1>
          <div className="mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={currentUser.picture} alt="Profile" />
              <AvatarFallback>{currentUser.firstName[0]}</AvatarFallback>
            </Avatar>
          </div>
          <form>
            <div className="flex flex-row items-center mb-2">
              <input
                id="custom-input"
                accept="image/png, image/jpeg"
                type="file"
                onChange={handleFileChange}
                hidden
              />
              <label
                htmlFor="custom-input"
                className="block text-sm text-slate-500 mr-4 py-2 px-4
                  rounded-md border-0 text-sm font-semibold bg-pink-50
                  text-pink-700 hover:bg-pink-100 cursor-pointer delay-100 duration-300 ease-in-out"
              >
                Choose file
              </label>
              <label className="text-sm text-slate-500">{fileName}</label>
            </div>
          </form>

          <Button
            variant="outline"
            className="transition delay-100 duration-300 ease-in-out text-white border-2 text-base py-2 px-4 bg-secondary hover:bg-secondary-hover hover:text-white"
            onClick={uploadFile}
          >
            Change Picture
          </Button>
          <Button variant="danger" onClick={resetPic}>
            Delete Picture
          </Button>
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  className="transition delay-100 duration-300 ease-in-out text-white border-2 text-base py-2 px-4 bg-secondary hover:bg-secondary-hover hover:text-white"
                  type="submit"
                >
                  Update Settings
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
