import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Returns false during SSR/first paint and true once mounted on the client —
// the useSyncExternalStore-based alternative to a setState-in-effect gate.
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
