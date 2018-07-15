const path = require('path');
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {extensions: ['.js', '.jsx', '.ts', '.tsx', 'json']},
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules']
            }
          }
        ]
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: "bundle.css"
    })
  ]
};

module.exports = (env, argv) => {

  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map'
  }

  return config;

};

