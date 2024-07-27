const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'twitter-element-blocker.user.js',
        path: path.resolve(__dirname, '.'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};