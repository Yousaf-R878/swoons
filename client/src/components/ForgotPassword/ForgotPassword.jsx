import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const auth = getAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleResetLink = async (event) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, email).then(() => {
      setEmailSent(true);
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
      <header className="max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Forgot Password?
        </h1>
        <p className="text-gray-600 text-center">
          Enter your email address below and we'll send you a link to reset your
          password.
        </p>
      </header>

      <main className="bg-gray-300 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg">
        <section>
          {emailSent ? (
            <div className="text-center p-6">
              <h3 className="text-green-600 font-bold">Success!</h3>
              <p>We've sent a password reset link to {email}.</p>
            </div>
          ) : (
            <form className="flex flex-col" onSubmit={handleResetLink}>
              <div className="mb-6 pt-3 rounded ">
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="bg-gray-100 rounded w-full text-gray-700 transition duration-500 px-3 pb-3"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              >
                Send Reset Link
              </Button>
            </form>
          )}
        </section>
      </main>

      <div className="max-w-lg mx-auto text-center mt-12 mb-6">
        <p className="text-black">
          Remembered your password?{" "}
          <a href="/" className="font-bold hover:underline text-blue-500">
            Sign in
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
