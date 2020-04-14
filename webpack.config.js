const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = 
{
    mode: "development",
    entry: {
        polyfill: "@babel/polyfill",
        app: path.resolve(__dirname, "src/js", "app.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, "src/js")],
                use: {
                    loader: "babel-loader",
                    options: { 
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCSSExtractPlugin.loader
                    },
                    "css-loader"
                    ]
            }
        ]
    },
    plugins: [
        new MiniCSSExtractPlugin({filename: "style.css"}),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({filename: "index.html", template: "./src/index.html"})
    ],
    devServer: {
        publicPath: "/",
        port: 888,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        hot: true,
        https: false,
        noInfo: true,
    }
}