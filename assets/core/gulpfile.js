var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    uglifycss = require('gulp-uglifycss'),
    uglifyjs = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    bourbon = require('node-bourbon'),
    browserSync = require('browser-sync').create(),
    path = require("path"),
    html = require('gulp-processhtml'),
    watch = require('gulp-watch'),
    runs = require('run-sequence'),
    clean = require('gulp-clean');

var paths = {
    sass:
        [
            path.join(__dirname, 'sass/*.scss')
        ],
    pages: 
        [
            path.join(__dirname, 'sass/*Pages*/*.scss')
        ],
    css:
        {
            vendor:
                [
                    path.join(__dirname, "bower_components/bootstrap/dist/css/bootstrap.min.css"),
                ],
            plugins:
                [
                    path.join(__dirname, "bower_components/slick-carousel/slick/slick.css"),
                    path.join(__dirname, "bower_components/slick-carousel/slick/slick-theme.css"),

                    // FONT AWESOME CSS
                    path.join(__dirname, "bower_components/font-awesome/css/font-awesome.css"),

                    // ANIMATE CSS
                    path.join(__dirname, "bower_components/animate_css/animate.css"),

                    // DROPZONE CSS
                    //path.join(__dirname, "bower_components/Dropzone/dropzone.scss"),

                    // CUSTOM SCROLLBAR PLUGINS
                    path.join(__dirname, "bower_components/custom-scrollbar/jquery.mCustomScrollbar.css"),
                    //path.join(__dirname, "plugins/**/*.css"),

                ]
        },        
    js:
        {
            vendor:
                [
                    path.join(__dirname, "bower_components/jquery/dist/jquery.min.js"),
                    path.join(__dirname, "bower_components/bootstrap/dist/js/bootstrap.min.js"),
                ],
            plugins:
                [
                    path.join(__dirname, "bower_components/slick-carousel/slick/slick.min.js"),
                    path.join(__dirname, "bower_components/jquery.countdown/dist/jquery.countdown.min.js"),
                    path.join(__dirname, "bower_components/custom-scrollbar/jquery.mCustomScrollbar.js"),
                    path.join(__dirname, "node_modules/jquery-mousewheel/jquery.mousewheel.js"),
                ],
            app:
                [
                    path.join(__dirname, 'script/*.js')
                ],
            includes: 
                [
                    path.join(__dirname, 'script/*Includes*/*.js')
                ]
        },
    fonts:
        [
            //path.join(__dirname, "bower_components/font-awesome/fonts/**/*")
        ],
    style: path.join(__dirname, "../Css/style.css")
}

// --------------------------------------------------------- INIT TASK //

gulp.task('init', ['sass', 'sass_vendor', 'sass_plugins', 'pages', 'js', 'js_vendor', 'js_plugins', 'js_custom']);

// --------------------------------------------------------- SET TASK FOR WATCHER //


// CLEANER
gulp.task('clean-sass', function (file) {
  return gulp.src([
        path.join(__dirname, '../Css/main.css'), 
        path.join(__dirname, '../Css/Maps/main.css.map'), 
        ], {read: false})
    .pipe(clean({force: true}));
});
gulp.task('clean-pages', function () {
  return gulp.src([
        path.join(__dirname, '../Css/*Pages*/*.css'),
        path.join(__dirname, '../Css/Maps/*Pages*/*.css.map')
        ], {read: false})
    .pipe(clean({force: true}));
});
gulp.task('clean-sass-vendor', function () {
  return gulp.src([
        path.join(__dirname, '../Css/vendor.min.css'),
        path.join(__dirname, '../Css/Maps/vendor.min.css.map')
        ], {read: false})
    .pipe(clean({force: true}));
});
gulp.task('clean-sass-plugins', function () {
  return gulp.src([
        path.join(__dirname, '../Css/plugins.min.css'),
        path.join(__dirname, '../Css/Maps/plugins.min.css.map')
        ], {read: false})
    .pipe(clean({force: true}));
});
gulp.task('clean-js', function () {
  return gulp.src(path.join(__dirname, '../Js/app.min.js'), {read: false})
    .pipe(clean({force: true}));
});
gulp.task('clean-js_vendor', function () {
  return gulp.src(path.join(__dirname, '../Js/vendor.min.js'), {read: false})
    .pipe(clean({force: true}));
});
gulp.task('clean-js_plugins', function () {
  return gulp.src(path.join(__dirname, '../Js/plugins.min.js'), {read: false})
    .pipe(clean({force: true}));
});
gulp.task('clean-js_custom', function () {
  return gulp.src(path.join(__dirname, '../Js/*Includes*/*.js'), {read: false})
    .pipe(clean({force: true}));
});
// CLEANER

// copy HTML task
gulp.task('html', function() {
    return gulp.src(path.join(__dirname, "views/Pages/*.html"))
        .pipe(html())
        .pipe(gulp.dest(path.join(__dirname, "../../")));
});

// copy XML task
gulp.task('xml', function() {
    return gulp.src(path.join(__dirname, "xml/*.xml"))
        .pipe(html())
        .pipe(gulp.dest(path.join(__dirname, "../../skin")));
});

// copy the sass file task
gulp.task('sass', ['clean-sass'], function() {
    return gulp.src(paths.sass)
        .pipe(sourcemaps.init())
        .pipe(sass({
          outputStyle: 'compressed',
          includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))       
        //.pipe(uglifycss())
        .pipe(sourcemaps.write(path.join(__dirname, '../Css/Maps'), {
            includeContent: false, 
            sourceRoot: path.join(__dirname, '../Css/Maps'),
            sourceMappingURL: function(file) {
                return 'Maps/' + file.relative + '.map';
            }
        }))
        .pipe(gulp.dest(path.join(__dirname, '../Css')))
        .pipe(browserSync.stream())
});


gulp.task('sass_vendor', ['clean-sass-vendor'], function() {
    return gulp.src(paths.css.vendor)
        .pipe(concat('vendor.min.css'))
        .pipe(sourcemaps.init())
        .pipe(sass({
          outputStyle: 'compressed',
          includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(sourcemaps.write(path.join(__dirname, '../Css/Maps'), {
            includeContent: false, 
            sourceRoot: path.join(__dirname, '../Css/Maps'),
            sourceMappingURL: function(file) {
                return 'Maps/' + file.relative + '.map';
            }
        }))
        .pipe(gulp.dest(path.join(__dirname, '../Css')))
        .pipe(browserSync.stream())
});


gulp.task('sass_plugins', ['clean-sass-plugins'], function() {
    return gulp.src(paths.css.plugins)
        .pipe(concat('plugins.min.css'))
        .pipe(sourcemaps.init())
        .pipe(sass({
          outputStyle: 'compressed',
          includePaths: bourbon.includePaths
        }).on('error', sass.logError))
        .pipe(sourcemaps.write(path.join(__dirname, '../Css/Maps'), {
            includeContent: false, 
            sourceRoot: path.join(__dirname, '../Css/Maps'),
            sourceMappingURL: function(file) {
                return 'Maps/' + file.relative + '.map';
            }
        }))
        .pipe(gulp.dest(path.join(__dirname, '../Css')))
        .pipe(browserSync.stream())
});

gulp.task('pages', ['clean-pages'], function () {
    return gulp.src(paths.pages)
        .pipe(sourcemaps.init({identityMap: true}))
        .pipe(sass({
          outputStyle: 'compressed',
          includePaths: bourbon.includePaths 
        }).on('error', sass.logError))
        .pipe(postcss([autoprefixer({ browsers: ['> 0%'] })]))
        .pipe(sourcemaps.write(path.join(__dirname, '../Css/Maps'), {
            includeContent: false, 
            sourceRoot: path.join(__dirname, '../Css/Maps'),
            sourceMappingURL: function(file) {
                var filename = escape(file.relative).replace(/Pages%5C/g, "");
                return '../Maps/Pages/' + filename + '.map';
            }
        }))
        .pipe(gulp.dest(path.join(__dirname, '../Css')))
        .pipe(browserSync.stream())
});

// copy javascript task
gulp.task('js', ['clean-js'], function () {
    return gulp.src(paths.js.app)
        .pipe(concat('app.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../Js')));
});

gulp.task('js_vendor', ['clean-js_vendor'], function () {
    return gulp.src(paths.js.vendor)
        .pipe(concat('vendor.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../Js')));
});

gulp.task('js_plugins', ['clean-js_plugins'], function () {
    return gulp.src(paths.js.plugins)
        .pipe(concat('plugins.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../Js')));
});

gulp.task('js_custom', ['clean-js_custom'], function () {
    return gulp.src(paths.js.includes)
        //.pipe(gulp.dest(path.join(__dirname, '../Js')))
        .pipe(uglifyjs())
        .pipe(gulp.dest(path.join(__dirname, '../Js')));
});

// copy fontawesome fonts task
gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
		.pipe(gulp.dest(path.join(__dirname, '../Css/Fonts'))); 
});

// --------------------------------------------------------- SET SHOW WATCHER //

//Watcher active
gulp.task('watch', function(){
    watch(path.join(__dirname, "sass/**/*.scss"), function() { runs('sass'); });
    watch(paths.js.app, function() { runs('js'); });  
    watch(paths.js.plugins, function() { runs('js'); });
    watch(paths.js.includes, function() { runs('js_custom'); });
    watch(paths.css.vendor, function() { runs('sass_vendor'); });
    watch(paths.css.plugins, function() { runs('sass_plugins'); });
    watch(paths.pages, function() { runs('pages'); });
    watch(paths.fonts, function() { runs('fonts'); });
    watch(path.join(__dirname, "views/**/*.html")).on('change', browserSync.reload);
    watch(path.join(__dirname, "xml/*.xml")).on('change', browserSync.reload);
});

// --------------------------------------------------------- SHOW WATCHER //



browserSync.init({
    server: {
        baseDir: [path.join(__dirname, "../../"), path.join(__dirname, "../../")]
    }
});

gulp.task('default', ['init', 'html', 'xml', 'watch'], function(){
    watch(path.join(__dirname, "views/**/*.html"), function() {
        runs('html');
    });
    watch(path.join(__dirname, "xml/*.xml"), function() {
        runs('xml');
    });
});