const faker = require('faker');

const AuthorModel = {
    generate: function () {
        return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            bio: faker.lorem.paragraph()
        }
    }
};

module.exports = AuthorModel;