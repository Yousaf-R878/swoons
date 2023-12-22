import { useState, useEffect, useRef, useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthorizeContext } from "../../contexts/auth";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import apiClient from "../../services/apiClient";
import { X } from "lucide-react";
import EventField from "./EventField";

const eventSchema = z.object({
  location: z.string().min(1, { message: "Location is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title needs to be at least 1 character long" })
    .max(50, { message: "Title cannot be more than 50 characters long" }),
  tags: z
    .array(z.string())
    .nonempty({ message: "You must add at least one tag" })
    .max(6, { message: "You cannot have more than 6 tags" })
    .refine((items) => new Set(items).size === items.length, {
      message: "Cannot have duplicate tags",
    }),
  events: z
    .array(eventSchema)
    .nonempty({ message: "At least one event is required" }),
});

const CreatePostForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tags: [],
      events: [
        { name: "", location: "", description: "", tripAdvisorLocationId: "" },
      ],
    },
  });
  const { currentUser } = useContext(AuthorizeContext);

  const handleAddEvent = () => {
    const newEvents = form.getValues("events");
    newEvents.push({
      name: "",
      location: "",
      description: "",
      tripAdvisorLocationId: "",
    });
    form.setValue("events", newEvents);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = event.target.value
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-");;
      if (newTag !== "") {
        const updatedTags = form.getValues("tags");
        updatedTags.push(newTag);
        form.setValue("tags", updatedTags, { shouldValidate: true });
        form.trigger("tags");
        event.target.value = "";
      }
    }
  };

  const handleRemoveBadge = (indexToRemove) => {
    const updatedTags = form.getValues("tags");
    updatedTags.splice(indexToRemove, 1);
    form.setValue("tags", updatedTags);
    form.trigger("tags");
  };

  const handleSubmitData = (data) => {
    data.events = form.getValues("events");
    data["userId"] = currentUser._id;
    apiClient
      .createDate(data)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
      <Form {...form}>
          <form
              onSubmit={form.handleSubmit(handleSubmitData)}
              className="space-y-8"
          >
              <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                      <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                              <Input placeholder="Date Title" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => {
                      return (
                          <FormItem>
                              <FormLabel>Tags</FormLabel>
                              <FormDescription>
                                  Tags can be maximum of 13 characters
                              </FormDescription>
                              <FormControl>
                                  <Input
                                      placeholder="Enter Tags"
                                      onKeyDown={handleKeyDown}
                                  />
                              </FormControl>
                              <div className="flex flex-wrap gap-2">
                                  {field.value.map((tag, index) => (
                                      <Badge
                                          key={index}
                                          className="bg-blue-100 hover:bg-blue-200 transition-colors duration-300 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full"
                                      >
                                          {tag}
                                          <button
                                              onMouseUp={() =>
                                                  handleRemoveBadge(index)
                                              }
                                              className="ml-1"
                                          >
                                              <X size={17} />
                                          </button>
                                      </Badge>
                                  ))}
                              </div>
                              <FormMessage />
                          </FormItem>
                      );
                  }}
              />
              <h2 className="text-2xl font-bold">Events</h2>
              {form.watch("events").map((event, index) => (
                  <EventField
                      key={index}
                      index={index}
                      event={event}
                      form={form}
                  />
              ))}

              <div className="flex justify-center">
                  <Button
                      type="button"
                      onClick={handleAddEvent}
                      className="transition delay-100 duration-300 ease-in-out text-white border-2 text-base py-2 px-4 bg-muted hover:bg-palecyan hover:text-white"
                  >
                      Add Another Event
                  </Button>
              </div>
              <div className="flex justify-center">
                  <Button
                      type="submit"
                      className="transition delay-100 duration-300 ease-in-out bg-secondary border-2 hover:bg-secondary-hover w-full text-xl my-2"
                  >
                      Create
                  </Button>
              </div>
          </form>
      </Form>
  );
};

export default CreatePostForm;
