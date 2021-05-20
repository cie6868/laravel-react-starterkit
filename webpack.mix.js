const mix = require('laravel-mix');
require('dotenv').config();
require('laravel-mix-eslint');
require('laravel-mix-stylelint');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
  .disableNotifications()
  .browserSync({
    open: 'external',
    host: process.env.APP_URL.replace('http://', ''),
    proxy: process.env.APP_URL.replace('http://', ''),
    port: 3000,
    notify: false
  })
  .eslint({
    extensions: ['js', 'jsx'],
    fix: true
  })
  .react()
  .sourceMaps()
  .stylelint({
    configFile: '.stylelintrc',
    files: ['**/*.scss']
  })
  .sass('resources/sass/app.scss', 'public/css');
