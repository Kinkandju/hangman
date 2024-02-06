export const modules = () => {
  return app.gulp
    .src(app.path.src.modules)
    .pipe(app.gulp.dest(app.path.build.modules))
    .pipe(app.plugins.browsersync.stream());
};
