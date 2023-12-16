import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

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
    .nonempty({ message: "You must add at least one tag" }),
  events: z
    .array(eventSchema)
    .nonempty({ message: "At least one event is required" }),
});

const CreatePostForm = () => {
  const initialEvent = { location: "", description: "" };

  const [tags, setTags] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tags: [],
      events: [initialEvent],
    },
  });

  const handleAddEvent = () => {
    setEvents([...events, { location: "", description: "" }]);
  };

  const handleRemoveEvent = (indexToRemove) => {
    setEvents((currentEvents) =>
      currentEvents.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = event.target.value.trim();
      if (newTag !== "") {
        setTags((prevTags) => {
          const updatedTags = [...prevTags, newTag];
          // Update the form's value without triggering validation
          form.setValue("tags", updatedTags, { shouldValidate: false });
          // If there's an error for the tags field, clear it
          if (form.formState.errors.tags) {
            form.clearErrors("tags");
          }
          return updatedTags;
        });
        event.target.value = "";
      }
    }
  };

  const handleSubmitData = (data) => {
    console.log(data);
  };

  const handleRemoveBadge = (indexToRemove) => {
    setTags((currentTags) =>
      currentTags.filter((_, index) => index !== indexToRemove)
    );
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
          render={() => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="Enter Tags" onKeyDown={handleKeyDown} />
              </FormControl>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-palecyan text-sm py-1 px-2.5 rounded-full mr-1 text-gray-500"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveBadge(index)}
                      className="ml-1"
                    >
                      <X size={17} />
                    </button>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {events.map((event, index) => (
          <div key={index} className="border p-4 rounded">
            <h5 className="text-2xl mb-2">Event {index + 1}</h5>
            <FormField
              control={form.control}
              name={`events.${index}.location`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`events.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {events.length > 1 && (
              <button
                onClick={() => handleRemoveEvent(index)}
                className="text-red-500"
              >
                Remove Event
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={handleAddEvent} className="mt-4">
          Add Another Event
        </button>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="transition delay-100 duration-300 ease-in-out hover:bg-primary-hover w-full text-xl my-2"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePostForm;
