const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    root: path.resolve(__dirname, "./src"),
    fallback: [path.resolve(__dirname, './node_modules')],
    extensions: ['', '.js', '.vue'],
    alias: {
        '@components': path.join("src", "components"),
    }
},
};