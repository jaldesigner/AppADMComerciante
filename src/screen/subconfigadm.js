import React from 'react';
import { View} from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { Container, Content} from 'native-base';
import { BtnNavegacao_1 } from '../components/Botoes';
import estilos from '../style';

//=============================
// ==> Definição do template
//=============================
import { Cabecalho, BtnNav } from '../components/header';
import FooterTab_tpl from '../components/footerTab';
import estilo from '../style';

export default function Home({ navigation }) {
  const autentic = firebase.auth();
  const sair = () => {
    autentic.signOut();
    navigation.navigate('Login');
  };

  return (
    <>
      <Container style={{ backgroundColor: '#2D3043' }}>
        <BtnNav />
        <Content>
          <Cabecalho titulo="Configurações" subtitulo="Administração" />
          <View style={estilo.conteudo}>
            <View style={estilos.boxBtn}>
              <BtnNavegacao_1 titulo="Administradores" page="CadastroADM" />
              <BtnNavegacao_1 titulo="Controle" page="Controle" />
            </View>
          </View>
        </Content>
        <FooterTab_tpl />
      </Container>
    </>
  );
}
