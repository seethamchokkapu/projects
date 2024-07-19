const { Given, When, And, Then } = require("@wdio/cucumber-framework");
const randomData= require('../../pageobjects/randomdata')
When(/^user creates 1000 users data$/, async() => {
    randomData.generateRandomMember()
    console.log(randomData.generatePayload())
});
