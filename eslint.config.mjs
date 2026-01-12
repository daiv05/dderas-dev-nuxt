// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

export default withNuxt({
  plugins: {
    import: importPlugin,
    "unused-imports": unusedImports,
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["~", "./app"],
          ["@", "./app"],
        ],
        extensions: [".js", ".ts", ".vue"],
      },
    },
  },
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "warn",
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        alphabetize: { order: "asc", caseInsensitive: true },
        "newlines-between": "always",
      },
    ],
    "import/no-unresolved": [
      "error",
      {
        ignore: ["^~/", "^@/", "^#app", "^#imports", "^node:", "^virtual:"],
      },
    ],
    "import/newline-after-import": ["warn", { count: 1 }],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "no-unused-vars": "off",
    "vue/multi-word-component-names": "off",
    "vue/html-self-closing": "off",
    "vue/no-v-html": "off",
  },
});
