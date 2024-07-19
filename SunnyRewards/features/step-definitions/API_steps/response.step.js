const { Given, When, And, Then } = require("@wdio/cucumber-framework");
const validateResponse= require('../../pageobjects/response')
When(/^user hits data-feed-member api to validate response status code$/, async() => {
	await validateResponse.dataFeedMembersAPI()
});

When(/^user hits tenant api to validate response status code$/, async() => {
	await validateResponse.tenantAPI()
});

