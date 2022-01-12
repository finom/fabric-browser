# fabric-pure-browser [![npm version](https://badge.fury.io/js/fabric-pure-browser.svg)](https://badge.fury.io/js/fabric-pure-browser)

Fabric.js package with no node-specific dependencies (node-canvas, jsdom). The project is published once a day from 'master' branch of https://github.com/fabricjs/fabric.js repository.

To keep your current imports in your application:
```
import { fabric } from "fabric";
```
you can install this package like this (requires NPM >= 6.9.0):
```
npm i fabric@npm:fabric-pure-browser
```
and it will add this line in your `package.json`:
```
dependencies: {
  ...
  "fabric": "npm:fabric-pure-browser@^4.6.0",
  ...
```
