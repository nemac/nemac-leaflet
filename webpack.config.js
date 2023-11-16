const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

// We'll refer to our source and dist paths frequently, so let's store them here
// const PATH_SOURCE = path.join(__dirname, './src');
// const PATH_DIST = path.join(__dirname, './dist');

// If we export a function, it will be passed two parameters, the first
// of which is the webpack command line environment option `--env`.
// `webpack --env.production` sets env.production = true
// `webpack --env.a = b` sets env.a = 'b'
// https://webpack.js.org/configuration/configuration-types#exporting-a-function
module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js')
    // ['./src/index'],
  },
  output: {
    // path: PATH_DIST,
    path: path.resolve(__dirname, './dist'),
    // filename: 'js/[name].[hash].js',
    filename: '[name].bundle.js',
    publicPath: 'auto'
  },
  devServer: {
    // static: PATH_DIST,
    static: path.resolve(__dirname, './dist'),
    compress: true,
    // host: 'localhost',
    port: 8080,
    historyApiFallback: true
    // historyApiFallback: true,
    /* overlay: {
        errors: true,
        warnings: true,
      },
    */
  },
  /* resolve: {
      extensions: ['.js', '.jsx'],
    },
  */

  resolve: {
    fallback: {
      buffer: require.resolve('buffer/')
    }
  },
  // Determine how the different types of modules will be treated.
  // https://webpack.js.org/configuration/module
  // https://webpack.js.org/concepts#loaders
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        use: { // Use the following loader and options
          loader: 'babel-loader',
          // We can pass options to both babel-loader and Babel. This option object
          // will replace babel.config.js
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s?css$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(gif|jpe?g|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/images/[name].[hash:8].[ext]'
          }
        }
      }
    ]
  },

  plugins: [
    // This plugin will generate an HTML5 file that imports all our Webpack
    // bundles using <script> tags. The file will be placed in `output.path`.
    // https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      // template: path.join(PATH_SOURCE, './index.html'),
      template: path.resolve(__dirname, './src/index.html'),
      favicon: './src/assets/images/favicon.ico'

    }),
    // new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: path.join('css/style.[name].css'),
      chunkFilename: '[name].css'
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    })
  ]
};
