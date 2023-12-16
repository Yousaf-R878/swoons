import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { MessagesSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
  
const ViewCardModal = ({works, cardInfo}) => {

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
            </DialogHeader>
            <div className="flex items-center my-4 flex-col">
                {works.map((work, index) => (
                    <div key={index} className="flex justify-between items-start w-full py-10">
                        <img src={work.art} alt={work.artist} className="w-618 h-618 mr-4" />
                        <div className="flex w-full bg-palecyan flex-col px-2">
                            <div className="flex justify-center items-center text-xl font-bold">
                                <h2>{work.title}</h2>
                            </div>
                            <p>{work.description}</p>
                        </div>
                    </div>
                ))}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-600">COMMENTS</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>
                <p>COMMENTS HEREEE</p>
            </div>
        </DialogContent>
    );
};
  
  export default ViewCardModal;
  