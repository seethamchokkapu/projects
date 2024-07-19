const Page = require('../test/pageobjects/page');
var chai = require('chai');
const sql = require('mssql');
//const queriesList = require('../sql/queries');
const { config } = require('../sql/db');

class DBPage extends Page {
    async connectToDBAndValidateRetrievedRecords(productType) {
        return new Promise(async function (resolve, reject) {
            await sql.connect(config, async function (err) {
                if (err) console.log(err);
                var request = new sql.Request();
                await request.query(productType, async function (err, result) {
                    //    setTimeout(async () => { await console.log("data retrival"); }, 30000);
                    //  var accountName = result.recordset[0].account_name;
                    var recordset = await result.recordset[0]
                    console.log(recordset);
                    resolve(recordset);
                });

            })
                .then(async () => {
                    await sql.close()
                })
            //  await sql.close();

        })
    }

    async deleteRecord(productType) {
        await sql.connect(config, async function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            await request.query(productType, async function (err, result) {
                if (err) console.log(err)
            });
        })

    }

    async runStorProc(productType) {
        await sql.connect(config, async function (err) {
            if (err) console.log(err);
            var request = new sql.Request();
            await request.query(productType, async function (err, result) {
                if (err) console.log(err)
            });
        })

    }

    async connectToStoreProc(productType) {
        return new Promise(async function (resolve, reject) {
            await sql.connect(config, async function (err) {
                if (err) console.log(err);
                var request = new sql.Request();
                await request.query(productType, async function (err, result) {
                    //    setTimeout(async () => { await console.log("data retrival"); }, 30000);
                    //  var accountName = result.recordset[0].account_name;
                    var recordset = await result.recordset
                    console.log('recordset[0].ETL_JOB_NAME>>' + recordset[0].ETL_JOB_NAME)
                    console.log('recordset[1].ETL_JOB_NAME>>' + recordset[1].ETL_JOB_NAME)
                    console.log('recordset[2].ETL_JOB_NAME>>' + recordset[2].ETL_JOB_NAME)
                    console.log('recordset[3].ETL_JOB_NAME>>' + recordset[3].ETL_JOB_NAME)
                    console.log('recordset[4].ETL_JOB_NAME>>' + recordset[4].ETL_JOB_NAME)
                    if (recordset[0].ETL_JOB_NAME === "SRC_EMP_to_TRG_EMP_Details_CNT_Validation" && recordset[0].TEST_CASE_RESULT === "PASS") {
                        allureReporter.addStep("column value SRC_EMP_to_TRG_EMP_Details_CNT_Validation has PASS Result", 'attachment', 'passed')
                    } else {
                        allureReporter.addStep("column value SRC_EMP_to_TRG_EMP_Details_CNT_Validation has " + recordset[0].TEST_CASE_RESULT + " Result", 'attachment', 'failed')
                    }
                    if (recordset[2].ETL_JOB_NAME === "Transformation_Logic_Fail_Scenario" && recordset[2].TEST_CASE_RESULT === "FAIL") {
                        allureReporter.addStep("column value Transformation_Logic_Fail_Scenario has FAIL Result", 'attachment', 'passed')
                    } else {
                        allureReporter.addStep("column value Transformation_Logic_Fail_Scenario has " + recordset[2].TEST_CASE_RESULT + " Result", 'attachment', 'failed')
                    }
                    if (recordset[1].ETL_JOB_NAME === "Duplicate_Validation" && recordset[1].TEST_CASE_RESULT === "FAIL") {
                        allureReporter.addStep("column value Duplicate_Validation has FAIL Result", 'attachment', 'passed')
                    } else {
                        allureReporter.addStep("column value Duplicate_Validation has " + recordset[1].TEST_CASE_RESULT + " Result", 'attachment', 'failed')
                    }
                    if (recordset[3].ETL_JOB_NAME === "Transformation_Logic_Working_Scenario" && recordset[3].TEST_CASE_RESULT === "PASS") {
                        allureReporter.addStep("column value Transformation_Logic_Working_Scenario has PASS Result", 'attachment', 'passed')
                    } else {
                        allureReporter.addStep("column value Transformation_Logic_Working_Scenario has " + recordset[3].TEST_CASE_RESULT + " Result", 'attachment', 'failed')
                    }
                    if (recordset[4].ETL_JOB_NAME === "SRC_EMP_to_TRG_EMP_CNT_Validation" && recordset[4].TEST_CASE_RESULT === "PASS") {
                        allureReporter.addStep("column value SRC_EMP_to_TRG_EMP_CNT_Validation has PASS Result", 'attachment', 'passed')
                    } else {
                        allureReporter.addStep("column value SRC_EMP_to_TRG_EMP_CNT_Validation has " + recordset[4].TEST_CASE_RESULT + " Result", 'attachment', 'failed')
                    }
                    // console.log(recordset);
                    resolve(recordset);
                });

            })
                .then(async () => {
                    await sql.close()
                })
            //  await sql.close();

        })
    }


    async coumnDataValidation(productType) {
        return new Promise(async function (resolve, reject) {
            await sql.connect(config, async function (err) {
                if (err) console.log(err);
                var request = new sql.Request();
                await request.query(productType, async function (err, result) {
                    //  var accountName = result.recordset[0].account_name;
                    var recordset = await result.recordset
                    // console.log('recordset[0].ETL_JOB_NAME>>' + recordset[0].ETL_JOB_NAME)
                    // console.log('recordset[1].ETL_JOB_NAME>>' + recordset[1].ETL_JOB_NAME)
                    // console.log('recordset[2].ETL_JOB_NAME>>' + recordset[2].ETL_JOB_NAME)
                    // console.log('recordset[3].ETL_JOB_NAME>>' + recordset[3].ETL_JOB_NAME)
                    // console.log('recordset[4].ETL_JOB_NAME>>' + recordset[4].ETL_JOB_NAME)
                    // console.log(recordset);
                    resolve(recordset);
                });

            })
                .then(async () => {
                    await sql.close()
                })
            //  await sql.close();

        })
    }


}
module.exports = new DBPage();
