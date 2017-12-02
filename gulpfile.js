const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify =require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
/*
--Top level functions --
gulp.task -Define tasks
gulp.src - point tofile to use
gulp.dest - points to folder to output
gulp.watch - whatch files and folders for changes
*/

//Logss message 
gulp.task('message', function(){
    return console.log('Gulp is running...');
});

//Copy All HTML files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

//Optimize Images 
gulp.task('imageMin', () => 
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

//minify JS
// gulp.task('minify', function() {
//     gulp.src('src/js/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/js'));
// });

//Compile Sass
gulp.task('sass', function(){
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

//Scripts
gulp.task('concat', function(){
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});


gulp.task('default', ['message', 'copyHtml', 'imageMin','sass','concat']);

gulp.task('watch', function(){
    gulp.watch('src/js/*.js',['concat']);
    gulp.watch('src/images/*',['imageMin']);
    gulp.watch('src/sass/*.scss',['sass']);
    gulp.watch('src/*.html',['copyHtml']);
});