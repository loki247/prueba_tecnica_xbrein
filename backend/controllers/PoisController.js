const poisModel = require("../models/Pois");

const getPois = async (req, res) => {
    const data = req.body;

    const pois  = await poisModel.getPois(data.categoria)

    res.append('Content-Type', 'application/json');
    res.send(pois);
}

const getCategorias = async (req, res) => {
    const categorias = [
        {id: 10084, nombre: "ALMACENES"},
        {id: 10003, nombre: "BANCOS"},
        {id: 10029, nombre: "CAFETERIAS Y SALONES DE TÉ"},
        {id: 10005, nombre: "FARMACIAS"},
        {id: 10004, nombre: "RESTAURANTES"},
        {id: 10008, nombre: "SUPERMERCADOS"},
    ];

    res.append('Content-Type', 'application/json');
    res.send(categorias);
}


module.exports = {
    getPois,
    getCategorias
}