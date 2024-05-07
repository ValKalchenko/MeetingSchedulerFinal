// import oponDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const schedulerDB = openDatabase({name: 'Scheduler.db'});

// create constants for tables in database
const hostTableName = 'hosts';
const meetingTableName = 'meetings';
const hostMeetingsTableName = 'host_meetings';
const accountTableName = 'account';

module.exports = {
    // declare function that will create hosts table
    createHostsTable: async function () {
        // declare transaction that will execute SQL
        (await schedulerDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${hostTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    email TEXT
                );`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log('Hosts table created successfully.');
                },
                error => {
                    console.log('Error creating hosts table ' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row of data into the hosts table
    addHost: async function (name, email) {
        // declare transaction that will execute SQL
        (await schedulerDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `INSERT INTO ${hostTableName} (name, email) VALUES ("${name}", "${email}")`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log(name + ' added successfully.');
                },
                error => {
                    console.log('Error adding host ' + error.message);
                },
            );
        });
    },

    // declare function that will create meetings table
    createMeetingsTable: async function () {
        // declare transaction that will execute SQL
        (await schedulerDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${meetingTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT,
                    location TEXT,
                    date TEXT
                );`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log('Meetings table created successfully.');
                },
                error => {
                    console.log('Error creating meetings table ' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row of data into the meetings table
    addMeeting: async function (title, location, date) {
        // declare transaction that will execute SQL
        (await schedulerDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `INSERT INTO ${meetingTableName} (title, location, date) VALUES ("${title}", "${location}", "${date}")`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log(title + ' added successfully.');
                },
                error => {
                    console.log('Error adding meeting ' + error.message);
                },
            );
        });
    },

    // declare function that will create host meetings table
    createHostMeetingsTable: async function () {
        // declare transaction that will execute SQL
        (await schedulerDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${hostMeetingsTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    host_id INTEGER,
                    meeting_id INTEGER
                );`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log('Host meetings table created successfully.');
                },
                error => {
                    console.log('Error creating host meetings table ' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row of data into the host meetings table
    addHostMeeting: async function (host_id, meeting_id) {
        // declare transaction that will execute SQL
        (await schedulerDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `INSERT INTO ${hostMeetingsTableName} (host_id, meeting_id) VALUES (${host_id}, ${meeting_id})`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log('Host meeting added successfully.');
                },
                error => {
                    console.log('Error adding host meeting ' + error.message);
                },
            );
        });
    },

    // declare function that will create account table
    createAccountTable: async function () {
        // declare transaction that will execute SQL
        (await schedulerDB).transaction(txn => {
            // execute the SQL
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${accountTableName}(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT,
                    password TEXT,
                    type TEXT
                );`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log('Account table created successfully.');
                },
                error => {
                    console.log('Error creating account table ' + error.message);
                },
            );
        });
    },

    // declare function that will insert a row of data into the users table
    addAccount: async function (username, password, type) {
        // declare transaction that will execute the SQL
        (await schedulerDB).transaction(txn => {
            // execute SQL
            txn.executeSql(
                `INSERT INTO ${accountTableName} (username, password, type) VALUES ("${username}", "${password}", "${type}")`,
                // arguments passed when using SQL prepared statements
                [],
                // callback functions to handle results
                () => {
                    console.log(username + " " + password + " added successfully.");
                },
                error => {
                    console.log('Error adding account ' + error.message);
                },
            );
        });
    },
};