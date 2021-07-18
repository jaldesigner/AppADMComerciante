import React, {useState, useEffect, useContext} from 'react';
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
import {DB_Cardapio_Do_Dia,DB_Medidas} from '../controller';

const ControleDia = ({navigation}) => {
  var INF = DadosApp();
  var DB = db().collection(INF.Categoria).doc(INF.ID_APP);
  var cardapio_do_dia = DB_Cardapio_Do_Dia();
  var medidas = DB_Medidas();

  const [ctx_pedidos, setCtx_pedidos] = useContext(CTX_Pedidos);

  function ListaPratoDia() {
    ////------------------------------------------------------
    /** Função de pegar uma única data */
    const unicaData = dados => {
      var data = dados[0].Data_Pedido;
      return data;
    };
    var uniData = unicaData(ctx_pedidos);
    /** Fim da Função de pegar uma única data */
    ////------------------------------------------------------

    console.log(medidas);

    const lst = cardapio_do_dia.map((item, indexx) => {
      let it = item.data();

      const car = it.Cardapio.map((i, index) => {
        if (it.Data == uniData) {
          //console.log(i.prato);
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
                    <View
                      style={{
                        borderTopColor: '#56597E',
                        borderTopWidth: 1,
                        flexDirection: 'row',
                      }}>
                      <View style={{flex: 2, padding: 5}}>
                        <Text style={{color: '#FFAF00'}}>Grande</Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          borderColor: '#56597E',
                          borderLeftWidth: 1,
                          padding: 5,
                        }}>
                        <Text style={{color: '#FF6B00'}}>20</Text>
                      </View>
                    </View>
                    {/* Linhas de medidas */}
                    <View
                      style={{
                        borderTopColor: '#56597E',
                        borderTopWidth: 1,
                        flexDirection: 'row',
                      }}>
                      <View style={{flex: 2, padding: 5}}>
                        <Text style={{color: '#FFAF00'}}>Media</Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          borderColor: '#56597E',
                          borderLeftWidth: 1,
                          padding: 5,
                        }}>
                        <Text style={{color: '#FF6B00'}}>10</Text>
                      </View>
                    </View>
                    {/* Linhas de medidas */}
                    <View
                      style={{
                        borderTopColor: '#56597E',
                        borderTopWidth: 1,
                        flexDirection: 'row',
                      }}>
                      <View style={{flex: 2, padding: 5}}>
                        <Text style={{color: '#FFAF00'}}>Pequena</Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          borderColor: '#56597E',
                          borderLeftWidth: 1,
                          padding: 5,
                        }}>
                        <Text style={{color: '#FF6B00'}}>5</Text>
                      </View>
                    </View>
                    {/* Linhas de medidas */}
                    <View
                      style={{
                        borderTopColor: '#56597E',
                        borderTopWidth: 1,
                        flexDirection: 'row',
                      }}>
                      <View style={{flex: 2, padding: 5}}>
                        <Text style={{color: '#FFAF00'}}>Dividida</Text>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          borderColor: '#56597E',
                          borderLeftWidth: 1,
                          padding: 5,
                        }}>
                        <Text style={{color: '#FF6B00'}}>4</Text>
                      </View>
                    </View>
                    {/* Linhas de medidas */}
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
                        <Text style={{color: '#FF6B00'}}>R$1.070,00</Text>
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
                          <Text style={{color: '#FF6B00'}}>39</Text>
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
          <Cabecalho titulo="Controle" subtitulo="Administração" />
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
