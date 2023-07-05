module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "simple-import-sort"],
  rules: {
    "react-refresh/only-export-components": "warn",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          [
            // Packages. `react` related packages come first.
            "^react",
            "^@?\\w",
            // Side effect imports.
            "^\\u0000",
            // Internal packages.
            "^(components|constant|pages|utils)(/.*|$)",
            // Internal packages.
            "^(fonts|images|styles)(/.*|$)",
            // Style imports.
            "^.+\\.s?css$",
            // Parent imports. Put `..` last.
            "^\\.\\.(?!/?$)",
            "^\\.\\./?$",
            // Other relative imports. Put same-folder imports and `.` last.
            "^\\./(?=.*/)(?!/?$)",
            "^\\.(?!/?$)",
            "^\\./?$",
          ],
        ],
      },
    ],
    "sort-imports": "off",
    "import/order": "off",
  },
};
