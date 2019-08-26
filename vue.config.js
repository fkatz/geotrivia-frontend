module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: "https://geotrivia.kosmov.space",
        pathRewrite: {
          '^/api/': '/api/'
        },
      }
    }
  }
}