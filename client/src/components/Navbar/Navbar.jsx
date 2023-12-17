import { Link } from "react-router-dom";
import { Boxes } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoginDialog from "../Login/LoginDialog/LoginDialog";
import { Button } from "@/components/ui/button";
import SignUpSheet from "../SignUp/SignUpSheet/SignUpSheet";

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
          Swoons
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
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="transition delay-100 duration-300 ease-in-out ml-4 font-semibold text-white border-primary border-2 text-lg py-2 px-4 bg-primary hover:bg-primary-hover hover:text-white min-w-[100px] max-w-xs"
            >
              Sign Up
            </Button>
          </SheetTrigger>
          <SignUpSheet />
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
