[![npm version](https://img.shields.io/npm/v/generator-polymeres6.svg)](http://npmjs.org/generator-polymeres6)
[![npm downloads](https://img.shields.io/npm/dt/generator-polymeres6.svg)](http://npmjs.org/generator-polymeres6)[![Build Status](https://travis-ci.org/LasaleFamine/generator-polymeres6.svg?branch=1.0.0)](https://travis-ci.org/LasaleFamine/generator-polymeres6)


# Yeoman generator for Polymer element in ES6 syntax

## Introduction to Polymer

[Polymer](http://www.polymer-project.org/) is a library of polyfills and sugar which enable the use of Web Components in modern browsers. The project allows developers to build apps using the platform of tomorrow and inform the W3C of places where in-flight specifications can be further improved.

`generator-polymer` provides Polymer scaffolding using [Yeoman](http://yeoman.io) (a scaffolding tool for the web), letting you easily create and customize Polymer (custom) elements via the command-line and import them using HTML Imports. This saves you time writing boilerplate code so you can start writing up the logic to your components straight away.

## The `generator-polymeres6`

This generator is based on the "father" one made by the Polymer team.
A light version with no test scaffolder (at the moment), and with an `element-name.es6.js` and also a transpiler version of it (`element-name.js`).  

You will have two file composing your element: an `element-name.html` file which includes a `element-name.js`.

**NOTE: The generator will not attach any transpiler (like Babel) to your element. If you will modify the ES6 version of the script, you will need to transpile it again in the ES5 version file of your element, which is include in your HTML.**

## Features

* Create Polymer elements for your app in ES6(ES2015) syntax
* More soon...

## Installation

Install the generator  

`npm install -g generator-polymeres6`

Make a new directory and cd into it  

`mkdir -p my-project && cd $_`

Scaffold a new Polymer project:  

`yo polymeres6 test-element`

## Generators

Available generators:

- [polymeres6](#element)

**Note: Generators are to be run from the root of your app**

### Element
Sets up a new Polymer element inside a `app/components` folder.

Example:
```bash
yo polymeres6 <element-name>
```

**Note: You must pass in an element name, and the name must contain a dash "-"**

#### Options

```
--docs, include iron-component-page docs with your element and demo.html
--path, override default directory structure, ex: --path foo/bar will put your element in app/components/foo/bar
```


## Gotchas

### The `element-name.html` and `element-name.js` and `element-name.es6.js` files

The `element` generator will produce an `element-name.html` file where you can place your imports and where the generator itself will put the source link to the `element-name.js`.  
This file will **needs to be transpiled** after the first edit of the `element-name.es6.js` file.  
You can use easly [Babel](https://babeljs.io/) and [Gulp](http://gulpjs.com/) to make this work done.

### Folder Tree good practices

I decided to divided my `app` folder in:  

- components
- assets

This means that the generator takes care of this and you will find that the imports within the files are referenced to this folders.  
My idea is to put the `bower_components` inside the `assets` folder. So for example, inside the `element-name.html` you create, the import of Polymer will be like:

``` html
<link rel="import" href="../../../../assets/bower_components/polymer/polymer.html">
```

## Contribute

This is my very first attempt to a Yo Generator and I will be very thankful for every help and fork of this repo!

## License

ISC
