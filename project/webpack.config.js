const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'public'),
    mode: 'development',
    entry: ['./js/main.js', './js/CartComp.js', './js/MenuComp.js', './js/FilterComp.js', './js/ProductComp.js'],
    output: {
        filename: './build.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            /*             {
                            test: /\.(png|jpg|svg|gif)$/,
                            use: ['file-loader']
                        } */
        ]
    }
}