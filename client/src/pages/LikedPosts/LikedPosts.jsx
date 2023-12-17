import Navbar from "@/src/components/Navbar/NavbarExplore";
import PostCard from "../../components/PostCard/PostCard";

const LikedPosts = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mt-44">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default LikedPosts;
