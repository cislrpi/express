const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

let config_file = path.resolve('cog.json');
let config;
if (!fs.existsSync(config_file)) {
  console.error('Could not find cog.json file');
  process.exit(-1);
}
try {
  config = JSON.parse(fs.readFileSync(config_file, {encoding: 'ascii'}));
}
catch (e) {
  console.error('Error: could not parse cog.json file');
  console.error(e);
  process.exit(-1);
}

if (!config.port) {
  console.error('You must set a port in cog.json');
  process.exit(-1);
}

let app = express();
app.express = express;

app.set('port', config.port);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('json spaces', 2);
app.set('view engine', 'ejs');

app.express_listen = app.listen;
app.listen = () => {
  app.express_listen(app.get('port'), () => {
    console.log(`Express server listening on port ${config.port}`);
  });
};

module.exports = app;
