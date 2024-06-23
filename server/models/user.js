const db = require('../db');

const createUser = (username, email, password, callback) => {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.run(sql, [username, email, password], function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID });
    });
};

const findUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], (err, row) => {
        if (err) {
            return callback(err);
        }
        callback(null, row);
    });
};

module.exports = { createUser, findUserByEmail };
