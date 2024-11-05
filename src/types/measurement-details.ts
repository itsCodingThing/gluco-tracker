export interface MeasurementDetails {
  id: string;
  userId: string;
  latestMeasurement: {
    measuremnt: number;
    dosage: number;
    type: string;
    date: string;
  };
  maxMeasurement: {
    measuremnt: number;
    dosage: number;
    type: string;
    date: string;
  };
  minMeasurement: {
    measuremnt: number;
    dosage: number;
    type: string;
    date: string;
  };
}
