import React, { useState, useEffect, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import db, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Card, CardItem, Container, Content, Icon, Item, Text, Picker, Switch } from 'native-base';
import DadosApp from '../cfg';
import { Cabecalho, BtnNav } from '../components/header';
import { CardTpl, BtnLight, BtnSmallRight, CardST } from '../components';
import RodaPe from '../components/footerTab';
import estilo from '../style';
import { CTX_SelecaoPrato } from '../context';
import moment from 'moment';
import 'moment/locale/pt-br';

const InfData = moment().format('L');
const Hora = moment().format('LT');
const INF = DadosApp();
const DB = db().collection(INF.Categoria).doc(INF.ID_APP);

const SelecaoPratoDia = ({ navigation }) => {

  const [ctx_SP, setctx_SP] = useContext(CTX_SelecaoPrato);
  const [pratos, setPratos] = useState([]);
  const [medidas, setMedidas] = useState([]);
  const [valores, setValores] = useState([]);
  const [listaPratosDia, setListaPratosDia] = useState([]);
  const [valueListaPrato, setValueListaPrato] = useState('');
  const [arrayValores, setArrayValores] = useState([]);
  const [cardapioDia, setCardapioDia] = useState([]);
  const [autoVal, setAutoVal] = useState(0);
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    const subscriber = DB.collection('Pratos')
      .orderBy('NomePrato')
      .onSnapshot(snp => {
        setPratos(snp.docs);
      });
    return () => subscriber();
  }, []); //Pega os pratos existentes

  useEffect(() => {
    const subscriber = DB.collection('Medidas')
      .orderBy('Medida')
      .onSnapshot(snp => {
        setMedidas(snp.docs);
      });
    return () => subscriber();
  }, []); //Pega as medidas do banco de dados

  useEffect(() => {
    const subscriber = DB.collection('Valores')
      .orderBy('Valor')
      .onSnapshot(snp => {
        setValores(snp.docs);
      });
    return () => subscriber();
  }, []); //Pega os valores do banco de dados

  useEffect(() => {
    const subscriber = DB.collection('CardapioDoDia')
      .where('Ativo', '==', true)
      .where('Data', '==', InfData)
      .onSnapshot(snp => {
        setCardapioDia(snp.docs);
      });
    return () => subscriber();
  }, []); //Pega o cardapio do dia caso exista

  useFocusEffect(React.useCallback(() => {
    setArrayValores(arrayValores);
    setctx_SP(ctx_SP);
    setAutoVal(0);
  }, [autoVal, ctx_SP]));

  function Prato() {
    const pt = pratos.map((pratos, index) => {
      return (
        <Picker.Item key={index} value={pratos.data().NomePrato} label={pratos.data().NomePrato} />
      );
    });
    return pt;
  }//Lista os pratos no Picker

  function Valor() {
    const md = valores.map((valor, index) => {
      return (
        <Picker.Item key={index} value={valor.data().Valor} label={valor.data().Valor} />
      );
    });
    return md;
  }//Lista os valores no Picker

  function ListaMedidasValores() {

    const mv = medidas.map((mv, index) => {
      return (
        <View key={index} style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          marginTop: 20,
          backgroundColor: '#51557D',
          padding: 10,
        }}>
          <View>
            <Text style={{ color: "#fff" }}>{mv.data().Medida}</Text>
          </View>
          <View>
            <Picker
              onValueChange={valor => {

                if (valor == "") {

                  arrayValores[index] = 'Vazio';
                  setAutoVal(1);
                } else {

                  arrayValores[index] = {

                    medida: mv.data().Medida,
                    valor: valor,
                    indice: index,

                  }

                  setArrayValores(arrayValores);
                  setAutoVal(1);

                }


              }

              }
              selectedValue={arrayValores[index] != undefined ? arrayValores[index].valor : arrayValores[index]}
              style={{
                backgroundColor: "#fff",
                height: 25,
                width: 150,
              }}
            >
              <Picker.Item value="" label="Selecione o valor" />
              {Valor()}
              <Picker.Item value={null} label="Desativado" />
            </Picker>
          </View>
        </View>
      );
    });

    if (valueListaPrato !== "") {
      return mv;
    }
  }//Exibe os valores e medidas no picker

  function delItem(item, ind) {
    Alert.alert(
      'Atenção!',
      'Deseja realmente excluir o Item \" ' + item[ind].prato + '\"?',
      [
        {
          text: 'Sim',
          onPress: () => {
            item.splice(ind, 1);
            setAutoVal(1);
          }
        },
        {
          text: 'Não',
          style: 'cancel',
          cancelabre: false,
        }
      ]
    );

  }//Deleta os itens da lista do cardápio

  function ListaSelecionados() {
    const ctxListaPratosDia = ctx_SP.map((item, index) => {
      return (
        <View key={index} style={{
          backgroundColor: '#51557D',
          padding: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          borderRadius: 5,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Icon name='caret-right' type="FontAwesome5" style={{
              color: '#00D1FF',
            }} />
            <Text style={{ color: '#fff', marginLeft: 5, }}>{item.prato}</Text>
          </View>
          <View>
            <TouchableOpacity style={{
              backgroundColor: '#FF5757',
              //padding:5,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
              width: 30,
              height: 30,
              elevation: 5,
            }} onPress={() => delItem(ctx_SP, index)} >
              <Icon name='trash' type='FontAwesome5' style={{ color: '#fff', fontSize: 15 }} />
            </TouchableOpacity>
          </View>
        </View>
      );
    })
    if (ctx_SP.length !== 0) {
      return (
        <View>
          <CardTpl titulo="Selecionados">
            {ctxListaPratosDia}
          </CardTpl>
          {btnAvancar()}
        </View>
      );
    }

  }//Lista os pratos selecionados para o cardápio

  function SelecaoPratoDoDia() {
    return (
      <View>
        <CardTpl titulo="Seleção de cardápio do dia">
          <View style={{ backgroundColor: "#fff" }}>
            <Picker
              selectedValue={valueListaPrato}
              onValueChange={valueListaPrato => {
                setValueListaPrato(valueListaPrato);
              }
              }
            >

              <Picker.Item value='' label="Selecione um prato" />
              {Prato()}
            </Picker>
          </View>
          {ListaMedidasValores()}
          <View>
            {
              valueListaPrato !== '' ? <BtnLight value="Adicionar" onPress={addPratoSelecionado} /> : <View />
            }
          </View>
        </CardTpl>
      </View>
    );
  }//Exibe os pratos no Picker

  function addPratoSelecionado() {
    let qntMedidas = medidas.length;
    let qntValorSelecionado = arrayValores.length;

    var vz = arrayValores.findIndex(ind => ind == "Vazio");
    var und = arrayValores.findIndex(ind => ind == undefined);

    if (qntValorSelecionado != qntMedidas || vz != -1 || und != -1) {
      alert("Selecione Um valor para cada medida ou escolha \"desativado\"")
    } else {
      const criaArray = (array) => {
        const arr = [];
        for (const item of array) {
          arr.push(item.prato);
        }
        return arr;
      }

      let arrayPratos = criaArray(listaPratosDia);
      let existeItem = arrayPratos.findIndex(i => i == valueListaPrato);

      if (existeItem == -1) {
        listaPratosDia.push({
          prato: valueListaPrato,
          info: arrayValores,
          ativo: true,
          idPrato: (new Date()).getTime().toString(36),
        });

        setctx_SP(listaPratosDia);
        setValueListaPrato('')
        setArrayValores([]);
      } else {
        alert('Este prato já está na lista!');
      }
    }
  }//Adiciona os pratos selecionados na lista

  function btnAvancar() {
    if (ctx_SP.length !== 0 || ctx_SP.length !== undefined) {
      return (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'flex-end',
        }}>
          <BtnSmallRight
            value="Próximo"
            onPress={() => navigation.navigate('MontagemPratoDia', { auto: 0 })}>
            <Text>Próximo</Text>
            <Icon name="arrow-forward" />
          </BtnSmallRight>
        </View>
      );
    }
  }//Exibe ou esconde o botão de avançar

  function Swt({ ...props }) {

    return (
      <>
        <Switch value={props.ativo ? true : false} onValueChange={() => {
          Alert.alert(
            "Atenção!",
            props.ativo ? "Deseja realmente desativar este prato?" : "O prato será reativado e ficara visível para os cliente?",
            [
              {
                text: "Não",
                onPress: () => null,
                style: "cancel"
              },
              {
                text: "Sim",
                onPress: () => {

                  var obj = props.data;
                  var modo = true;
                  var arr = [];

                  obj.Cardapio.map((it, ind) => {
                    arr.push(it);
                  });

                  arr[props.index].ativo = !props.ativo;

                  DB.collection('CardapioDoDia')
                    .doc(props.idCardapio)
                    .update(
                      {
                        Cardapio: arr,
                      }
                    ).catch(e => {
                      console.log(e);
                    })

                  //console.log(arr);

                  // obj.Cardapio[props.index].map((i,ind) => {
                  //   console.log(i);
                  // });
                  // DB.collection('CardapioDoDia')
                  // .doc(props.idCardapio)
                  // .update(
                  //   {
                  //     Cardapio:[{ativo:!props.ativo}]
                  //   }
                  // ).catch(e => {
                  //   console.log(e);
                  // })
                  // DB.collection('CardapioDoDia')
                  //   .doc(props.idPratoDia)
                  //   .update({
                  //     Ativo: !props.ativo
                  //   })
                }
              }
            ]
          );

        }} />
      </>
    );
  }

  function ListaCardapioDia() {
    const cd = cardapioDia.map((item, index) => {
      let idCardapio = item.id;
      let _item = item.data().Cardapio;
      const prt = _item.map((i, ind) => {
        return (
          <View key={ind} style={{
            backgroundColor: '#51557D',
            padding: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Icon name='caret-right' type="FontAwesome5" style={{
                color: '#00D1FF',
              }} />
              <Text style={{ color: '#fff', marginLeft: 5, }}>{i.prato}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Swt
                data={item.data()}
                index={ind}
                ativo={i.ativo}
                idCardapio={idCardapio}
              />
            </View>
          </View>
        );
      });
      return prt;
    });

    return cd;


  }//Lista o cardápio caso já tenha sido cadastrado

  function ExibicaoTelas() {
    if (cardapioDia.length != 0) {
      return ListaCardapioDia();
    } else {
      return (
        <View>
          {SelecaoPratoDoDia()}
          {ListaSelecionados()}
        </View>
      );
    }
  }//Faz a mudança de telas

  return (
    <Container style={estilo.container}>
      <BtnNav />
      <Content>
        <Cabecalho titulo="Cardápio" subtitulo="Seleção" />
        {ExibicaoTelas()}
      </Content>
      <RodaPe />
    </Container>
  );

}

export default SelecaoPratoDia;
