const path = require('path');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/web"),
  output: {
    path: path.resolve(__dirname, "dist/web"),
    filename: "bundle.js",
    publicPath: "/assets/",
    library: "MyLibrary",
    libraryTarget: "umd",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.(gif|png|jpe?g|svg)$/i, use: ['file-loader', {
        loader: 'image-webpack-loader',
        options: {
          bypassOnDebug: true,
          disable: true,
        },
      }]}
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  }
}
