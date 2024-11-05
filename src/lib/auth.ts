import { app } from "./firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { removeStoreData, storeUserData } from "./storage";
import { z } from "zod";
import { createProfile } from "./firestore/profile";

export const auth = getAuth(app);

// development mode for firebase emulator
if (import.meta.env.MODE === "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
}

interface SignupPayload {
  email: string;
  password: string;
  name: string;
}
export async function signup(payload: SignupPayload) {
  const result = await createUserWithEmailAndPassword(
    auth,
    payload.email,
    payload.password,
  );
  await createProfile({
    userId: result.user.uid,
    patientId: crypto.randomUUID(),
    name: payload.name,
    email: payload.email,
    address: "",
    dob: "",
    img: "https://picsum.photos/200",
    contact: "",
    createdAt: new Date().toISOString(),
  });
  await storeUserData({
    userId: result.user.uid,
    isAuthenticated: true,
  });
}

const SigninSchema = z.object({
  email: z.string(),
  password: z.string(),
});
type SigninPayloadInput = z.input<typeof SigninSchema>;

export async function signin(payload: SigninPayloadInput) {
  const verifiedPayload = await SigninSchema.parseAsync(payload);
  const result = await signInWithEmailAndPassword(
    auth,
    verifiedPayload.email,
    verifiedPayload.password,
  );
  await storeUserData({
    userId: result.user.uid,
    isAuthenticated: true,
  });
}

export async function signout() {
  await signOut(auth);
  removeStoreData();
}
