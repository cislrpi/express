import fs from 'fs';
import path from 'path';
import express from 'express';
import {Express} from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { Server as httpServer, createServer } from 'http';
import SocketIO from 'socket.io';
import serveStatic from 'serve-static';

interface Config {
  port?: string | number;
}

interface CislExpress extends Express {
  listen: () => httpServer;
  expressListen: (port: number, callback: () => void) => httpServer;
  socketio?: SocketIO.Server;
}

interface Options {
  socketio?: boolean;
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


let config_file = path.resolve('cog.json');
let config: Config = {};
if (!fs.existsSync(config_file)) {
  logger.error('Could not find cog.json file');
  process.exit(-1);
}

try {
  config = JSON.parse(fs.readFileSync(config_file, {encoding: 'utf-8'}));
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

function createApplication(options?: Options): CislExpress {
  let express_app = express();
  express_app.set('port', config.port);
  express_app.use(cookieParser());
  express_app.use(bodyParser.json());
  express_app.use(bodyParser.urlencoded({extended: true}));
  express_app.set('json spaces', 2);
  express_app.set('view engine', 'ejs');

  let final_app: CislExpress = Object.assign(
    express_app,
    {
      expressListen: express_app.listen,
      socketio: (options && options.socketio === true) ? SocketIO(createServer(express_app)) : undefined
    }
  );

  final_app = Object.assign(
    final_app,
    {
      listen: (): httpServer => {
        return final_app.expressListen(express_app.get('port'), (): void => {
          logger.info(`Express server listening on port ${config.port}`);
        });
      }
    }
  );

  return final_app;
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
