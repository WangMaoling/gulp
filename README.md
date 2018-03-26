# feiyue

> A gulp.js project

## Build Setup

``` bash
# 1.安装node包及相关依赖
npm install

# 2.开启本地服务 localhost:8008 
gulp myServer

# 3.less,sass编译压缩，css压缩，js压缩，html压缩，img压缩。 打包到dist
gulp default

#2,3步在gulifile.js里面可修改相关代码
#es6转化为es7
安装 Gulp 上 Babel 的插件
npm install --save-dev gulp-babel

安装 Babel 上将 ES6 转换成 ES5 的插件
npm install --save-dev babel-preset-es2015

