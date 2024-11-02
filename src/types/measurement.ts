export interface Measurement {
  description: string;
  dosage: number;
  measurement: number;
  createdAt: string;
  id: string;
  status: "normal" | "high" | "low";
  userId: string;
}
