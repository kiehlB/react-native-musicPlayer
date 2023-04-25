module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
      },
      'react-native-reanimated/plugin', // NOT HERE
    ],
    'react-native-reanimated/plugin', // PUT IT HERE
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
