import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logo from '../../assets/logo.svg';
import './styles.css';

interface location {
    search: string;
}

interface Point {
    point: {
        id: string;
        image: string;
        image_url: string;
        name: string;
        email: string;
        whatsapp: string;
        city: string;
        uf: string;
        items: string;
    }[]
}

// com o nextProps eu pego os dados que estão na URL
// Esses dados foram passados com o useHistory no component Home 
const DetailPoint = (nextProps: { location: location }) => {
    const [uf, setUF] = useState<string[]>([]);
    const [city, setCity] = useState<string[]>([]);

    const [points, setPoints] = useState<Point>({} as Point);
    
    useEffect(() => {

        if (nextProps.location) {
            const data = nextProps.location.search;

            var datas = data.split("?");
    
            for (var i = 0; i < datas.length; i++) {
                var pair = datas[i].split("=");

                if(pair[0] === 'uf') {
                    const ufs: any = pair[1];
                    setUF(ufs);
                }

                if (pair[0] === 'city') {
                    const cities = pair[1];
                    const cit: any = cities.replace(/%20/g, " ");
                    setCity(cit);
                }  
            }
        }
        
    }, [nextProps]);

    useEffect(() => {
        api.get('points/detail', {
                params: {
                    uf: uf,
                    city: city
                }
            }).then(response => {
                console.log(response.data);
                setPoints(response.data);
            })
    }, [uf, city]);

    if (!points.point) {
        return null;
    }

    let message;

    if (points.point.length === 0) {
        message = <p> <strong>Nenhum ponto</strong> encontrado</p> 
    } else if (points.point.length <= 1) {
        message = <p> <strong>{points.point.length} ponto</strong> encontrado</p>
    } else {
        message = <p> <strong>{points.point.length} pontos</strong> encontrados</p> 
    }

    return (
        <div id="page-detail-point">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta" />

                    <Link to="/">
                        <FiArrowLeft />
                        Voltar para home
                    </Link>
                </header>

                { message }

                <main>       
                {
                    points.point.map(point => (

                    <section 
                        className="point"
                        key={ point.id }>
                            
                        <img src={ point.image_url } alt="Foto" />

                        <div className="detail">
                            <h1>{ point.name }</h1>

                            <p className="point-item"> { point.items }</p>
                            <p>{ point.city }, { point.uf }</p>
                        </div>

                    </section> 
                    ))
                } 
                    
                </main>
            </div>  
        </div>
    );
 
}

export default DetailPoint;