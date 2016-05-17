const gulp = require('gulp');
const esdoc = require('gulp-esdoc');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const open = require('gulp-open')
const del = require('del');


let options = {
    "source": "./src",
    "destination": "./documentation",
    "includes": ["SpeechYL.js", "dataObjects.js"],
    "unexportIdentifier": true,
    "manual": {
        "overview": ["./manual/overview.md"],
        "installation": ["./manual/installation.md"],
        "usage": ["./manual/usage.md"],
        "tutorial": ["manual/tutorial.md"]
    }

};

gulp.task('delete:docs', () => {
    return del('./documentation/');
});

gulp.task('delete:dist', () => {
    return del('./dist/');
});

gulp.task('docs', ['delete:docs'], () => {
    let task = gulp.src('./src/')
    .pipe(esdoc(options));
    
    return task;
});

gulp.task('test', () => {
    let task = gulp.src('./test/index.html')
    .pipe(open());
    
    return task;
});

gulp.task('view docs', () => {
    let task = gulp.src('./documentation/index.html')
    .pipe(open());
    return task;
})

gulp.task('es5', () => {
    let task = gulp.src('./src/speechYL.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(rename('speechYL.min.js'))
    .pipe(gulp.dest('./dist/'));
    
    return task;
});

gulp.task('build', ['delete:dist', 'docs'], () => {
    let task = gulp.src('./src/speechYL.js')
    .pipe(gulp.dest('./dist/'))
    .pipe(babel({
        presets: ['es2015']
    }));
    
    return task;
});
