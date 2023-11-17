import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SignupForm from "../LoginForm/SignupForm";
import { Separator } from "@/components/ui/separator";
import {signInWithPopup, GoogleAuthProvider, getAuth} from "firebase/auth";
import { useNavigation } from "react-router-dom";

const SignupButton = () => {
  // 2. Define a submit handler.
  function handleLogin(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  
  async function handleGoogle(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const userCred = await signInWithPopup(auth, provider);
    console.log(userCred)
    if (userCred.user){
      console.log('navigate or smn')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="transition delay-100 duration-300 ease-in-out ml-4 font-semibold text-white border-primary border-2 text-lg py-2 px-4 bg-primary hover:bg-primary-hover hover:text-white min-w-[100px] max-w-xs"
        >
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Login</DialogTitle>
        </DialogHeader>
        <Button onClick={handleGoogle} className="googleButton gradient-border bg-white py-2 px-4 cursor-pointer font-bold hover:bg-gray-100">
          <span className="googleText">
          Sign in with Google
          </span>
        </Button>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-600">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <SignupForm/>
      </DialogContent>
    </Dialog>
  );
};

export default SignupButton;
