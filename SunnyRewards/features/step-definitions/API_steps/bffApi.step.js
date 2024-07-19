const { Given, When, And, Then } = require("@wdio/cucumber-framework");
const bffApi=require('../../pageobjects/bffApi')
// launching consumer-login api
When(/^user hits the consumer-login api to create a JWT token$/, async() => {
  await bffApi.consumerLogin();
});
When(/^the user captures authToken$/, async() => {
  await bffApi.getAuthToken();
});
// launching consumer-summary api
When(/^the user hits consumer-summary API to get tenantCode$/, async () => {
  await bffApi.consumerSummery();
});
When(/^the user captures tenantCode$/,async() => {
  await bffApi.getTenantCode();
});
// launching get-all-consumer-tasks api
When(/^the user lanches get-all-consumer-tasks API$/, async () => {
 await bffApi.getAllConsumerTasksAPI();
});
Then(/^the user captures taskId and taskName$/, async () => {
 await bffApi.getTaskId();
});
// launching EnrollApi api
When(/^the user launches EnrollApi$/, async () => {
  await bffApi.enrollAPI();
});
When(/^the user launches EnrollApi to enroll one more task$/, async () => {
 await bffApi.enrollOneMoreTask();
});
When(/^the user captures the taskId taskCode pendingTask$/, async () => {
  await bffApi.getTaskCodeOfPendingTask();
});
// launching task-update api
When(/^the user launches task-update API$/, async () => {
  await bffApi.taskUpdateAPI();
});
Then(/^the user captures updated balance$/, async() => {
 await bffApi.captureUpdatedBalance();
});
Then(/^the user captures the consumer_task_id, task_id and tenantCode$/, async() => {
  await bffApi.captureTaskId();
});

Then(/^the user captures completed task name$/, async() => {
 await bffApi.getCompletedTaskName();
});
Then(
  /^the user asserts the completed task with pending and available task$/,
  async () => {
    await bffApi.validateCompletedTask();
  }
);
When(/^the user captures walletId$/, async() => {
 await bffApi.getWalletId();
});
// launching get-all-consumer-transactions api
When(/^the user lanches get-all-consumer-transactions API$/, async () => {
  await bffApi.getAllConsumerTransactionsAPI();
});
When(/^the user captures balance$/,async() => {
 await bffApi.getBalance();
});
Then(/^the user asserts the balance$/, async() => {
  await bffApi.validateBalance();
});
// launching get-tenant-by-consumer-code api
When(/^the user launches get-tenant-by-consumer-code API$/, async () => {
  await bffApi.getTenantByConsumerCodeAPI();
});
Then(/^the user validates the status code with 200$/, async() => {
	await bffApi.successStatus();
});

// generating the refresh-token
When(/^the user launches refresh-token API$/, async () => {
 await bffApi.refeshTokenAPI();
});
// validating the refreshed access token.
Then(/^the user validates the access token$/, async() => {
 await bffApi.validateAccessToken();
});
// failure cases
// launching and validating the get-tenant-by-consumer-code API for failure case using invalid consumerCode
When(
  /^the user launches get-tenant-by-consumer-code API for failure case$/,
  async () => {
    await bffApi.negativeGetTenantByConsumerCodeAPI();
  }
);
Then(/^the user validates the consumer code with 401$/, async () => {
  await bffApi.errorStatusCode();
});
// launching and validating the refresh-token API for failure case using invalid consumerCode
When(/^the user launches refresh-token API for failure case$/, async () => {
  await bffApi.negativeRefreshTokenAPI();
});
Then(/^the user validates the request with 401$/, async () => {
  await bffApi.errorStatusCode();
});
// launching and validating the consumer-summary API for failure case using invalid consumerCode
When(/^the user launches consumer-summary API for failure case$/, async () => {
  await bffApi.negativeConsumerSummeryAPI()
});
Then(/^user validates the consumer-summary API status with 401$/, async () => {
  await bffApi.errorStatusCode();
});
// launching and validating the get-all-consumer-tasks API for failure case using invalid consumerCode
When(
  /^user launches get-all-consumer-tasks API for failure case$/,
  async () => {
   await bffApi.negativeGetAllConsumerTasksAPI();
  }
);
Then(
  /^user validates the get-all-consumer-tasks API status with 401$/,
  async () => {
    await bffApi.errorStatusCode();
  }
);
//launching and validating the enroll API for with invalid payload
When(/^user launches enroll API for failure case$/, async () => {
  await bffApi.negativeEnrollAPI();
});
Then(/^user validates the enroll API status with 401$/, async () => {
  await bffApi.errorStatusCode();
});
//launching and validating the get-all-consumer-transactions for with invalid payload
When(
  /^user launches get-all-consumer-transactions for failure case$/,
  async () => {
    await bffApi.negativeGetAllConsumerTransactionsAPI();
  }
);
Then(
  /^user validates the get-all-consumer-transactions status with 401$/,
  async () => {
    await bffApi.errorStatusCode();
  }
);
When(/^user launches consumer-login for failure case$/, async () => {
  await bffApi.negativeConsumerLoginAPI()
});
Then(/^user validates the consumer-login status with 404$/, async () => {
 await bffApi.errorResponseStatus();
});
When(/^user launches task update api for failure case$/, async() => {
 await bffApi.neagativeTaskUpdateAPI();
});
Then(/^user validates the task update API status with 401$/,async () => {
	await bffApi.errorStatusCode();
});
