import 'react-native-gesture-handler';
import {Root} from 'native-base';
import React, {useState} from 'react';
import AppRouter from './src/Router';
import {
  CTX_SelecaoPrato,
  CTX_SelecaoAcompanhamento,
  CTX_Auth,
  CTX_Pedidos,
} from './src/context';
import Animated from 'react-native-reanimated';

export default function App() {
  const ctx_SP = useState([]);
  const ctx_SA = useState([]);
  const ctx_AU = useState(false);
  const ctx_pedidos = useState([]);

  return (
    <Root>
      <CTX_SelecaoPrato.Provider value={ctx_SP}>
        <CTX_SelecaoAcompanhamento.Provider value={ctx_SA}>
          <CTX_Auth.Provider value={ctx_AU}>
            <CTX_Pedidos.Provider value={ctx_pedidos}>
              <AppRouter />
            </CTX_Pedidos.Provider>
          </CTX_Auth.Provider>
        </CTX_SelecaoAcompanhamento.Provider>
      </CTX_SelecaoPrato.Provider>
    </Root>
  );
}
