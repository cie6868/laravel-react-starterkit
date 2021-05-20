
# Laravel, React, and GraphQL

Starter kit for DxDy Elevate.

* Laravel with JWT authentication configured
* React with router and linting
* SCSS with standard file structure and linting
* BrowserSync on port `3000`

## Setup Laravel

Point a virtual host at the `public` folder.

Install dependencies: `composer install`

Copy `.env.example` to `.env`.

Set your virtual host as the `APP_URL` in the `.env` file.

Generate a key: `php artisan key:generate`

Enjoy!

## Compile React and Stylesheets

Laravel Mix can compile your React and Sass.

You will need a modern version of Node, not the one we use with WordPress and Gulp. Try [n](https://www.npmjs.com/package/n) if you need to switch between versions easily.

Install dependencies: `npm install`

To compile once: `npm run dev`

To use BrowserSync, `npm run watch` and it should serve on port `3000` on your `APP_URL`.
