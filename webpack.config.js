const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, '/src'),
  output: {
    path: '/', // 直接輸出bundle.js到public folder底下
    filename: 'bundle.js', // 沒有設定的話輸出會是main.js
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '/src'),
      },
    ],
  },
  // resolveLoader: { fallback: path.join(__dirname, "node_modules") }
};
