import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import {  StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../services/firebaseconnection';

export function Home({navigation}) {
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const listaCollectionRef = collection(db, 'Login');

	const addLogin = async() => {
		await addDoc(listaCollectionRef, { email: email, senha:senha });
	};
	async function createUser() {
		await createUserWithEmailAndPassword(auth, email, senha)
			.then(value => {
				addLogin(); 
			})
			.catch(error => {
				alert('Email ou senha inválidos ou já inseridos!');
			});
	}

	async function login() {
		await signInWithEmailAndPassword(auth, email, senha)
			.then(value => {
				setEmail('');
				setSenha('');
				navigation.navigate('Lista', {email:email});
			})
			.catch(error => alert('Email ou senha inválido!'));
	}
    
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Controle de Gastos</Text>
			<TextInput 
				placeholder='Email'
				placeholderTextColor="#313131"
				value={email}
				onChangeText={value => setEmail(value)}
				style={styles.input}
			/>
			<TextInput 
				secureTextEntry={true}
				placeholder='Senha'
				placeholderTextColor="#313131"
				value={senha}
				onChangeText={value => setSenha(value)}
				style={[styles.input, {marginBottom:10}]}
			/>
			<View style={styles.buttons}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => createUser()}
				><Text style={{textAlign:'center', color:'#fff'}}>Cadastrar</Text></TouchableOpacity>
				<TouchableOpacity
					style={styles.button}  
					onPress={() => login()}
				><Text style={{textAlign:'center', color:'#fff'}}>Entrar</Text></TouchableOpacity>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: '#313131',
		marginTop: 5,
		width: '80%',
		height: 50
	},
	title: {
		fontSize:30,
		marginBottom:40,
		color:'#1F995D'
	}, 
	button: {
		margin:10,
		borderRadius:5,
		backgroundColor:'#1F995D',
		padding:10,
		width:100,
		textAlign:'center'
	},
	buttons: {
		flexDirection:'row'
	}
});