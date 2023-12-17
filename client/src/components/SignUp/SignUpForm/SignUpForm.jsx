import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import apiClient from '../../../services/apiClient';

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name required" }),
  lastName: z.string().min(1, { message: "Last name required" }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(1, { message: "Password required" }), // This needs more validation
  confirmPassword: z.string().min(1, { message: "Confirm password required" }), // This needs more validation
});

const SignupForm = ({ handleLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(undefined);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function registerUser({ email, password }) {
    console.log(email, password);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("yippee", user);
        let uid = user.uid;
        const desiredUser = {
          id: uid,
          email: user.email,
          username: user.displayName,
        }
        apiClient.registerUser(desiredUser).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage === "Firebase: Error (auth/email-already-in-use)."){
          setError("Email already in use!");
        } else{
          setError(errorMessage);
        }        
        // ..
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(registerUser)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...field}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                    {showPassword ? (
                      <Eye
                        className="h-6 w-6"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <EyeOff
                        className="h-6 w-6"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...field}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 cursor-pointer">
                    {showConfirmPassword ? (
                      <Eye
                        className="h-6 w-6"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    ) : (
                      <EyeOff
                        className="h-6 w-6"
                        onClick={toggleConfirmPasswordVisibility}
                      />
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormDescription>
          
        </FormDescription> */}
        {/* <DialogFooter></DialogFooter> */}
        <div className="flex justify-center">
          <Button
            type="submit"
            className="transition delay-100 duration-300 ease-in-out hover:bg-primary-hover w-full text-xl"
          >
            Sign Up
          </Button>
        </div>
        {error && 
          <div className="flex justify-center">
            <p>{error}</p>
          </div>
        }
        
        {/* <div className="flex justify-center">
          <span className="text-gray-600 mr-4">
            Don't have an account? {""}
            <Link
              href="/signup"
              className="text-secondary hover:text-secondary-hover"
            >
              Sign up
            </Link>
          </span>
        </div> */}
      </form>
    </Form>
    
  );
};

export default SignupForm;
