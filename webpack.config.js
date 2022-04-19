const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function pathJoin(...args) {
  return path.posix.join(...args);
}

const config = {
  // 入口
  entry: ['@babel/polyfill', './src/main.js'],
  // 输出
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    assetModuleFilename: 'static/[hash][ext][query]'
  },
  // 解析路径
  resolve: {
    // 设置src别名
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    //后缀名 可以根据需要自由增减
    extensions: ['.js', '.vue', '.json'],
  },
  mode: 'development',
  // loaders
  module: {
    rules: [
      {
        // *.js
        test: /\.js$/,
        exclude: /node_modules/, // 不编译node_modules下的文件
        loader: 'babel-loader',
      },
      {
        // *.vue
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        // 它会应用到普通的 `.css` 文件
        // 以及 `.vue` 文件中的 `<style>` 块
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // 图片
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        // use: {
        //   loader: 'file-loader',
        //   options: {
        //     name: pathJoin('static', '/img/[name].[ext]'),
        //     esModule:false,
        //   },
        // },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        },
            "css-loader",'sass-loader'
        ]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 生成的文件夹名
      template: 'public/index.html', // 模板html
      favicon: 'public/favicon.ico', // 图标
    }),
    new VueLoaderPlugin(),new MiniCssExtractPlugin()
  ],
};

module.exports = config;
