import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("done");
    }, ms);
  });
}

export function groupBy<
  T extends Record<string | number, string | number | boolean>,
  K extends keyof T,
>(items: T[], key: K) {
  const map = new Map();
  const arr: Array<[T[K], T[]]> = [];

  items.forEach((value) => {
    if (map.has(value[key])) {
      map.set(value[key], [...map.get(value[key]), value]);
    } else {
      map.set(value[key], [value]);
    }
  });

  map.forEach((value, key) => {
    arr.push([key, value]);
  });

  return arr;
}
