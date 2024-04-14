const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    output: {
        path: path.join(__dirname, "/dist"), // the bundle output path
        filename: "bundle.js", // the name of the bundle
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html", // to import index.html file inside index.js
        }),
        new webpack.DefinePlugin({
            "process.env.REACT_APP_TOKEN": JSON.stringify(process.env.TOKEN),
        }),
        new webpack.ProvidePlugin({
            process: "process/browser.js",
        }),
    ],
    devServer: {
        historyApiFallback: true,
        port: 7070, // you can change the port
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // .js and .jsx files
                exclude: /node_modules/, // excluding the node_modules folder
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(ts|tsx)$/,
                loader: "ts-loader"
            },
            {
                test: /\.(sa|sc|c)ss$/, // styles files
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, // to import images and fonts
                loader: "url-loader",
                options: { limit: false },
            },
        ],
    },
    resolve: {
        extensions: [".*", ".js", ".jsx", ".ts", ".tsx"],
    },
};