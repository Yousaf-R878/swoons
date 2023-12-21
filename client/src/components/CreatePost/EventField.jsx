// EventField.jsx

import React from "react";
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";

const EventField = ({ index, event, form }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleRemoveEvent = () => {
    const newEvents = form.getValues("events");
    newEvents.splice(index, 1);
    form.setValue("events", newEvents);
  };

  useEffect(() => {
    if (searchTerm === "") {
      setSearchResults([]);
      return;
    }
    const delayDebounceFn = setTimeout(() => {
      setIsFetching(true);
      apiClient
        .getEvents(searchTerm)
        .then(({ data }) => {
          const results = Array.isArray(data) ? data : [];
          setIsFetching(false);
          setSearchResults(results);
        })
        .catch((error) => {
          console.log(error);
          setIsFetching(false);
          setSearchResults([]);
        });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div key={index} className="border p-4 rounded">
      {form.getValues("events").length > 1 && (
        <div className="w-full flex justify-end">
          <button onClick={handleRemoveEvent}>
            <X size={20} />
          </button>
        </div>
      )}
      <FormField
        control={form.control}
        name={`events.${index}.location`}
        render={() => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Command>
                {/* this goofy ahh workaround is required because commandinput cant have a {...field}... lovely */}
                {form.getValues(`events.${index}.name`) === "" ? (
                  <CommandInput
                    placeholder="Look up an event..."
                    onKeyUp={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                ) : (
                  <div className="flex flex-row w-full justify-between">
                    <CommandInput
                      placeholder="Look up an event..."
                      value={form.getValues(`events.${index}.name`)}
                      onKeyUp={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      disabled={true}
                    />
                    <button
                      onMouseUp={() => {
                        form.setValue(`events.${index}.name`, "");
                        form.setValue(`events.${index}.location`, "");
                        form.setValue(
                          `events.${index}.tripAdvisorLocationId`,
                          ""
                        );
                        form.trigger(`events.${index}.location`);
                        setSearchTerm("");
                      }}
                      className="ml-1"
                    >
                      <X size={17} />
                    </button>
                  </div>
                )}
                <CommandList>
                  <CommandEmpty>
                    {isFetching ? "Fetching Results..." : "No results found."}
                  </CommandEmpty>
                  <CommandGroup>
                    {searchResults.map((result) => (
                      <CommandItem
                        key={result.tripAdvisorLocationId}
                        onMouseUp={() => {
                          form.setValue(`events.${index}.name`, result.name);
                          form.setValue(
                            `events.${index}.location`,
                            result.location
                          );
                          form.setValue(
                            `events.${index}.tripAdvisorLocationId`,
                            result.tripAdvisorLocationId
                          );
                          form.trigger(`events.${index}.location`);
                          setSearchTerm("");
                        }}
                      >
                        {result.name}
                      </CommandItem>
                    ))}
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
              <Textarea placeholder="Description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EventField;
