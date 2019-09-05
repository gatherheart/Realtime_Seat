// next.config.js
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withImages = require('next-images');

module.exports = withTypescript(
  withCss(
    withImages(
      withSass({
        // distDir: 'build',
        exportPathMap: function() {
          return {
            '/': { page: '/' }
          };
        }
      })
    )
  )
);
