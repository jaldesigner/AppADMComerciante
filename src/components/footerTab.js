import React from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import db from '@react-native-firebase/firestore';
import DadosApp from '../cfg';
import { Footer, FooterTab, Button, Icon, Badge, Text, } from 'native-base';
import moment from 'moment';
import 'moment/locale/pt-br';

const InfData = moment().format('L');
const Hora = moment().format('LT');

const DB = db().collection(DadosApp().Categoria).doc(DadosApp().ID_APP);

const RodaPe = () => {
  const navigation = useNavigation();

  const [contaPedidos, setContaPedidos] = React.useState([]);

  useFocusEffect(React.useCallback(() => {
    const subscriber = DB.collection('Pedidos')
      .where('Data_Pedido', '==', InfData)
      .where('Execucao','==',false)
      .where('Entrega','==',false)
      .onSnapshot(snp => {
        setContaPedidos(snp.docs);
      });
      return ()=> subscriber();
  }, []));

  return (
    <Footer>
      <FooterTab style={{ backgroundColor: '#51557D' }}>
        <Button onPress={() => navigation.navigate('Home')}>
          <Icon type="FontAwesome5" name="home" />
          <Text>Home</Text>
        </Button>
        <Button onPress={() => navigation.navigate('SelecaoPratoDia')}>
          <Icon type="FontAwesome5" name="concierge-bell" />
          <Text>Cardápio</Text>
        </Button>
        <Button onPress={() => navigation.navigate('ListaPedidos')} badge vertical>
          <Badge><Text>{contaPedidos.length}</Text></Badge>
          <Icon type="FontAwesome5" name="list" />
          <Text>Pedidos</Text>
        </Button>
        <Button onPress={() => navigation.navigate('Configuracao')}>
          <Icon type="FontAwesome5" name="wrench" />
          <Text>Config</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default RodaPe;

