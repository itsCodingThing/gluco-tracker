import { app } from "./firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { storage } from "./storage";

const auth = getAuth(app);

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
