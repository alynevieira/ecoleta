import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
// quando utiliza rotas do browser http://localhost:3000/contato

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import DetailPoint from './pages/DetailPoint';

// exact serve para que o browser verifique se o caminho que está no path é exatamente o mesmo na url
// como o route não verifica isso, se deixar sem o exact, 
// quando clicar em outra rota vai acabar sempre caindo no component home
// porque todas as rotas começam com a "/"
const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/create-point" />
            <Route component={DetailPoint} path="/detail-point" />
        </BrowserRouter>
    );
}

export default Routes;