const { Given, When, And, Then } = require("@wdio/cucumber-framework");
const redemptionAPI=require('../../pageobjects/redemptionApi')
const redemptionNegative=require('../../pageobjects/redemptionNegative')
When(/^the user launches the on-session API_URL$/, async () => {
  await redemptionAPI.onSessionAPI();
});
When(/^user captures the main total wallet balance$/, async () => {
  await redemptionNegative.getTotalWalletBalance();
});
When(/^the user lanches redemption balance API_URL$/, async () => {
  await redemptionAPI.balanceAPI();
});
When(/^the user launches the prizeout redemption success Api$/, async () => {
  await redemptionAPI.prizeoutSuccessAPI();
});
When(/^user checks the redemption success status$/, async () => {
  await redemptionAPI.getSuccessStatus()
});
Then(/^user asserts the redemption request is completed or not$/, async () => {
  await redemptionAPI.validateRedemptionStatus()
});
When(/^the user lanches the prizeout redemption fail Api$/, async () => {
  await redemptionAPI.failAPI()
});

