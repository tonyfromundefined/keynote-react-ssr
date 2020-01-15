const path = require('path')

module.exports = {
  distDir: '../dist/.next',
  webpack(config) {
    const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      }),
    ]

    return config
  },
}
