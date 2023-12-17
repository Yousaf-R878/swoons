import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
  
const ViewCardModal = ({works, cardInfo, comments}) => {

    return (
        <DialogContent className="sm:max-w-[925px] sm:max-h-[700px] overflow-y-auto">
            <DialogHeader>
                <DialogTitle className="text-2xl text-center">{cardInfo.title}</DialogTitle>
                <div className="flex flex-col justify-center items-center">
                    <p className="text-xl mr-2 text-gray-300">By: {cardInfo.username}</p>
                    {cardInfo.badges.map((badge, index) => (
                        <Badge key={index} className="bg-palecyan my-2 h-5 text-xs text-gray-500">
                            {badge}
                        </Badge>
                    ))}
                    <div className="flex flex-row">
                        <Heart size={30} color="#FFA39C" className="mr-2" />
                        <span>{cardInfo.likes}</span>
                        {/* Maybe make comments blue? */}
                        <MessagesSquare size={30} color="gray" className="ml-2 mr-2" />
                        <span>{cardInfo.comments}</span>
                    </div>
                </div>
                <Separator/>
            </DialogHeader>
            <div className="flex items-center my-4 flex-col">
                {works.map((work, index) => (
                    <div key={index} className="flex justify-between items-center w-full py-10">
                        <img src={work.art} alt={work.artist} className="w-40 h-40 mr-4 object-cover rounded-sm" />
                        <div className="flex w-full flex-col px-2">
                            <div className="flex flex-col justify-center items-start text-xl font-bold">
                                <h2>{work.title}</h2>
                                <Separator/>
                            </div>
                            <p className="pt-4">{work.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Separator />
            <DialogFooter>
                <div className="flex flex-col w-full">
                    <div className="flex justify-center items-center w-full">
                        <Input id="newComment" placeholder="Leave a comment..." className="w-full active:border-primary focus-visible:border-primary focus-visible:outline-none focus-visible:ring-0" />
                        <Button className="transition delay-100 duration-300 ease-in-out hover:bg-primary-hover text-xl my-2 ml-4">
                            Comment
                        </Button>
                    </div>
                    {comments.map((comment, index) => (
                        <div key={index} className="flex justify-between items-center w-full py-5 my-3 rounded-sm border-2">
                            <div className="flex w-full flex-col px-2">
                                <div className="flex flex-col justify-center items-start">
                                    <h3 className="text-xl font-bold">{comment.name}</h3>
                                    <div className="flex flex-row justify-between items-center w-full">
                                    <p className="mr-2 text-gray-300">{comment.username}</p>
                                    <p className="text-gray-300">{comment.timestamp}</p>
                                    </div>
                                </div>
                                <Separator/>
                                <p className="pt-4">{comment.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogFooter>
        </DialogContent>

    );
};
  
  export default ViewCardModal;
  