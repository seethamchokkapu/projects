
const fetch = require("node-fetch");
const { Client } = require('pg');
const { remote } = require('webdriverio');

// Set your PostgreSQL connection parameters

// const pgConfig = {
//     user: 'happusr',
//     host: 'heliosdevdb.cd9buezfisvm.us-east-2.rds.amazonaws.com',
//     database: 'helios',
//     password: 'negKIOKktUR@yk2Q',
//     port: 5432,
//     ssl: { rejectUnauthorized: false }
// };

const client = new Client({
    user: 'your_username',
    host: 'your_host',
    database: 'your_database',
    password: 'your_password',
    port: 5432,// Default PostgreSQL port
    ssl: { rejectUnauthorized: false }
});

// async function connectToPostgres() {
//     // Initialize PostgreSQL client
//     const pgClient = new Client(pgConfig);
//     try {

//         // Connect to PostgreSQL
//         await pgClient.connect();
//         console.log('Connected to PostgreSQL');
//         pgClient.query('SELECT * FROM tenant.tenant ORDER BY tenant_id ASC', (err, res) => {
//             if (!err) {
//                 console.log(res.rows);
//             } else {
//                 console.log(err.message);
//             }
//         })
//     } catch (error) {
//         console.error('Error:', error);
//     }
// finally {
//     // Close PostgreSQL connection
//     await pgClient.end();
//     console.log('Closed PostgreSQL connection');
//     // Close WebDriverIO browser
// }
// }
// Run the function
// connectToPostgres();



client.connect()
    .then(() => {
        console.log('Connected to the database');

        // Execute your SQL query
        return client.query('select wallet_id, customer_code, tenant_code, wallet_code, balance, earn_maximum, total_earned from wallet.wallet where wallet_id="1140"');
    })
    .then((result) => {
        // Iterate over each row in the result set
        for (let row of result.rows) {
            // Access each column value by column name
            console.log('Column 1:', row.column1);
            console.log('Column 2:', row.column2);
            console.log('Column 3:', row.column3);
        }

        // Close the database connection
        return client.end();
    })
    .then(() => {
        console.log('Disconnected from the database');
    })
    .catch((err) => {
        console.error('Error:', err);
        // Close the database connection in case of an error
        client.end();
    });