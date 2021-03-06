import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Modal, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import db, { firebase } from '@react-native-firebase/firestore';
import { Button, Card, Container, Content, Fab, Icon, Right, Switch, Tab, Text, Tabs, Badge } from 'native-base';
import DadosApp from '../cfg';
import { BtnNav, Cabecalho } from '../components/header';
import { CardPedido, CardST } from '../components';
import RodaPe from '../components/footerTab';
import estilo from '../style';
import Cardapio from '../components/tabs/tabCardapio';
import moment from 'moment';
moment.locale('pt-br');

const InfData = moment().format('L');
const Hora = moment().format('LT');
const INF = DadosApp();
const DB = db().collection(INF.Categoria).doc(INF.ID_APP);

const ListaPedidos = ({ navigation }) => {

	const [listaPedidos, setListaPedidos] = useState([]);
	const [contaPedidos, setContaPedidos] = useState([]);
	const [contaExecucao, setContaExecucao] = useState([]);
	const [contaEntrega, setContaEntrega] = useState([]);
	const [id, setId] = useState();
	const [hora, setHora] = useState(moment().format('LTS'));
	const [data, setData] = useState(moment().format('L'));
	const [segundo, setSegundo] = useState(0);
	const [abas, setAbas] = useState(0);

	useEffect(() => {
		const DBs = DB.collection('Pedidos')
			.where('Data_Pedido', '==', data)
			.orderBy("Hora_Pedido", "asc")
			.onSnapshot(snp => {
				setListaPedidos(snp.docs)
			});

			return ()=> DBs();
	}, []);

	useFocusEffect(React.useCallback(() => {
		const subscriber = DB.collection('Pedidos')
			.where('Data_Pedido', '==', InfData)
			.where('Execucao', '==', false)
			.where('Entrega', '==', false)
			.onSnapshot(snp => {
				setContaPedidos(snp.docs);
			});
		return () => subscriber();
	}, [])); //Conta Pedidos

	useFocusEffect(React.useCallback(() => {
		const subscriber = DB.collection('Pedidos')
			.where('Data_Pedido', '==', InfData)
			.where('Execucao', '==', true)
			.where('Entrega', '==', false)
			.onSnapshot(snp => {
				setContaExecucao(snp.docs);
			});
		return () => subscriber();
	}, [])); //Conta Pedidos em Execu????o

	useFocusEffect(React.useCallback(() => {
		const subscriber = DB.collection('Pedidos')
			.where('Data_Pedido', '==', InfData)
			.where('Execucao', '==', true)
			.where('Entrega', '==', true)
			.onSnapshot(snp => {
				setContaEntrega(snp.docs);
			});
		return () => subscriber();
	}, [])); //Conta Pedidos pronto pra entrega

	function Execucao(valor, ID, index) {
		var val = valor;
		return (
			<Switch value={val ? true : false} onValueChange={() => {
				Alert.alert(
					"Aten????o!",
					val ? "Deseja realmente retirar este pedido da execu????o?" : "Deseja realmente por este pedido em execu????o?",
					[
						{
							text: "N??o",
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
									})
							}
						}
					]
				);

			}} />
		);
	}//Bot??o de execu????o do pedido

	function Entrega(valor, ID, index) {
		var val = valor;
		return (
			<Switch value={val ? true : false} onValueChange={() => {
				Alert.alert(
					"Aten????o!",
					val ? "Deseja realmente retirar este pedido da execu????o?" : "Deseja realmente por este pedido em execu????o?",
					[
						{
							text: "N??o",
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
													Entrega: val
												})
										})
										)
									}).catch(e => {
									})
							}
						}
					]
				);

			}} />
		);
	}

	const pedidosUser = (array, hora) => {
		const pdd = array.map((ped, index) => {
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
							<Text style={{ color: '#FF6B00', fontWeight: 'bold' }}>Observa????o: </Text>
							<Text style={{ color: '#fff' }}>{ped.Observacao == "" ? "Nehuma" : ped.Observacao}</Text>
						</View>
					</View>
				</View>
			);
		});
		return pdd;
	}

	const CartaoDinheiro = ({ modoPagamento, emMaos, troco }) => {

		if (modoPagamento == 'Dinheiro') {
			return (
				<View style={{flexDirection:'row',alignItems:'center',}}>
					<Text style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: 13 }}>Em m??os: </Text>
					<Text style={{ color: '#fff', fontSize: 13 }}>{emMaos}</Text>
					<Text style={{ color: '#51557D', fontSize: 25 }}> | </Text>

					<Text style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: 13 }}>Troco: </Text>
					<Text style={{ color: '#fff', fontSize: 13 }}>{troco}</Text>
				</View>
			);
		}else{

			return(
				<View style={{flexDirection:'row'}}>
					<Text style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: 13 }}>M.Pagamento: </Text>
					<Text style={{ color: '#fff', fontSize: 13 }}>Cart??o</Text>
				</View>
			);

		}

	}

	const ListP = () => {
		const m = listaPedidos.map((item, index) => {

			if (item.data().Execucao == false) {

				return (
					<View key={index} style={{ backgroundColor: '#333651' }}>
						<CardPedido nome={item.data().Endereco.Nome == null ? "" : item.data().Endereco.Nome} key={index}>

							{/** Pedido */}
							{pedidosUser(item.data().Pedido, item.data().Hora_Pedido)}

							<View style={{
								flexDirection: 'row', backgroundColor: '#040513', alignItems: 'center', justifyContent: 'center'
							}}>
								<Text style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: 13 }}>Total: </Text>
								<Text style={{ color: '#fff', fontSize: 13 }}>{item.data().Total_Pagar}</Text>
								<Text style={{ color: '#51557D', fontSize: 25 }}> | </Text>
									
								<CartaoDinheiro modoPagamento={item.data().Forma_de_Pagamento} emMaos={item.data().Dinheiro_em_Maos} troco={item.data().Troco}/>

							</View>

							{/** Endere??o e dados para entrega */}
							<View style={{ backgroundColor: '#51557D', padding: 10, marginTop: 10, marginBottom: 10, borderRadius: 5, borderColor: '#575D9C', borderStyle: 'solid', borderWidth: 1 }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={{ backgroundColor: '#FF6B00', width: 15, height: 15, borderRadius: 7.5, marginRight: 5 }} />
									<Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Endere??o</Text>
								</View>
								<View style={{ paddingLeft: 20 }}>
									<Text style={{ color: '#fff' }}>
										Rua {item.data().Endereco.Rua}, N??{item.data().Endereco.Numero} {item.data().Endereco.Complemento == "" ? '' : ", " + item.data().Endereco.Complemento}, {item.data().Endereco.Bairro}, {item.data().Endereco.Cidade}
									</Text>
									<Text style={{ color: '#fff' }}>P. Refer??ncia: {item.data().Endereco.PontoReferencia == '' ? 'Nenhum' : item.data().Endereco.PontoReferencia}</Text>
									<Text style={{ color: '#fff' }}>Telefone : {item.data().Endereco.Telefone}</Text>
								</View>
							</View>

							{/** Bot??o para a execu????o do pedido */}
							<View style={{ borderBottomWidth: 1, borderBottomColor: '#51557D', margin: 10, marginBottom: 10 }} />
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View>
									<Text style={{ color: '#7EE8FF' }}>Execu????o</Text>
								</View>
								<View>
									{Execucao(item.data().Execucao, item.data().ID_pdd, index)}
								</View>
							</View>
						</CardPedido>
					</View>
				);
			}
		})
		return m;

	}

	const ListExec = () => {
		const m = listaPedidos.map((item, index) => {

			if (item.data().Entrega == false && item.data().Execucao == true) {
				return (
					<View key={index} style={{ backgroundColor: '#333651' }}>
						<CardPedido nome={item.data().Endereco.Nome == null ? "" : item.data().Endereco.Nome} key={index}>

							{/** Pedido */}
							{pedidosUser(item.data().Pedido, item.data().Hora_Pedido)}

							<View style={{
								flexDirection: 'row', backgroundColor: '#040513', alignItems: 'center', justifyContent: 'center'
							}}>
								<Text style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: 13 }}>Total: </Text>
								<Text style={{ color: '#fff', fontSize: 13 }}>{item.data().Total_Pagar}</Text>
								<Text style={{ color: '#51557D', fontSize: 25 }}> | </Text>

								<CartaoDinheiro modoPagamento={item.data().Forma_de_Pagamento} emMaos={item.data().Dinheiro_em_Maos} troco={item.data().Troco}/>

							</View>

							{/** Endere??o e dados para entrega */}
							<View style={{ backgroundColor: '#51557D', padding: 10, marginTop: 10, marginBottom: 10, borderRadius: 5, borderColor: '#575D9C', borderStyle: 'solid', borderWidth: 1 }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={{ backgroundColor: '#FF6B00', width: 15, height: 15, borderRadius: 7.5, marginRight: 5 }} />
									<Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Endere??o</Text>
								</View>
								<View style={{ paddingLeft: 20 }}>
									<Text style={{ color: '#fff' }}>
										Rua {item.data().Endereco.Rua}, N??{item.data().Endereco.Numero} {item.data().Endereco.Complemento == "" ? '' : ", " + item.data().Endereco.Complemento}, {item.data().Endereco.Bairro}, {item.data().Endereco.Cidade}
									</Text>
									<Text style={{ color: '#fff' }}>P. Refer??ncia: {item.data().Endereco.PontoReferencia == '' ? 'Nenhum' : item.data().Endereco.PontoReferencia}</Text>
									<Text style={{ color: '#fff' }}>Telefone : {item.data().Endereco.Telefone}</Text>
								</View>
							</View>

							{/** Bot??o para a execu????o do pedido */}
							<View style={{ borderBottomWidth: 1, borderBottomColor: '#51557D', margin: 10, marginBottom: 10 }} />
							<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
								<View>
									<Text style={{ color: '#7EE8FF' }}>Entrega</Text>
								</View>
								<View>
									{Entrega(item.data().Entrega, item.data().ID_pdd, index)}
								</View>
							</View>
						</CardPedido>
					</View>
				);
			}
		})
		return m;

	}

	const ListFim = () => {
		const m = listaPedidos.map((item, index) => {

			if (item.data().Entrega == true && item.data().Execucao == true) {
				return (
					<View key={index} style={{ backgroundColor: '#333651' }}>
						<CardPedido nome={item.data().Endereco.Nome == null ? "" : item.data().Endereco.Nome} key={index}>

							{/** Pedido */}
							{pedidosUser(item.data().Pedido, item.data().Hora_Pedido)}

							<View style={{
								flexDirection: 'row', backgroundColor: '#040513', alignItems: 'center', justifyContent: 'center'
							}}>
								<Text style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: 13 }}>Total: </Text>
								<Text style={{ color: '#fff', fontSize: 13 }}>{item.data().Total_Pagar}</Text>
								<Text style={{ color: '#51557D', fontSize: 25 }}> | </Text>

								<CartaoDinheiro modoPagamento={item.data().Forma_de_Pagamento} emMaos={item.data().Dinheiro_em_Maos} troco={item.data().Troco}/>

							</View>

							{/** Endere??o e dados para entrega */}
							<View style={{ backgroundColor: '#51557D', padding: 10, marginTop: 10, marginBottom: 10, borderRadius: 5, borderColor: '#575D9C', borderStyle: 'solid', borderWidth: 1 }}>
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<View style={{ backgroundColor: '#FF6B00', width: 15, height: 15, borderRadius: 7.5, marginRight: 5 }} />
									<Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Endere??o</Text>
								</View>
								<View style={{ paddingLeft: 20 }}>
									<Text style={{ color: '#fff' }}>
										Rua {item.data().Endereco.Rua}, N??{item.data().Endereco.Numero} {item.data().Endereco.Complemento == "" ? '' : ", " + item.data().Endereco.Complemento}, {item.data().Endereco.Bairro}, {item.data().Endereco.Cidade}
									</Text>
									<Text style={{ color: '#fff' }}>P. Refer??ncia: {item.data().Endereco.PontoReferencia == '' ? 'Nenhum' : item.data().Endereco.PontoReferencia}</Text>
									<Text style={{ color: '#fff' }}>Telefone : {item.data().Endereco.Telefone}</Text>
								</View>
							</View>
						</CardPedido>
					</View>
				);
			}
		})
		return m;

	}

	const ContaPedidos = ({ modo }) => {
		switch (modo) {
			case 'pedidos':
				return (
					<Badge style={{ position: 'relative', top: -15 }}>
						<Text style={{ fontSize: 10 }}>{contaPedidos.length}</Text>
					</Badge>
				);
			case 'execucao':
				return (
					<Badge style={{ position: 'relative', top: -15 }}>
						<Text style={{ fontSize: 10 }}>{contaExecucao.length}</Text>
					</Badge>
				);
			case 'entrega':
				return (
					<Badge style={{ position: 'relative', top: -15 }}>
						<Text style={{ fontSize: 10 }}>{contaEntrega.length}</Text>
					</Badge>
				);
		}
	};

	const Abas = () => {
		return (
			<View>
				<View>
					<View style={estiloTab.containerTab}>
						<TouchableOpacity style={{
							flexDirection: 'row',
							backgroundColor: abas != 0 ? '#3E4168' : '#51557D',
							flex: 1,
							marginRight: 2,
							justifyContent: 'center',
							alignItems: 'center',
							borderTopLeftRadius: 5,
							borderBottomLeftRadius: 5,
						}}
							onPress={() => {
								setAbas(0);
							}}>
							<Text style={estiloTab.textTab}>Pedido</Text>
							{contaPedidos.length != 0 ? <ContaPedidos modo="pedidos" /> : null}
						</TouchableOpacity>
						<TouchableOpacity style={{
							flexDirection: 'row',
							backgroundColor: abas != 1 ? '#3E4168' : '#51557D',
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
						}}
							onPress={() => {
								setAbas(1);
							}}>
							<Text style={estiloTab.textTab}>Execu????o</Text>
							{contaExecucao.length != 0 ? <ContaPedidos modo="execucao" /> : null}
						</TouchableOpacity>
						<TouchableOpacity style={{
							flexDirection: 'row',
							backgroundColor: abas != 2 ? '#3E4168' : '#51557D',
							flex: 1,
							marginLeft: 2,
							justifyContent: 'center',
							alignItems: 'center',
							borderTopRightRadius: 5,
							borderBottomRightRadius: 5,

						}}
							onPress={() => {
								setAbas(2);
							}}>
							<Text style={estiloTab.textTab}>Entrega</Text>
							{contaEntrega.length != 0 ? <ContaPedidos modo="entrega" /> : null}
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}//Abas dos pedidos

	const Pag = () => {
		switch (abas) {
			case 0:
				return ListP();
			case 1:
				return ListExec();
			case 2:
				return ListFim();
		}
	}//P??ginas

	return (
		<Container style={estilo.container}>
			<BtnNav />
			<Cabecalho titulo="Pedidos" subtitulo="Lista de pedidos" />
			<Abas />
			<Content>
				<Pag />
			</Content>
			<RodaPe />
		</Container>
	);
};

const estiloTab = StyleSheet.create({
	containerTab: {
		justifyContent: 'center',
		flexDirection: 'row',
		margin: 10,
	},
	textTab: {
		color: '#fff',
		fontSize: 14,
		textAlign: 'center',
		marginTop: 10,
		marginBottom: 10,
	}
});

export default ListaPedidos;
