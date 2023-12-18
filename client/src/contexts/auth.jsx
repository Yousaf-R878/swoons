import { createContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { set } from "react-hook-form";

const AuthorizeContext = createContext();

const AuthorizeProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const auth = getAuth();

  const initialize = async () => {
    try {
      const user = await apiClient.getUserFromToken();
      if (user.data) {
        setCurrentUser(user.data);
      }
      console.log(user.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        apiClient.setToken(user.accessToken);
        await initialize();
        setInitialized(true);
      } else {
        console.log("User is signed out");
        apiClient.setToken(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const registerUser = async (credentials) => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      credentials["id"] = user.user.uid;
      await apiClient.registerUser(credentials);
      console.log("User Registered Succesfully!");
    } catch (err) {
      console.error(err);
      throw(err);
    }
  };

  const loginUser = async (credentials) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      console.log(user);
    } catch (err) {
      throw err;
    }
  };

  const logoutUser = async () => {
    try {
      await auth.signOut();
      console.log("User Logged Out Succesfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const passedProps = {
    registerUser,
    logoutUser,
    loginUser,
    initialized,
    currentUser,
  };

  return (
    <AuthorizeContext.Provider value={passedProps}>
      {children}
    </AuthorizeContext.Provider>
  );
};

export { AuthorizeContext, AuthorizeProvider };
