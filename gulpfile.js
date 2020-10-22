"use strict";

const gulp = require("gulp");
const clean = require("gulp-clean");
const minify = require("gulp-minify");

gulp.task("clean", function() {
    return gulp.src(["dist/**"]).pipe(clean({ allowEmpty: true }));
});

gulp.task("dist", gulp.series("clean", function() {
    return gulp
        .src(["src/js/bootstrap4dialog.js"])
        .pipe(gulp.dest("dist/js"))
        .pipe(minify({ noSource: true, ext: ".min.js" }))
        .pipe(gulp.dest("dist/js"));
}));

gulp.task("default", gulp.series("dist"));
