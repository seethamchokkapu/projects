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
  let x_api_key=[];
  x_api_key.push(process.env.valid_X_API_Key,process.env.invalid_X_API_key,process.env.VacantToken)

  class dataFeedAPI{
    async dataFeedMembersAPI(){
    for(let i=0;i<x_api_key.length;i++){
        try{
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
       console.log('######################################',x_api_key[i])
      const response = await axios.post(datafeedApiUrls.members_api_url,
            datafeedApiData.payload,
        {
          headers: {
            'X-API-Key':x_api_key[i],
            'X-API-SESSION-KEY': datafeedApiData.x_api_session_key,
            "Content-Type": "application/json",
          },
        }
    );
      this.response = response;
      console.log('Response Status code with valid X-API-SESSION-KEY',this.response.status);
}
catch(error){
    if(x_api_key[i]==""){
      console.error('Response Status code having no X-API-SESSION-KEY',error.response.status);  
    }
    else{
        console.error('Response Status code having Invalid X-API-SESSION-KEY',error.response.status);
    }
}
  }
}

async tenantAPI(){
    for(let i=0;i<x_api_key.length;i++){
        try{ 
          datafeedApiUrls.tenant_api_url=process.env.Data_Feed_Api_Base_Url+"v1/data-feed/tenant/ten-ecada21e57154928a2bb959e8365b8b4";
          fs.writeFileSync(
            `${process.cwd()}\\data\\dataFeedApiUrls.json`,
            JSON.stringify(datafeedApiUrls)
          ); 
       console.log('######################################',x_api_key[i])
       const response = await axios.get(datafeedApiUrls.tenant_api_url, {
        params: { tenantCode: "ten-ecada21e57154928a2bb959e8365b8b4" }, 
        headers: {
            'X-API-Key': x_api_key[i],
            'X-API-SESSION-KEY': datafeedApiData.x_api_session_key,
            "Content-Type": "application/json",
        },
    });
      this.response = response;
      console.log('Response Status code with valid X-API-SESSION-KEY in tenant API',this.response.status);
}
catch(error){
    if(x_api_key[i]==""){
      console.error('Response Status code having no X-API-SESSION-KEY in tenant API',error.response.status);  
    }
    else{
        console.error('Response Status code having Invalid X-API-SESSION-KEY in tenant API',error.response.status);
    }
}
}
}
 }
module.exports=new dataFeedAPI()