module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": ["error"],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["warn", "nofunc"],
    "import/no-anonymous-default-export": "off",
    "no-prototype-builtins": "off",
    "prefer-const": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    // FIXME: "@typescript-eslint/no-explicit-any" should be using default, i.e. "warn".
    // however, there are too many usecases have to use "any" as type.
    // until the whole team adapt using "never" and "unknown" instead of "any",
    // this rule will remain disabled.
    "@typescript-eslint/no-explicit-any": "off",
    "react/prop-types": "off", // Since we do not use prop-types
    "react/require-default-props": "off" // Since we do not use prop-types
  },
}
