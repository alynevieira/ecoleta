import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { FiLogIn, FiSearch, FiXCircle } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import './styles.css';
import logo from '../../assets/logo.svg';

// Link serve para não realizar o carregamento total da pagina, apenas de componentes da app
// Conceito de SPA, todo código HTML JS CSS ele é mantido entre as telas, 
// assim não vai ter esses dados trafegando na rede novamente

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}


const Home = () => {
    const history = useHistory();

    const popup = document.querySelector('.full-screen');

    const [ufs, setUfs] = useState<string[]>([]);
    const [selectedUF, setSelectedUF] = useState('0');

    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState('0');

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);

            setUfs(ufInitials);
        })
    }, []);

    useEffect(() => {
        // carregar as cidades quando mudar
        if (selectedUF === '0') {
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);

            setCities(cityNames);
        })

    }, [selectedUF]);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;

        setSelectedUF(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;

        setSelectedCity(city);
    }

    function togglePopup() {
        if (popup != null) {
            popup.classList.toggle('hidden');
        }
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (selectedCity && selectedUF === '0') {
            return;
        }

        history.push(
            {
                pathname: '/detail-point',
                search: `?uf=${String(selectedUF)}?city=${String(selectedCity)}`,
                state: { some: 'state' }
              }
        );
    }


    return (
        <div id="page-home">
            <div className="content">

                <div className="full-screen hidden flex-container-center">
                    <div onClick={togglePopup} className="close-popup">
                        <FiXCircle />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <h1>Pontos de Coleta</h1>
                        <div className="field">
                            <select 
                                name="uf" 
                                id="uf" 
                                value={selectedUF} 
                                onChange={handleSelectUf} >

                                <option value="0">Selecione uma UF</option>
                                { ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <select 
                                name="city" 
                                id="city"
                                value={selectedCity}
                                onChange={handleSelectCity} >

                                <option value="0">Selecione uma cidade</option>
                                { cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit">
                            Buscar
                        </button> 

                    </form>
                </div>

                <header>
                    <img src={logo} alt="Ecoleta" />

                    <Link to="/create-point">
                        <FiLogIn />
                        Cadastre um ponto de coleta
                    </Link>
                </header>

                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

                    <div id="button-search" onClick={togglePopup}>
                        <span>
                            <FiSearch />
                        </span>
                        <strong>Pesquise pontos de coleta</strong>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home;