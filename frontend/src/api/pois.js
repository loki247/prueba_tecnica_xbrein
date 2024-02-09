import axios from "axios";

const baseURL = "http://localhost:4000";

export const getPois = () => {
    axios.get(baseURL + "/get-categorias").then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    });
}

export default  {
    getPois
};