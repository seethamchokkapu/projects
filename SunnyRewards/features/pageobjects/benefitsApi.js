
const { assert } = require("chai");
const axios = require("axios");
const fs = require("fs");
const utilTools = require("../../utils/tools");
const { Client } = require('pg');
const benifitsApiData = utilTools.readJson(`${process.cwd()}\\data\\benifitsApiData.json`);
const benifitsApiURL = utilTools.readJson(`${process.cwd()}\\data\\benifitsApiUrl.json`);
const connectToDb=require("../../features/pageobjects/db")

class BenefitsBffAPI {
  async getConsumerByEmailApi() {
    const email = "maxinesenger@yopmail.com"; 
    benifitsApiURL.get_consumers_by_email = process.env.Benefits_API_Base_Url + `get-consumers-by-email?email=${encodeURIComponent(email)}`; 
      fs.writeFileSync(
        `${process.cwd()}\\data\\benifitsApiUrl.json`,
        JSON.stringify(benifitsApiURL)
      );
      const response = await axios.get(
        benifitsApiURL.get_consumers_by_email,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${benifitsApiData.accessToken}`
          }
        }
      );
      this.response = response;
      console.log('Response code:', response.status);
      assert.equal(response.status, 200, "Successfully validated response code");
     
  }

  async getTenantByConsumerCodeApi(){
    let consumerCode = benifitsApiData.consumercode;
    benifitsApiURL.get_tenant_by_consumer_code_url = process.env.Benefits_API_Base_Url +`get-tenant-by-consumer-code?consumerCode=${encodeURIComponent(consumerCode)}`;
    fs.writeFileSync(
      `${process.cwd()}\\data\\benifitsApiUrl.json`,
      JSON.stringify(benifitsApiURL)
    );
    const response = await axios.get(
      benifitsApiURL.get_tenant_by_consumer_code_url,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${benifitsApiData.accessToken}`,
        },
      }
    );
    this.response = response;
    console.log('Response code:', response.status);
    assert.equal(response.status, "200", "successfully validated response code");
  }

// user sends a post request to wallets api and asserts status code.
async walletsApi(){
    benifitsApiURL.walletAPiUrl = process.env.Benefits_API_Base_Url +"wallets";
    fs.writeFileSync(
      `${process.cwd()}\\data\\benifitsApiUrl.json`,
      JSON.stringify(benifitsApiURL)
    );
    let consumerCode = benifitsApiData.consumercode;
    const response = await axios.post(
      benifitsApiURL.walletAPiUrl,
       {
        consumerCode
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${benifitsApiData.accessToken}`,
        },
      }
    );
    this.response = response;
    console.log('Response code:', response.status);
    assert.equal(response.status, "200", "successfully validated response code"); 
}

async capturesWalletResponse(){
    let walletsResponse = this.response.data.walletDetailDto[0].wallet
    benifitsApiData.wallet.walletId = walletsResponse.walletId,
      benifitsApiData.wallet.walletTypeId = walletsResponse.walletTypeId,
      benifitsApiData.wallet.customerCode = walletsResponse.customerCode,
      benifitsApiData.wallet.tenantCode = walletsResponse.tenantCode,
      benifitsApiData.wallet.walletCode = walletsResponse.walletCode,
      benifitsApiData.wallet.balance = walletsResponse.balance,
      benifitsApiData.wallet.earnMaximum = walletsResponse.earnMaximum,
      benifitsApiData.wallet.totalEarned = walletsResponse.totalEarned,
      benifitsApiData.wallet.pendingTasksTotalRewardAmount = walletsResponse.pendingTasksTotalRewardAmount,
      benifitsApiData.wallet.leftToEarn = walletsResponse.leftToEarn
    fs.writeFileSync(`${process.cwd()}\\data\\benifitsApiData.json`, JSON.stringify(benifitsApiData));
}

async validatesWalletResponse(){
  const pgConfig=await connectToDb.dbCredentials();
      async function connectToPostgres() {
        // Initialize PostgreSQL client
        const pgClient = new Client(pgConfig);
        try {
          // Connect to PostgreSQL
          await pgClient.connect();
          pgClient.query(`select wallet_id, customer_code, tenant_code, wallet_code, balance, earn_maximum, total_earned from wallet.wallet where wallet_id= ${benifitsApiData.wallet.walletId}`, (err, res) => {
    
            if (!err) {
              console.log("#########################################################",res.rows);
              for (let row of res.rows) {
                // Iterate over each column in the row
                for (let columnName in row) {
                  // Access the value of each column in the row
                  let columnValue = row[columnName];
                  if (`${columnName}` == 'wallet_id') {
                    console.log(`${columnName}:  ${columnValue}`, benifitsApiData.wallet.walletId);
                    assert.equal(`${columnValue}`, benifitsApiData.wallet.walletId);
                  } else if (`${columnName}` == 'customer_code') {
                    console.log(`${columnName}:  ${columnValue}`, benifitsApiData.wallet.customerCode);
                    assert.equal(`${columnValue}`, benifitsApiData.wallet.customerCode, "successfully verified customer code from wallet Api with customer code from wallet table");
                  } else if (`${columnName}` == 'tenant_code') {
                    console.log(`${columnName}:  ${columnValue}`, benifitsApiData.wallet.tenantCode);
                    assert.equal(`${columnValue}`, benifitsApiData.wallet.tenantCode, "successfully verified tenant code from wallet Api with tenant code from wallet table");
                  } else if (`${columnName}` == 'wallet_code') {
                    console.log(`${columnName}:  ${columnValue}`, benifitsApiData.wallet.walletCode);
                    assert.equal(`${columnValue}`, benifitsApiData.wallet.walletCode, "successfully verified wallet code from wallet Api with wallet code from wallet table");
                  } else if (`${columnName}` == 'balance') {
                    const bal = Number.parseFloat(` ${columnValue}`, 10);
                    console.log(`${columnName}: `, bal, benifitsApiData.wallet.balance);
                    assert.equal(`${columnValue}`, benifitsApiData.wallet.balance, "successfully verified balance from wallet Api with balance from wallet table");
                  } else if (`${columnName}` == 'earn_maximum') {
                    const earnMax = Number.parseFloat(` ${columnValue}`, 10);
                    console.log(`${columnName}: `, earnMax, benifitsApiData.wallet.earnMaximum);
                    assert.equal(`${columnValue}`, benifitsApiData.wallet.earnMaximum, "successfully verified max earned from wallet Api with max earned from wallet table");
                  } else if (`${columnName}` == 'total_earned') {
                    const totalEarn = Number.parseFloat(` ${columnValue}`, 10);
                    console.log(`${columnName}: `, totalEarn, benifitsApiData.wallet.totalEarned);
                    assert.equal(`${columnValue}`, benifitsApiData.wallet.totalEarned, "successfully verified total earned from wallet Api with total earned from wallet table");
                  }
                }
              }
            } else {
              console.log(err.message);
            }
          })
        } catch (error) {
          console.error('Error:', error);
        }
      }
      // Run the function
      await connectToPostgres();
}

async transactionAPI(){
    benifitsApiURL.transactionsApiUrl = process.env.Benefits_API_Base_Url +"transactions";
    fs.writeFileSync(
      `${process.cwd()}\\data\\benifitsApiUrl.json`,
      JSON.stringify(benifitsApiURL)
    );
    let consumerCode = benifitsApiData.consumercode;
    let walletId = benifitsApiData.wallet.walletId
    const response = await axios.post(
      benifitsApiURL.transactionsApiUrl,
     {
        consumerCode,
        walletId
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${benifitsApiData.accessToken}`,
        },
      }
    );
    this.response = response;
    console.log("transaction data", this.response.data.transaction)
}

async transactionDetails(){
    benifitsApiData.transactions.Today = this.response.data.transaction.Today
    benifitsApiData.transactions.ThisMonth = this.response.data.transaction['This Month'];
    benifitsApiData.transactions.previous = this.response.data.transaction['Previous Transactions'];
    for (let i = 0; i < this.response.data.transaction.Today.length; i++) {
      console.log("TransactionDetailIds:::", this.response.data.transaction.Today[i].transactionDetail.transactionDetailId),
        console.log("TaskRewardCode:::::", this.response.data.transaction.Today[i].transactionDetail.taskRewardCode)
    }
    fs.writeFileSync(
      `${process.cwd()}\\data\\benifitsApiData.json`,
      JSON.stringify(benifitsApiData)
    );
}
}
module.exports = new BenefitsBffAPI();