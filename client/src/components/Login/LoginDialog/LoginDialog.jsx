import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoginForm from "../LoginForm/LoginForm";
import { Button } from "@/components/ui/button";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import "./LoginDialog.css";
import apiClient from '../../../services/apiClient';

const LoginDialog = () => {
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
      console.log(auth.currentUser);
      console.log("navigate or smn");

    }
  }
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-2xl text-center">Login</DialogTitle>
      </DialogHeader>
      <Button
        onClick={handleGoogle}
        className="googleButton gradient-border bg-white py-2 px-4 cursor-pointer font-bold hover:bg-gray-100"
      >
        <span className="googleText">Log in with Google</span>
      </Button>
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-600">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <LoginForm handleLogin={handleLogin} />
    </DialogContent>
  );
};

export default LoginDialog;
