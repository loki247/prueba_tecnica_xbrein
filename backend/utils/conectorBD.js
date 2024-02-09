const { Client } = require("pg")
const dotenv = require("dotenv")
const {rows} = require("pg/lib/defaults");
const {values} = require("pg/lib/native/query");
dotenv.config()

const credentials = {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
};

const select = async (query) => {
    try {
        const client = new Client(credentials);
        await client.connect();

        let querytStr = "SELECT ";

        query.columns.forEach((column, index) => {
            if ((index + 1) == query.columns.length){
                querytStr += column;
            }else {
                querytStr += column + ", ";
            }
        });

        querytStr += " FROM " + query.table;

        if (query.joins != undefined && query.joins.length > 0){
            query.joins.forEach(join => {
                querytStr += " " + join;
            });
        }

        if(query.where != undefined && query.where != ""){
            querytStr += " WHERE " + query.where;
        }

        if (query.limit != undefined && query.limit != ""){
            querytStr += " LIMIT " + query.limit;
        }

        console.log(querytStr);
        const res = await client.query(querytStr);
        await client.end();

        return res.rows;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    select
}