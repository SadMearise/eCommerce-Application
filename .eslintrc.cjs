module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:prettier/recommended",
    "airbnb",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", ".prettierrc"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react-refresh", "@typescript-eslint", "react", "prettier", "react-hooks"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "error",
    indent: "off",
    "max-len": [
      "error",
      {
        code: 120,
        ignoreComments: true,
        ignoreStrings: true,
      },
    ],
    "react/jsx-wrap-multilines": "off",
    "implicit-arrow-linebreak": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: false, optionalDependencies: false, peerDependencies: false },
    ],
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "comma-dangle": ["error", "only-multiline"],
    "react/prop-types": "off",
    "react/display-name": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-var-requires": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    quotes: ["error", "double"],
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      {
        accessibility: "explicit",
        overrides: {
          accessors: "explicit",
          constructors: "off",
          methods: "explicit",
          properties: "explicit",
          parameterProperties: "explicit",
        },
      },
    ],
    "no-param-reassign": [
      "error",
      {
        props: false,
      },
    ],
    "object-curly-newline": [
      "error",
      {
        ExportDeclaration: { multiline: true },
      },
    ],
    "operator-linebreak": [
      "error",
      "after",
      {
        overrides: {
          ":": "before",
          "?": "before",
        },
      },
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "warn",
    "no-unused-vars": "off",
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
