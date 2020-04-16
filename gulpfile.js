const appName = "desafioonline";
const timestamp = Math.floor(Date.now() / 1000);

const { watch, src, dest, series, parallel } = require("gulp");
const csso = require("gulp-csso");
const less = require("gulp-less");
const livereload = require("gulp-livereload");
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const rm = require("gulp-rm");
const sourcemaps = require("gulp-sourcemaps");
const uglify = require("gulp-uglify-es").default;
const zip = require("gulp-zip");

let clean = function() {
    return src("build/**/*", { read: false })
    .pipe(rm())
}

let html = function() {
    return src("src/index.html")
    .pipe(replace("style.css", appName + ".min." + timestamp.toString() + ".css"))
    .pipe(replace("script.js", appName + ".min." + timestamp.toString() + ".js"))
    .pipe(dest("build"))
    .pipe(livereload())
}

let css = function() {
    return src("src/less/index.less")
    .pipe(less())
    .pipe(csso())
    .pipe(rename(appName + ".min." + timestamp.toString() + ".css"))
    .pipe(dest("build/css"))
    .pipe(livereload())
}

let js = function() {
    return src("src/js/index.js")
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename(appName + ".min." + timestamp.toString() + ".js"))
    .pipe(sourcemaps.write())
    .pipe(dest("build/js"))
    .pipe(livereload())
}

let img = function() {
    return src("src/img/**/*")
    .pipe(dest("build/img"))
    .pipe(livereload())
}

let compress = function() {
    return src("build/**/*")
    .pipe(zip(appName + ".zip"))
    .pipe(dest("rel"))
}

let watchDev = function() {
    livereload.listen()
    watch("src/*.html", html)
    watch("src/less/*.less", css)
    watch("src/js/**/*.js", js)
    watch("src/img/**/*", img)
}

exports.dev = series(clean, parallel(html, css, js, img), watchDev);
exports.release = series(clean, parallel(html, css, js, img), compress);
