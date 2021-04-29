import React, { useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Text, Container, Content, Icon, CardItem, Item } from 'native-base';
import { Picker } from '@react-native-community/picker';
import db, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import DadosApp, { InfData, Hora } from '../cfg/';
import { BtnNav, Cabecalho } from '../components/header';
import Footer_tpl from '../components/footerTab';
import HomeControle from '../components/controle/home';
import estilo from '../style';
import { CardST } from '../components';

const controle = ({ navigation }) => {
  return (
    <Container style={estilo.container}>
      <BtnNav />
      <Content>
        <Cabecalho titulo="Controle" subtitulo="-ADM-" />
        <View>
          <CardST>
          <HomeControle />
          </CardST>
        </View>
      </Content>
      <Footer_tpl />
    </Container>
  );
};

export default controle;
