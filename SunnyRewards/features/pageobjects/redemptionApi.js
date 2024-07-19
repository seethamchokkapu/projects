const axios = require("axios");
require("dotenv").config();
const utilTools = require("../../utils/tools");
const fs = require("fs");
const { expect, assert, Assertion } = require("chai");
const redemptionApiData = utilTools.readJson(
  `${process.cwd()}\\data\\redemptionApiData.json`
);
consumerDetailsData=require("../../data/consumerDetails.json")
var genChars = "abcdefghijklmnopqrstuvwxyz";
var genNum = "0123456789";
var genVar = "abcdefghijklmnopqrstuvwxyz123456789"
const redemptionApiURL = utilTools.readJson(
  `${process.cwd()}\\data\\redemptionApiURL.json`
);
let responseVar;
class redemptionAPI{
async onSessionAPI(){
    redemptionApiData.onsession.currentPayload.partner_session_id =
    consumerDetailsData.consumerCode;
    redemptionApiURL.on_session_api_url =
      process.env.redemption_API_base_url + "on-session";
    fs.writeFileSync(
      `${process.cwd()}\\data\\redemptionApiData.json`,
      JSON.stringify(redemptionApiData)
    );
    fs.writeFileSync(
      `${process.cwd()}\\data\\redemptionApiURL.json`,
      JSON.stringify(redemptionApiURL)
    );
    const response = await axios.post(
      redemptionApiURL.on_session_api_url,
      redemptionApiData.onsession.currentPayload
    );
    this.response = response;
    return this.response.data
}
async getWalletBalance(){
    redemptionApiData.balance = this.response.data.user.balance;
    fs.writeFileSync(
      `${process.cwd()}\\data\\redemptionApiData.json`,
      JSON.stringify(redemptionApiData)
    );
}
async balanceAPI(){
    redemptionApiData.balanceApi.currentPayload.partner_session_id =
  consumerDetailsData.consumerCode;
  redemptionApiURL.balance_api_url =
    process.env.redemption_API_base_url + "balance";
  redemptionApiData.balanceApi.currentPayload.request_id =
    utilTools.generateRandString(5,genVar) + "hd-89f9-4a7b-bfca-a0679114vfu";
  fs.writeFileSync(
    `${process.cwd()}\\data\\redemptionApiData.json`,
    JSON.stringify(redemptionApiData)
  );
  fs.writeFileSync(
    `${process.cwd()}\\data\\redemptionApiURL.json`,
    JSON.stringify(redemptionApiURL)
  );
  const response = await axios.post(
    redemptionApiURL.balance_api_url,
     redemptionApiData.balanceApi.currentPayload
  );
  this.response = response;
}
async prizeoutSuccessAPI(){
    redemptionApiURL.success_Api_base_Url =
    process.env.redemption_API_base_url + "success";
  redemptionApiData.successApi.currentPayload.request_id =
    redemptionApiData.balanceApi.currentPayload.request_id;
  redemptionApiData.successApi.currentPayload.giftcard_cost =
    redemptionApiData.balanceApi.currentPayload.giftcard_cost;
  redemptionApiData.successApi.currentPayload.giftcard_value =
    redemptionApiData.balanceApi.currentPayload.giftcard_value;
  redemptionApiData.successApi.currentPayload.partner_session_id =
  consumerDetailsData.consumerCode;
  fs.writeFileSync(
    `${process.cwd()}\\data\\redemptionApiURL.json`,
    JSON.stringify(redemptionApiURL)
  );
  fs.writeFileSync(
    `${process.cwd()}\\data\\redemptionApiData.json`,
    JSON.stringify(redemptionApiData)
  );
  const response = await axios.post(
    redemptionApiURL.success_Api_base_Url,
    redemptionApiData.successApi.currentPayload
  );
  this.response = response;
}
async getSuccessStatus(){
    redemptionApiData.successApi.redemptionStatus =
    this.response.data.redemption.redemptionStatus;
  fs.writeFileSync(
    `${process.cwd()}\\data\\redemptionApiData.json`,
    JSON.stringify(redemptionApiData)
  );
}
async validateRedemptionStatus(){
    expect(await redemptionApiData.successApi.redemptionStatus).to.equal(
        this.response.data.redemption.redemptionStatus
      );
}
async failAPI(){
    redemptionApiURL.fail_Api_base_Url =
    process.env.redemption_API_base_url + "fail";
  redemptionApiData.failApi.currentPayload.request_id =
    redemptionApiData.balanceApi.currentPayload.request_id;
  redemptionApiData.failApi.currentPayload.giftcard_cost =
    redemptionApiData.successApi.currentPayload.giftcard_cost;
  redemptionApiData.failApi.currentPayload.giftcard_value =
    redemptionApiData.successApi.currentPayload.giftcard_value;
  fs.writeFileSync(
    `${process.cwd()}\\data\\redemptionApiURL.json`,
    JSON.stringify(redemptionApiURL)
  );
  fs.writeFileSync(
    `${process.cwd()}\\data\\redemptionApiData.json`,
    JSON.stringify(redemptionApiData)
  );
  const response = await axios.post(
    redemptionApiURL.fail_Api_base_Url,
    redemptionApiData.failApi.currentPayload
  );
  this.response = response;
}
async negativeOnSessionAPI(){
    redemptionApiURL.on_session_api_url =
    process.env.redemption_API_base_url + "on-session";
  fs.writeFileSync(
    `${process.cwd()}\\data\\redemptionApiURL.json`,
    JSON.stringify(redemptionApiURL)
  );
  const response = await axios
    .post(redemptionApiURL.on_session_api_url, {
      env: "sandboxa",
      security_token: "914230ab-1064-474a-91a0-594386a5635a",
      partner_session_id: "cmr-1f049778755641e592657dddd2e7e901",
      partner_id: "ea8da4bd-89f9-4a7b-bfca-a0679150d66d",
    })
    .then(function (response) {})
    .catch(function (error) {
      console.log("@@@@@@@@@@", error.response);
      responseVar = error.response.status;
    });
}
async negativeBalanceAPI(){
    redemptionApiURL.balance_api_url =
    process.env.redemption_API_base_url + "balance";
  fs.writeFileSync(
    `${process.cwd()}\\data\\redemptionApiURL.json`,
    JSON.stringify(redemptionApiURL)
  );
  const response = await axios
    .post(redemptionApiURL.balance_api_url, {
      env: "sandbox",
      security_token: "914230ab-1064-474a-91a0-594386a5635d",
      partner_user_id: "string",
      request_id: "56789hd-89f9-4a7b-bfca-a0679150d09",
      partner_id: "ea8da4bd-89f9-4a7b-bfca-a0679150d66c",
      partner_session_id: "cmr-628fc77c091f43ddb44e96b234dbad10",
      giftcard_cost: 1000000,
      giftcard_value: 1000000
    })
    .then(function (response) {})
    .catch(function (error) {
      responseVar = error.response.status;
      console.log("***************************************************************",error.response)
    });
}
async validateErrorStatusCode(){
    expect(await responseVar).to.equal(400);
}
async negativePrizeuotSuccessAPI(){
    redemptionApiURL.success_Api_base_Url =
      process.env.redemption_API_base_url + "success";
    fs.writeFileSync(
      `${process.cwd()}\\data\\redemptionApiURL.json`,
      JSON.stringify(redemptionApiURL)
    );
    const response = await axios
      .post(redemptionApiURL.success_Api_base_Url, {
        env: "sandbox",
        security_token: "914230ab-1064-474a-91a0-594386a5635d",
        partner_user_id: "string",
        request_id: "56789hd-89f9-4a7b-bfca-a0679150d09",
        partner_id: "ea8da4bd-89f9-4a7b-bfca-a0679150d66c",
        partner_session_id: "cmr-377c564d44014f8680720ce78bdaec88",
        giftcard_cost: "a",
        giftcard_value: "a",
      })
      .then(function (response) {})
      .catch(function (error) {
        responseVar = error.response.status;
      });
}
async negativePrizeoutFailAPI(){
    redemptionApiURL.fail_Api_base_Url =
    process.env.redemption_API_base_url + "fail";
  fs.writeFileSync(
    `${process.cwd()}\\data\\redemptionApiURL.json`,
    JSON.stringify(redemptionApiURL)
  );
  const response = await axios
    .post(redemptionApiURL.fail_Api_base_Url, {
      env: "sandbox",
      security_token: "914230ab-1064-474a-91a0-594386a5635d",
      partner_user_id: "string",
      request_id: "56789hd-89f9-4a7b-bfca-a0679150d09",
      partner_id: "ea8da4bd-89f9-4a7b-bfca-a0679150d66c",
      partner_session_id: "cmr-377c564d44014f8680720ce78bdaec88",
      giftcard_cost: "a",
      giftcard_value: "a",
    })
    .then(function (response) {})
    .catch(function (error) {
      responseVar = error.response.status;
    });
}
}
module.exports = new redemptionAPI();