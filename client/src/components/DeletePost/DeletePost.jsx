import React from 'react'
import { Button } from "@/components/ui/button";
import { useContext, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Trash2 } from 'lucide-react';
import apiClient from "../../services/apiClient";
import { AuthorizeContext } from "../../contexts/auth";


const DeletePost = (date) => {
    const { currentUser } = useContext(AuthorizeContext);
    const [dialogDescription, setDialogDescription] = useState('Are you sure you want to delete your date?');
    const [showDialog, setShowDialog] = useState(true);

    const handleDeleteData = ({date}) => {
        console.log(date)
        console.log(currentUser)
        apiClient.removeDate(currentUser._id, date._id).then(({ data }) => {
            console.log("Removed Date:");
            console.log(data);
            setDialogDescription('You deleted your date!');
            setTimeout(() => {
                setShowDialog(false);
                window.location.reload(true);
            }, 2000);
            
        }).catch((error) => {
            console.log(error);
            setDialogDescription("Something went wrong. Please try again!")
            setTimeout(() => {
                setShowDialog(false);
            }, 3000);
        });
    
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
            as="a"
            href="delete-post"
            className="flex flex-grow items-center justify-center rounded-md bg-white text-red-500 transition-colors duration-300 hover:bg-slate-200 p-2 text-xs"
        >
            <Trash2 className="h-4 w-4" /> 
        </Button>
      </DialogTrigger>
      {showDialog && (
      <DialogContent className="sm:max-w-[425px] sm:max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Delete Date</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-center">
            <DialogClose>
                <Button 
                    className="bg-white text-black-500 transition-colors duration-300 hover:bg-slate-200">
                        Cancel
                </Button>
            </DialogClose>
            
            <Button 
                onClick={() => handleDeleteData(date)}
                className="bg-white text-red-500 transition-colors duration-300 hover:bg-slate-200">
                Delete
            </Button>
            
        </DialogFooter>
      </DialogContent>
      )}
    </Dialog>
  )
}

export default DeletePost