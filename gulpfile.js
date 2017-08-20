var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    nodemon = require('gulp-nodemon'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano');

gulp.task('scss', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('public/stylesheets'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css-libs', ['scss'], function() {
    return gulp.src('public/**/*.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(gulp.dest('style.css')); // Выгружаем в папку app/css
});

gulp.task('default', ['browser-sync'], function () {
});

gulp.task('watch', function() {
    gulp.watch('scss/**/*.scss', ['scss']);
});

gulp.task('browser-sync', ['watch', 'nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["public/**/*.*", "views/**/*.*"],
        browser: "google chrome",
        port: 7000,
    });
});
gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({
        script: 'bin/www'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});

