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

    const categoriasOnChange = (event) => {
        setCategoria(event.target.value)

        //Actualiza el listado de POIS al cambiar de categoría
        getPois(event.target.value).then(response => {
            setPois(response);
        }).catch((response) => {
            console.log(response);
        });
    }

    useEffect(() => {
        getCategorias().then(jsonCategorias => {
            setCategorias(jsonCategorias)
        });
    }, []);

    useEffect(() => {
        getPois(categoria).then(response => {
            setPois(response);

            return response;
        }).catch((response) => {
            console.log(response);
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
                            <small>Resultados: { pois != null ? pois.length : 0 }</small>
                            <hr/>

                            <ul className="list-unstyled" style={{height: '600px', overflow: 'scroll'}}>
                                {pois != null &&
                                    pois.map((poi) => (
                                        <li style={{ borderTop: '1px solid'}} id={"poi_" + poi.id}>
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

                            {pois != null &&
                                pois.map((poi) => (
                                    <Marker position={[poi.latitude, poi.longitude]} icon={icon1} key={poi.id} eventHandlers={{
                                        click: () => {
                                            //Si se hace click en un marcador se marcará este en la lista para identificarlo
                                            let marker = document.getElementById("poi_" + poi.id);

                                            if (marker.classList.contains('checked')) {
                                                marker.classList.remove('checked');
                                                marker.style.fontWeight = "";
                                                marker.style.backgroundColor = "";
                                            }else{
                                                marker.classList.add('checked');
                                                marker.style.fontWeight = "bold";
                                                marker.style.backgroundColor = "#e6e6e6";
                                            }
                                        }
                                    }}>
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