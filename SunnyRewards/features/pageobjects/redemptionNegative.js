const axios = require("axios");
require("dotenv").config();
const utilTools = require("../../utils/tools");
const fs = require("fs");
const { expect, assert, Assertion } = require("chai");
var genChars = "abcdefghijklmnopqrstuvwxyz";
var genNum = "0123456789";
var genVar = "abcdefghijklmnopqrstuvwxyz123456789"
const redemptionApiNegativeData = utilTools.readJson(
  `${process.cwd()}\\data\\redemptionApiNegativeData.json`
);
const redemptionApiNegativeURL = utilTools.readJson(
  `${process.cwd()}\\data\\redemptionApiURL.json`
);
const consumerDetailsData = utilTools.readJson(
  `${process.cwd()}\\data\\consumerDetails.json`
);
const redemptionAPI=require('../pageobjects/redemptionApi')
class redemptionNegative{
  async getTotalWalletBalance(apiData){
    apiData=await redemptionAPI.onSessionAPI();
    console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[}}}}}}}",apiData)
    redemptionApiNegativeData.balance = apiData.user.balance;
  fs.writeFileSync(
    `${process.cwd()}\\data\\redemptionApiNegativeData.json`,
    JSON.stringify(redemptionApiNegativeData)
  );
  }
}
module.exports=new redemptionNegative();