import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import webpcss from "gulp-webpcss"; // Selecting webp images
import autoprefixer from "gulp-autoprefixer"; // Adding vendor prefixes
import groupCssMediaQueries from "gulp-group-css-media-queries"; // Grouping media queries

const sass = gulpSass(dartSass);

export const scss = () => {
  return app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(
      sass({
        outputStyle: "expanded",
      }),
    )
    .pipe(groupCssMediaQueries())
    .pipe(
      autoprefixer({
        grid: true,
        overrideBrowserslist: ["last 3 versions"],
        cascade: true,
      }),
    )
    .pipe(
      app.plugins.if(
        app.isBuild,
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        }),
      ),
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
};
