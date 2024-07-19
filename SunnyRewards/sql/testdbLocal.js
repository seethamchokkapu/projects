const fetch = require("node-fetch");
const { Client } = require('pg');
const { remote } = require('webdriverio');

// Set your PostgreSQL connection parameters

const pgConfig = {
    user: 'DataDev',
    host: 'heliosdevdb.cd9buezfisvm.us-east-2.rds.amazonaws.com',
    database: 'DataDev',
    password: 'Feuji@123',
    port: 5432, // Default PostgreSQL port
};

async function connectToPostgres() {
    // Initialize PostgreSQL client
    const pgClient = new Client(pgConfig);
    try {

        // Connect to PostgreSQL
        await pgClient.connect();
        console.log('Connected to PostgreSQL');
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close PostgreSQL connection
        await pgClient.end();
        console.log('Closed PostgreSQL connection');
        // Close WebDriverIO browser
    }
}
// Run the function
connectToPostgres();