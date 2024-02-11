import axios from "axios";


//Descomentar esa línea para probar con el backend con node y express.
//const baseURL = "http://localhost:4000";

const baseURL = "https://mfovkqp299.execute-api.us-east-1.amazonaws.com/test";

//Se instancia para llamar al API
export const api = axios.create({
    baseURL: baseURL
})

//Llamada al api que obtiene los pois
export const getPois = async (categoria) => {
    const response = await api.post('/get-pois',{categoria: categoria});
    //Descomentar esa línea para probar con el backend con node y express.
    //return response.data;

    return response.data.body;
}

//Llamada al api que obtiene las categorias
export const getCategorias = async () => {
    const response = await api.get("/get-categorias");
    //Descomentar esa línea para probar con el backend con node y express.
    //return response.data;

    return response.data.body;
}
