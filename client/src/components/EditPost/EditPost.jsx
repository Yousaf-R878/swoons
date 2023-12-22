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
import EditPostForm from "./EditPostForm";
import { PencilLine } from "lucide-react";
import { useState } from "react";

const EditPost = ({date, handle}) => {
  const [description, setDescription] = useState("Edit your date!");

  function handleDescription() {
    setDescription("Date successfully edited!");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
            as="a"
            href="link-to-post"
            className="flex flex-grow items-center justify-center rounded-md bg-white text-secondary-hover transition-colors duration-300 hover:bg-slate-200 p-2 text-xs"
        >
            <PencilLine className="h-4 w-4" /> 
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] sm:max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Date</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <EditPostForm date={date} handle={handleDescription}/>
      </DialogContent>
    </Dialog>
  );
};

export default EditPost;
