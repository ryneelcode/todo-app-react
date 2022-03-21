import { useEffect, useState } from "react";

const getStorageValue = (key, value) => {
  const storageValue = localStorage.getItem(key);
  const initialValue = JSON.parse(storageValue);

  return initialValue || value;
};

export const useLocalStorage = (key, initalValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, initalValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
