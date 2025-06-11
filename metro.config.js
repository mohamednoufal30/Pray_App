// const { getDefaultConfig } = require("@react-native/metro-config");

// module.exports = getDefaultConfig(__dirname);


// metro.config.js
// module.exports = {
//   transformer: {
//     // Example minimal config
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
// };
const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;

