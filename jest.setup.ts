import "@testing-library/jest-dom";

const originalConsoleError = console.error;

global.window = global.window || {};
global.window.GA = jest.fn(); // or global.window.ga = jest.fn();

beforeAll(() => {
  // Suppress console errors
  jest.mock("@next/third-parties/google");
  console.error = jest.fn();
  window.gtag = jest.fn(); // or window.ga = jest.fn();
  window.GA = jest.fn(); // or window.ga = jest.fn();
});

afterAll(() => {
  // Restore the original console.error
  console.error = originalConsoleError;
});
