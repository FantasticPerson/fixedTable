'use strict';

import * as DEV_CONST from './const'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack, {DefinePlugin, NoErrorsPlugin, HotModuleReplacementPlugin,} from 'webpack';

let buildDate = new Date();
let BUILD_TIME_STAMP = buildDate.getTime();
let BUILD_TIME_STR = buildDate.toString();

function vendorsConfigs(options) {
    return {
        //for css
        // 'bootstrap-css': `${DEV_CONST.NODE_MODULES_DIR}/bootstrap/dist/css/bootstrap.min.css`,
        // 'bootstrap-theme-css': `${DEV_CONST.NODE_MODULES_DIR}/bootstrap/dist/css/bootstrap-theme.min.css`,
        // 'ua-parser-js': `${DEV_CONST.NODE_MODULES_DIR}/ua-parser-js/dist/ua-parser.min.js`
    };
}

function noParseConfig(options) {
    let noParseConfigResult = [];
    let r_vendorsConfigs = vendorsConfigs(options);
    for (let vendorKey in r_vendorsConfigs) {
        noParseConfigResult.push(r_vendorsConfigs[vendorKey]);
    }
    return noParseConfigResult;
}

function headerEmbedJs(options) {
    return `
      window.__APP_NAME__ = "dandan.wu";
      window.__VERSION__ = "0.0.1";
      window.__APP_ENV__ = "dev";
      window.__DEBUG__ = ${DEV_CONST.APP_DEBUG};
      window.__BUILD_TIME_STAMP__ = ${BUILD_TIME_STAMP};
      window.__BUILD_TIME_STR__ = "${BUILD_TIME_STR}";
      window.__ELECTRON__ = false;
      window.__LAUNCH_TIME__ = Date.now()
  `;
}

function entryConfig(options) {
    //let vendorCommonConfig = [DEV_CONST.SRC_WEB_VENDOR_COMMON_FILE];

    //let bootupConfig = [
    //  ...vendorCommonConfig,
    //  DEV_CONST.SRC_WEB_BOOTUP_FILE
    //];

    let mainConfig = [
        //...vendorCommonConfig,
        DEV_CONST.SRC_WEB_MAIN_FILE
    ];

    if (DEV_CONST.APP_DEBUG) {
        let devServerConfig = [
            'react-hot-loader/patch',
            `webpack-hot-middleware/client?path=http://127.0.0.1:${DEV_CONST.DEV_PORT}/__webpack_hmr`,
            `webpack/hot/only-dev-server`
        ];
        mainConfig = [
            ...devServerConfig,
            ...mainConfig
        ];
    }

    return mainConfig;
}

function outputConfig(options) {
    return {
        path: DEV_CONST.OUTPUT_WEB_DIR,
        publicPath: '',
        filename: `[name]-bundle-[[hash]].js`
    }
}

function resolveConfig(options) {
    return {
        root: [DEV_CONST.SRC_DIR],
        alias: vendorsConfigs(options),
        extensions: ['', '.js', '.css', '.json', '.styl']
    }
}

function nodeConfig(options) {
    return {
        __filename: true,
        __dirname: true,
        global: true
    }
}

function htmlWebpackPluginConfig(options) {
    function minifyConfig() {
        if (DEV_CONST.APP_DEBUG) return false;
        //see https://github.com/kangax/html-minifier#options-quick-reference
        return {
            removeComments: true,
            removeCommentsFromCDATA: true,
            collapseInlineTagWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        }
    }

    return {
        title: 'dandan.wu',
        version: '0.0.1',
        //see default html template engine. https://github.com/blueimp/JavaScript-Templates
        //template: DEV_CONST.SRC_WEB_HTML_BOOTUP_FILE,
        //filename: `./${DEV_CONST.OUTPUT_WEB_HTML_BOOTUP_FILE}`,
        favicon: DEV_CONST.ASSETS_ICONS_16X16_ICON,
        minify: minifyConfig(),
        headerEmbedJs: headerEmbedJs(options),
        //inject: 'body',
        inject: false,
        //hash: true,
        cache: false,//true,
        showErrors: true
    };
}

//--------------------------------------
export function webpackConfig(options) {
    options = options || {};
    return {
        context: DEV_CONST.SRC_DIR,
        bail: true,
        debug: DEV_CONST.APP_DEBUG,
        cache: true,
        entry: entryConfig(options),
        output: outputConfig(options),
        resolve: resolveConfig(options),
        devtool: DEV_CONST.APP_DEBUG ? 'inline-source-map' : false,
        target: 'web', //default
        node: nodeConfig(options),
        module: {
            loaders: [
                {
                    test: /\.js[x]?$/,
                    include: DEV_CONST.SRC_DIR,
                    exclude: DEV_CONST.NODE_MODULES_DIR,
                    loaders: DEV_CONST.APP_DEBUG ? ['react-hot-loader/webpack','babel'] : ['babel']
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(['css'])
                },
                {
                    test: /\.styl$/,
                    loader: ExtractTextPlugin.extract(['css', 'stylus'])
                },
                {test: /\.html$/, loader: "html"},
                {test: /\.pug/, loader: "pug?pretty=true"},
                {
                    test: /\.(png|jpe?g|gif)$/,
                    loader: `url?name=imgs/[name]-[[hash]].[ext]&limit=${DEV_CONST.EMBED_FILE_MAX_SIZE}`
                },
                {
                    test: /(\.eot|\.woff2|\.woff|\.ttf|regular\.svg)$/,
                    loader: `file?name=fonts/[name]-[[hash]].[ext]`
                },
                {
                    test: /\.json$/, loader: 'json'
                }
            ],
            noParse: noParseConfig(options)
        },

        plugins: [
            DEV_CONST.APP_DEBUG ? new webpack.HotModuleReplacementPlugin() : null,
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),

            DEV_CONST.APP_DEBUG ? null : new webpack.optimize.UglifyJsPlugin({
                compress:{
                    warnings: false,
                    dead_code: true,
                },
                output:{
                    comments:false
                }
            }),
            new DefinePlugin({
                    'process.env': {
                        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                    }
                }
            ),
            new webpack.optimize.OccurenceOrderPlugin(),
            new ExtractTextPlugin(`[name]-bundle-[[contenthash]].css`, {
                allChunks: true
            }),
            new HtmlWebpackPlugin(Object.assign({
                template: DEV_CONST.SRC_WEB_HTML_MAIN_FILE,
                filename: `./${DEV_CONST.OUTPUT_WEB_HTML_MAIN_FILE}`,
                excludeChunks: DEV_CONST.SRC_WEB_HTML_BOOTUP_FILE
            }, htmlWebpackPluginConfig(options))),
        ].filter(function (item) {
            return !!item;
        })
    }
}

let defaultConfig = webpackConfig();
export default defaultConfig;