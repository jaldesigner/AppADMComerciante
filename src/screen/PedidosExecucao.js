import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ActivityIndicator, Modal, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import db, { firebase } from '@react-native-firebase/firestore';
import { Button, Card, Container, Content, Fab, Icon, Right, Switch, Text, } from 'native-base';
import DadosApp from '../cfg';
import { BtnNav, Cabecalho } from '../components/header';
import { CardPedido, CardST } from '../components';
import RodaPe from '../components/footerTab';
import estilo from '../style';
import moment from 'moment';
moment.locale('pt-br');

const InfData = moment().format('L');
const Hora = moment().format('LT');
const INF = DadosApp();
const DB = db().collection(INF.Categoria).doc(INF.ID_APP);

const PedidosExecucao = ({ navigation }) => {
  const [listaPedidos, setListaPedidos] = useState([]);
	const [id, setId] = useState();
	const [hora, setHora] = useState(moment().format('LTS'));
	const [data, setData] = useState(moment().format('L'));
	const [segundo, setSegundo] = useState(0);

	// useEffect(() => {
	// 	setInterval(() => {
	// 		setHora(moment().format('LTS'));
	// 		setData(moment().format('L'));
	// 		segundo == 0 ? setSegundo(1) : setSegundo(0);
	// 	}, 1000);

	// }, []);

	useEffect(() => {
		DB.collection('Pedidos')
			.where('Data_Pedido', '==', data)
			.orderBy("Hora_Pedido", "asc")
			.onSnapshot(snp => {
				setListaPedidos(snp.docs);
			}, err => {
				console.log(err.message)
			})
	}, []);



	//Botão de execução do pedido
	function Execucao(valor, ID, index) {
		var val = valor;
		return (
			<Switch value={val ? true : false} onValueChange={() => {
				Alert.alert(
					"Atenção!",
					val ? "Deseja realmente retirar este pedido da execução?" : "Deseja realmente por este pedido em execução?",
					[
						{
							text: "Não",
							onPress: () => null,
							style: "cancel"
						},
						{
							text: "Sim",
							onPress: () => {
								DB.collection('Pedidos')
									.where('ID_pdd', '==', ID)
									.get().then(snp => {
										val = val ? false : true;
										setId(snp.docs.map((sn) => {
											DB.collection('Pedidos')
												.doc(sn.id)
												.update({
													Execucao: val
												})
										})
										)
									}).catch(e => {
										console.log(e)
									})
							}
						}
					]
				);

			}} />
		);
	}

	function Entrega(valor, ID, index) {
		var val = valor;
		return (
			<Switch value={val} onValueChange={() => {
				DB.collection('Pedidos')
					.where('ID_pdd', '==', ID)
					.get().then(snp => {
						val = val ? false : true;
						setId(snp.docs.map((sn) => {
							DB.collection('Pedidos')
								.doc(sn.id)
								.update({
									Entrega: val
								})
						})
						);

						console.log(val);

					}).catch(e => {
						console.log(e)
					})
			}} />
		);
	}

	const pedidosUser = (array, hora) => {
		const pdd = array.map((ped, index) => {
			//console.log(hora)
			return (
				<View key={index} style={{ backgroundColor: "#040513", padding: 5, marginBottom: 5, }}>
					<View>
						<Text style={{ color: '#51557D', textAlign: 'right' }}>{hora}</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Icon type="FontAwesome5" name="caret-right" style={{ color: '#00D1FF', marginRight: 5 }} />
						<Text style={{ color: '#7EE8FF', fontSize: 16, fontWeight: 'bold' }}>{ped.prato + " com " + ped.acompanhamento}</Text>
					</View>

					<View style={{ backgroundColor: "#040513", paddingBottom: 10, paddingTop: 10, marginBottom: 10 }}>
						<View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ color: '#FF6B00', fontWeight: 'bold' }}>Medida: </Text>
							<Text style={{ color: '#fff' }}>{ped.Medida}</Text>
						</View>

						<View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ color: '#FF6B00', fontWeight: 'bold' }}>Valor: </Text>
							<Text style={{ color: '#fff' }}>{ped.Valor}</Text>
						</View>

						<View style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
							<Text style={{ color: '#FF6B00', fontWeight: 'bold' }}>Observação: </Text>
							<Text style={{ color: '#fff' }}>{ped.Observacao == "" ? "Nehuma" : ped.Observacao}</Text>
						</View>
					</View>
				</View>
			);
		});
		return pdd;
	}

	const ListP = () => {
		const m = listaPedidos.map((item, index) => {
			if (item.data().Execucao) {
				return (
					<View key={index}>
						<CardPedido nome={item.data().Endereco.Nome == null ? "" : item.data().Endereco.Nome} key={index}>

							{/** Pedido */}
							{pedidosUser(item.data().Pedido, item.data().Hora_Pedido)}

							<View style={{
								flexDirection: 'row', backgroundColor: '#040513', alignItems: 'center', justifyContent: 'center'
							}}>
								<Text style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: 13 }}>Total: </Text>
								<Text style={{ color: '#fff', fontSize: 13 }}>{item.data().Total_Pagar}</Text>
								<Text style={{ color: '#51557D', fontSize: 25 }}> | </Text>

								<Text style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: 13 }}>Em mãos: </Text>
								<Text style={{ color: '#fff', fontSize: 13 }}>{item.data().Dinheiro_em_Maos}</Text>
								<Text style={{ color: '#51557D', fontSize: 25 }}> | </Text>

								<Text style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: 13 }}>Troco: </Text>
								<Text style={{ color: '#fff', fontSize: 13 }}>{item.data().Troco}</Text>
							</View>

							{/** Endereço e dados para entrega */}
							<View style={{ backgroundColor: '#51557D', padding: 10, marginTop: 10, marginBottom: 10, borderRadius: 5, borderColor: '#575D9C', borderStyle: 'solid', borderWidth: 1 }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={{ backgroundColor: '#FF6B00', width: 15, height: 15, borderRadius: 7.5, marginRight: 5 }} />
									<Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Endereço</Text>
								</View>
								<View style={{ paddingLeft: 20 }}>
									<Text style={{ color: '#fff' }}>
										Rua {item.data().Endereco.Rua}, N°{item.data().Endereco.Numero} {item.data().Endereco.Complemento == "" ? '' : ", " + item.data().Endereco.Complemento}, {item.data().Endereco.Bairro}, {item.data().Endereco.Cidade}
									</Text>
									<Text style={{ color: '#fff' }}>Telefone : {item.data().Endereco.Telefone}</Text>
								</View>
							</View>

							{/** Botão para a execução do pedido */}
							<View style={{ borderBottomWidth: 1, borderBottomColor: '#51557D', margin: 10, marginBottom: 10 }} />
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View>
									<Text style={{ color: '#7EE8FF' }}>Execução</Text>
								</View>
								<View>
									{Execucao(item.data().Execucao, item.data().ID_pdd, index)}
								</View>
							</View>
						</CardPedido>
					</View>
				);
			} else {
				return null;
			}
		})
		return m;

	}

	return (
		<Container style={estilo.container}>
			<BtnNav />
			<Content>
				<Cabecalho titulo="Pedidos" subtitulo="Em execução" />
				{ListP()}
			</Content>
			<Fab
				position='topRight'
				direction="down"
				onPress={()=> navigation.navigate('ListaPedidos',{auto:0})}
				containerStyle={{marginTop:70}}
				style={{ backgroundColor: "#00D1FF" }}
			>
				<Icon name="arrow-left" type="FontAwesome5" style={{ color: '#fff', fontSize: 26 }} />
			</Fab>
			<RodaPe />
		</Container>
	);
};

export default PedidosExecucao;
