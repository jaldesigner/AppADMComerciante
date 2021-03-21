import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ActivityIndicator, Modal, Alert, StyleSheet} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import db, { firebase } from '@react-native-firebase/firestore';
import { Button, Card, Container, Content, Fab, Icon, Right, Switch, Tab, Text, Tabs } from 'native-base';
import DadosApp from '../../cfg';
import { BtnNav, Cabecalho } from '../../components/header';
import { CardPedido, CardST } from '../../components';
import RodaPe from '../../components/footerTab';
import estilo from '../../style';
import moment from 'moment';
moment.locale('pt-br');

const  TabCardapio = () => {
  return (
    <Container style={{backgroundColor:'#333651'}}>
      <Text>Cardapio</Text>
    </Container>
  )
}

export default TabCardapio 

const styles = StyleSheet.create({})
