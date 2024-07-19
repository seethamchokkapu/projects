const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const { faker } = require('@faker-js/faker');
const utilTools = require("../../utils/tools");
var genVar = "abcdefghijklmnopqrstuvwxyz123456789"
const datafeedApiData = utilTools.readJson(
  `${process.cwd()}\\data\\dataFeedApi.json`
);
let consumerDetailsData=require("../../data/consumerDetails.json")
const datafeedApiUrls = utilTools.readJson(
    `${process.cwd()}\\data\\dataFeedApiUrls.json`
  );
  class dataFeedAPI{
    async dataFeedTokenAPI(){
      datafeedApiUrls.token_api_url=process.env.Data_Feed_Api_Base_Url+"v1/token";
          fs.writeFileSync(
            `${process.cwd()}\\data\\dataFeedApiUrls.json`,
            JSON.stringify(datafeedApiUrls)
          );
      const response = await axios.post(datafeedApiUrls.token_api_url,
        datafeedApiData.token_API_Payload,
    {
      headers: {
        'X-API-Key':datafeedApiData.x_api_key,
        "Content-Type": "application/json",
      },
    }
  );
  this.response = response;
  // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.response.data)
  datafeedApiData.x_api_session_key= response.data.jwt;
  fs.writeFileSync(
    `${process.cwd()}\\data\\dataFeedApi.json`,
    JSON.stringify(datafeedApiData)
  );
    }
    async dataFeedMembersAPI(){
      let firstName = faker.person.firstName();
      let lastName =  faker.person.lastName();
        datafeedApiData.payload.members[0].memberDetail.firstName = firstName
        datafeedApiData.payload.members[0].memberDetail.lastName = lastName
        datafeedApiData.payload.partnerCode=consumerDetailsData.partnerCode
        datafeedApiData.payload.members[0].enrollmentDetail.partnerCode=consumerDetailsData.partnerCode
        datafeedApiData.payload.members[0].memberDetail.memberSince = new Date().toISOString();
        datafeedApiData.payload.members[0].memberDetail.email = (firstName+lastName+"@yopmail.com").toLowerCase();
        datafeedApiData.payload.members[0].memberDetail.dob=utilTools.toISOStringDOB();
        datafeedApiData.payload.members[0].memberDetail.gender = utilTools.genderGenerator();
        let memberNbr = utilTools.generateRandString(30,genVar);
        datafeedApiData.payload.members[0].enrollmentDetail.memberNbr = memberNbr; // memberNbr(unique)
        datafeedApiData.payload.members[0].enrollmentDetail.subscriberMemberNbr = memberNbr; // memberNbr and subscriberMemberNbr are same for owner
        datafeedApiData.payload.members[0].enrollmentDetail.registrationTs = new Date().toISOString();
        datafeedApiData.payload.members[0].enrollmentDetail.eligibleStartTs = new Date().toISOString();
        datafeedApiData.payload.members[0].enrollmentDetail.eligibleEndTs = new Date().toISOString(); 
        fs.writeFileSync(
            `${process.cwd()}\\data\\dataFeedApi.json`,
            JSON.stringify(datafeedApiData)
          );
          datafeedApiUrls.members_api_url=process.env.Data_Feed_Api_Base_Url+"v1/data-feed/members";
          fs.writeFileSync(
            `${process.cwd()}\\data\\dataFeedApiUrls.json`,
            JSON.stringify(datafeedApiUrls)
          ); 
      const response = await axios.post(datafeedApiUrls.members_api_url,
            datafeedApiData.payload,
        {
          headers: {
            'X-API-KEY':datafeedApiData.x_api_key,
            'X-API-SESSION-KEY': datafeedApiData.x_api_session_key,
            "Content-Type": "application/json",
          },
        }
      );
      this.response = response;
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",this.response.data.consumers[0].consumer.consumerCode)
      consumerDetailsData.consumerCode= response.data.consumers[0].consumer.consumerCode;
      fs.writeFileSync(
        `${process.cwd()}\\data\\consumerDetails.json`,
        JSON.stringify(consumerDetailsData)
      );
  }
  }
module.exports=new dataFeedAPI()