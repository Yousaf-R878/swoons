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

const CreatePost = () => {


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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Date</DialogTitle>
          <DialogDescription>
            Create a date to share with your friends!
          </DialogDescription>
        </DialogHeader>
        <CreatePostForm />
        {/* <div className="grid gap-4 py-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Date title" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex items-center gap-2">
              {tags.map((tag, index) => (
                <Badge key={index}>
                  {tag}
                  <X
                    className="ml-2 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
              <Input
                value={tagInput}
                id="tags"
                placeholder="Add tags"
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
