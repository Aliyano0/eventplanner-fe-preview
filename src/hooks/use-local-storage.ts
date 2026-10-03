"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  window.addEventListener("storage", onChange); // other tabs
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
};

const read = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null; // storage blocked (e.g. strict privacy mode)
  }
};

/** Writes a value and re-renders every `useStoredValue` subscriber of that key in this tab. */
export const setStoredValue = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore: the UI simply won't persist in that browser
  }
  listeners.forEach((notify) => notify());
};

/**
 * Reads a `localStorage` key without breaking server rendering or hydration.
 *
 * - `undefined` -> on the server and during hydration (storage is not readable yet)
 * - `null`      -> the key is not set
 * - `string`    -> the stored value
 */
export const useStoredValue = (key: string) =>
  useSyncExternalStore<string | null | undefined>(
    subscribe,
    () => read(key),
    () => undefined,
  );
