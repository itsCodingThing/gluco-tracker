import { initializeApp } from "firebase/app";

const config = JSON.parse(import.meta.env.VITE_FIREBASE);
export const app = initializeApp(config);
