module.exports = {
  mode: 'development',
  watch: true,
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
      {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
      {test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]},
      {test: /\.(png|jpg|gif)$/, use: [{loader: "file-loader", options: {publicPath: 'web/dist'}}]}
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};