OCB
===

OCB is an opinionated Frontend developer repository meant to be the quickest way to get off developing a prototype. This means that this repository is meant to be cloned or forked or abused. Features include:

1. Webpack for front end module dependency
2. Source Maps
3. Custom path aliasing on the frontend to avoid 'require hell'
4. Gulp for task running
5. Karma and Jasmine for unit tests
6. Express server with MYSQL
7. SASS support (compiliation + minification)
8. File watches
8. Backbone Base and Form View

To get started clone this repository by running

```git clone https://github.com/ziyadparekh/OCB.git```

`cd` into the directory and run `npm install`

If everything worked out ok you should be able to run:

1. `supervisor application/app.js` from the `root`
2. `gulp` in another tab on your terminal 
3. then navigate your browser to `localhost:3010`

STRUCTURE::

1. Server side stuff including the Express app, database files, routes configuration etc is located in the `application` directory.
2. Frontend javascript and SASS code is located in the `src` directory
3. Frontend `html (underscore)` templates are located in the `public` directory
4. Compiled `js` and `scss` assets also go into the public directory
5. Server side `ejs` templates are located in the `views` directory
6. Unit tests are located in `src/tests` directory

ADDITIONAL::

This Repository is meant to be modular and scalable so it is not technically a "single-page" javascript app. Express routes are mapped to functions which render an `ejs` template. Something similar to support for multiple entry points. Similary each `ejs` template has a compiled `css` and `js` file. The `js` file is usually known as an entry file and is usually contained in the `src/js/entries` directory. The `js` and `scss` file is compiled by Webpack and Gulp before it is loaded onto the page. Thus in development you see compiled files (but source maps help with debugging).

NOTE:: 

In order to use mysql and a database you need to install MYSQL yourself either through homebrew or through their website. Additionally once you have that installed, you need to set up a database (name, users, port, password etc). Once that is done edit the file `OCB/application/helpers/connection` with your database info. (MYSQL isn't required to use this repo, its just an added benefit if you choose to build out your prototype with a db).


TODO::

1. Add support for es6
2. Make source maps better
3. Make this repository better


