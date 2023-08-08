module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  automock: false,
  setupFiles: ["./src/tests/setupJest.tsx"],
};
