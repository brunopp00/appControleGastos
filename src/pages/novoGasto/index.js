import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { db } from '../../services/firebaseconnection';

export default function NovoGasto({navigation, route}) {

	const [valor, setValor] = useState('');
	const [descricao, setDescricao] = useState('');
	const listaCollectionRef = collection(db, 'Gastos');
	const addGasto = async() => {
		await addDoc(listaCollectionRef, { valor: Number(valor.replace(',', '.')), descricao:descricao, email:route.params.email });
		navigation.navigate('Lista', { email: route.params.email});
	};

	return(
		<View style={styles.container}>
			<Text style={styles.label}>Valor</Text>
			<TextInput style={styles.input} placeholder='Ex: R$10.00' onChangeText={setValor} value={valor}/>
			<Text style={styles.label}>Descrição</Text>
			<TextInput style={styles.input} placeholder='Ex: Mercado' onChangeText={setDescricao} value={descricao}/>
			<TouchableOpacity style={styles.buttonNovoGasto} onPress={() => addGasto()}>
				<Text style={styles.iconButton}>Salvar</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#fff',
	},
	label: {
		width:'90%',
		marginTop:20,
		marginLeft:20,
		fontSize:16,
		color: '#1F995D'
	},
	input: {
		width:'90%',
		marginTop:10,
		padding:10,
		height:50,
		borderBottomWidth:1,
		borderBottomColor:'#1F995D',
		marginLeft:'auto',
		marginRight:'auto'
	},
	buttonNovoGasto: {
		width:60,
		height:60,
		position:'absolute',
		bottom:30,
		left:20,
		backgroundColor:'#1F995D',
		borderRadius:50,
		justifyContent:'center',
		alignItems:'center'
	},
	iconButton: {
		color:'#fff',
		fontSize:16,
		fontWeight:'bold'
	}
});