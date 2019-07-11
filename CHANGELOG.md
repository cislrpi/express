# Changelog

## v1.3.2
* Add missing cookie-parser dependency

## v1.3.1
* Add back in `app.expressListen`
* Make `app.listen` to be equivalent to v1.2.1 `app.listen` functionality
* Remove `app.cogListen` as it's equivalent to `app.listen`
* Use `utf-8` instead of `ascii` when reading the cog.json file

## v1.3.0
* Rewrite module to use TypeScript
* Added `app.cogListen` function which incorporates the old overriden `app.listen` functionality.
* Remove `app.express` and `app.express_listen`. Simply import `express` or use `app.listen` instead.

## v1.2.1
* Fix undefined reference to logger.log (should be logger.info) when using @cisl/logger

## v1.2.0
* Use @cisl/logger if installed over console

## v1.1.0
* Added [ejs](https://ejs.co/) as the view engine

## v1.0.0
* Initial Release
