import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { z } from "zod";
import { createProfile } from "./profile";
import firebase from "@/lib/firebase";
import { parseAsync, zod, ZodInput } from "@/lib/validation";
import { createResponse, type Response } from "@/lib/response";

interface SignupPayload {
  email: string;
  password: string;
  name: string;
}
export async function signup(payload: SignupPayload) {
  const result = await createUserWithEmailAndPassword(
    firebase.auth,
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
    medication: [],
  });
}

const SigninSchema = zod.object({
  email: z.string(),
  password: z.string(),
});
type SigninPayloadInput = ZodInput<typeof SigninSchema>;
export async function signin(
  payload: SigninPayloadInput,
): Promise<Response<string>> {
  const verifiedPayload = await parseAsync(SigninSchema, payload);
  if (verifiedPayload.isErr()) {
    return createResponse({
      status: false,
      msg: "Please check fields",
      data: "",
    });
  }
  const data = verifiedPayload.unwrap();

  try {
    const result = await signInWithEmailAndPassword(
      firebase.auth,
      data.email,
      data.password,
    );

    return createResponse({
      status: true,
      msg: "successfully signedin",
      data: result.user.uid,
    });
  } catch {
    return createResponse({
      status: false,
      msg: "Signin failed",
      data: "",
    });
  }
}

export async function signout() {
  await signOut(firebase.auth);
}
