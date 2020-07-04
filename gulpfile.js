let gulp = require('gulp'),
  /* переменную объявили галп (типа класс), тот что без ковычек, даем права*/
  sass = require('gulp-sass'),
  rename = require('gulp-rename'),
  browserSycn = require('browser-sync'),
  autoPrefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  cssmin = require('gulp-cssmin')

gulp.task('sass', function () {
  return gulp.src('app/scss/style.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoPrefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSycn.reload({
      stream: true
    }))
})

gulp.task('script', function () {
  return gulp.src([
    // SLICK
    // 'node_modules/slick-carousel/slick/slick.js', 
    'node_modules/swiper/js/swiper.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
})

gulp.task('style', function () {
  return gulp.src([

    'node_modules/normalize.css/normalize.css',
    // SLICK
    // 'node_modules/slick-carousel/slick/slick.css',
    // SWIPER
    'node_modules/swiper/css/swiper.css',
    'node_modules/magnific-popup/dist/magnific-popup.css'
  ])
    .pipe(concat('libs.min.css'))
    .pipe(cssmin())
    .pipe(gulp.dest('app/css'))
})

gulp.task('html', function () {
  return gulp.src('app/*.html')
    .pipe(browserSycn.reload({
      stream: true
    }))
})

gulp.task('js', function () {
  return gulp.src('app/js/*.js')
    .pipe(browserSycn.reload({
      stream: true
    }))
})

gulp.task('browser-sync', function () {
  browserSycn.init({
    server: {
      baseDir: 'app/'
    }
  })
})

gulp.task('watch', function () {
  gulp.watch('app/scss/style.scss', gulp.parallel('sass'))
  gulp.watch('app/*.html', gulp.parallel('html'))
  gulp.watch('app/js/*.js', gulp.parallel('js'))
})

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'))

/*Local gulp not found in ~\Desktop\start-gulp ------ npm link gulp*/
