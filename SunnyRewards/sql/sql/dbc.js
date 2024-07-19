const { Client } = require('pg');
const fetch = require('node-fetch');
var config = {
    user: 'happusr',
    password: 'negKIOKktUR@yk2Q',
    server: '172.26.144.1',
    host: "heliosdevdb.cd9buezfisvm.us-east-2.rds.amazonaws.com",
    database: 'helios',
    trustServerCertificate: true
};

Client.connect(config, function (err) {
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    // query to the database and get the records

    request.query("SELECT * FROM tenant.tenant ORDER BY tenant_id ASC'", async function (err, result) {
        if (err) console.log(err)
        console.log(result.recordset);

    });

})