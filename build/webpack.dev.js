module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
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
                        options: {
                            modules: {
                                localIdentName: '[path]-[name]-[local]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
};
