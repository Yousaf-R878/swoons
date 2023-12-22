import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LoginForm from "../LoginForm/LoginForm";
import { Button } from "@/components/ui/button";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import "./LoginDialog.css";
import apiClient from "@/src/services/apiClient";

const LoginDialog = () => {
  async function handleGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
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
      <LoginForm />
    </DialogContent>
  );
};

export default LoginDialog;
