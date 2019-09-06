'use strict';

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const next = require('next');
const config = require('./app/config/env');

global.__SERVER__ = true;
var globaldata = {};
const dev = false;

const app = next({ dev: false });
const handle = app.getRequestHandler();

const A_WEEK = 24 * 60 * 60 * 1000 * 7;
app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(config.web.port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${config.web.port}`);
    });
  })
  .catch(ex => {
    // console.error(ex.stack);
    process.exit(1);
  });
