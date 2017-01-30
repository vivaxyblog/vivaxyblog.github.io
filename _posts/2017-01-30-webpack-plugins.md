---
layout: post
title: webpack plugins 简介
tag: tools
---

webpack 通过 plugins 实现各种功能。常见的 plugins 如下：

- webpack.DefinePlugin 定义环境变量
- webpack.optimize.CommonsChunkPlugin 共用 js 打包
- [webpack-visualizer-plugin](https://github.com/chrisbateman/webpack-visualizer) 输出依赖文件分析图表
- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 使用模版生成 html 文件
- webpack.HotModuleReplacementPlugin 代码热更新，用于调试模式
- webpack.optimize.OccurrenceOrderPlugin 调整模块的打包顺序，用到次数更多的会出现在文件的前面
- webpack.NoErrorsPlugin 构建失败时，不认为是一次成功的打包。用于调试模式
- webpack.ProgressPlugin 输出构建进度
- webpack.BannerPlugin 在文件头添加注释
- webpack.optimize.UglifyJsPlugin 压缩 js
- webpack.optimize.DedupePlugin 去除重复依赖
- webpack.EnvironmentPlugin 定义环境变量
- [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) 从 js 中提取出样式文件，单独打包成 css 文件
