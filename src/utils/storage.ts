// "use client";
// const storagePrefix = 'FRAGILE_';

// const storage = {
//     getStorage: (key: string) => {
//         const value = localStorage.getItem(`${storagePrefix}${key}`);
//         return value ? JSON.parse(value) : '';
//     },
//     setStorage: (key: string, value: string) => {
//         localStorage.setItem(`${storagePrefix}${key}`, value);
//     },
//     clearStorage: (key: string) => {
//         localStorage.removeItem(`${storagePrefix}${key}`);
//     },
// };

// export default storage;

'use client';

const storagePrefix = 'FRAGILE_';

const isClient = typeof window !== 'undefined';

const storage = {
  getStorage: (key: string) => {
    if (!isClient) return ''; // Ensure this runs only on the client side
    const value = localStorage.getItem(`${storagePrefix}${key}`);
    return value ? JSON.parse(value) : '';
  },
  setStorage: (key: string, value: string) => {
    if (!isClient) return; // Ensure this runs only on the client side
    localStorage.setItem(`${storagePrefix}${key}`, value);
  },
  clearStorage: (key: string) => {
    if (!isClient) return; // Ensure this runs only on the client side
    localStorage.removeItem(`${storagePrefix}${key}`);
  },
};

export default storage;
