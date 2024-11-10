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
import { createResponse } from "@/lib/response";

const { profileCollection } = firebase.collection;

export async function createProfile(payload: Omit<Profile, "id">) {
  const docRef = doc(profileCollection);
  const saveData: Profile = {
    ...payload,
    id: docRef.id,
    userId: payload.userId,
  };
  await setDoc(docRef, saveData);

  return docRef.id;
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
) {
  try {
    const q = query(profileCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 1) {
      const snapDoc = querySnapshot.docs[0];
      const docRef = doc(profileCollection, snapDoc.id);
      await updateDoc(docRef, update);
    }

    return createResponse({
      msg: "profile updated successfully",
      status: true,
      data: "",
    });
  } catch {
    return createResponse({
      msg: "profile update failed",
      status: false,
      data: "",
    });
  }
}
