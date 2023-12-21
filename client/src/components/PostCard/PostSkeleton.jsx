import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = () => {
  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col mx-auto"
      style={{ maxWidth: "100%", width: "54rem" }}
    >
      {/* Skeleton for Carousel */}
      <Skeleton className="w-full" style={{ height: "16rem" }} />
      {/* Skeleton for Content */}
      <div className="p-4 flex-grow">
        {/* Skeleton for Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} className="h-4 w-16 rounded-full" />
          ))}
        </div>
        {/* Skeleton for Title, Username, and Date */}
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-1" />
        <Skeleton className="h-4 w-1/4 mb-4" />
      </div>
      {/* Skeleton for Footer */}
      <div className="flex justify-between items-center p-4">
        <Skeleton className="h-8 w-1/4 rounded" />
        <Skeleton className="h-8 w-1/4 rounded" />
        <Skeleton className="h-8 w-1/2 rounded" />
      </div>
    </div>
  );
};

export default PostSkeleton;
