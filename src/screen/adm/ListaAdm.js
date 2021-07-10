import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import db, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Container, Content, Text, Icon, Fab} from 'native-base';
import DadosApp from '../../cfg';
import {BtnNav, Cabecalho} from '../../components/header';
import RodaPe from '../../components/footerTab';
import estilo from '../../style';
import moment from 'moment';
import {CardST, BtnLight} from '../../components';
import md5 from 'react-native-md5';
import CompListaAdm from '../../components/ListaAdm';
moment.locale('pt-br');

// const InfData = moment().format('L');
// const Hora = moment().format('LT');
// const INF = DadosApp();
// const DB = db().collection(INF.Categoria).doc(INF.ID_APP);

const ListaAdm = ({navigation}) => {
  //   const [nivelAdm, setNivelAdm] = useState(0);
  //   const [nome, setNome] = useState('');
  //   const [email, setEmail] = useState('');
  //   const [senha, setSenha] = useState('');
  //   const [rSenha, setRSenha] = useState('');
  //   //const [admdb, setAdmdb] = useState([]);

  // const addAdmDb = () => {
  //     let cadAdm = DB.collection('ADM').add({
  //       nome: nome,
  //       email: email,
  //       ativo: true,
  //       nivel: nivelAdm,
  //       senha: md5.hex_md5(senha),
  //     });
  //     return cadAdm;
  //   };

  //   const checaAdmDb = () => {
  //     DB.collection('ADM')
  //       .where('email', '==', email)
  //       .get()
  //       .then(snp => {
  //         if (snp.docs.length == 0 || snp.docs.length == undefined) {
  //           addAdmDb();
  //           auth().createUserWithEmailAndPassword(email, senha);
  //           setNome('');
  //           setEmail('');
  //           setSenha('');
  //           setRSenha('');
  //           setNivelAdm('');
  //           alert('Administrador cadastrado com sucesso!');
  //         } else {
  //           alert('Administrador já cadastrado');
  //         }
  //       });
  //   };

  //   const addAdm = () => {
  //     if (senha !== rSenha) {
  //       alert('as senhas informadas não são iguais');
  //     } else if (nome === '' || email === '') {
  //       alert('Todos os campos devem ser preenchidos!');
  //     } else {
  //       checaAdmDb();
  //     }
  //   };

  return (
    <>
      <Container style={estilo.container}>
        <BtnNav />
        <Content>
          <Cabecalho titulo="Administradores" subtitulo="Configurações" />
          <View>
            <View style={{alignItems:"flex-end"}}>
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('CadastroADM',{auto:0});
              }}
                style={{
                  backgroundColor: '#FF6B00',
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  position: "relative",
                  marginTop:-45,
                  marginRight:5,
                  elevation:5,
                }}>
                <Icon
                  name="plus"
                  type="FontAwesome5"
                  style={{color: '#ffffff'}}
                />
              </TouchableOpacity>
            </View>
            <CompListaAdm />
          </View>
        </Content>
        <RodaPe />
      </Container>
    </>
  );
};

export default ListaAdm;
