const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postCss = require('gulp-postcss');
const cssNano = require('cssnano');
const terser = require('gulp-terser');  
const browserSync = require('browser-sync').create();

// sass task
function scssTask() {
    return src('src/scss/mystyle.scss', { sourcemaps: true })
    .pipe(sass())
    //.pipe(postCss([cssNano()]))
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// javascrip task
function jsTask (){
    return src('src/js/myscript.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }));
}

function jsTask2 (){
    return src('src/js/onload.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// browsersync task
function browserSyncServer(done) {
    browserSync.init({
        server: {
            baseDir: '.'
        }
    });
    done();
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

// watch task
function watchTask(){
    watch('*.html', browserSyncReload);
    watch(['src/scss/**/*.scss', 'src/js/**/*.js'], series(scssTask, jsTask, jsTask2, browserSyncReload));
}


// default gulp tasks 
exports.default = series(
    scssTask,
    jsTask,
    jsTask2,
    browserSyncServer,
    watchTask
);