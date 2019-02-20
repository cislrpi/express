# cir-express

A wrapper around the popular [express](https://expressjs.com/) library. This allows for
better ensurance of version consistency among the modules of the CIR as well as not
having to do a lot of the same boilerplate each time.

## Installation
```bash
npm install @celio/cais-express
```
## Usage
```js
const app = require('@cisl/cais-express');

app.get('/', (req, res) => {
    res.json({'msg': 'Hello World'});
});
app.listen();
```
The `app` that the package returns can be used exactly like the express app, with the
exception of the `listen` method which is internally wrapped.

The package will automatically add a `/test` GET route that returns a JSON object
with the following definition:
```json
{
    "response": "AOK",
    "error": null
}
```

## Configuration
Using this package assumes you have a `cog.json` file with at least the following
in it:
```json
{
    "port": "integer"
}
```
