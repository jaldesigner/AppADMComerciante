import React, {useState} from 'react';
import {TouchableOpacity, View, Modal, Alert} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import db, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  Form,
  Item,
  Label,
  Input,
  Segment,
  Button,
  Text,
  Icon,
} from 'native-base';
import DadosApp from '../cfg';
import moment from 'moment';
import {CardST, BtnLight} from '../components';
moment.locale('pt-br');

const InfData = moment().format('L');
const Hora = moment().format('LT');
const INF = DadosApp();
const DB = db().collection(INF.Categoria).doc(INF.ID_APP);

const CompListaAdm = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [listAdm, setListAdm] = useState([]);
  const [editAdm, setEditAdm] = useState([]);
  const [nivelAdm, setNivelAdm] = useState(0);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [rSenha, setRSenha] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      const onsubscribe = DB.collection('ADM').onSnapshot(snp => {
        setListAdm(snp.docs);
      });

      return () => onsubscribe();
    }, []),
  );

  //console.log(listAdm.length);

  const EditAdm = (email, nome, nivel) => {
    setLoading(true);
    setEmail(email);
    setNome(nome);
    setNivelAdm(nivel);
  };

  const ListaAdmin = () => {
    const ladm = listAdm.map((item, index) => {
      if (item.data().admApp == false) {
        return (
          <View key={index} style={{marginBottom: 15}}>
            {/* Lista de administradores */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flex: 1}}>
                <Text style={{color: '#7EE8FF'}}>{item.data().nome}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{color: '#7EE8FF'}}>
                  {item.data().nivel == 1 ? 'Avaçado' : 'Normal'}
                </Text>
              </View>
              <View style={{flexDirection: 'row', flex: 1}}>
                <TouchableOpacity
                  onPress={() =>
                    EditAdm(
                      item.data().email,
                      item.data().nome,
                      item.data().nivel,
                    )
                  }
                  style={{
                    borderRadius: 15,
                    backgroundColor: '#FF6B00',
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  <Icon
                    name="user-edit"
                    type="FontAwesome5"
                    style={{fontSize: 15, color: '#fff'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    DelAdm(item.data().nome, item.data().email);
                  }}
                  style={{
                    borderRadius: 15,
                    backgroundColor: '#FF5757',
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="times"
                    type="FontAwesome5"
                    style={{fontSize: 15, color: '#fff'}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* Fim da Lista de administradores */}
          </View>
        );
      }
    });

    return ladm;
  };

  const addAdmDb = () => {
    try {
      if (nome != '') {
        DB.collection('ADM')
          .where('email', '==', email)
          .get()
          .then(g => {
            g.docs.map(snp => {
              DB.collection('ADM').doc(snp.id).update({
                nivel: nivelAdm,
                nome: nome,
              });
            });
          });
      } else {
        alert('O Campo nome deve ser preenchido');
      }

      setNome('');
      setLoading(false);
    } catch (e) {
      alert(e);
    }
  };

  const DelAdm = (nome, email) => {
    //alert("Deletar o administrador "+nome);
    DB.collection('ADM')
      .where('email', '==', email)
      .get()
      .then(g => {
        g.docs.map(i => {
          DB.collection("ADM")
          .doc(i.id)
          .delete()
        });
      });
  };

  return (
    <View>
      <Modal transparent={true} visible={loading} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: '#000',
            opacity: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{marginBottom: 20}}>
            <Button
              danger={true}
              onPress={() => setLoading(false)}
              small
              rounded={true}>
              <Text>X</Text>
            </Button>
          </View>
          <View
            style={{
              backgroundColor: '#3E4168',
              borderRadius: 5,
              padding: 10,
              width: '96%',
            }}>
            <Form>
              <Item floatingLabel underline last>
                <Label style={{color: '#fff'}}>Nome</Label>
                <Input
                  value={nome}
                  onChangeText={nome => setNome(nome.trimStart())}
                  autoCompleteType="name"
                  style={{color: '#fff'}}
                />
              </Item>
              <Item floatingLabel underline last>
                <Label style={{color: '#fff'}}>Email</Label>
                <Input
                  disabled={true}
                  value={email}
                  onChangeText={email => setEmail(email.trim())}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  style={{color: '#fff'}}
                />
              </Item>
            </Form>
            <View>
              <Segment>
                <Button
                  first
                  active={nivelAdm === 0 ? true : false}
                  onPress={() => setNivelAdm(0)}>
                  <Text>Comum</Text>
                </Button>
                <Button
                  last
                  active={nivelAdm === 1 ? true : false}
                  onPress={() => setNivelAdm(1)}>
                  <Text>Avançado</Text>
                </Button>
              </Segment>
            </View>
            <View style={{marginTop: 20, marginBottom: 10}}>
              <BtnLight value="Alterar" onPress={() => addAdmDb()} />
            </View>
          </View>
        </View>
      </Modal>

      <CardST>
        {/* Inicio de lista de administradores */}
        <View>
          {/*Titulo da tabela */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#51557D',
              paddingBottom: 10,
            }}>
            <View style={{flex: 1}}>
              <Text style={{color: '#00D1FF', fontWeight: 'bold'}}>Nome</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: '#00D1FF', fontWeight: 'bold'}}>Nível</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: '#00D1FF', fontWeight: 'bold'}}>Conf.</Text>
            </View>
          </View>
          {/*Fim do Titulo da tabela */}

          {/* Lista de administradores */}
          {ListaAdmin()}
          {/* Fim da Lista de administradores */}
        </View>
      </CardST>
    </View>
  );
};

export default CompListaAdm;
