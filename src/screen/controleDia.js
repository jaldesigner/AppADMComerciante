import React, {useState, useEffect, useContext, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Container, Content} from 'native-base';
import {Card, DataTable, IconButton} from 'react-native-paper';
import db, {firebase} from '@react-native-firebase/firestore';
import DadosApp, {InfData, Hora} from '../cfg';
import {Cabecalho, BtnNav} from '../components/header';
import {CardST} from '../components';
import FooterTab_tpl from '../components/footerTab';
import estilo from '../style';
import {CTX_Pedidos} from '../context';
import {DB_Cardapio_Do_Dia, DB_Medidas} from '../controller';

const ControleDia = ({navigation}) => {
  var INF = DadosApp();
  var DB = db().collection(INF.Categoria).doc(INF.ID_APP);
  var cardapio_do_dia = DB_Cardapio_Do_Dia();
  var medidas = DB_Medidas();

  const [ctx_pedidos, setCtx_pedidos] = useContext(CTX_Pedidos);
  const [mdd, setMdd] = useState([]);

  function ListaPratoDia() {
    ////------------------------------------------------------
    /** Função de pegar uma única data */
    const unicaData = dados => {
      var data = dados[0].Data_Pedido;
      return data;
    };
    var uniData = unicaData(ctx_pedidos);
    /** Fim da função de pegar uma única data */
    ////-----------------------------------------------------

    ////-----------------------------------------------------
    /** Função que conta os pedidos por medidas */
    const ContaMedidas = (TipoMedida, NomePrato) => {
      let arr = [];
      let t = ctx_pedidos.map(mm => {
        mm.Pedido.map(m => {
          if (m.Medida == TipoMedida) {
            if (m.prato == NomePrato) {
              arr.push(m.Medida);
            }
          }
        });
      });
      return arr.length;
    };
    /**Fim da função que conta os pedidos por medidas */
    ////-----------------------------------------------------

    ////-----------------------------------------------------
    /** Função que soma todo o valor por prato */
    const SomaValoresPorPrato = NomePrato => {
      let arr = [];
      let t = ctx_pedidos.map(mm => {
        mm.Pedido.map(m => {
          if (m.prato == NomePrato) {
            arr.push(m.Valor);
          }
        });
      });
      //console.log(arr)
      return arr;
    };
    /**Fim da função que soma todo o valor por prato */
    ////-----------------------------------------------------

    const lst = cardapio_do_dia.map(item => {
      let it = item.data();
      var arr2 = [];

      const car = it.Cardapio.map((i, index) => {
        var arr = [];
        const reducer = (acomulador, valor) => acomulador + valor;
        arr2.push(SomaValoresPorPrato(i.prato));

        if (it.Data == uniData) {
          function converteFloat(arrValor) {
            let total = 0;
            let arr = [];
            arrValor.map(valor => {
              let strNumFloat = valor.replace(',', '.');
              let numFloat = parseFloat(strNumFloat);
              arr.push(numFloat);
            });

            for (var i = 0; i < arr.length; i++) {
              total += arr[i];
            }

            let nf = total.toFixed(2);
            let strReal = nf.replace('.', ',');

            return strReal;
          }

          const Me = () => {
            let info = i.info.map((InfCardapio, idx) => {
              arr.push(ContaMedidas(InfCardapio.medida, i.prato));

              if (InfCardapio.valor !== null) {
                return (
                  <View
                    key={idx}
                    style={{
                      borderTopColor: '#56597E',
                      borderTopWidth: 1,
                      flexDirection: 'row',
                    }}>
                    <View style={{flex: 2, padding: 5}}>
                      <Text style={{color: '#FFAF00'}}>
                        {InfCardapio.medida}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        borderColor: '#56597E',
                        borderLeftWidth: 1,
                        padding: 5,
                      }}>
                      <Text style={{color: '#FF6B00'}}>
                        {ContaMedidas(InfCardapio.medida, i.prato)}
                      </Text>
                    </View>
                  </View>
                );
              }
            });
            return info;
          };

          return (
            <View key={index}>
              <CardST>
                {/* Inicio da Tabela */}
                <View>
                  <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                    <Text
                      style={{
                        color: '#00D1FF',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Prato:{' '}
                    </Text>
                    <Text style={{color: '#FF6B00'}}>{i.prato}</Text>
                  </View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#56597E',
                      marginBottom: 10,
                      marginTop: 10,
                    }}>
                    <View
                      style={{flexDirection: 'row', alignItems: 'baseline'}}>
                      <View style={{flex: 2, padding: 5}}>
                        <Text style={{color: '#00D1FF', fontSize: 16}}>
                          Medidas
                        </Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={{color: '#00D1FF', fontSize: 16}}>
                          Quantia
                        </Text>
                      </View>
                    </View>

                    {/* Linhas de medidas */}
                    {Me()}
                    {/* Fim da linhas de medidas */}
                    <View
                      style={{
                        borderTopColor: '#56597E',
                        borderTopWidth: 1,
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          flex: 2,
                          padding: 5,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}>
                        <Text style={{color: '#00D1FF', fontWeight: 'bold'}}>
                          Receita:{' '}
                        </Text>
                        <Text style={{color: '#FF6B00'}}>
                          R${converteFloat(arr2[index])}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          borderColor: '#56597E',
                          borderLeftWidth: 1,
                          padding: 5,
                        }}>
                        <View style={{flex: 2, padding: 5}}>
                          <Text style={{color: '#00D1FF', fontWeight: 'bold'}}>
                            Total:
                          </Text>
                          <Text style={{color: '#FF6B00'}}>
                            {arr.reduce(reducer)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                {/* Fim da Tabela */}
              </CardST>
            </View>
          );
        }
      });
      return car;
    });
    return lst;
  }

  return (
    <>
      <Container style={{backgroundColor: '#2D3043'}}>
        <BtnNav />
        <Content>
          <Cabecalho
            titulo="Controle"
            subtitulo={`Data: ${ctx_pedidos[0].Data_Pedido}`}
          />
          {ListaPratoDia()}
        </Content>
        <FooterTab_tpl />
      </Container>
    </>
  );
};

export default ControleDia;

const styles = StyleSheet.create({
  txtInicial: {
    color: '#fff',
  },
  modal: {
    flex: 1,
    backgroundColor: '#000',
    opacity: 0.8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBoxModal: {
    width: '80%',
    elevation: 7,
  },
  infoBoxContent: {
    backgroundColor: '#3E4168',
    borderRadius: 5,
    padding: 10,
  },
  divisao: {
    borderBottomColor: '#51557D',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    elevation: 1,
  },
  btnFechar: {
    backgroundColor: '#FF5757',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginBottom: 10,
    elevation: 7,
  },
  txtBtnFechar: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
});
