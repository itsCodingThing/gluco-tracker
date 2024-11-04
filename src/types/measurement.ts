export interface Measurement {
  description: string;
  userId: string;
  dosage: number;
  measurement: number;
  createdAt: string;
  id: string;
  status: "normal" | "high" | "low";
}
