import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import { Container, Content, Button, Icon, Left, Right } from 'native-base';
import { BtnNavegacao_1 } from '../components/Botoes';
import estilos from '../style';
import NivelADM from '../function';
import { Cabecalho, BtnNav } from '../components/header';
import FooterTab_tpl from '../components/footerTab';
import estilo from '../style';

export default function Home({ navigation }) {

  const autentic = firebase.auth();
  const sair = () => {
    autentic.signOut();
    navigation.navigate('Login');
  };

  var niveladm = NivelADM().nivel;

  return (
    <>
      <Container style={{ backgroundColor: '#2D3043' }}>
        <BtnNav />
        <Content>
          <Cabecalho titulo="Opções" subtitulo="Administração" />
          <View style={estilo.conteudo}>
            <View style={estilos.boxBtn}>
              <BtnNavegacao_1 titulo="Cad. Pratos" page="CadastraPrato" />
              <BtnNavegacao_1 titulo="Cad. Acompanhamentos" page="CadastraAcompanhamento" />
              <BtnNavegacao_1 titulo="Cad. Medidas" page="Medidas" />
              <BtnNavegacao_1 titulo="Cad. Valores" page="Valores" />
              {niveladm == 1 ? <BtnNavegacao_1 titulo="ADM" page="SubConfigAdm" />:<View />}
            </View>
          </View>
        </Content>
        <FooterTab_tpl />
      </Container>
    </>
  );
}
