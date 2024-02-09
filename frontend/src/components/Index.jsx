import {getPois, getCategorias} from "../api/pois";
import React, {useState, useEffect} from "react";
import Head from "./partials/Head";
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import {Icon} from 'leaflet';

export const Index = () => {
    const icon1 = new Icon ({
        iconUrl : require("../images/marker-icon.png"),
        iconSize : [20,30],
        iconAnchor : [22,94],
        popupAnchor : [-3, -76]
    });

    const icon2 = new Icon ({
        iconUrl : require("../images/marker-icon_2.png"),
        iconSize : [20,30],
        iconAnchor : [22,94],
        popupAnchor : [-3, -76]

    });

    const [categoria, setCategoria] = useState(null);
    const [categorias, setCategorias] = useState(null);
    const [pois, setPois] = useState(null);
    const [poisFiltrados, setPoisFiltrados] = useState(null);

    const categoriasOnChange = (event) => {
        if (!event.target.value) {
            return setPoisFiltrados(pois)
        }

        setCategoria(event.target.value)

        const resultsArray = pois.filter((poi) => poi.category_id == event.target.value)

        setPoisFiltrados(resultsArray)
    }

    useEffect(() => {
        getCategorias().then(jsonCategorias => {
            setCategorias(jsonCategorias)
        });
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
                            <br/>
                            <small>Resultados: { poisFiltrados != null ? poisFiltrados.length : 0 }</small>
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

                            <Marker position={[-33.426599, -70.6209158]} icon={icon2}>
                                <Popup>
                                    Almirante Pastene 244
                                </Popup>
                            </Marker>

                            {poisFiltrados != null &&
                                poisFiltrados.map((poi) => (
                                    <Marker position={[poi.latitude, poi.longitude]} icon={icon1}>
                                        <Popup>
                                            {poi.name}
                                        </Popup>
                                    </Marker>
                                ))
                            }
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index