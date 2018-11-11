const express = require('express');
const exphbs  = require('express-handlebars');

const newsModel = require('./models/news');
const authorModel = require('./models/author');

const app = express();

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    defaultLayout: 'main',
    helpers: {
        gt: function (a, b) { return a > b; },
        gte: function (a, b) { return a >= b; },
        eq: function (a, b) { return a == b; },
        neq: function (a, b) { return a != b; },
        lt: function (a, b) { return a < b; },
        lte: function (a, b) { return a >= b; },
        and: function (a, b) { return a&&b; },
        or: function (a, b) { return a || b},
        not: function(a) { return !a; },
        cutText: function(a, n) {
            return a.substring(0,n) + '...';
        },
        includes: function (arr, item) {
            return arr.includes(item);
            },
        substring: function (a, n) {
            return a.substring(0,n);
        }
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 5000);

app.use('/views/css/', express.static(__dirname + '/views/css/'));
app.use('/views/css/page', express.static(__dirname + '/views/css/page/'));
app.use('/views/css/widget', express.static(__dirname + '/views/css/widget/'));
app.use('/', express.static(__dirname + '/'));

app.get('/', function (req, res, next) {
    this.contextVars = {};
    this.contextVars.mainNews = newsModel.generate();
    this.contextVars.secondaryNews = newsModel.generateMultiple(3);
    this.contextVars.pageCss=['home'];
    this.contextVars.widgetCss=['widget-main-news', 'header', 'footer'];
    res.render('home',this.contextVars);
});

app.get('/author', function (req, res, next) {
    this.contextVars = {};
    this.contextVars.author = authorModel.generate();
    this.contextVars.pageCss=['author'];
    this.contextVars.widgetCss=['widget-main-news', 'header', 'footer'];
    res.render('author',this.contextVars);
});

app.get('/news', function (req, res, next) {
    this.contextVars = {};
    this.contextVars.news = newsModel.generate();
    this.contextVars.pageCss=['news'];
    this.contextVars.widgetCss=['widget-main-news', 'header', 'footer'];
    res.render('news',this.contextVars);
});

app.listen(app.get('port'), function () {
    console.log("Application started at: ", new Date().toLocaleString());
});