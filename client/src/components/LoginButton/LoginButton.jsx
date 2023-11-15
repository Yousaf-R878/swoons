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
import LoginForm from "../LoginForm/LoginForm";

const LoginButton = () => {
  // 2. Define a submit handler.
  function handleLogin(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="font-semibold text-primary border-primary border-2 text-lg py-2 px-4 hover:text-white hover:bg-primary hover:border-transparent min-w-[100px] max-w-xs mb-4 sm:mb-0"
        >
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Login</DialogTitle>
        </DialogHeader>
        <LoginForm handleLogin={handleLogin} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginButton;
