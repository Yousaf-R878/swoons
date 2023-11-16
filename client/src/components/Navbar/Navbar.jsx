import { Link } from "react-router-dom";
import { Boxes } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import LoginButton from "../LoginButton/LoginButton";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white p-4 text-white flex justify-between items-center">
      <div className="flex items-center">
        <Boxes
          size={40}
          strokeWidth={1}
          color="#FFA39C"
          className="h-10 w-9 mr-2"
        />
        <span className="text-black font-semibold text-xl tracking-tight">
          Company Name
        </span>
      </div>
      <div>
        <LoginButton />
        {/* <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Login
        </button> */}
        <Button
          asChild
          className="transition delay-100 duration-300 ease-in-out ml-4 font-semibold text-white border-primary border-2 text-lg py-2 px-4 hover:bg-primary-hover min-w-[100px] max-w-xs"
        >
          <Link href="/signup">Sign Up</Link>
        </Button>
        {/* <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 border border-blue-700 rounded">
          Register
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
