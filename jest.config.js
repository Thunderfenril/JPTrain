 module.exports = {
   preset: "ts-jest",
   testEnvironment: "node",
   moduleNameMapper: {
    '^@data/(.*)$': '<rootDir>/data/$1'
  }
 };
