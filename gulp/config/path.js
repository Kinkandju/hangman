import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./assets`;
const srcFolder = `./src`;

export const path = {
  build: {
    html: `./`,
    css: `./`,
    js: `./`,
    modules: `${buildFolder}/modules/`,
    fonts: `${buildFolder}/fonts/`,
    favicon: `${buildFolder}/favicon/`,
    images: `${buildFolder}/img/`,
    files: `${buildFolder}/files/`,
  },
  src: {
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/styles.scss`,
    js: `${srcFolder}/js/script.js`,
    modules: `${srcFolder}/js/modules/*.js`,
    favicon: `${srcFolder}/favicon/**/*.{png,ico}`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
    svg: `${srcFolder}/img/**/*.svg`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    files: `${srcFolder}/files/**/*.*`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    modules: `${srcFolder}/js/modules/*.js`,
    favicon: `${srcFolder}/favicon/**/*.{png,ico}`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,webp}`,
    files: `${srcFolder}/files/**/*.*`,
  },
  clean: [buildFolder, "./index.html", "./script.js", "./styles.css"],
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: `test`,
};
