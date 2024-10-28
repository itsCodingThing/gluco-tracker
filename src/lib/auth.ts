import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth(app);

export const authProvider = {
  isAuthenticated: localStorage.getItem("auth") === "true" ? true : false,
  async signin({ email, password }: { email: string; password: string }) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("auth", "true");
    localStorage.setItem("uid", result.user.uid);
    return result.user;
  },
  async signout() {
    await signOut(auth);
    localStorage.removeItem("auth");
    localStorage.removeItem("uid");
  },
};
