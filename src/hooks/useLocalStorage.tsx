import { useState, useEffect } from "react";

export function useLocalStorageGet(key: string) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      setStoredValue(item);
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return storedValue;
}
