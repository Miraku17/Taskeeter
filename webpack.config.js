const DotenvWebpack = require('dotenv-webpack');

module.exports = {
  plugins: [
    new DotenvWebpack({
      systemvars: true
    })
  ]
};