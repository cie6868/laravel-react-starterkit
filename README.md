
# Laravel, React, Sass

Starter kit for DxDy Elevate.

* Laravel with JWT authentication configured
* React with Redux Toolkit, Router, persistence
* SCSS with standard file structure
* Linting of styles and scripts
* BrowserSync for React and Sass
* Pre-configured authentication with JWT

## Setup Laravel

Point a virtual host at the `public` folder.

Install dependencies: `composer install`

Copy `.env.example` to `.env`.

Set your virtual host as the `APP_URL` in the `.env` file. Add your database configuration too.

Generate an app key: `php artisan key:generate`

Generate a JWT secret: `php artisan jwt:secret`

Fill up your database with users: `php artisan migrate:fresh --seed`

Generated user passwords always read `password`.

Enjoy!

## Compile React and Stylesheets

Laravel Mix can compile your React and Sass.

You will need a modern version of Node, not the one we use with WordPress and Gulp. Try [n](https://www.npmjs.com/package/n) if you need to switch between versions easily.

Install dependencies: `npm install`

To compile once: `npm run dev`

To use BrowserSync, `npm run watch` and it should serve on port `3000` on your `APP_URL`.

Script lint issues will be fixed automatically when possible, so please `npm run dev` before committing changes.


