import {Request, Response} from "express";
import poisModel from "../models/bkp/Pois.js";

//Obtendo los PIOS. Si el valor de categoría no se envía muestra todo.
const getPois = async (req: Request, res: Response) => {
    const data = req.body;

    const pois  = await poisModel.getPois(data.categoria);

    const response = {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "*"
        },
        'body': pois
    }

    res.send(response);
}

//Obtengo las categorías
const getCategorias =  async (req: Request, res: Response) => {
    const categorias = [
        {id: 10084, nombre: "ALMACENES"},
        {id: 10003, nombre: "BANCOS"},
        {id: 10029, nombre: "CAFETERIAS Y SALONES DE TÉ"},
        {id: 10005, nombre: "FARMACIAS"},
        {id: 10004, nombre: "RESTAURANTES"},
        {id: 10008, nombre: "SUPERMERCADOS"},
    ];

    let response = {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "*"
        },
        'body': categorias
    }

    res.send(response);
}


export{
    getPois,
    getCategorias
}