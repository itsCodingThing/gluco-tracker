import { Measurement } from "@/types/measurement";
import { MeasurementDetails } from "@/types/measurement-details";
import { formatDate } from "date-fns";
import { query, where, getDocs, doc, orderBy, limit } from "firebase/firestore";
import firebase from "@/lib/firebase";
import { createResponse } from "@/lib/response";

const { measurementCollection, measurementDetailsCollection } =
  firebase.collection;

export async function getMeasurementByType(
  type: string,
): Promise<Measurement[]> {
  const q = query(
    measurementCollection,
    where("type", "==", type),
    orderBy("createdAt", "desc"),
    limit(60),
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
    };
  }) as Measurement[];
}

export async function getMeasurements(
  userId: string,
): Promise<Partial<Omit<Measurement, "userId">>[]> {
  const q = query(
    measurementCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(100),
  );
  const querySnapshot = await getDocs(q);
  const results: Partial<Omit<Measurement, "userId">>[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    results.push({
      id: doc.id,
      measurement: data.measurement,
      dosage: data.dosage,
      createdAt: formatDate(data.createdAt, "dd/MM/yyyy"),
      type: data.type,
      status: data.status,
    });
  });

  return results;
}

type MeasurementPayload = {
  userId: string;
  dosage: number;
  measurement: number;
  type: string;
  createdAt: string;
  description?: string;
};
export async function createNewMeasurement(payload: MeasurementPayload) {
  // save measurement in details collection
  const detailsDocSnap = await getDocs(
    query(measurementDetailsCollection, where("userId", "==", payload.userId)),
  );

  try {
    await firebase.transaction(async (transaction) => {
      // no details found create one
      if (detailsDocSnap.docs.length === 0) {
        const detailsDocRef = doc(measurementDetailsCollection);
        const details: MeasurementDetails = {
          id: detailsDocRef.id,
          userId: payload.userId,
          latestMeasurement: {
            measuremnt: payload.measurement,
            dosage: payload.dosage,
            type: payload.type,
            date: payload.createdAt,
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

        transaction.set(detailsDocRef, details);
      } else {
        const detailsDocRef = detailsDocSnap.docs[0].ref;
        transaction.update(detailsDocRef, {
          latestMeasurement: {
            measuremnt: payload.measurement,
            dosage: payload.dosage,
            type: payload.type,
            date: payload.createdAt,
          },
        });
      }

      // save measurement
      const docRef = doc(measurementCollection);
      const saveData: Measurement = {
        id: docRef.id,
        status: "normal",
        description: "",
        ...payload,
      };
      transaction.set(docRef, saveData);
    });

    return createResponse({
      msg: "added measurement successfully",
      data: "",
      status: true,
    });
  } catch {
    return createResponse({
      msg: "failed to add measurement",
      data: "",
      status: false,
    });
  }
}

export async function getMeasurementDetailsByUserId(userId: string) {
  const q = query(measurementDetailsCollection, where("userId", "==", userId));
  const docSnaps = await getDocs(q);

  if (docSnaps.docs.length === 0) {
    return null;
  }

  const data = docSnaps.docs[0].data() as MeasurementDetails;
  return data;
}
