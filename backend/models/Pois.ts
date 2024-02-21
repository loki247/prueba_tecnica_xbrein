import {select} from "../utils/conectorBD.js";
const table:string = "public.pois";

//Obtiene los POIS desde la base de datos
const getPois = async (categoria: string) => {
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

export{
    getPois
}