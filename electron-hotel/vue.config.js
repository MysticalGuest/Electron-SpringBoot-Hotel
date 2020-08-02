const path = require('path');
const webpack = require('webpack');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  // outputDir: 'dist', // build输出目录
  // assetsDir: 'assets', // 静态资源目录(js, css, img)
  // lintOnsave: false, // 是否开启eslint
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',
    port: 8081,
    // open: true, // 是否自动弹出浏览器页面
    // https: false, // 是否使用https协议
    proxy: {
      '/': {
        target: 'http://localhost:8360', // API服务器地址
        ws: true, // 代理websockets
        changeOrigin: true // 虚拟的站点需要更换origin
        // pathRewrite: {
        //   '^/': '/' // 通过pathRewrite重写地址，将前缀/api转为/
        // }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'));
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery'
      })
    ]
  }
};
