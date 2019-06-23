# Changelog

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
