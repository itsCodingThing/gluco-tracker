import { app } from "./firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  connectAuthEmulator,
} from "firebase/auth";
import { storage } from "./storage";

const auth = getAuth(app);

if (import.meta.env.MODE === "development" && import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
}

export const authProvider = {
  async signin({ email, password }: { email: string; password: string }) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await storage.storeUserData({
      userId: result.user.uid,
      isAuthenticated: true,
    });
  },
  async signout() {
    await signOut(auth);
    storage.removeStoreData();
  },
};
