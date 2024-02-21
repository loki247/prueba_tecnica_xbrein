const poisController = require("../controllers/bkp/PoisController");

//Rutas del API
const routes = (app) => {
    app.post("/get-pois", poisController.getPois);
    app.get("/get-categorias", poisController.getCategorias);
};

module.exports = routes;