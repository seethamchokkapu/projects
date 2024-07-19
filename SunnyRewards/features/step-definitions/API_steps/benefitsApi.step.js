const { When, Then } = require("@wdio/cucumber-framework");
const benefitsApi = require("../../pageobjects/benefitsApi")



When(/^user hits get consumer by email API to validate the response status code$/, async () => {
	await benefitsApi.getConsumerByEmailApi()
});

When(/^user hits get tenant by consumercode Api to validate the response code$/, async() => {
     await benefitsApi.getTenantByConsumerCodeApi()
});


When(/^user hits the wallets API to get wallet details$/, async () => {
  await benefitsApi.walletsApi();
 });
 // captures the wallet api response to validate with db data.
Then(/^user captures all the wallet details to verify them in db$/, async () => {
  await benefitsApi.capturesWalletResponse();
  });

Then(/^user verifies wallet API response with the db data from wallet table$/, async () => {
  await benefitsApi.validatesWalletResponse();
})
When(/^user hits transactions api to get transaction history of the consumer$/, async () => {
  await benefitsApi.transactionAPI();
});

Then(/^user captures the transaction details of Today, This Month and Previous Trasactions$/, async () => {
 await benefitsApi.transactionDetails()
});


