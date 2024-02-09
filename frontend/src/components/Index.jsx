import React, {useState, useEffect} from "react";
import Head from "./partials/Head";
import { MapContainer, TileLayer} from 'react-leaflet'
import axios from "axios";

const baseURL = "http://localhost:4000";

export const Index = () => {
    const [categorias, setCategorias] = React.useState(null);

    useEffect(() => {
        axios.get(baseURL + "/get-categorias").then((response) => {
            setCategorias(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);


    return (
        <>
            <Head></Head>
            <div className="row mt-3">
                <div className="col-md-2 text-center">
                    <div className="row">
                        <div className="col-md-6">
                            <label>Categorías</label>
                            <select className="form-control form-control-sm custom-select">
                                { categorias.map((categoria) => (
                                    <option value={ categoria.id }>{ categoria.nombre }</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-6">
                            Puntos de Interés
                        </div>
                    </div>
                </div>

                <div className="col-md-9 text-center">
                    <div style={{ height: '1000px' }}>
                        <MapContainer center={[-33.4266707, -70.6202899]} zoom={16} scrollWheelZoom={true} style={{ height: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index