import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity } from 'react-native';
import { DataTable, IconButton } from 'react-native-paper';
const HomeControle = () => {
  const [modalVisivel, setModalVisivel] = useState(false);

  const ViewModal = () => {
    return (
      <Modal transparent={true} visible={modalVisivel} animationType='fade'>
        <View style={styles.modal}>
          <View style={styles.infoBoxModal}>
            <View>
              <Pressable style={styles.btnFechar} onPress={() => setModalVisivel(false)} >
                <Text style={styles.txtBtnFechar}>X</Text>
              </Pressable>
            </View>
            <View style={styles.infoBoxContent}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ textAlign: 'center', color: '#B6B6B6' }}>27/04/2021</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 36, color: "#fff", textAlign: 'center' }}>R$1.325,00</Text>
              </View>

              <View style={styles.divisao} />

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, color: '#00D1FF', fontWeight: 'bold' }}>Cartão</Text>
                <Text style={{ color: '#fff' }}>320,00</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, color: '#00D1FF', fontWeight: 'bold' }}>Dinheiro</Text>
                <Text style={{ color: '#fff' }}>1.005,00</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, color: '#00D1FF', fontWeight: 'bold' }}>Pedidos</Text>
                <Text style={{ color: '#fff' }}>80</Text>
              </View>

              <View style={styles.divisao} />

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 1, color: '#FF5757', fontWeight: 'bold' }}>Taxa</Text>
                <Text style={{ color: '#FF5757' }}>66,25</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <View>
      <ViewModal />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title><Text style={{ color: "#00D1FF", fontWeight: 'bold', fontSize: 16, }}>Data</Text></DataTable.Title>
          <DataTable.Title><Text style={{ color: "#00D1FF", fontWeight: 'bold', fontSize: 16, }}>Qnt</Text></DataTable.Title>
          <DataTable.Title><Text style={{ color: "#00D1FF", fontWeight: 'bold', fontSize: 16, }}>Inf</Text></DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>20/01/2021</Text></DataTable.Cell>
          <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>90</Text></DataTable.Cell>
          <DataTable.Cell>
            <IconButton
              icon="eye"
              color="#fff"
              size={20}
              onPress={() => setModalVisivel(true)}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>20/01/2021</Text></DataTable.Cell>
          <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>90</Text></DataTable.Cell>
          <DataTable.Cell >
            <IconButton
              icon="eye"
              color="#fff"
              size={20}
              onPress={() => console.log('Pressed')}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>20/01/2021</Text></DataTable.Cell>
          <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>90</Text></DataTable.Cell>
          <DataTable.Cell >
            <IconButton
              icon="eye"
              color="#fff"
              size={20}
              onPress={() => console.log('Pressed')}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>20/01/2021</Text></DataTable.Cell>
          <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>90</Text></DataTable.Cell>
          <DataTable.Cell >
            <IconButton
              icon="eye"
              color="#fff"
              size={20}
              onPress={() => console.log('Pressed')}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>20/01/2021</Text></DataTable.Cell>
          <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>90</Text></DataTable.Cell>
          <DataTable.Cell >
            <IconButton
              icon="eye"
              color="#fff"
              size={20}
              onPress={() => console.log('Pressed')}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>20/01/2021</Text></DataTable.Cell>
          <DataTable.Cell><Text style={{ color: '#7EE8FF' }}>90</Text></DataTable.Cell>
          <DataTable.Cell >
            <IconButton
              icon="eye"
              color="#fff"
              size={20}
              onPress={() => console.log('Pressed')}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={page => {
            console.log(page);
          }}
          label="1-2 of 6"
        />
      </DataTable>
    </View>
  )
}

export default HomeControle

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
    elevation:7,
  },
  infoBoxContent:{
    backgroundColor: '#3E4168',
    borderRadius: 5,
    padding: 10,
  },
  divisao: {
    borderBottomColor: '#51557D',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    elevation:1,
  },
  btnFechar: {
    backgroundColor: '#FF5757',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginBottom:10,
    elevation:7,
  },
  txtBtnFechar: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20
  },
})
