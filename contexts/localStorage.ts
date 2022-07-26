import { StateType } from "../types/contexts";

const localStorageAvailable = () => {
  return typeof window !== "undefined";
};

export const setLocalStorageItem = (key: string, value: string) => {
  if (localStorageAvailable()) {
    window.localStorage.setItem(key, value);
  }
};

export const getLocalStorageItem = (key: string): string => {
  if (localStorageAvailable()) {
    return window.localStorage.getItem(key) || "";
  }
  return "";
};

export const hasParseableLocalStorageItem = (key: string) => {
  if (localStorageAvailable()) {
    const item = window.localStorage.getItem(key);
    try {
      if (item && JSON.parse(item)) return true;
    } catch {
      return false;
    }
  }
  return false;
};
