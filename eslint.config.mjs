import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

// "react-app",
// "airbnb-typescript",
// "plugin:react-hooks/recommended",
// "plugin:prettier/recommended",
// "plugin:jest-dom/recommended",
// "prettier"

export default [
  {languageOptions: {globals: globals.browser}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/jsx-curly-newline": "off",
      "react/display-name": "off",
      "react/prop-types": "off",
      "react/jsx-props-no-spreading": 0,
      "@typescript-eslint/no-unused-vars": "warn",
      // "import/no-anonymous-default-export": "off",
      // "import/no-duplicates": ["error", {"considerQueryString": true}],
      "no-console": [
        "warn",
        {
          "allow": ["warn", "error"]
        }
      ],
      "no-restricted-imports": [
        "error",
        {
          "name": "reselect",
          "message": "Please use @reduxjs/toolkit reselect instead."
        }
      ],
      // "import/order": [
      //   "warn",
      //   {
      //     "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      //     "newlines-between": "always-and-inside-groups"
      //   }
      // ]
    }
  },
// "settings": {
//   "import/resolver": {
//     "node": {
//       "paths": ["src"];
//     },
//     "react": {
//       "version": "detect";
//     }
//   }
// },
// "parserOptions": {
//   "ecmaVersion": 6,
//     "project": "tsconfig.json";
// }
//   }
];