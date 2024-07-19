const axios = require("axios");
require("dotenv").config();
const utilTools = require("../../utils/tools");
const { expect, assert, Assertion } = require("chai");
const fs = require("fs");
let bffApiData = require("../../data/bffApiData.json");
let consumerDetailsData = require("../../data/consumerDetails.json");
const bffApiURL = utilTools.readJson(`${process.cwd()}\\data\\bffApiURL.json`);
let responseVar;
class BffAPI {
  async consumerLogin() {
    bffApiData = utilTools.readJson(`${process.cwd()}\\data\\bffApiData.json`);
    bffApiData.background.currentPayload.consumerCode =
      consumerDetailsData.consumerCode;
    fs.writeFileSync(
      `${process.cwd()}\\data\\bffApiData.json`,
      JSON.stringify(bffApiData)
    );
    bffApiURL.consumer_login_api_url =
      process.env.BFF_API_base_URL + "v1/login/consumer-login";
    fs.writeFileSync(
      `${process.cwd()}\\data\\bffApiURL.json`,
      JSON.stringify(bffApiURL)
    );
    const response = await axios.post(
      bffApiURL.consumer_login_api_url,
      bffApiData.background.currentPayload
    );
    this.response = response;
  }
  async getAuthToken() {
    bffApiData = utilTools.readJson(`${process.cwd()}\\data\\bffApiData.json`);
    bffApiData.authToken = this.response.data.jwt;
    bffApiData.consumer_summeryApi.currentPayload.consumerCode =
      consumerDetailsData.consumerCode;
    fs.writeFileSync(
      `${process.cwd()}\\data\\bffApiData.json`,
      JSON.stringify(bffApiData)
    );
  }
  async consumerSummery() {
    bffApiData = utilTools.readJson(`${process.cwd()}\\data\\bffApiData.json`);
    bffApiURL.consumer_summary_api_url =
      process.env.BFF_API_base_URL + "v1/bff/consumer-summary";
    fs.writeFileSync(
      `${process.cwd()}\\data\\bffApiURL.json`,
      JSON.stringify(bffApiURL)
    );
    const response = await axios.post(
      bffApiURL.consumer_summary_api_url,
      bffApiData.consumer_summeryApi.currentPayload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    );
    this.response = response;
    console.log(this.response.data);
  }
  async getTenantCode() {
    bffApiData = utilTools.readJson(`${process.cwd()}\\data\\bffApiData.json`);
    let value = this.response.data.consumerWalletDetail.wallets[0];
    bffApiData.balance = value.balance;
    bffApiData.earnMaximum = value.earnMaximum;
    bffApiData.leftToEarn = value.leftToEarn;
    bffApiData.get_all_consumer_tasks_Api.currentPayload.consumerCode =
      consumerDetailsData.consumerCode;
    bffApiData.get_all_consumer_tasks_Api.currentPayload.tenantCode =
      value.tenantCode;
    bffApiData.enrollApi.currentPayload.tenantCode = value.tenantCode;
    fs.writeFileSync(
      `${process.cwd()}\\data\\bffApiData.json`,
      JSON.stringify(bffApiData)
    );
  }
  async getAllConsumerTasksAPI(){
    bffApiData = utilTools.readJson(
        `${process.cwd()}\\data\\bffApiData.json`
      );
      bffApiURL.get_all_consumer_tasks_api_url =
        process.env.BFF_API_base_URL + "v1/bff/get-all-consumer-tasks";
      fs.writeFileSync(
        `${process.cwd()}\\data\\bffApiURL.json`,
        JSON.stringify(bffApiURL)
      );
      const response = await axios.post(
        bffApiURL.get_all_consumer_tasks_api_url,
         bffApiData.get_all_consumer_tasks_Api.currentPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bffApiData.authToken}`,
          },
        }
      );
      this.response = response;
      console.log(
        "$$$$$$$$$$$$$$$$$$$$&&&&&&&&&&&&&&&&&&&&&&&&&&****************>",
        this.response.data.availableTasks[0]
      );
  }
  async getTaskId(){
    bffApiData = utilTools.readJson(
        `${process.cwd()}\\data\\bffApiData.json`
      );
      bffApiData.enrollApi.currentPayload.consumerCode = consumerDetailsData.consumerCode;
      bffApiData.enrollApi.enrollSecondTask.consumerCode = consumerDetailsData.consumerCode;
      let value = this.response.data.availableTasks[0];
      bffApiData.enrollApi.currentPayload.taskId = value.task.taskId;
      bffApiData.enrollApi.enrollSecondTask.taskId=this.response.data.availableTasks[1].task.taskId
      bffApiData.get_all_consumer_tasks_Api.firstAvailableTaskName = value.task.taskName;
      bffApiData.get_all_consumer_tasks_Api.secondAvailableTaskName=this.response.data.availableTasks[1].task.taskName
      fs.writeFileSync(
        `${process.cwd()}\\data\\bffApiData.json`,
        JSON.stringify(bffApiData)
      );
  }
async enrollAPI(){
    bffApiData = utilTools.readJson(
        `${process.cwd()}\\data\\bffApiData.json`
      );
      bffApiURL.enroll_api_url = process.env.BFF_API_base_URL + "v1/bff/enroll";
      fs.writeFileSync(
        `${process.cwd()}\\data\\bffApiURL.json`,
        JSON.stringify(bffApiURL)
      );
      const response = await axios.post(
        bffApiURL.enroll_api_url,
              bffApiData.enrollApi.currentPayload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bffApiData.authToken}`,
          },
        }
      );
      this.response = response;
}
async enrollOneMoreTask(){
    bffApiData = utilTools.readJson(
        `${process.cwd()}\\data\\bffApiData.json`
      );
      bffApiURL.enroll_api_url = process.env.BFF_API_base_URL + "v1/bff/enroll";
      fs.writeFileSync(
        `${process.cwd()}\\data\\bffApiURL.json`,
        JSON.stringify(bffApiURL)
      );
      const response = await axios.post(
        bffApiURL.enroll_api_url,
        bffApiData.enrollApi.enrollSecondTask,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bffApiData.authToken}`,
          },
        }
      );
      this.response = response;
}
async getTaskCodeOfPendingTask(){
    bffApiData = utilTools.readJson(
        `${process.cwd()}\\data\\bffApiData.json`
      );
      bffApiData.task_update_Api.currentPayload.consumerCode = consumerDetailsData.consumerCode;
      console.log("PENDING TASKS", this.response.data.pendingTasks);
      let value =
        this.response.data.pendingTasks[this.response.data.pendingTasks.length - 1];
      bffApiData.task_update_Api.currentPayload.taskId = value.task.taskId;
      bffApiData.task_update_Api.currentPayload.taskCode = value.task.taskCode;
      bffApiData.enrollApi.firstPendingTaskName = value.task.taskName;
      bffApiData.enrollApi.secondPendingTaskName=this.response.data.pendingTasks[this.response.data.pendingTasks.length - 2].task.taskName;
      fs.writeFileSync(
        `${process.cwd()}\\data\\bffApiData.json`,
        JSON.stringify(bffApiData)
      );
}

async taskUpdateAPI(){
  bffApiData = utilTools.readJson(
      `${process.cwd()}\\data\\bffApiData.json`
    );
    // const taskUpdateApiPayload = new FormData();
// for (const key in  bffApiData.task_update_Api.currentPayload) {
//   taskUpdateApiPayload.append(key,bffApiData.task_update_Api.currentPayload[key]);
//   }
    bffApiURL.task_update_api_url =
      process.env.BFF_API_base_URL + "v1/bff/task-update";
    fs.writeFileSync(
      `${process.cwd()}\\data\\bffApiURL.json`,
      JSON.stringify(bffApiURL)
    );
   
    const response = await axios.post(
      bffApiURL.task_update_api_url,
      bffApiData.task_update_Api.currentPayload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    )
    this.response = response;
}

async captureUpdatedBalance(){
    bffApiData = utilTools.readJson(
        `${process.cwd()}\\data\\bffApiData.json`
      );
      bffApiData.balance =
        this.response.data.consumerWalletDetail.wallets[0].balance;
      fs.writeFileSync(
        `${process.cwd()}\\data\\bffApiData.json`,
        JSON.stringify(bffApiData)
      );
}
async captureTaskId(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiData.inProgressTask.taskId=this.response.data.pendingTasks[0].task.taskId
 bffApiData.completedTask.taskId=this.response.data.completedTasks[0].task.taskId
 bffApiData.inProgressTask.tenant_code=this.response.data.pendingTasks[0].taskReward.tenantCode
 bffApiData.completedTask.tenant_code=this.response.data.completedTasks[0].taskReward.tenantCode
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiData.json`,
    JSON.stringify(bffApiData)
  );
}
async getCompletedTaskName(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiData.task_update_Api.completedTaskName=this.response.data.completedTasks[this.response.data.completedTasks.length-1].task.taskName;
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiData.json`,
    JSON.stringify(bffApiData)
  );
}
async validateCompletedTask(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  expect(
    await this.response.data.completedTasks[
      this.response.data.completedTasks.length - 1
    ].task.taskName
  ).to.equal(bffApiData.task_update_Api.completedTaskName);
}
async getWalletId(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiData.get_all_consumer_transactions_Api.currentPayload.consumerCode = consumerDetailsData.consumerCode;
  bffApiData.get_all_consumer_transactions_Api.currentPayload.walletId =
    this.response.data.consumerWalletDetail.wallets[0].walletId;
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiData.json`,
    JSON.stringify(bffApiData)
  );
}
async getAllConsumerTransactionsAPI(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiURL.get_all_consumer_transactions_api_url =
    process.env.BFF_API_base_URL + "v1/bff/get-all-consumer-transactions";
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiURL.json`,
    JSON.stringify(bffApiURL)
  );
  const response = await axios.post(
    bffApiURL.get_all_consumer_transactions_api_url,
     bffApiData.get_all_consumer_transactions_Api.currentPayload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bffApiData.authToken}`,
      },
    }
  );
  this.response = response;
}
async getBalance(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  let value = this.response.data.transaction.Today[0].transaction;
  bffApiData.task_update_Api.completedTaskAmount = value.transactionAmount;
  bffApiData.get_all_consumer_transactions_Api.date_time = value.createTs;
  bffApiData.get_all_consumer_transactions_Api.currentBalance = value.balance;
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiData.json`,
    JSON.stringify(bffApiData)
  );
}
async validateBalance(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  expect(bffApiData.get_all_consumer_transactions_Api.currentBalance).to.equal(bffApiData.balance);
}
async getTenantByConsumerCodeAPI(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiURL.get_tenant_by_consumer_code_url =
    process.env.BFF_API_base_URL + "Tenant/get-tenant-by-consumer-code";
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiURL.json`,
    JSON.stringify(bffApiURL)
  );
  bffApiData.get_tenant_by_consumer_code.currentPayload.consumerCode =
    consumerDetailsData.consumerCode;
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiData.json`,
    JSON.stringify(bffApiData)
  );
  const response = await axios.post(
    bffApiURL.get_tenant_by_consumer_code_url,
    bffApiData.get_tenant_by_consumer_code.currentPayload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bffApiData.authToken}`,
      },
    }
  );
  this.response = response;
}
async successStatus(){
  expect(await this.response.status).to.equal(200);
}
async refeshTokenAPI(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiURL.refresh_token_url =
    process.env.BFF_API_base_URL + "v1/login/refresh-token";
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiURL.json`,
    JSON.stringify(bffApiURL)
  );
  bffApiData.refresh_token.currentPayload.consumerCode =
    consumerDetailsData.consumerCode;
  bffApiData.refresh_token.currentPayload.accessToken = bffApiData.authToken;
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiData.json`,
    JSON.stringify(bffApiData)
  );
  const response = await axios.post(
    bffApiURL.refresh_token_url,
    bffApiData.refresh_token.currentPayload,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bffApiData.authToken}`,
      },
    }
  );
  this.response = response;
}
async validateAccessToken(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  assert.notEqual(bffApiData.authToken, this.response.data.accessToken);
}
async negativeGetTenantByConsumerCodeAPI(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiURL.get_tenant_by_consumer_code_url =
    process.env.BFF_API_base_URL + "Tenant/get-tenant-by-consumer-code";
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiURL.json`,
    JSON.stringify(bffApiURL)
  );
  const response = await axios
    .post(
      bffApiURL.get_tenant_by_consumer_code_url,
      {
        consumerCode: "cmr-71a242a74f1e4361b2b8cb1c85f34ef0",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    )
    .then(function (response) { })
    .catch(function (error) {
      console.log("@@@@@@@", error.response.status);
      responseVar = error.response.status;
    });
  this.response = response;
}
async errorStatusCode(){
  expect(await responseVar).to.equal(401);
}
async negativeRefreshTokenAPI(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiURL.refresh_token_url =
    process.env.BFF_API_base_URL + "v1/login/refresh-token";
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiURL.json`,
    JSON.stringify(bffApiURL)
  );
  const response = await axios
    .post(
      bffApiURL.get_tenant_by_consumer_code_url,
      {
        consumerCode: "cmr-71a242a74f1e4361b2b8cb1c85f34ef0",
        accessToken: bffApiData.authToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    )
    .then(function (response) { })
    .catch(function (error) {
      console.log("**********************", error.response.status);
      responseVar = error.response.status;
    });
}
async negativeConsumerSummeryAPI(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiURL.consumer_summary_api_url =
    process.env.BFF_API_base_URL + "v1/bff/consumer-summary";
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiURL.json`,
    JSON.stringify(bffApiURL)
  );
  const response = await axios.post(
      bffApiURL.consumer_summary_api_url,
      {
        consumerCode: "cmr-71a242a74f1e4361b2b8cb1c85f34ef8",
        consumerId: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    )
    .then(function (response) { })
    .catch(function (error) {
      responseVar = error.response.status;
    });
}
async negativeGetAllConsumerTasksAPI(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiURL.get_all_consumer_tasks_api_url =
    process.env.BFF_API_base_URL + "v1/bff/get-all-consumer-tasks";
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiURL.json`,
    JSON.stringify(bffApiURL)
  );
  const response = await axios
    .post(
      bffApiURL.get_all_consumer_tasks_api_url,
      {
        tenantCode: "ten-8d9e6f00eec8436a8251d55ff74b1641",
        consumerCode: "cmr-71a242a74f1e4361b2b8cb1c85f34ef8",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    )
    .then(function (response) { })
    .catch(function (error) {
      console.log("**********************", error.response.status);
      responseVar = error.response.status;
    });
}
async negativeEnrollAPI(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiURL.enroll_api_url = process.env.BFF_API_base_URL + "v1/bff/enroll";
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiURL.json`,
    JSON.stringify(bffApiURL)
  );
  const response = await axios
    .post(
      bffApiURL.get_all_consumer_tasks_api_url,
      {
        consumerCode: "cmr-71a242a74f1e4361b2b8cb1c85f34ef8",
        tenantCode: "ten-8d9e6f00eec8436a8251d55ff74b1641",
        taskId: 53,
        taskStatus: "IN_PROGRESS",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    )
    .then(function (response) { })
    .catch(function (error) {
      console.log("**********************", error.response.status);
      responseVar = error.response.status;
    });
}
async negativeGetAllConsumerTransactionsAPI(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiURL.get_all_consumer_transactions_api_url =
    process.env.BFF_API_base_URL + "v1/bff/get-all-consumer-transactions";
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiURL.json`,
    JSON.stringify(bffApiURL)
  );
  const response = await axios.post(
      bffApiURL.get_all_consumer_transactions_api_url,
      {
        consumerCode: "cmr-0889fcc32d6d40b9a9a74c9c5688cd99",
        walletId: 92,
        count: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bffApiData.authToken}`,
        },
      }
    )
    .then(function (response) { })
    .catch(function (error) {
      responseVar = error.response.status;
    });
}
async negativeConsumerLoginAPI(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiURL.consumer_login_api_url =
    process.env.BFF_API_base_URL + "v1/login/consumer-login";
  fs.writeFileSync(
    `${process.cwd()}\\data\\bffApiURL.json`,
    JSON.stringify(bffApiURL)
  );
  const response = await axios
    .post(bffApiURL.consumer_login_api_url, {
      partnerCode: "string",
      memNbr: "string",
      email: "string",
      consumerCode: "cmr-1f049778755641e592657dddd2e7e901",
    })
    .then(function (response) { })
    .catch(function (error) {
      responseVar = error.response.status;
    });
}
async errorResponseStatus(){
  expect(await responseVar).to.equal(404);
}
async neagativeTaskUpdateAPI(){
  bffApiData = utilTools.readJson(
    `${process.cwd()}\\data\\bffApiData.json`
  );
  bffApiURL.task_update_api_url =
  process.env.BFF_API_base_URL + "v1/bff/task-update";
fs.writeFileSync(
  `${process.cwd()}\\data\\bffApiURL.json`,
  JSON.stringify(bffApiURL)
);
const response = await axios
  .post(bffApiURL.task_update_api_url, {
    consumerCode: "cmr-b9d1a5f061b24b7e884812b2808a6cc4",
            taskId: 1,
            taskStatus: "COMPLETED",
            taskCode: "tsk-210ddf7876234c11b64668d4246f0b44",
            partnerCode: "string",
            memNbr: "string"
  })
  .then(function (response) {})
  .catch(function (error) {
    responseVar = error.response.status;
  });
}
}
module.exports = new BffAPI();
