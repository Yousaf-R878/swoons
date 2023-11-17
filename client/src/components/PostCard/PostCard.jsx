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

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const PostCard = () => {
  const works = [
    {
      artist: "Ornella Binni",
      art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    },
    {
      artist: "Tom Byrom",
      art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
    },
    {
      artist: "Vladimir Malyavko",
      art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
    },
  ];
  return (
    <Card className="w-[350px] border-primary border-4">
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="w-12 h-12 mr-2">
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>
            <CardTitle>John Doe</CardTitle>
            <CardDescription>@johnDoe</CardDescription>
          </span>
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        <h2>A Cozy Hangout</h2>
        <div className="flex flex-row">
          <Star color="#FFB240" fill="#FFB240" size={30} />
          <Star color="#FFB240" size={30} />
          <Star color="#FFB240" size={30} />
          <StarHalf color="#FFB240" fill="#FFB240" size={30} />
        </div>
        <Badge className="bg-palecyan my-2">Badge</Badge>
        <ScrollArea className="w-full h-48 whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {works.map((artwork) => (
              <figure key={artwork.artist} className="shrink-0">
                <div className="overflow-hidden rounded-md">
                  <img
                    src={artwork.art}
                    alt={`Photo by ${artwork.artist}`}
                    className="h-36 w-36 object-cover"
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
        <Heart size={35} className="mr-2" />
        <span>100</span>
        <MessagesSquare size={35} className="ml-2 mr-2" />
        <span>10</span>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
