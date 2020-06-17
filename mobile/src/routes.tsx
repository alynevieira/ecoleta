import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// navegação em pilha, eu consigo chamar as proximas telas atraves de botao, e as telas anteriores
// não deixam de existir, então eu posso voltar 
import Home from './pages/Home';
import Points from './pages/Points';
import Detail from './pages/Detail';

const AppStack = createStackNavigator();
// ele que vai funcionar como o roteamento do app

// quando coloca uma {} indica codigo js, {{}} significa um objeto
// screenOption deixa em todas as telas a modificação

// define p rotas como elas devem se comportar
const Routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator 
                headerMode="none"
                screenOptions= {{
                cardStyle: {
                    backgroundColor: '#F0F0F5'
                }
            }}>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Points" component={Points}/>
                <AppStack.Screen name="Detail" component={Detail}/>
            </AppStack.Navigator>
        </NavigationContainer>
   );
};

export default Routes;