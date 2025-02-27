import { renderHook } from "@testing-library/react";
import { useLocalStorageGet } from "@/hooks/";

describe("useLocalStorageGet", () => {
  beforeEach(() => {
    // Clear all localStorage before each test
    window.localStorage.clear();
  });

  it("should return the value from localStorage", () => {
    // Set an item in localStorage
    window.localStorage.setItem("testKey", "testValue");

    const { result } = renderHook(() => useLocalStorageGet("testKey"));

    // Verify that the hook returns the correct value
    expect(result.current).toBe("testValue");
  });

  it("should return null if no value is set in localStorage", () => {
    const { result } = renderHook(() => useLocalStorageGet("nonExistingKey"));

    // Verify that the hook returns null when no value is set
    expect(result.current).toBeNull();
  });

  it("should handle changes to the key", () => {
    // Set an item for one key
    window.localStorage.setItem("key1", "value1");

    const { result, rerender } = renderHook(
      ({ key }) => useLocalStorageGet(key),
      {
        initialProps: { key: "key1" },
      }
    );

    // Verify that the hook returns the correct value for the initial key
    expect(result.current).toBe("value1");

    // Change to a different key
    window.localStorage.setItem("key2", "value2");
    rerender({ key: "key2" });

    // Verify that the hook returns the correct value for the new key
    expect(result.current).toBe("value2");
  });
});
