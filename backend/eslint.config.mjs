import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "**/Templates/**",
      "node_modules/**",
      "logs/**",
      "tmp/**"
    ]
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs", // For Node.js with require/module.exports
      globals: {
        ...globals.node, // This provides Node.js globals like 'process', '__dirname', etc.
      },
    },
  },
  js.configs.recommended, // Apply ESLint's recommended rules
];
