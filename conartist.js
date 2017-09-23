const { config, preset } = require('conartist');

module.exports = config(preset.base(), preset.flow(), preset.jest(), {
  'webpack.config.js'() {
    return {
      devtool: 'cheap-source-map',
      entry: './src/index.js',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: require('./config/babel.webpack.js')
            }
          }
        ]
      },
      output: {
        filename: 'dist/index.js'
      }
    };
  }
});
