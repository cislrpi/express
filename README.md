# @cisl/express

An opinionated wrapper around the popular [express](https://expressjs.com/) library. 

The library assumes that you want to use `cookie-parser`, `body-parser` (namely JSON),
`json spaces` set to 2, and use `ejs` as the view engine. Finally, the port is
used from the `cog.json` file.

## Installation
```bash
npm install @cisl/express
```
## Usage
```js
const app = require('@cisl/express');
// or typescript
import app from '@cisl/express';
```

and then it can be used the same as a regular express object:
```js
app.get('/', (req, res) => {
    res.json({'msg': 'Hello World'});
});
```

The only exception is that instead of using the `listen()` function, you should
use the `cogListen()` function which wraps `listen`, using the `port` defined in
the `cog.json` file.

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
