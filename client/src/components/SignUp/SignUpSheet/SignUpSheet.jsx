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
import { Separator } from "@/components/ui/separator";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { useNavigation } from "react-router-dom";
import apiClient from '../../../services/apiClient';
import "./SignUpSheet.css";

const SignupButton = () => {
  // 2. Define a submit handler.
  function handleLogin(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  async function handleGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const userCred = await signInWithPopup(auth, provider);
    console.log(userCred);
    if (userCred.user) {

      console.log("navigate or smn");
      const user = {
        id: userCred.user.uid,
        email: userCred.user.email,
        username: userCred.user.displayName,
        accessToken: userCred.user.accessToken
      }

      apiClient.registerUser(user).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  return (
    <SheetContent className="sm:max-w-[425px]">
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
      <SignupForm handleLogin={handleLogin} />
    </SheetContent>
  );
};

export default SignupButton;
