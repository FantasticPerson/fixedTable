'use strict';

global.__WEB_PACK_SERVER__ = true;

import * as DEV_CONST from './const'
import webpack from 'webpack'
import {webpackConfig} from './webpack.config.babel'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import path from 'path'

let express = require('express');
let config = webpackConfig({
    devServer: true
});
let compiler = webpack(config);

let app = express();
app.use(devMiddleware(compiler,{
    contentBase: DEV_CONST.OUTPUT_WEB_DIR,
    publicPath: config.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "X-Custom-Header": "yes"
    },
    proxy: {//解决跨域问题
        '*': {
            target: 'http://61.155.85.77:10006',
            secure: false,
        }
    },
    stats: { colors: true },
    colors: true,
    hot: true,
    lazy: false,
    quiet: false,
    noInfo: false,
    index: 'main.html'
}));

app.use(hotMiddleware(compiler));
// app.get('*', function (req, res) {
//     res.sendFile('./main.html');
// });
app.use(express.static(DEV_CONST.ASSETS_PUBLIC_DIR, {maxAge:0}));
app.listen(DEV_CONST.DEV_PORT, '0.0.0.0', (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`webpack dev server start, http://127.0.0.1:${DEV_CONST.DEV_PORT}`);
});

