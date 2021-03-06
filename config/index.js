// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/qinling-admin/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/cunzhuangapi': {
        target: 'http://localhost:3000/qinling-server',
        changeOrigin: true,
        pathRewrite: {
          '^/cunzhuangapi': ''
        }
      },
      '/jingdianapi': {
        target: 'http://localhost:3000/qinling-server',
        changeOrigin: true,
        pathRewrite: {
          '^/jingdianapi': ''
        }
      },
      '/dictapi': {
        target: 'http://localhost:3000/qinling-server',
        changeOrigin: true,
        pathRewrite: {
          '^/dictapi': ''
        }
      },
      '/yukouapi': {
        target: 'http://localhost:3000/qinling-server',
        changeOrigin: true,
        pathRewrite: {
          '^/yukouapi': ''
        }
      },
      '/shanfengapi': {
        target: 'http://localhost:3000/qinling-server',
        changeOrigin: true,
        pathRewrite: {
          '^/shanfengapi': ''
        }
      },
      '/zongjiaoapi': {
        target: 'http://localhost:3000/qinling-server',
        changeOrigin: true,
        pathRewrite: {
          '^/zongjiaoapi': ''
        }
      },
      '/managerapi': {
        target: 'http://localhost:3000/qinling-server',
        changeOrigin: true,
        pathRewrite: {
          '^/managerapi': ''
        }
      },
      '/roleapi': {
        target: 'http://localhost:3000/qinling-server',
        changeOrigin: true,
        pathRewrite: {
          '^/roleapi': ''
        }
      },
      '/userapi': {
        target: 'http://localhost:3000/qinling-server',
        changeOrigin: true,
        pathRewrite: {
          '^/userapi': ''
        }
      },
      '/faguiapi': {
        target: 'http://localhost:3000/qinling-server',
        changeOrigin: true,
        pathRewrite: {
          '^/faguiapi': ''
        }
      },
      '/jianyiapi': {
        target: 'http://localhost:3000/qinling-server',
        changeOrigin: true,
        pathRewrite: {
          '^/jianyiapi': ''
        }
      },
      '/jiucuoapi': {
        target: 'http://localhost:3000/qinling-server',
        changeOrigin: true,
        pathRewrite: {
          '^/jiucuoapi': ''
        }
      },
      '/jubaoapi': {
        target: 'http://localhost:3000/qinling-server',
        changeOrigin: true,
        pathRewrite: {
          '^/jubaoapi': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
