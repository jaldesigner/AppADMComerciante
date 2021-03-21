import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Header,
  Body,
  Footer,
  Content,
  Icon,
  H3,
  List,
  ListItem,
  Separator,
  Thumbnail
} from 'native-base';
import DadosApp from '../cfg';
import INF from '../cfg';

const INFO = DadosApp();

const Logo = () => {
  return <Image source={require('../img/logo.png')} />
};
//const navigation = useNavigation();
const navBarLeft = props => {

  const autentic = auth();
  const sair = () => {
    autentic.signOut();
    props.navigation.navigate('Login');
  };

  return (
    <Container>
      <Header style={{height:100, backgroundColor:'#3E4168', elevation:7}}>
        <Body>
          <View style={estilo.LT}>
            <Thumbnail  source={require('../img/logo.png')} style={{marginRight:10}} />
            <H3 style={estilo.tHeader}>{INFO.Nome_App}</H3>
          </View>
        </Body>
      </Header>
      <View style={{backgroundColor: '#333651', flex: 1}}>
        <TouchableOpacity
          style={estilo.navLink}
          onPress={() => props.navigation.navigate('Home')}>
          <Icon
            type="FontAwesome5"
            name="home"
            style={{
              color: '#fff',
              backgroundColor: '#02CD98',
              borderRadius: 10,
              padding: 5,
              marginRight: 10,
              fontSize: 20,
            }}
          />
          <Text style={estilo.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={estilo.navLink}
          onPress={() => props.navigation.navigate('Pratos')}>
          <Icon
            type="FontAwesome5"
            name="concierge-bell"
            style={{
              color: '#fff',
              backgroundColor: '#5351F9',
              borderRadius: 10,
              padding: 5,
              marginRight: 10,
              fontSize: 20,
            }}
          />
          <Text style={estilo.navText}>Pratos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={estilo.navLink}
          onPress={() => props.navigation.navigate('Pratos')}>
          <Icon
            type="FontAwesome5"
            name="list-alt"
            style={{
              color: '#fff',
              backgroundColor: '#F64000',
              borderRadius: 10,
              padding: 5,
              marginRight: 10,
              fontSize: 20,
            }}
          />
          <Text style={estilo.navText}>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={estilo.navLink}
          onPress={() => props.navigation.navigate('Configuracao')}>
          <Icon
            type="FontAwesome5"
            name="wrench"
            style={{
              color: '#fff',
              backgroundColor: '#20272F',
              borderRadius: 10,
              padding: 5,
              marginRight: 10,
              fontSize: 20,
            }}
          />
          <Text style={estilo.navText}>Configuração</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={estilo.navLink}
          onPress={() => sair()}>
          <Icon
            type="FontAwesome5"
            name="door-open"
            style={{
              color: '#fff',
              backgroundColor: '#F64000',
              borderRadius: 10,
              padding: 5,
              marginRight: 10,
              fontSize: 20,
            }}
          />
          <Text style={estilo.navText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
};

export default navBarLeft;

const estilo = StyleSheet.create({
  navLink: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderStyle: 'solid',
    padding: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    color: '#999',
  },
  tHeader: {
    color: '#fff',
    textAlign: 'center',
  },
  LT: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:10,
    paddingBottom: 10,
  },
  logo: {
    backgroundColor: 'red',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
