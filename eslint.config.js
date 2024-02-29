import modern from "@peggyjs/eslint-config/flat/modern.js";
import module from "@peggyjs/eslint-config/flat/module.js";
import peggy from "@peggyjs/eslint-plugin/lib/flat/recommended.js";

export default [
  {
    ignores: [
      "node_modules/**",
      "*.cjs",
      "*.mjs",
    ],
  },
  {
    ...module,
    ...modern,
  },
  {
    files: [
      "**/*.js",
    ],
    languageOptions: {
      ecmaVersion: 2022,
    },
  },
  peggy,
  {
    files: [
      "**/*.peggy",
    ],
    rules: {
      "@peggyjs/equal-next-line": ["error", "always"],
      "@peggyjs/no-unused-rules": ["error", {
        filter: "^_",
      }],
    },
  },
];
