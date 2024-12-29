module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins:  [
       [ 'react-native-reanimated/plugin',
        {
          processNestedWorklets: true
        }
      ],
      ['react-native-worklets-core/plugin'],
        ['react-native-paper/babel'],
      ]
    },
  },

};
