const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const BundleTracker = require("webpack-bundle-tracker");
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HappyPack = require('happypack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

/**
 * Webpack Docs:
 * - https://webpack.js.org/configuration/
 */

const publicPath = '/';

if (process.env.STATIC_URL_BASE) {
    const staticUrlBase = process.env.STATIC_URL_BASE;
    if (staticUrlBase[staticUrlBase.length - 1] == '/') {
        staticUrlBase = staticUrlBase.substring(0, staticUrlBase.length - 1)
    }
    publicPath = staticUrlBase + '/';
}


const config = {
    mode: 'development',
    context: path.resolve(__dirname),
    entry: {
        // "imgs": "./@imgs/index.js", // necessary to copy image files to /static, see README.md
        "static/js/index": "./src/js/index.tsx",
        "static/css/styles": "./src/css/index.scss"
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].js",
        publicPath: publicPath,
        chunkFilename: "[id].chunck.[ext]"
    },

    plugins: [
        new WriteFilePlugin(),
        new webpack.DefinePlugin({
            STATIC_URL: '\'/static\'',
            PROJECT_NAME: '\'braintree-hostedfield-ios\'',
            ENVIRONMENT_TAG: '\'prod\'',
        }),
        new CopyWebpackPlugin([{ from: 'src/index.html', to: 'index.html' }]),
        new CopyWebpackPlugin([{ from: 'src/img', to: 'static/img' }]),

        new HappyPack({
            id: 'ts',
            threads: 2,
            loaders: [
                {
                    path: 'ts-loader',
                    query: { happyPackMode: true }
                }
            ]
        }),
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),

        new webpack.ProvidePlugin({ //auto load these modules everywhere
            $: 'jquery',
            jQuery: 'jquery',
            // Tether: 'tether',
            'window.jQuery': 'jquery',
            // Popper: ['popper.js', 'default']
        })
    ],
    // optimization: {
    //     splitChunks: {
    //         name: "js/common",
    //         filename: "js/common.js",
    //         minChunks: 2
    //     },
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             cache: true,
    //             parallel: true,
    //             sourceMap: true // set to true if you want JS source maps
    //         }),
    //         new OptimizeCSSAssetsPlugin({})
    //     ]
    // },
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions:{
                                data: "$staticUrl: '" + publicPath + "';"
                            }
                        }
                    },
                ],
            },
            {
                test: /\.tsx?/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=ts',
                // loader: 'ts-loader',
                // use: "awesome-typescript-loader",
                // query: {
                //     // Use this to point to your tsconfig.json.
                //     configFileName: './tsconfig.json'
                // }
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "static/imgs/[name].[ext]",
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|svg)(\?\S*)?$/,
                exclude: [
                    path.resolve(__dirname, "src/img"),
                    path.resolve(__dirname, "node_modules")
                ],
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "static/fonts/[name].[ext]",
                        }
                    }
                ]
            }
        ]
    },

    devServer: {
        contentBase: "./dist",
        port: 8000,
        historyApiFallback: {
            index: 'index.html'
        }
    },

    devtool: "source-map",
    resolve: {
        plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
        alias: {
            "webworkify": "webworkify-webpack",
        },
        extensions: [".webpack.js", "web.js", ".ts", ".tsx", ".js"],
        modules: ["node_modules"]
    }

}

module.exports = config
