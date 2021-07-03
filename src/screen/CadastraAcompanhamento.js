import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Container, Content, Icon, Picker } from 'native-base';
import db from '@react-native-firebase/firestore';
import estilo from '../style';
import DadosApp from '../cfg';
import { Cabecalho, BtnNav } from '../components/header';
import FooterTab_tpl from '../components/footerTab';
import { CardTpl, BtnLight } from '../components';
export default function CadastraAcompanhamento({ navigation }) {

  const INF = DadosApp();
  const UID = (+new Date).toString(16);
  const PathDb = db().collection(INF.Categoria).doc(INF.ID_APP);
  const [valueAcompanhamento, setValueAcompanhamento] = useState('');
  const [acompanhamento, setAcompanhamento] = useState('');
  const [autDb, setAutDb] = useState('');
  const [acmpPrincipal, setAcmpPrincipal] = useState('');
  //const [pkAcmpGeral, setPkAcmpGeral] = useState('');

  function CadastrarPrato() {
    if (valueAcompanhamento === '') {
      alert('Por favor digite o prato a ser cadastrado!');
    } else if (valueAcompanhamento.length < 3) {
      alert('O nome do prato deve conter 6 ou mais digitos!');
    } else {
      PathDb
        .collection('Acompanhamentos')
        .doc()
        .set({
          NomeAcompanhamento: valueAcompanhamento,
          ID_Acompanhamento: UID,
          Principal: false,
        });

      setValueAcompanhamento('');
      setAutDb(1);
      alert('Acompanhamento adicionado!');
    }
  }

  const deletaPrato = (id_item, n_item) => {

    const cfmDel = () =>
      Alert.alert(
        'Atenção',
        'Deseja realmente excluir o prato "' + n_item + '"?',
        [
          {
            text: 'Não',
            style: 'cancel',
            cancelable: false,
          },
          {
            text: 'Sim',
            onPress: () => DelItemList(),
          },
        ],
      );

    cfmDel();

    const DelItemList = () => {
      let item = PathDb
        .collection('Acompanhamentos')
        .where('ID_Acompanhamento', '==', id_item);

      item.get().then((snp) => {
        snp.forEach((doc) => {
          doc.ref.delete();
        });
      });

      setAutDb(1);

    };
  };

  useEffect(() => {
    const acmp = PathDb
      .collection('Acompanhamentos')
      .orderBy('NomeAcompanhamento')
      .onSnapshot(snp => {
        setAcompanhamento(snp.docs);
      });

    return () => acmp();

  }, []);

  useEffect(() => {

    const ExbAcompanhamentoPadrao = PathDb.collection('Acompanhamentos')
      .where('Principal', '==', true)
      .onSnapshot(snp => {
        setAcmpPrincipal(snp.docs[0].data().NomeAcompanhamento);
      });
    return () => ExbAcompanhamentoPadrao();
  }, []);

  const Fl = () => {
    if (acompanhamento.length === 0 || acompanhamento.length === undefined) {
      return <Text style={{ color: '#F6B900', textAlign: 'center' }}>Lista Vazia</Text>;
    } else {
      const prt = acompanhamento.map((i, index) => {
        return (
          <View key={index} style={estilo.lista}>
            <View style={estilo.boxTextLista}>
              <View style={estilo.sqrLista} />
              <Text style={estilo.txtLista}>{i.data().NomeAcompanhamento}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => deletaPrato(i.data().ID_Acompanhamento, i.data().NomeAcompanhamento)}>
                <Icon type="FontAwesome5" style={estilo.icLista} name="trash-alt" />
              </TouchableOpacity>
            </View>
          </View>
        );
      });
      return prt;
    }
  };

  return (
    <>
      <Container style={estilo.container}>
        <BtnNav />
        <Content>
          <Cabecalho titulo="Cadastro" subtitulo="Acompanhamentos" />
          <View>
            <CardTpl titulo="Cadastro">
              <View>
                <TextInput
                  placeholderTextColor="#aaa"
                  placeholder="Exp.: Francom com Quiabo"
                  style={estilo.inpText}
                  value={valueAcompanhamento}
                  onChangeText={valueAcompanhamento => setValueAcompanhamento(valueAcompanhamento)}
                />
              </View>
              <View>
                <BtnLight value="Cadastrar" onPress={() => CadastrarPrato()} />
              </View>
            </CardTpl>
            <CardTpl titulo="Acompanhementos">
              <View>
                <Fl />
              </View>
            </CardTpl>
          </View>
        </Content>
      </Container>
      <FooterTab_tpl />
    </>
  );
}
