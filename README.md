# @cisl/express

An opinionated wrapper around the popular [express](https://expressjs.com/) library as
well as [socket.io](https://socket.io/).

The library assumes that you want to use `cookie-parser`, `body-parser` (namely JSON),
`json spaces` set to 2, and use `ejs` as the view engine. Finally, the port is
used from the `cog.json` file.

## Installation
```bash
npm install @cisl/express
```
## Usage
```js
const express = require('@cisl/express');
// or typescript
import app from '@cisl/express';

const app = express();
app.listen();
```

and then it can be used the same as a regular express object:
```js
app.get('/', (req, res) => {
    res.json({'msg': 'Hello World'});
});
```

as well as accessing the attached socket.io instance:
```js
app.socketio.on('connection', (socket) => {
    console.log('a user connected');
});
```

If you want to disable the socket.io instance, pass in `{socketio: false}` to the `express`
function.

If you need the original listen method, it can be accessed through `app.expressListen`.
Socket.io is expressed through `app.socketio`.

Additionally, the package will automatically add a `/test` GET route that returns
a JSON object with the following definition:
```json
{
    "response": "AOK",
    "error": null
}
```
which can be used as a small healthcheck for these applications.

## Configuration
Using this package assumes you have a `cog.json` file with at least the following
in it:
```typescript
{
    "port": string | number
}
```
