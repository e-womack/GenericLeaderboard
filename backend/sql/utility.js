const sqlconnection = require("./sqlconfig").connection;

// House for queries

const queries = {
    selectAll: (cb, tableName) => {
        sqlconnection.query(`SELECT * from ${tableName}`, (err, results) => {
            if (err) {
                throw err;
            } else {
                cb(results);
            }
        });
    },
    selectAllWhere: (cb, tableName, post) => {
        let query = `Select * from ${tableName} WHERE ?`;
        sqlconnection.query(query, post, (err, results) => {
            if (err) {
                throw err;
            } else {
                cb(results);
            }
        });
    },
    insert: (cb, tableName, validObject) => {
        let query = `INSERT into ${tableName} values (null`;
        for (let key in validObject) {
            if (validObject.hasOwnProperty(key)) {
                query += `, '${validObject[key]}'`;
            }
        }
        query += ");";
        sqlconnection.query(query, (err, results) => {
            if (err) {
                throw err;
            } else {
                cb(validObject);
            }
        });
    }
};

// Validity checks for POST/PUT objects in request bodies
const validity = {
    person: ({name, imgurl, tskillrating}) => {
        const isValid = (name) && (imgurl) && (tskillrating);
        if (isValid) {
            return {name, imgurl, tskillrating};
        }
    }
};

exports.validity = validity;
exports.queries = queries;