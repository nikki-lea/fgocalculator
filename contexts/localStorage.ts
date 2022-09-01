const localStorageAvailable = () => {
  return typeof window !== "undefined";
};

export const setLocalStorageItem = (key: string, value: string) => {
  if (localStorageAvailable()) {
    window.localStorage.setItem(key, value);
  }
};

export const getLocalStorageItem = (key: string) => {
  if (localStorageAvailable()) {
    return window.localStorage.getItem(key);
  }
};
