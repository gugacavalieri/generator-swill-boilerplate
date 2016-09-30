# Swill Boilerplate Generator

[![Build Status](https://travis-ci.org/tiagoporto/generator-swill-boilerplate.svg)](https://travis-ci.org/tiagoporto/generator-swill-boilerplate)
[![Coverage Status](https://img.shields.io/coveralls/tiagoporto/generator-swill-boilerplate.svg)](https://coveralls.io/github/tiagoporto/generator-swill-boilerplate)
[![Dependencies Status](https://david-dm.org/tiagoporto/generator-swill-boilerplate.svg)](https://david-dm.org/tiagoporto/generator-swill-boilerplate)
[![devDependencies Status](https://david-dm.org/tiagoporto/generator-swill-boilerplate/dev-status.svg)](https://david-dm.org/tiagoporto/generator-swill-boilerplate#info=devDependencies)
[![boilerplate devDependencies Status](https://david-dm.org/tiagoporto/swill-boilerplate/dev-status.svg)](https://david-dm.org/tiagoporto/swill-boilerplate#info=devDependencies)

[![NPM version](https://badge.fury.io/js/generator-swill-boilerplate.svg)](https://npmjs.org/package/generator-swill-boilerplate)
[![NPM Downloads](https://img.shields.io/npm/dt/generator-swill-boilerplate.svg)](https://www.npmjs.com/package/generator-swill-boilerplate)
[![Github Issues](https://img.shields.io/github/issues/tiagoporto/generator-swill-boilerplate.svg)](https://github.com/tiagoporto/generator-swill-boilerplate/issues)
[![Github License](https://img.shields.io/github/license/tiagoporto/generator-swill-boilerplate.svg)](https://raw.githubusercontent.com/tiagoporto/generator-swill-boilerplate/master/LICENSE.md)


<p align="center">
  <img src="http://tiagoporto.github.io/swill-boilerplate/img/logos/logo.png" alt="Swill Boilerplate Logo">
  <img src="https://nerdsondotcom.files.wordpress.com/2013/03/yeoman-logo.png" alt="Yeoman Logo" height="215">
</p>

> Yeoman generator for [Swill Boilerplate](https://github.com/tiagoporto/swill-boilerplate)

## Features

* Clean the assets (build, images, css, js) in the project to maintain the directory organized
* Compress Images
* Generate Sprites with .png
* Generate Sprites with .svg and a .png to fallback
* Analyze CSS with csslint
* Prefix CSS with Autoprefixer
* Compile Sass or Stylus (Catch the Stylus error and direct shows on the page, as in Sass)
* Concatenate And Minify Scripts
* Analyze JavaScript with ESLint
* Compile ES2015
* Notify when tasks are complete
* Monitors changes in the files and reload browser with BrowserSync
* Javascript tests with Jasmine and Karma
* Build the project compressing HTML, CSS and JS.
* Push the `build` folder to gh-pages branch

## Installation

First, install [Yeoman](http://yeoman.io) and `generator-swill-boilerplate` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-swill-boilerplate
```

Then generate your new project:

```bash
yo swill-boilerplate
```


## Docs

[Swill Boilerplate docs](https://github.com/tiagoporto/swill-boilerplate)

## License

Swill Boilerplate Generator is released under the terms of the [MIT license](https://github.com/tiagoporto/generator-swill-boilerplate/blob/master/LICENSE).