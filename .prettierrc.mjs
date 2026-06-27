/** @type {import("prettier").Config} */
export default {
  printWidth: 90,
  proseWrap: "always",
  plugins: ["prettier-plugin-astro", "@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^astro(:.*)?$",
    "^(react|react-dom|preact(?:/.*)?)$",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/.*$",
    "",
    "^[./]",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
