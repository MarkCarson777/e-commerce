import { firebaseAuth } from "./config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const signUp = async (email: string, password: string) => {
  let result = null;
  let error = null;

  try {
    result = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
  } catch (err) {
    error = err;
  }

  return { result, error };
};

export const signIn = async (email: string, password: string) => {
  let result = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (err) {
    error = err;
  }

  return { result, error };
};
