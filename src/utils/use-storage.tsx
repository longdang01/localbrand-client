import { useState, useEffect } from 'react';
import storage from './storage';

const useStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const value = storage.getStorage(key);
      return value;
    }
    return '';
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(storage.getStorage(key));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  const setStorage = (value: string) => {
    storage.setStorage(key, value);
    setStoredValue(value);
  };

  const clearStorage = () => {
    storage.clearStorage(key);
    setStoredValue('');
  };

  return [storedValue, setStorage, clearStorage];
};

export default useStorage;
