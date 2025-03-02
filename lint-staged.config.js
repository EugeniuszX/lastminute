module.exports = {
  "**/*.{js,jsx,ts,tsx}": (filenames) => [
    `npx eslint --cache --fix ${filenames
      .map((filename) => `"${filename}"`)
      .join(" ")}`,
  ],
  "**/*.(md|json)": (filenames) =>
    `npx prettier --write ${filenames
      .map((filename) => `"${filename}"`)
      .join(" ")}`,
}
