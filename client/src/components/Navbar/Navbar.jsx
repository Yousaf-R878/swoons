import { Link } from "react-router-dom";
import { Boxes } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import LoginButton from "../LoginButton/LoginButton";
import SignupButton from "../LoginButton/SignupButton";
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
        <SignupButton/>
      </div>
    </nav>
  );
};

export default Navbar;
