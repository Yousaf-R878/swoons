import { Button } from "@/components/ui/button";
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
import SignupForm from "../SignUpForm/SignUpForm";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import "./SignUpSheet.css";
import apiClient from "@/src/services/apiClient";
import { AuthorizeContext } from "@/src/contexts/auth";

const SignupButton = () => {
  async function handleGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const result = await signInWithPopup(auth, provider);
    const userExists = await apiClient.checkEmail(result.user.email);
    if (!userExists.data.exists) {
      const username = result.user.email.split("@")[0];
      const firstName = result.user.displayName.split(" ")[0];
      const lastName = result.user.displayName.split(" ")[1];
      await apiClient.registerUser({
        id: result.user.uid,
        email: result.user.email,
        username: username,
        firstName: firstName,
        lastName: lastName,
      });
    }
  }

  return (
    <SheetContent className="sm:max-w-[425px] overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-2xl text-center mx-10">Sign Up</SheetTitle>
        <Button
          onClick={handleGoogle}
          className="googleButton gradient-border w-full bg-white py-2 px-4 cursor-pointer font-bold hover:bg-gray-100"
        >
          <span className="googleText">Sign in with Google</span>
        </Button>
      </SheetHeader>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-600">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <SignupForm />
    </SheetContent>
  );
};

export default SignupButton;
