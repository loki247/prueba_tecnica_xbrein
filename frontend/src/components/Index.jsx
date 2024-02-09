import {getPois} from "../api/pois";
import React, {useState, useEffect} from "react";
import Head from "./partials/Head";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import axios from "axios";

const baseURL = "http://localhost:4000";

export const Index = () => {
    const [categoria, setCategoria] = React.useState(null);
    const [categorias, setCategorias] = React.useState(null);
    const [pois, setPois] = React.useState(null);
    const [poisFiltrados, setPoisFiltrados] = React.useState(null);

    const getCategorias = async () => {
        axios.get(baseURL + "/get-categorias").then((response) => {
            setCategorias(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    const categoriasOnChange = (event) => {
        if (!event.target.value) {
            return setPoisFiltrados(pois)
        }

        setCategoria(event.target.value)

        const resultsArray = pois.filter((poi) => poi.category_id == event.target.value)

        setPoisFiltrados(resultsArray)
    }

    useEffect(() => {
        getCategorias();
    }, []);

    useEffect(() => {
        getPois().then(jsonPois => {
            setPois(jsonPois);

            return jsonPois;
        }).then(jsonPois => {
            setPoisFiltrados(jsonPois);
        });
    }, []);


    return (
        <>
            <Head></Head>
            <div className="row mt-3">
                <div className="col-md-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-floating">
                                <select className="form-select form-select-sm" id="categorias" onChange={categoriasOnChange}>
                                    <option value="">SELECCIONE</option>
                                    {categorias != null &&
                                        categorias.map((categoria) => (
                                            <option value={categoria.id}>{categoria.nombre}</option>
                                        ))
                                    }
                                </select>

                                <label htmlFor="categorias">Categorías</label>
                            </div>

                        </div>
                    </div>

                    <div className="row ms-1">
                        <div className="col-md-12 text-start">
                            <hr/>

                            <b>Puntos de Interés</b>

                            <hr/>

                            <ul className="list-unstyled" style={{height: '600px', overflow: 'scroll'}}>
                                {poisFiltrados != null &&
                                    poisFiltrados.map((poi) => (
                                        <li style={{ borderTop: '1px solid'}}>
                                            {poi.name}
                                            <br/>
                                            <small className="ps-2">{poi.category_name}</small>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    <div style={{ height: '800px', width: '90%' }}>
                        <MapContainer center={[-33.4266707, -70.6202899]} zoom={16} scrollWheelZoom={true} style={{ height: '100%' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <Marker position={[-33.4266707, -70.6202899]}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index