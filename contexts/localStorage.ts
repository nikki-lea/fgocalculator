// const currentLocalStorageVersion = "20221128";

const localStorageAvailable = () => {
  return typeof window !== "undefined";
};

// Uncommment on a non-backwards-compatible change if necessary

// const purgeLocalStorageIfOutdated = () => {
//   const savedVersion = window.localStorage.getItem("localStorageVersion");
//   if (savedVersion !== currentLocalStorageVersion) {
//     window.localStorage.clear();
//   }
//   window.localStorage.setItem(
//     "localStorageVersion",
//     currentLocalStorageVersion
//   );
// };

export const setLocalStorageItem = (key: string, value: string) => {
  if (localStorageAvailable()) {
    window.localStorage.setItem(key, value);
  }
};

export const getLocalStorageItem = (key: string): string => {
  if (localStorageAvailable()) {
    // purgeLocalStorageIfOutdated();
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
