var webpack = require('webpack');
var baseConfig = require('./webpack.config');

module.exports = Object.assign({}, baseConfig, {
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});
