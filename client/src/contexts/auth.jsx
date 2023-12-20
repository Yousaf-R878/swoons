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
      setInitialized(false);
      if (user) {
        apiClient.setToken(user.accessToken);
        await initialize();
      } else {
        console.log("User is signed out");
        setCurrentUser(null);
        apiClient.setToken(null);
      }
      setInitialized(true);
    });

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

  const updateUser = async (user) => {
    setCurrentUser(user);
  }

  const passedProps = {
    registerUser,
    logoutUser,
    loginUser,
    initialized,
    currentUser,
    updateUser
  };

  return (
    <AuthorizeContext.Provider value={passedProps}>
      {children}
    </AuthorizeContext.Provider>
  );
};

export { AuthorizeContext, AuthorizeProvider };
