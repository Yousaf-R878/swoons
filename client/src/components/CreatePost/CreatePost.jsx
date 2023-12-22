import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import CreatePostForm from "./CreatePostForm";
import { useState } from "react";

const CreatePost = () => {
  const [description, setDescription] = useState("Create a date to share with your friends!");

  function handleDescription() {
    setDescription("Date successfully created!");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="transition delay-100 duration-300 ease-in-out text-white border-2 text-base py-2 px-4 bg-secondary hover:bg-secondary-hover hover:text-white"
        >
          <PlusSquare className="mr-2 h-4 w-4" />
          Create Date
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Date</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <CreatePostForm handle={handleDescription}/>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
