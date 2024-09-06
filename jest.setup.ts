import "@testing-library/jest-dom";

const originalConsoleError = console.error;

beforeAll(() => {
  // Suppress console errors
  console.error = jest.fn();
});

afterAll(() => {
  // Restore the original console.error
  console.error = originalConsoleError;
});
