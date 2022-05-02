"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prohairesis = void 0;
const mysql_1 = require("mysql");
const fs_1 = require("fs");
let pool = null;
class Prohairesis {
    constructor(config) {
        if (pool === null) {
            pool = mysql_1.createPool(config);
        }
        this.pool = pool;
    }
    query(sql, values) {
        return new Promise((resolve, reject) => {
            let preparedValues = undefined;
            let preparedSQL = sql;
            if (values) {
                let results = /@([A-Za-z_]+)/.exec(preparedSQL);
                preparedValues = [];
                while (results && results.length == 2) {
                    const [match, key] = results;
                    if (key in values) {
                        preparedValues.push(values[key]);
                        preparedSQL = preparedSQL.replace(match, '?');
                    }
                    else {
                        return reject(`Values object is missing value key / value for ${key}`);
                    }
                    results = /@([A-Za-z_]+)/.exec(preparedSQL);
                }
            }
            this.pool.query(preparedSQL, preparedValues, (err, results) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results);
                }
            });
        });
    }
    execute(sql, values) {
        return new Promise((resolve, reject) => {
            let preparedValues = undefined;
            let preparedSQL = sql;
            if (values) {
                let results = /@([A-Za-z_]+)/.exec(preparedSQL);
                preparedValues = [];
                while (results && results.length == 2) {
                    const [match, key] = results;
                    if (values.hasOwnProperty(key)) {
                        preparedValues.push(values[key]);
                        preparedSQL = preparedSQL.replace(match, '?');
                    }
                    else {
                        return reject(`Values object is missing value key/value for ${key}`);
                    }
                    results = /@([A-Za-z_]+)/.exec(preparedSQL);
                }
            }
            this.pool.query(preparedSQL, preparedValues, (err, response) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    getOne(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.query(sql, params);
            if (results && results.length > 0) {
                return results[0];
            }
            else {
                return null;
            }
        });
    }
    getValue(column, sql, params) {
        return this.getOne(sql, params).then((result) => {
            if (result) {
                return result[column];
            }
            else {
                return null;
            }
        });
    }
    exists(sql, params) {
        return this.getOne(sql, params).then((result) => result !== null);
    }
    insert(table, data) {
        return this.execute(`
			INSERT INTO ${table} (
				${Object.keys(data).join(',')}
			) VALUES (
				${Object.keys(data)
            .map((v) => '@' + v)
            .join(`, `)}
			)
		`, Object.assign({}, data));
    }
    getConnection() {
        return new Promise((resolve, reject) => {
            try {
                this.pool.getConnection((error, connection) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(connection);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    close() {
        if (this.pool) {
            this.pool.end();
        }
    }
    queryFromFile(filePath, params) {
        return new Promise((resolve, reject) => {
            fs_1.readFile(filePath, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    this.query(data.toString(), params)
                        .then((data) => resolve(data))
                        .catch((err) => reject(err));
                }
            });
        });
    }
}
exports.Prohairesis = Prohairesis;
//# sourceMappingURL=index.js.map