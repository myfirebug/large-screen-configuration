// 压缩js
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const SpeedMeasureWebpackPlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const path = require("path");
const smp = new SpeedMeasureWebpackPlugin();

module.exports = merge.merge(baseConfig, {
  // 模式
  mode: "production",
  devtool: "source-map",
  plugins: [
    // 压缩样式
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
    // 复制文件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new BundleAnalyzerPlugin({ analyzerPort: 8919 }),
  ],
  optimization: {
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩JS
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // react, react-dom, react-router-dom 一起打包
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/, // 需要打包到一起的模块
          priority: 40, // 权重（越大越高）
          name: "chunk-react",
        },
        antd: {
          test: /[\\/]node_modules[\\/]antd(.*)?[\\/]/, // 需要打包到一起的模块
          priority: 40, // 权重（越大越高）
          name: "chunk-antd",
        },
        echarts: {
          test: /[\\/]node_modules[\\/]echarts(.*)?[\\/]/, // 需要打包到一起的模块
          priority: 40, // 权重（越大越高）
          name: "chunk-echarts",
        },
        mock: {
          test: /[\\/]node_modules[\\/]mock(.*)?[\\/]/, // 需要打包到一起的模块
          priority: 40, // 权重（越大越高）
          name: "chunk-mock",
        },
        jsoneditor: {
          test: /[\\/]node_modules[\\/]jsoneditor(.*)?[\\/]/, // 需要打包到一起的模块
          priority: 40, // 权重（越大越高）
          name: "chunk-jsoneditor",
        },
        zrender: {
          test: /[\\/]node_modules[\\/]zrender(.*)?[\\/]/, // 需要打包到一起的模块
          priority: 40, // 权重（越大越高）
          name: "chunk-zrender",
        },
        // 其他的一起打包
        lib: {
          test: /[\\/]node_modules[\\/][\\/]/,
          priority: 30, // 权重（越大越高）
          name: "chunk-lib",
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
});
