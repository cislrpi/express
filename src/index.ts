import fs from 'fs';
import path from 'path';
import express from 'express';
import { Express } from 'express';
import cookieParser from 'cookie-parser';
import { Server as HttpServer, createServer } from 'http';
import serveStatic from 'serve-static';
import { Server as WebSocketServer } from 'ws';

interface Config {
  port?: string | number;
}

interface Options {
  quiet?: boolean;
}

interface IntermediateExpress extends Express {
  quiet: boolean;
  expressListen: (port: number, callback: () => void) => HttpServer;
  httpServer: HttpServer;
}

interface CislExpress extends IntermediateExpress {
  listen: () => HttpServer;
  wsServer: WebSocketServer;
}

interface Logger {
  info: (message: string) => void;
  error: (message: string) => void;
}

function isConsole(variable: Logger | Console): variable is Console {
  return 'countReset' in variable;
}

let logger: Console | Logger;

try {
  logger = require('@cisl/logger');
}
catch (e) {
  logger = console;
}

if (isConsole(logger)) {
  logger.info = logger.log;
}


const configFile = path.resolve('cog.json');
let config: Config = {};
if (!fs.existsSync(configFile)) {
  logger.error('Could not find cog.json file');
  process.exit(-1);
}

try {
  config = JSON.parse(fs.readFileSync(configFile, {encoding: 'utf-8'}));
}
catch (e) {
  logger.error('Error: could not parse cog.json file');
  logger.error(e);
  process.exit(-1);
}

if (!config.port) {
  logger.error('You must set a port in cog.json');
  process.exit(-1);
}

function createApplication(options: Options = {}): CislExpress {
  const express_app = express();
  express_app.set('port', config.port);
  express_app.use(cookieParser());
  express_app.use(express.json());
  express_app.use(express.urlencoded());
  express_app.set('json spaces', 2);
  express_app.set('view engine', 'ejs');

  express_app.get('/test', (_, res) => {
    res.json({response: 'AOK', error: null});
  });

  const intermediate: IntermediateExpress = Object.assign(
    express_app,
    {
      quiet: options.quiet === true,
      expressListen: express_app.listen,
      httpServer: createServer(express_app)
    }
  );

  return Object.assign(
    intermediate,
    {
      intermediate: express_app.listen,
      wsServer: new WebSocketServer({server: intermediate.httpServer})
    },
    {
      listen: (): HttpServer => {
        return intermediate.httpServer.listen(express_app.get('port'), (): void => {
          logger.info(`@cisl/express listening on port ${config.port}`);
        });
      }
    }
  );
}

createApplication.application = express.application;
createApplication.request = express.request;
createApplication.response = express.response;

/**
 * Expose constructors.
 */

createApplication.Router = express.Router;

createApplication.json = express.json;
createApplication.raw = express.raw;
createApplication.static = serveStatic;
createApplication.text = express.text;
createApplication.urlencoded = express.urlencoded;

export = createApplication;
