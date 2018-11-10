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

app.set('port', 3001);

app.use('/views/css/', express.static(__dirname + '/views/css/'));
app.use('/views/css/page', express.static(__dirname + '/views/css/page/'));
app.use('/views/css/widget', express.static(__dirname + '/views/css/widget/'));

app.get('/', function (req, res, next) {
    this.contextVars = {};
    this.contextVars.mainNews = newsModel.generate();
    this.contextVars.secondaryNews = newsModel.generateMultiple(3);
    res.render('home',this.contextVars);
});

app.get('/author', function (req, res, next) {
    this.contextVars = {};
    this.contextVars.author = authorModel.generate();
    res.render('author',this.contextVars);
});

app.get('/news', function (req, res, next) {
    this.contextVars = {};
    this.contextVars.news = newsModel.generate();
    res.render('news',this.contextVars);
});

app.listen(app.get('port'), function () {
    console.log("Application started at: ", new Date().toLocaleString());
});