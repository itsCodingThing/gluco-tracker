import { faker } from "@faker-js/faker";
import {
  firestore,
  measurementCollection,
  measurementDetailsCollection,
  profileCollection,
} from "./firestore/firestore";
import { doc, setDoc, writeBatch } from "firebase/firestore";
import { auth } from "./auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Measurement } from "@/types/measurement";
import { MeasurementDetails } from "@/types/measurement-details";
import { Profile } from "@/types/profile";

const userCounts = Array.from({ length: 100 }).map((_, i) => i);
const measurementCounts = Array.from({ length: 500 }).map((_, i) => i);
const dosageType = ["type-1", "type-2"];

for (const i of userCounts) {
  console.log(`User: ${i} seeding`);
  const user = {
    id: "",
    profileId: "",
    name: faker.person.fullName(),
    email: `demo${i}@email.com`,
    password: "demo@123",
  };
  const result = await createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password,
  );
  user.id = result.user.uid;

  // create profile
  const profileDocRef = doc(profileCollection);
  const saveData: Profile = {
    id: profileDocRef.id,
    userId: result.user.uid,
    patientId: crypto.randomUUID(),
    name: user.name,
    email: user.email,
    address: faker.location.streetAddress({ useFullAddress: true }),
    dob: faker.date.birthdate().toISOString(),
    img: "https://picsum.photos/200",
    contact: faker.phone.number({ style: "international" }),
    createdAt: new Date().toISOString(),
    medication: [],
  };
  await setDoc(profileDocRef, saveData);
  user.profileId = profileDocRef.id;

  // create details
  const detailsDocRef = doc(measurementDetailsCollection);
  const details: MeasurementDetails = {
    id: detailsDocRef.id,
    userId: user.id,
    latestMeasurement: {
      measuremnt: faker.number.int({ min: 40, max: 300 }),
      dosage: faker.number.int({ min: 4, max: 30 }),
      type: dosageType[faker.number.int({ min: 0, max: 1 })],
      date: faker.date.past().toISOString(),
    },
    maxMeasurement: {
      measuremnt: 0,
      dosage: 0,
      type: "",
      date: "",
    },
    minMeasurement: {
      measuremnt: 0,
      dosage: 0,
      type: "",
      date: "",
    },
  };
  await setDoc(detailsDocRef, details);

  // create measurements
  const batch = writeBatch(firestore);
  for (const j of measurementCounts) {
    const docRef = doc(measurementCollection);
    const measurement = faker.number.int({ min: 40, max: 300 });
    const dosage = faker.number.int({ min: 4, max: 30 });

    const saveData: Measurement = {
      id: docRef.id,
      description: `this is the demo descripiton ${j}`,
      userId: user.id,
      dosage: dosage,
      type: dosageType[faker.number.int({ min: 0, max: 1 })],
      measurement: measurement,
      createdAt: faker.date.past().toISOString(),
      status:
        measurement >= 180 ? "high" : measurement <= 70 ? "low" : "normal",
    };

    batch.set(docRef, saveData);
  }

  await batch.commit();

  console.log(`User: ${i} seeded`);
}

console.log("Database seeding is complete");
