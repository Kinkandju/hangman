import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
  // Looking for font files .otf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.otf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          }),
        ),
      )
      // Convert to .ttf
      .pipe(
        fonter({
          formats: ["ttf"],
        }),
      )
      // Upload to the source folder
      .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
  );
};

export const ttfToWoff = () => {
  // Looking for font files .ttf
  return (
    app.gulp
      .src(`${app.path.srcFolder}/fonts/*.ttf`, {})
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>",
          }),
        ),
      )
      // Convert to .woff
      .pipe(
        fonter({
          formats: ["woff"],
        }),
      )
      // Upload to the build folder
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
      // Looking for font files .ttf
      .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
      // Convert to .woff2
      .pipe(ttf2woff2())
      // Upload to the build folder
      .pipe(app.gulp.dest(`${app.path.build.fonts}`))
  );
};

export const fontStyle = () => {
  // font.scss
  let fontsFile = `${app.path.srcFolder}/scss/abstracts/fonts.scss`;

  // Check if fonts exist
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      // Check if there is a style file for add fonts
      if (!fs.existsSync(fontsFile)) {
        // If there is no file, then create it
        fs.writeFile(fontsFile, "", cb);
        let newFileOnly;
        for (var i = 0; i < fontsFiles.length; i++) {
          // Add fonts in a style file
          let fontFileName = fontsFiles[i].split(".")[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split("-")[0]
              ? fontFileName.split("-")[0]
              : fontFileName;
            let fontWeight = fontFileName.split("-")[1]
              ? fontFileName.split("-")[1]
              : fontFileName;
            if (fontWeight.toLowerCase() === "thin") {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === "extralight") {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === "light") {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === "medium") {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === "semibold") {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === "bold") {
              fontWeight = 700;
            } else if (
              fontWeight.toLowerCase() === "extrabold" ||
              fontWeight.toLowerCase() === "heavy"
            ) {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === "black") {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }
            fs.appendFile(
              fontsFile,
              `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("./assets/fonts/${fontFileName}.woff2") format("woff2"), url("./assets/fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`,
              cb,
            );
            newFileOnly = fontFileName;
          }
        }
      } else {
        console.log(
          "Файл scss/fonts.scss уже существует. Для обновления файла нужно его удалить!",
        );
      }
    }
  });

  return app.gulp.src(app.path.srcFolder);
  function cb() {}
};
