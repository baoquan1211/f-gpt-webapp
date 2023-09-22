module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    requireConfigFile: false,
  },
  settings: {
    react: { version: "18.2" },
    "import/resolver": {
      "eslint-import-resolver-custom-alias": {
        alias: {
          "@": "./src",
        },
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        packages: ["packages/*"],
      },
    },
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": 0,
    "react-hooks/exhaustive-deps": 0,
    "no-unused-vars": 0,
  },
};
