const { USER_TABLE_NAME, CONNECTION_STRING } = require("./constants").DB;
const { Client } = require("pg");

module.exports = (() => {
    const client = new Client({ connectionString: CONNECTION_STRING });
    client.connect();

    // TODO: Mutex
    function getDB() {
        return Promise.resolve(client);
    }

    function getUser(userID) {
        return new Promise((resolve, reject) => {
            getDB()
                .then(db => {
                    let query = `SELECT * FROM ${USER_TABLE_NAME} WHERE "userID"='${userID}';`;
                    db.query(query, (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            let users = res.rows.map(user => {
                                user.funds = user.funds || 0;
                                user.givenAwards = user.givenAwards ? user.givenAwards.split(",") : [];
                                user.receivedAwards = user.receivedAwards ? user.receivedAwards.split(",") : [];
                                return user;
                            });
                            resolve(users[0]);
                        }
                    });
                })
                .catch(reject);
        });
    }

    function updateUser(userID, key, value) {
        return new Promise((resolve, reject) => {
            getDB()
                .then(db => {
                    let query = `UPDATE ${USER_TABLE_NAME} SET "${key}"='${value}' WHERE "userID"='${userID}'`;
                    db.query(query, (err, res) => {
                        err ? reject(err) : resolve();
                    });
                })
                .catch(reject);
        });
    }

    function getAllUsers() {
        return new Promise((resolve, reject) => {
            getDB()
                .then(db => {
                    let query = `SELECT * FROM ${USER_TABLE_NAME};`;
                    db.query(query, (err, res) => {
                        if (err) {
                            reject(err);
                        }
                        else {
                            let users = res.rows.map(user => {
                                user.funds = user.funds || 0;
                                user.givenAwards = user.givenAwards ? user.givenAwards.split(",") : [];
                                user.receivedAwards = user.receivedAwards ? user.receivedAwards.split(",") : [];
                                return user;
                            });
                            resolve(users);
                        }
                    });
                })
                .catch(reject);
        });
    }

    return {
        getUser,
        getAllUsers,
        updateUser
    };
})();
