// Mock localStorage
export const mockLocalStorage: Storage & { [key: string]: any } = {
  getItem: (key) => mockLocalStorage[key],
  setItem: (key, value) => {
    mockLocalStorage[key] = value;
  },
  removeItem: (key) => {
    delete mockLocalStorage[key];
  },
  clear: () => {
    for (const key in mockLocalStorage) {
      if (mockLocalStorage.hasOwnProperty(key)) {
        delete mockLocalStorage[key];
      }
    }
  },
  length: 0, // You can adjust this value as needed

  // Minimal implementation of the 'key' property (stub)
  key: (index) => Object.keys(mockLocalStorage)[index] || null,
};
