const pg = require('pg');
const fetch = require("node-fetch");

var config = {
    host: "heliosdevdb.cd9buezfisvm.us-east-2.rds.amazonaws.com",
    user: 'happusr',
    port: 5432,
    password: 'negKIOKktUR@yk2Q',
    database: 'helios'
}

// const client = new pg(config);
// const Pg = new pg(config);
pg.connect(config, function (err) {
    if (err) {
        console.log(err.message);
    };
    var request = new pg.request();
    console.log(request);
})
// client.connect();

// client.query('SELECT * FROM tenant.tenant ORDER BY tenant_id ASC', (err, res) => {
//     if (!err) {
//         console.log(res.rows);
//     } else {
//         console.log(err.message);
//     }
//     client.end;

// });