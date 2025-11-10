import '@testing-library/jest-dom';


// Suppress specific React Router warnings during tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args) => {
    if (args[0]?.includes('React Router Future Flag Warning')) return;
    originalWarn(...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});