<div align="center">
  <h1>ryd</h1>
  <p>Zero-dependency package to prune node_modules for unnecessary files as a post-build step</p>
  <img src="cover.png"/>
  <br />
  <br />
  <img alt="version" src="https://flat.badgen.net/npm/v/ryd" />
  <img alt="bundle-size" src="https://flat.badgen.net/bundlephobia/min/ryd?color=cyan" />
  <img alt="licence" src="https://flat.badgen.net/npm/license/ryd" />
  <br />
  <br />
  <p><i>If the library has has helped you, please consider giving it a ⭐️</i></p>
</div>

_ryd_ is a zero dependency npm package that can be used to prune unnecessary files from `./node_modules`, such as markdown files, typescript source files and so on. The intention for this is to be used as either a post-build step in your pipeline or within a docker layer to decrease the size of your final image.

## Why?

The `node_modules` folder is know for being notoriously large, and anything that can be used to decrease the size is welcomed.

### Why another npm package?

The irony that this is an npm package is not lost on my, however this package was developed to handle a very specific use case that was to prune the `node_modules` after a multistage build in a node docker image.

## How?

### Installing

_ryd_ can be installed globally on a system using either `yarn` or `npm`:

```sh
$ yarn global add ryd
$ npm i -g ryd
```

or as a normal package in a node project:

```sh
$ yarn add ryd
$ npm i ryd
```

### Using

When you call _ryd_, it assumes that there is a `node_modules` folder in the current working directory. If you are calling _ryd_ from somewhere else, you can specify the **absolute** path to the `node_modules` as an argument:

```sh
$ ryd [absolute_path_to_node_modules]
```

## Notes

If you would like a exhaustive list of files/folders that _ryd_ will remove, they can be found in the [consts file](./app/consts.ts).

## Issues

If any issues occur using this library, please fill our a detailed bug report on [GitHub](https://github.com/qruzz/ryd/issues).
