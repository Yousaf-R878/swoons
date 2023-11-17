import { Link } from "react-router-dom";
import { Boxes } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import LoginDialog from "../Login/LoginDialog/LoginDialog";
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
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="transition delay-100 duration-300 ease-in-out font-semibold text-primary border-primary border-2 text-lg py-2 px-4 hover:text-primary hover:bg-white-hover min-w-[100px] max-w-xs mb-4 sm:mb-0"
            >
              Login
            </Button>
          </DialogTrigger>
          <LoginDialog />
        </Dialog>
        <Button
          asChild
          className="transition delay-100 duration-300 ease-in-out ml-4 font-semibold text-white border-primary border-2 text-lg py-2 px-4 hover:bg-primary-hover min-w-[100px] max-w-xs"
        >
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
