module.exports = {
    // Only search for tests and source files in these folders.
    roots: [
        "<rootDir>/src/tests",
        "<rootDir>/src",
    ],
    testRegex: ".*\\.test\\.ts$",
    testURL: "http://localhost",
    transform: {
        "^.+\\.(t|j)sx?$": ["ts-jest", "babel-jest"],
    },
};
