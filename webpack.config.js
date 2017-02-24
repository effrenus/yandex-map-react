var webpack = require('webpack');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

var reactDomExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom'
};

module.exports = {
    output: {
        library: 'YandexMapReact',
        libraryTarget: 'umd'
    },
    externals: {
        'react': reactExternal,
        'react-dom': reactDomExternal
    },
    module: {
        loaders: [
            {test: /\.jsx?/i, exclude: /node_modules/, loader: 'babel'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
