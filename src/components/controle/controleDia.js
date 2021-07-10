import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity } from 'react-native';
import { DataTable, IconButton } from 'react-native-paper';
import db, { firebase } from '@react-native-firebase/firestore';
import DadosApp, { InfData, Hora } from '../../cfg';

const ControleDia = () => {
  var INF = DadosApp();
  var DB = db().collection(INF.Categoria).doc(INF.ID_APP);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const [dataModal, setDataModal] = useState('');

  useEffect(() => {
    const subscribe = DB.collection('Pedidos')
      .orderBy('Data_Pedido')
      .onSnapshot(snp => {
        setPedidos(snp.docs)
      });

    return () => subscribe();

  }, []);


  /* -------------------------------------------------------------------------- */
  /*                        Área de trtatamento do modal                        */
  /* -------------------------------------------------------------------------- */

  function getValorBruto(data) {
    var total = 0;
    var arrNum = [];
    const mp = pedidos.map((item, index) => {
      if (data == item.data().Data_Pedido) {
        let str = item.data().Total_Pagar;
        let strFloat = str.replace(',', '.');
        let numFloat = parseFloat(strFloat);

        arrNum.push(numFloat);
      }

    });

    for (var i = 0; i < arrNum.length; i++) {
      total += arrNum[i];
    }

    var FloatComZero = total.toFixed(2);
    var ConverteNumeroEmString = FloatComZero.toString();
    var numeroComVirgula = ConverteNumeroEmString.replace('.', ',');

    return numeroComVirgula;


  }

  function getValorBrutoCartao(data) {
    var total = 0;
    var arrNum = [];
    const mp = pedidos.map((item, index) => {
      if (data == item.data().Data_Pedido) {
        if (item.data().Forma_de_Pagamento == 'Cartão') {
          let str = item.data().Total_Pagar;
          let strFloat = str.replace(',', '.');
          let numFloat = parseFloat(strFloat);

          arrNum.push(numFloat);
        }
      }

    });

    for (var i = 0; i < arrNum.length; i++) {
      total += arrNum[i];
    }

    var FloatComZero = total.toFixed(2);
    var ConverteNumeroEmString = FloatComZero.toString();
    var numeroComVirgula = ConverteNumeroEmString.replace('.', ',');

    return numeroComVirgula;
  }

  function getValorBrutoDinheiro(data) {
    var total = 0;
    var arrNum = [];
    const mp = pedidos.map((item, index) => {
      if (data == item.data().Data_Pedido) {
        if (item.data().Forma_de_Pagamento == 'Dinheiro') {
          let str = item.data().Total_Pagar;
          let strFloat = str.replace(',', '.');
          let numFloat = parseFloat(strFloat);

          arrNum.push(numFloat);
        }
      }

    });

    for (var i = 0; i < arrNum.length; i++) {
      total += arrNum[i];
    }

    var FloatComZero = total.toFixed(2);
    var ConverteNumeroEmString = FloatComZero.toString();
    var numeroComVirgula = ConverteNumeroEmString.replace('.', ',');

    return numeroComVirgula;


  }

  function getPorcentagem(data, porcentagem) {
    var total = 0;
    var arrNum = [];
    const mp = pedidos.map((item, index) => {
      if (data == item.data().Data_Pedido) {

        let str = item.data().Total_Pagar;
        let strFloat = str.replace(',', '.');
        let numFloat = parseFloat(strFloat);

        arrNum.push(numFloat);

      }

    });

    for (var i = 0; i < arrNum.length; i++) {
      total += arrNum[i];
    }

    var FloatComZero = total.toFixed(2);
    var prct = (FloatComZero * porcentagem) / 100;
    var ConverteNumeroEmString = prct.toFixed(2).toString()
    var numeroComVirgula = ConverteNumeroEmString.replace('.', ',');

    return numeroComVirgula;


  }

  function somaPedidos(data) {
    var contaPedidos = [];
    const mp = pedidos.map(item => {
      if (data == item.data().Data_Pedido) {
        contaPedidos.push(item.data().ID_pdd);
      }
    });
    return contaPedidos.length;
  }

  const ViewModal = () => {
    var valorBruto = getValorBruto(dataModal);
    var valorBrutoCartao = getValorBrutoCartao(dataModal);
    var valorBrutoDinheiro = getValorBrutoDinheiro(dataModal);
    var contaPedidos = somaPedidos(dataModal);
    var porcentagem = getPorcentagem(dataModal, 5);


    return (
      <Modal transparent={true} visible={modalVisivel} animationType='fade'>
        <View style={styles.modal}>
          <View style={styles.infoBoxModal}>
            <View>
              <Pressable style={styles.btnFechar} onPress={() => {
                setModalVisivel(false);
                setDataModal('');
              }} >
                <Text style={styles.txtBtnFechar}>X</Text>
              </Pressable>
            </View>
            <View style={styles.infoBoxContent}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ textAlign: 'center', color: '#B6B6B6' }}>{dataModal}</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 36, color: "#fff", textAlign: 'center' }}>R${valorBruto}</Text>
              </View>

              <View style={styles.divisao} />

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, color: '#00D1FF', fontWeight: 'bold' }}>Pedidos</Text>
                <Text style={{ color: '#fff' }}>{contaPedidos}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, color: '#00D1FF', fontWeight: 'bold' }}>Cartão</Text>
                <Text style={{ color: '#fff' }}>R${valorBrutoCartao}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, color: '#00D1FF', fontWeight: 'bold' }}>Dinheiro</Text>
                <Text style={{ color: '#fff' }}>R${valorBrutoDinheiro}</Text>
              </View>

              <View style={styles.divisao} />

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, color: '#FF5757', fontWeight: 'bold' }}>Taxa(5%)</Text>
                <Text style={{ color: '#FF5757' }}>{porcentagem}</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }; //Modal com as informações

  /* -------------------------------------------------------------------------- */
  /*                            Fim da área do modal                            */
  /* -------------------------------------------------------------------------- */

  const ListaPedidos = () => {
    var getArray = [];

    const d = pedidos.map((i, index) => {
      getArray.push(i.data().Data_Pedido);
    });// gera o array com as datas dos pedidos

    var uniData = [...new Set(getArray)];// Separa e exibe as datas sem repetição

    const ContaPedidos = () => {
      var conta = {};
      getArray.forEach(n => {
        conta[n] = (conta[n] || 0) + 1;
      });
      return conta;
    }; //Conta os pedidos das datas

    const lData = uniData.map((item, index) => {
      return (
        <View key={index}>
          <DataTable.Row >
            <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>{item}</Text></DataTable.Cell>
            <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>{ContaPedidos()[item]}</Text></DataTable.Cell>
            <DataTable.Cell style={{ justifyContent: 'space-evenly', alignItems: 'center', }}>
              <View>
                <IconButton
                  icon="eye"
                  color="#fff"
                  size={20}
                  style={{ backgroundColor: "#FF5757" }}
                  onPress={() => {
                    setModalVisivel(true);
                    setDataModal(item);
                  }}
                />
              </View>
              <View>
                <IconButton
                  icon="finance"
                  color="#fff"
                  size={20}
                  style={{ backgroundColor: "#FF5757" }}
                  onPress={() => {
                    setModalVisivel(true);
                    setDataModal(item);
                  }}
                />
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        </View>
      );
    }); //Lista as datas sem repetições

    return lData;
  };

  // const DT = () => {
  //   return (
  //     <View>
  //       <ViewModal />
  //       <DataTable>
  //         <DataTable.Header>
  //           <DataTable.Title><Text style={{ color: "#00D1FF", fontWeight: 'bold', fontSize: 16, }}>Data</Text></DataTable.Title>
  //           <DataTable.Title><Text style={{ color: "#00D1FF", fontWeight: 'bold', fontSize: 16, }}>Qnt</Text></DataTable.Title>
  //           <DataTable.Title><Text style={{ color: "#00D1FF", fontWeight: 'bold', fontSize: 16, }}>Inf</Text></DataTable.Title>
  //         </DataTable.Header>
  //         <ListaPedidos />

  //         {/* <DataTable.Pagination
  //           page={1}
  //           numberOfPages={3}
  //           onPageChange={page => {
  //             console.log(page);
  //           }}
  //           label="1-2 of 6"
  //         /> */}

  //       </DataTable>

  //     </View>
  //   )
  // }; // Exibição do Data Table


  return (
    <View style={styles.infoBoxModal}>
      <Text>Detalhes do controle</Text>
    </View>
  );


}

export default ControleDia

const styles = StyleSheet.create({
  txtInicial: {
    color: "#fff",
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
    fontSize: 20
  },
})
