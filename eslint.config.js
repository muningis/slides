import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      import: importPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,

      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-explicit-any": "error",

      "react/prop-types": "off",

      "no-console": "error",

      // Import boundary rules
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            // Client cannot import from server
            {
              target: "./src/client",
              from: "./src/server",
              message: "Client code cannot import from server code.",
            },
            // Server cannot import from client
            {
              target: "./src/server",
              from: "./src/client",
              message: "Server code cannot import from client code.",
            },
            // Shared cannot import from client or server
            {
              target: "./src/shared",
              from: "./src/client",
              message: "Shared code cannot import from client code.",
            },
            {
              target: "./src/shared",
              from: "./src/server",
              message: "Shared code cannot import from server code.",
            },
          ],
        },
      ],

      // Prevent barrel files (export * from)
      "no-restricted-syntax": [
        "error",
        {
          selector: "ExportAllDeclaration",
          message:
            "Barrel exports (export *) are forbidden. Use explicit named exports instead.",
        },
      ],

      // Require explicit file extensions in imports
      "import/extensions": [
        "error",
        "always",
        {
          ignorePackages: true,
        },
      ],
    },
  },
  {
    ignores: ["dist/", "node_modules/", "*.config.js", "*.config.ts"],
  }
);
