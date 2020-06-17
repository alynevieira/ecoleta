import React from 'react';

import './App.css';
import Routes from './routes';

function App() {
  return (
    <Routes />
  );
}

export default App;


// i React, { useState } f'react';
// preciso usar o conceito de estado para que o componente reflita as alterações feita
  // imutabilidade: eu não posso alterar uma informação do estado de uma maneira direta ex: count++;
  // ao inves de alterar um valor pré existende do estado, criar um novo valor do estado com as modificações 
  // const [counter, setCounter] = useState(0);  array [valor do estado, função para atualizar o valor do estado]

  // function handleButtonClick() {
  //  setCounter(counter + 1); 
  // } 

  // o estado consegue manter uma informação que ela consegue ficar acessivel em tempo real o valor atual dela
  // consegue refletir no HTML o valor atual

  // return (
  //  <div>
  //    <Header title={ `Contador: ${counter}`} /> 

  //    <h1>{ counter }</h1>
  //    <button type="button" onClick={handleButtonClick}>Aumentar</button>
  //  </div>
  //);

  // COMPONENTE HEADER.tsx

// interface é a forma de eu definir a tipagem de um objeto ou de um campo
// o ? no title?: é se ele não for obrigatorio
// eu coloco o title para dizer que ele é um atributo obrigatorio na hora de colocar esse componente em outro lugar
// interface HeaderProps {
//     title: string;
// }

// forma mais facil de informar ao componente quais são as propriedades q ele pode receber
// fc funtion component um tipo do typecript que pode receber um parametro
// aqui é inserida a interface com o paramentro, e props é a variavel onde eu posso acessar o que está no componente
// para que eu possa acessar, preciso colocar chaves para indicar que é javascript e não html
// const Header: React.FC<HeaderProps> = (props) => {
//    return (
//        <header> 
//            <h1>{ props.title }</h1>
//        </header>
//    );
// }

//export default Header;