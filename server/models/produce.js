const db = require('../db');

const addProduce = (produceName, description, price, callback) => {
    const sql = 'INSERT INTO produce (produceName, description, price) VALUES (?, ?, ?)';
    db.run(sql, [produceName, description, price], function (err) {
        if (err) {
            return callback(err);
        }
        callback(null, { id: this.lastID });
    });
};

const getAllProduce = (callback) => {
    const sql = 'SELECT * FROM produce';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return callback(err);
        }
        callback(null, rows);
    });
};

module.exports = { addProduce, getAllProduce };
