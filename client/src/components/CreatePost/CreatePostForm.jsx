import { useState, useEffect, useRef } from "react";
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
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import apiClient from "../../services/apiClient";
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
    .nonempty({ message: "You must add at least one tag" })
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
      events: [{ location: "", description: "", tripAdvisorLocationId: "" }],
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      // Send Axios request here
      apiClient.getEvents(searchTerm).then(({ data }) => {
        const results = Array.isArray(data) ? data : [];
        setSearchResults(results);
      }).catch((error) => {
        console.log(error);
        setSearchResults([]);
      });
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm]);

  const handleAddEvent = () => {
    const newEvents = form.getValues("events");
    newEvents.push({ location: "", description: "", tripAdvisorLocationId: "" });
    form.setValue("events", newEvents);
  };

  const handleRemoveEvent = (indexToRemove) => {
    const newEvents = form.getValues("events");
    newEvents.splice(indexToRemove, 1);
    form.setValue("events", newEvents);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = event.target.value.trim();
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
    console.log("remove badge");
    const updatedTags = form.getValues("tags");
    updatedTags.splice(indexToRemove, 1);
    form.setValue("tags", updatedTags, { shouldValidate: true });
    form.trigger("tags");
  };

  const handleSubmitData = (data) => {
    console.log(data);
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
            console.log(field);
            return (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Tags" onKeyDown={handleKeyDown} />
                </FormControl>
                <div className="flex flex-wrap gap-2">
                  {field.value.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-palecyan text-sm py-1 px-2.5 rounded-full mr-1 text-gray-500"
                    >
                      {tag}
                      <button
                        onMouseUp={() => handleRemoveBadge(index)}
                        className="ml-1"
                      >
                        <X size={17} />
                      </button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <h2 className="text-2xl font-bold">Events</h2>
        {form.watch("events").map((event, index) => (
          <div key={index} className="border p-4 rounded">
            {form.watch("events").length > 1 && (
              <div className="w-full flex justify-end">
                <button onClick={() => handleRemoveEvent(index)}>
                  <X size={20} />
                </button>
              </div>
            )}
            <FormField
              control={form.control}
              name={`events.${index}.location`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Command>
                      { form.getValues(`events.${index}.location`) === "" ?
                      <CommandInput placeholder="Look up an event..." 
                      onKeyUp={(e)=> {
                        setSearchTerm(e.target.value);
                      }}
                      />
                      :
                      <CommandInput placeholder="Look up an event..."
                      value={form.getValues(`events.${index}.location`)}
                      onKeyUp={(e)=> {
                        setSearchTerm(e.target.value);
                      }}
                      />
                      }
                      <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Locations">
                          { searchResults.map((result) => (
                            <CommandItem
                              key={result.tripAdvisorLocationId}
                              onMouseUp={() => {
                                form.setValue(`events.${index}.location`, result.name);
                                form.setValue(`events.${index}.tripAdvisorLocationId`, result.tripAdvisorLocationId);
                                setSearchTerm("");
                              }}
                            >
                              {result.name}
                            </CommandItem>
                          ))
                        }
                        </CommandGroup>
                      </CommandList>
                    </Command>
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
          </div>
        ))}

        <div className="flex justify-center">
          <Button
            type="button"
            onClick={handleAddEvent}
            className="transition delay-100 duration-300 ease-in-out text-white border-2 text-base py-2 px-4 bg-secondary hover:bg-secondary-hover hover:text-white"
          >
            Add Another Event
          </Button>
        </div>
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
