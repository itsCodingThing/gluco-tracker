import { Profile } from "@/types/profile";
import {
  doc,
  setDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import firebase from "@/lib/firebase";
import { Result } from "@/lib/result";
import { ExternalServiceError } from "@/lib/errors";

const { profileCollection } = firebase.collection;

export async function createProfile(payload: Omit<Profile, "id">): Promise<Result<string, ExternalServiceError>> {
  const docRef = doc(profileCollection);
  const saveData: Profile = {
    ...payload,
    id: docRef.id,
    userId: payload.userId,
  };

  try {
    await setDoc(docRef, saveData);
    return Result.ok(docRef.id);
  } catch (error) {
    return Result.err(new ExternalServiceError({ msg: "failed to create new user" }))
  }
}

export async function getProfile(userId: string) {
  const q = query(profileCollection, where("userId", "==", userId));
  const results = await getDocs(q);

  const profile: Profile[] = [];
  results.forEach((doc) => {
    profile.push(doc.data() as Profile);
  });

  if (profile[0]) {
    return profile[0];
  }
  return null;
}

export async function updateProfileByUserId(
  userId: string,
  update: Partial<Omit<Profile, "id" | "userId" | "createdAt">>,
): Promise<Result<string, ExternalServiceError>> {
  try {
    const q = query(profileCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length !== 1) {
      return Result.err(new ExternalServiceError({ msg: "unable to update profile" }));
    }

    const snapDoc = querySnapshot.docs[0];
    const docRef = doc(profileCollection, snapDoc.id);
    await updateDoc(docRef, update);

    return Result.ok(docRef.id);
  } catch {
    return Result.err(new ExternalServiceError({ msg: "unable to update profile" }))
  }
}
