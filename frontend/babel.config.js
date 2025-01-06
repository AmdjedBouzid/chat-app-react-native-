module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      "@babel/plugin-transform-class-properties",
      { loose: true }, // Ensure the 'loose' mode is consistent
    ],
    [
      "@babel/plugin-transform-private-methods",
      { loose: true }, // Ensure the 'loose' mode is consistent
    ],
    [
      "@babel/plugin-transform-private-property-in-object",
      { loose: true }, // Ensure the 'loose' mode is consistent
    ],
  ],
};
