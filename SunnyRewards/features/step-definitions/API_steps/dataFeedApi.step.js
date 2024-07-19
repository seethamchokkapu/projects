const { Given, When, And, Then } = require("@wdio/cucumber-framework");
const dataFeedAPI=require("../../pageobjects/dataFeed");
const { da } = require("@faker-js/faker");

When(/^user hits token api to generate X-API_SESSION-KEY$/, async() => {
	await dataFeedAPI.dataFeedTokenAPI();
});

When(/^user hits data-feed-member api to create a new consumerCode$/, async() => {
  await dataFeedAPI.dataFeedMembersAPI();
});


