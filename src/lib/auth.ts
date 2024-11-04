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

const auth = getAuth(app);

// development mode for firebase emulator
if (import.meta.env.MODE === "development" && import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
}

const SignUpSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});
type SignupPayloadInput = z.input<typeof SignUpSchema>;

export async function signup(payload: SignupPayloadInput) {
  const verifiedPayload = await SignUpSchema.parseAsync(payload);
  const result = await createUserWithEmailAndPassword(
    auth,
    verifiedPayload.email,
    verifiedPayload.password,
  );
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
