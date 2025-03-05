const shared = {
  semi: ["error", "never"],
  curly: "off",
  quotes: "off",
  eqeqeq: "error",
  "no-void": "off",
}

module.exports = {
  // Configuration for JavaScript files
  root: true,
  extends: [
    "@react-native",
    "plugin:prettier/recommended",
    "plugin:styled-components-a11y/recommended",
  ],
  plugins: ["unicorn"],
  ignorePatterns: ["expo-env.d.ts"],
  rules: {
    ...shared,
    "styled-components-a11y/no-autofocus": "off",
  },
  overrides: [
    // Configuration for TypeScript files
    {
      files: ["**/*.ts", "**/*.tsx"],
      plugins: ["simple-import-sort", "jsx-expressions"],
      extends: [
        "@react-native",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
        project: "./tsconfig.json",
      },
      rules: {
        ...shared,
        "@typescript-eslint/func-call-spacing": "off",
        "jsx-expressions/strict-logical-expressions": "error",
        "eslint-comments/no-unused-disable": "error",
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/no-misused-promises": "off",
        "react/no-unstable-nested-components": "off",
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "react-native/no-inline-styles": "off",
      },
    },
    {
      // Configuration for testing files
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
      rules: {
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
      },
    },
    {
      // Configuration for mock files
      files: ["__mocks__/**/*.[jt]s?(x)"],
      rules: {
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
      },
    },
  ],
}
