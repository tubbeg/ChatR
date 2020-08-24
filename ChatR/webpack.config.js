const path = require("path");
//const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: "./scripts/index.ts",
    output: {
        path: path.resolve(__dirname, "wwwroot/js"),
        //filename: "[name].[chunkhash].js",
        filename: "[name].js",
        publicPath: "/"
    },

    resolve: {
        extensions: [".js", ".ts"]
    },
    devtool: 'source-map', //remove this line in production
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin()/*,
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash].css"
        })*/
    ]
};