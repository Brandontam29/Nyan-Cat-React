const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: { injectType: 'styleTag' },
                    },
                    {
                        loader: 'css-loader',
                        options: { modules: true },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
};
