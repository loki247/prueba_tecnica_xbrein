const {select} = require("../utils/conectorBD");
const table = "public.pois";

//Obtiene los POIS desde la base de datos
const getPois = async (categoria) => {
    const query = {
        table: table,
        columns: [
            'id',
            'name',
            'point',
            'category_id',
            'category_name',
            'latitude',
            'longitude'
        ],
        joins: [],
        where: categoria != undefined ? "category_id = " + categoria : ""
    }

    return await select(query);
}

module.exports = {
    getPois
}