const path = require("path")
const webpack = require("webpack")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const isProd = process.env.NODE_ENV === "production"

module.exports = {
    entry: {
        main: ["./src/main"],
        polyfills: ["./src/angular-polyfills"],
        angular: ["./src/angular"],
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    mode: "production",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: "babel-loader"
                }],
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                use: [{
                    loader: "awesome-typescript-loader"
                }],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCSSExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                    options: {
                        attrs: ["img:src"]
                    }
                }]
            },
            {
                test: /\.(jpg|gif|png)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "images/[name]-[hash:32].[ext]"
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: "[name]-[contenthash].css"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core/,
            path.join(__dirname, "./src"),
            {} //System.import
        ),
        new HTMLWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                 'NODE_ENV': JSON.stringify("production")
             }
        })
    ]

}