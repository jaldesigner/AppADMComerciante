import React from 'react';
//import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

//import das screens
import Home from './screen/home';
import CadastraPrato from './screen/CadastraPrato';
import CadastraConteudoPrato from './screen/CadastraConteudoPrato';
import CadastraAcompanhamento from './screen/CadastraAcompanhamento';
import SelecaoPratoDia from './screen/SelecaoPratoDia';
import SelecionaAcompanhamento from './screen/SelecionaAcompanhamento';
import MontagemPratoDia from './screen/montagemPratoDia';
import Pratos from './screen/Pratos';
import ListaPedidos from './screen/ListaPedidos';
import Login from './screen/Login';
import Valores from './screen/Valores';
import Medidas from './screen/Medidas';
import Configuracao from './screen/configuracao';
import SubConfigAdm from './screen/subconfigadm';
import CadastroADM from './screen/adm/CadastroADM';
import ListaAdm from './screen/adm/ListaAdm';
import Controle from './screen/controle';
import ControleDia from './screen/controleDia';
import MenuLef from './components/navBarLeft';

//const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <MenuLef {...props} />}
        drawerType="back"
        initialRouteName="Login">
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />

        <Drawer.Screen
          name="CadastraPrato"
          component={CadastraPrato}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />

        <Drawer.Screen
          name="CadastraConteudoPrato"
          title="Cadastro de Conetúdo"
          component={CadastraConteudoPrato}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />

        <Drawer.Screen
          name="CadastraAcompanhamento"
          title="Cadastro de Conetúdo"
          component={CadastraAcompanhamento}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />

        <Drawer.Screen
          name="SelecaoPratoDia"
          component={SelecaoPratoDia}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />

        <Drawer.Screen
          name="SelecionaAcompanhamento"
          title="Cadastro de Conetúdo"
          component={SelecionaAcompanhamento}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />

        <Drawer.Screen
          name="MontagemPratoDia"
          title="Montagem do Prato"
          component={MontagemPratoDia}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />

        <Drawer.Screen
          name="Pratos"
          title="Pratos"
          component={Pratos}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />

        <Drawer.Screen
          name="Configuracao"
          component={Configuracao}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen
          name="SubConfigAdm"
          component={SubConfigAdm}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen
          name="CadastroADM"
          component={CadastroADM}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen
          name="ListaAdm"
          component={ListaAdm}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen
          name="Controle"
          component={Controle}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />
        <Drawer.Screen
          name="ControleDia"
          component={ControleDia}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />

        <Drawer.Screen
          name="ListaPedidos"
          component={ListaPedidos}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />

        <Drawer.Screen
          name="Valores"
          component={Valores}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />

        <Drawer.Screen
          name="Medidas"
          component={Medidas}
          options={{ headerTransparent: true, title: false, headerLeft: null }}
        />

        <Drawer.Screen
          name="Login"
          component={Login}
          options={{ headerTransparent: true, title: false, headerLeft: null, swipeEnabled: false}}
          
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
