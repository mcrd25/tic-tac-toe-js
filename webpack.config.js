const path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watch: true,
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
    {
      test: /\.(s*)css$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    ],
  },
};
