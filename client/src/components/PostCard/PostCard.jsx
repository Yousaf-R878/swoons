import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { StarHalf } from "lucide-react";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { MessagesSquare } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ViewCardModal from "./ViewCardModal";

const PostCard = () => {
  const works = [
    {
      artist: "Ornella Binni",
      art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
      title: "A Cozy Start",
      description: "This hangout starts you off in a wonderful park, lorem ipsuming all over the place. It’s quite lorem ipsum. So much so, that the whole thing lorem ipsum’d on me and I lorem ipsum’d myself. Very great stuff!"
    },
    {
      artist: "Tom Byrom",
      art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
      title: "A Cozy Middle",
      description: "This hangout starts you off in a wonderful park, lorem ipsuming all over the place. It’s quite lorem ipsum. So much so, that the whole thing lorem ipsum’d on me and I lorem ipsum’d myself. Very great stuff!"

    },
    {
      artist: "Vladimir Malyavko",
      art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
      title: "A Cozy End",
      description: "This hangout starts you off in a wonderful park, lorem ipsuming all over the place. It’s quite lorem ipsum. So much so, that the whole thing lorem ipsum’d on me and I lorem ipsum’d myself. Very great stuff!"

    },
  ];
  const cardInfo = {
    name: "John Doe",
    username: "@johnDoe",
    title: "A Cozy Hangout",
    badges: ["Badge"],
    likes: 100,
    comments: 10,
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="w-[350px] cursor-pointer">
          <CardHeader>
            <div className="flex items-center">
              <Avatar className="w-10 h-10 mr-2">
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>
                <CardTitle className="text-xl">John Doe</CardTitle>
                <CardDescription className="text-sm">@johnDoe</CardDescription>
              </span>
            </div>
            <Separator />
          </CardHeader>
          <CardContent>
            <h2>A Cozy Hangout</h2>
            <div className="flex flex-row">
              <Star color="#FFB240" fill="#FFB240" size={25} />
              <Star color="#FFB240" size={25} />
              <Star color="#FFB240" size={25} />
              <StarHalf color="#FFB240" fill="#FFB240" size={25} />
            </div>
            <Badge className="bg-palecyan my-2 h-5 text-xs text-gray-500">
              Badge
            </Badge>
            <ScrollArea className="w-full h-40 whitespace-nowrap rounded-md border">
              <div className="flex w-max space-x-4 p-4">
                {works.map((artwork) => (
                  <figure key={artwork.artist} className="shrink-0">
                    <div className="overflow-hidden rounded-md">
                      <img
                        src={artwork.art}
                        alt={`Photo by ${artwork.artist}`}
                        className="h-28 w-28 object-cover"
                      />
                    </div>
                    {/* <figcaption className="pt-2 text-xs text-muted-foreground">
                      Photo by{" "}
                      <span className="font-semibold text-foreground">
                        {artwork.artist}
                      </span>
                    </figcaption> */}
                  </figure>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
          <CardFooter className="">
            <Heart size={30} color="#FFA39C" className="mr-2" />
            <span>100</span>
            {/* Maybe make comments blue? */}
            <MessagesSquare size={30} color="gray" className="ml-2 mr-2" />
            <span>10</span>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <ViewCardModal works={works} cardInfo={cardInfo}/>
    </Dialog>
  );
};

export default PostCard;
