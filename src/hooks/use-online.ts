import { useSyncExternalStore } from "react";

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback: () => void) {
  const controller = new AbortController();

  window.addEventListener("online", callback, { signal: controller.signal });
  window.addEventListener("offline", callback, { signal: controller.signal });

  return () => {
    controller.abort();
  };
}

export function useNetworkStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return isOnline;
}
