var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'), //html压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    pngcrush = require('imagemin-pngcrush'),//图片无损压缩
    cleanCSS = require('gulp-clean-css'),//css压缩
    uglify = require('gulp-uglify'),//js压缩
    concat = require('gulp-concat'),//文件合并
    rename = require('gulp-rename'),//文件更名
    template = require('gulp-template'),//模板替换
    order = require('gulp-order');//文件顺序排序

//目录结构相关
var dest = '../';
var assets = "assets/";
var destAssets = dest + assets;
var src = './src/';
var htmlSrc = src + '*.html';

gulp.task('html', function () {
    return gulp.src(htmlSrc)
        .pipe(template({assets: assets}))
        .pipe(htmlmin({
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        }))
        .pipe(gulp.dest(dest));
});

// 合并、压缩js文件
var jsSrc = src + 'js/*.js';
gulp.task('js', function () {
    return gulp.src(['./bin/*.js', jsSrc])
        .pipe(order([
            'Point.js',
            'Particle.js',
            'ParticlePool.js',
            'Heart.js',
            'jquery.min.js',
            '*.js',
            'script.js',
        ]))
        .pipe(concat('app.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(template({assets: assets}))
        .pipe(gulp.dest(destAssets + 'js/'));
});

// 压缩图片
var imgSrc = src + 'img/**';
gulp.task('img', function () {
    return gulp.src(imgSrc)
        /*.pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))*/
        .pipe(gulp.dest(destAssets + 'img/'));
});
// 合并、压缩、重命名css

var cssSrc = src + 'css/*.css';
gulp.task('css', function () {
    return gulp.src(cssSrc)
        .pipe(concat('app.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cleanCSS())
        .pipe(gulp.dest(destAssets + 'css/'));
});

// 压缩不需要合并的css
var css2Src = src + 'style/*.css';
gulp.task('css2', function () {
    return gulp.src(css2Src)
        .pipe(gulp.dest(destAssets + 'css/'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(destAssets + 'css/'));
});

//复制字体文件
gulp.task('font', function () {
    return gulp.src(src + 'css/font/**')
        .pipe(gulp.dest(destAssets + 'css/font/'));
});


// 默认任务
gulp.task('default', [
    'html',
    'js',
    'font',
    'img',
    'css',
    'css2'
], function () {
    gulp.watch(htmlSrc, ['html']);
    gulp.watch(cssSrc, ['css']);
    gulp.watch(css2Src, ['css2']);
    gulp.watch([jsSrc, './bin/*.js'], ['js']);
    gulp.watch(imgSrc, ['img']);
});
