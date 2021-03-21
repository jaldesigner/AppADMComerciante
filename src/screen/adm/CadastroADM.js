import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import db, { firebase } from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Container, Content, Form, Item, Label, Input, Segment, Button, Text } from 'native-base';
import DadosApp from '../../cfg';
import { BtnNav, Cabecalho } from '../../components/header';
import RodaPe from '../../components/footerTab';
import estilo from '../../style';
import moment from 'moment';
import { CardST, BtnLight } from '../../components';
import md5 from 'react-native-md5';
moment.locale('pt-br');

const InfData = moment().format('L');
const Hora = moment().format('LT');
const INF = DadosApp();
const DB = db().collection(INF.Categoria).doc(INF.ID_APP);

const CadastroADM = ({ navigation }) => {

  const [nivelAdm, setNivelAdm] = useState(0);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [rSenha, setRSenha] = useState('');
  const [admdb, setAdmdb] = useState([]);

  const addAdmDb = () => {
    let cadAdm = DB.collection("ADM")
      .add({
        nome: nome,
        email: email,
        ativo: true,
        nivel: nivelAdm,
        senha: md5.hex_md5(senha),
      });
    return cadAdm;
  }

  const checaAdmDb = () => {

    DB.collection("ADM")
      .where('email', '==', email)
      .get()
      .then(snp => {
        if (snp.docs.length == 0 || snp.docs.length == undefined) {
          addAdmDb();
          auth().createUserWithEmailAndPassword(email,senha);
          setNome('');
          setEmail('');
          setSenha('');
          setRSenha('');
          setNivelAdm('');
          alert('Administrador cadastrado com sucesso!');
        } else {
          alert('Administrador já cadastrado');
        }

      })

  }

  const addAdm = () => {
    if (senha !== rSenha) {
      alert('as senhas informadas não são iguais');
    } else if (nome === '' || email === '') {
      alert('Todos os campos devem ser preenchidos!');
    } else {
      checaAdmDb();
    }

  }

  return (
    <Container style={estilo.container}>
      <BtnNav />
      <Content>
        <Cabecalho titulo="Cadastro de ADM" subtitulo="Área restrita" />
        <View>
          <CardST>
            <Form>
              <Item floatingLabel underline last>
                <Label style={{ color: "#fff" }}>Nome</Label>
                <Input value={nome} onChangeText={nome => setNome(nome.trimStart())} autoCompleteType="name" style={{ color: '#fff' }} />
              </Item>
              <Item floatingLabel underline last>
                <Label style={{ color: "#fff" }}>Email</Label>
                <Input value={email} onChangeText={email => setEmail(email.trim())} autoCapitalize='none' autoCompleteType="email" style={{ color: '#fff' }} />
              </Item>
              <Item floatingLabel underline last>
                <Label style={{ color: "#fff" }}>Senha</Label>
                <Input value={senha} onChangeText={senha => setSenha(senha.trim())} autoCapitalize='none' style={{ color: '#fff' }} secureTextEntry={true} />
              </Item>
              <Item floatingLabel underline last>
                <Label style={{ color: "#fff" }}>Repita a senha</Label>
                <Input value={rSenha} onChangeText={rSenha => setRSenha(rSenha.trim())} autoCapitalize='none' style={{ color: '#fff' }} secureTextEntry={true} />
              </Item>
            </Form>
            <View style={{ marginTop: 20 }}>
              <Text style={{ textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Nível</Text>
            </View>
            <View>
              <Segment>
                <Button first active={nivelAdm === 0 ? true : false} onPress={() => setNivelAdm(0)}><Text>Comum</Text></Button>
                <Button last active={nivelAdm === 1 ? true : false} onPress={() => setNivelAdm(1)}><Text>Avançado</Text></Button>
              </Segment>
            </View>
            <View style={{ marginTop: 20, marginBottom: 10 }}>
              <BtnLight value="Cadastrar" onPress={() => addAdm()} />
            </View>
          </CardST>
        </View>
      </Content>
      <RodaPe />
    </Container>
  );
};

export default CadastroADM;
