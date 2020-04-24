# @cisl/express

An opinionated wrapper around the popular [express](https://expressjs.com/) and
[websockets/ws](https://github.com/websockets/ws) libraries. It assumes that you are running
an application with a `cog.json` file.

The library assumes that you want to use `cookie-parser`, JSON (with `2` spaces),
and the `ejs` as the view engine. Finally, the port is read in from the `cog.json` file.

## Installation

```bash
npm install @cisl/express
```

## Usage

In straight JS:

```js
const express = require('@cisl/express');
const app = express();
app.listen();
```

or in TypeScript:

```typescript
// or typescript
import express from '@cisl/express';
const app = express();

app.listen();
```

The `listen` method above does not accept any parameters, and will automatically use the
port specified in the `cog.json` file that should exist in current working directory when
running the above.

After creating the object, it can be used as a regular express app:

```js
app.get('/', (req, res) => {
    res.json({'msg': 'Hello World'});
});
```

as well as accessing the attached WebSocket server:

```js
app.wsServer.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message', data => {
        console.log(`Received: ${data}`);
        socket.send('pong');
    });
});
```

The available objects off the original (in addition to the normal express stuff) is:

* `expressListen` - original express listen method, should largely not be necessary/used over `listen()`
* `httpServer` - the underlying `HttpServer` instance
* `wsServer` - the underlying `WebSocket.Server` instance

Finally, the package will automatically add a `/test` GET route that returns
a JSON object with the following definition:

```json
{
    "response": "AOK",
    "error": null
}
```

which can be used as a small healthcheck for apps running `@cisl/express`.

## Configuration

Using this package assumes you have a `cog.json` file with at least the following
in it:

```typescript
{
    "port": number
}
```

## Output

`@cisl/express` will only output a single line when you run the `listen()` command with
the following message `@cisl/express listening on port <PORT>`. This will be output as
a standard `console.log`, or if you have `@cisl/logger` installed, using `logger.info`.
You can silence the output, by sending `{quiet: True}` to the `express()` method above.
