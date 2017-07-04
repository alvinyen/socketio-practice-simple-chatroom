const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const socketIo = require('socket.io');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(`${__dirname}/public`));// server static file
app.use(webpackDevMiddleware(webpack(webpackConfig))); // for webpack setting
app.use(bodyParser.urlencoded({ extend: true }));

server.listen(3000);
