const { Given, When, And, Then } = require("@wdio/cucumber-framework");
const redemptionAPI=require("../../pageobjects/redemptionApi")
When(/^the user launches on-session API_URL$/, async () => {
 await redemptionAPI.onSessionAPI();
});
When(/^user captures the main wallet balance$/, async() => {
 await redemptionAPI.getWalletBalance();
});
When(/^the user lanches balance API_URL$/, async () => {
  await redemptionAPI.balanceAPI();
});
When(/^the user launches the prizeout success Api$/, async () => {
  await redemptionAPI.prizeoutSuccessAPI();
});
When(/^user checks the success status$/, async () => {
  await redemptionAPI.getSuccessStatus();
});
Then(/^user asserts the request is completed or not$/, async () => {
  await redemptionAPI.validateRedemptionStatus();
});
When(/^the user lanches the prizeout fail Api$/, async () => {
  await redemptionAPI.failAPI();
});
// failure cases
When(/^the user launches on-session API with invalid payload$/, async () => {
  await redemptionAPI.negativeOnSessionAPI();
});
When(/^the user launches balance API with invalid payload$/, async () => {
  await redemptionAPI.negativeBalanceAPI();
});
Then(/^user validates the  balance API status with 400$/, async () => {
  await redemptionAPI.validateErrorStatusCode();
});
When(
  /^the user launches prizeout success API with invalid payload$/,
  async () => {
    await redemptionAPI.negativePrizeuotSuccessAPI();
  }
);
Then(/^user validates the  prizeout success API status with 400$/, async () => {
  await redemptionAPI.validateErrorStatusCode();
});
When(
  /^the user launches prizeout fail API with invalid payload$/,
  async () => {
   await redemptionAPI.negativePrizeoutFailAPI();
  }
);
Then(/^user validates the  prizeout fail API status with 400$/, async () => {
  await redemptionAPI.validateErrorStatusCode();
});
