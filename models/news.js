const faker = require('faker');


const NewsGenerator = {
    generate: function () {
        var generatedNews = {
            title: "",
            imageUrl: "",
            author: "",
            text: "",
            url: ""
        }

        generatedNews.title = faker.name.title();
        generatedNews.imageUrl = "https://www.logolynx.com/images/logolynx/18/18d044244c2f0215e1023fc331efb601.png";
        generatedNews.author = faker.name.findName();
        generatedNews.text = faker.lorem.paragraphs();
        generatedNews.url = "/news";
        return generatedNews;
    },
    generateMultiple: function (n) {
        var generatedNews = [];
        for(var i = 0; i < n; i++) generatedNews.push(this.generate());
    }
}

module.exports = NewsGenerator;