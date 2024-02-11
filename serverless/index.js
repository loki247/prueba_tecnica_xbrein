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

//Obtiene los Pois desde la base de datos.
module.exports.handler = async (event) => {
    try {
        const client = new Client(credentials);
        await client.connect();


        let queryStr = 'SELECT * FROM public.pois'

        if (event.categoria != null){
            queryStr += " WHERE category_id = " + event.categoria
        }

        const res = await client.query(queryStr);
        await client.end();

        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "*"
            },
            'body': res.rows
        }
    } catch (error) {
        console.log(error)
    }
};
