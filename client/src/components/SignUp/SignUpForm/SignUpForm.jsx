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
import { useNavigate, Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useState } from "react";
import { AuthorizeContext } from "@/src/contexts/auth";
import { useContext } from "react";
import apiClient from "../../../services/apiClient";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters long" })
      .max(50, { message: "First name must be less than 50 characters long" })
      .regex(/^[a-zA-Z'-]+$/, { message: "Invalid first name format" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters long" })
      .max(50, { message: "Last name must be less than 50 characters long" })
      .regex(/^[a-zA-Z'-]+$/, { message: "Invalid last name format" }),
    email: z.string().email({ message: "Invalid email address." }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 2 characters long" })
      .max(20, { message: "Username must be less than 20 characters long" })
      .regex(/^[a-z0-9]+$/i, { message: "Invalid username format" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/(?=.*[a-z])/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/(?=.*[A-Z])/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/(?=.*[0-9])/, {
        message: "Password must contain at least one number",
      })
      .regex(/(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least one symbol (!@#$%^&*)",
      }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/(?=.*[a-z])/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/(?=.*[A-Z])/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/(?=.*[0-9])/, {
        message: "Password must contain at least one number",
      })
      .regex(/(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least one symbol (!@#$%^&*)",
      }),
  })
  .refine(
    (schema) => {
      return schema.password === schema.confirmPassword;
    },
    { message: "Passwords must match", path: ["confirmPassword"] }
  );

const SignupForm = () => {
  const { registerUser } = useContext(AuthorizeContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async () => {
    console.log("Registering user...");
    try {
      const {
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
      } = form.getValues();
      const emailExists = await apiClient.checkEmail(email);
      if (emailExists.data.exists) {
        setError("Email already exists!");
        return;
      }
      const usernameExists = await apiClient.checkUsername(username);
      if (usernameExists.data.exists) {
        setError("Username already exists!");
        return;
      }
      await registerUser({
        firstName,
        lastName,
        email,
        username,
        password,
        confirmPassword,
      });
      navigate("/explore");
    } catch (e) {
      console.log("Error registering user");
      console.error(e);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-8">
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="johndoe" {...field} />
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
        <FormMessage>{error}</FormMessage>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="transition delay-100 duration-300 ease-in-out hover:bg-primary-hover w-full text-xl"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
