import axios from "axios";

const baseURL = "http://localhost:4000";

//Se instancia para llamar al API
export const api = axios.create({
    baseURL: baseURL
})

//Llamada al api que obtiene los pois
export const getPois = async () => {
    const response = await api.get('/get-pois');
    return response.data;
}

export const getCategorias = async () => {
    const response = await axios.get(baseURL + "/get-categorias");
    return response.data;
}
