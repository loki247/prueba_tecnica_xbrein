import axios from "axios";

const baseURL = "http://localhost:4000";

//Se instancia para llamar al API
export const api = axios.create({
    baseURL: baseURL,
})

//Llamada al api que obtiene los pois
export const getPois = async (categoria) => {
    const response = await api.post('/get-pois',{categoria: categoria});
    return response.data;
}

//Llamada al api que obtiene las categorias
export const getCategorias = async () => {
    const response = await api.get("/get-categorias");
    return response.data;
}
