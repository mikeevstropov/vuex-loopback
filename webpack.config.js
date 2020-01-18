const path = require('path');

module.exports = {
  mode: 'production',
  output: {
    library: 'vuexLoopback',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@tests': path.resolve(__dirname, 'tests'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};
