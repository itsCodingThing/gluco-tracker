import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  browserLocalPersistence
} from "firebase/auth";
import { createProfile } from "./profile";
import firebase from "@/lib/firebase";
import { Result } from "@/lib/result";
import { ExternalServiceError } from "@/lib/errors";

interface SignupPayload {
  email: string;
  password: string;
  name: string;
}
export async function signup(payload: SignupPayload): Promise<Result<string, ExternalServiceError>> {
  const result = await Result.withResultAsync(async () => await createUserWithEmailAndPassword(
    firebase.auth,
    payload.email,
    payload.password,
  ));

  if (result.isErr()) {
    return Result.err(new ExternalServiceError({ msg: "unable to create new user", data: result.error }))
  }

  const userId = result.value.user.uid;

  const createProfileResult = await createProfile({
    userId: userId,
    patientId: crypto.randomUUID(),
    name: payload.name,
    email: payload.email,
    address: "",
    dob: "",
    img: "https://picsum.photos/200",
    contact: "",
    createdAt: new Date().toISOString(),
    medication: [],
  });

  if (createProfileResult.isErr()) {
    Result.err(new ExternalServiceError({ msg: "unable to create profile" }))
  }


  return Result.ok(userId);
}

export async function login(payload: {
  email: string;
  password: string;
}): Promise<Result<string, ExternalServiceError>> {
  firebase.auth.setPersistence(browserLocalPersistence);

  const result = await Result.withResultAsync(
    async () => await signInWithEmailAndPassword(
      firebase.auth,
      payload.email,
      payload.password,
    ));

  if (result.isErr()) {
    return Result.err(new ExternalServiceError({ msg: "login failed", data: result.error }));
  }

  const userId = result.value.user.uid;
  return Result.ok(userId);
}

export function getLoggedInUser() {
  const user = firebase.auth.currentUser;

  if (!user) {
    return null;
  }

  return {
    userId: user.uid
  }
}

export async function signout() {
  await signOut(firebase.auth);
}
