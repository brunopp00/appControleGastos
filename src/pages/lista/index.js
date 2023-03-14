import { collection, doc, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { db } from '../../services/firebaseconnection';
import { Octicons, AntDesign } from '@expo/vector-icons'; 

export default function Lista({navigation, route}) {
	const [lista, setLista] = useState([]);
    const [valorTotal, setValorTotal] = useState(0)

	async function deleteGasto(id){
		const userDoc = doc(db, 'Gastos', id);
		await deleteDoc(userDoc);
		getList();
	} 
    
	const listaCollectionRef = collection(db, 'Gastos');
    
	const getList = useCallback( async () => {
		const data = query(listaCollectionRef, where('email', '==', route.params.email));
		const querySnapshop = await getDocs(data);
		const list = [];
		querySnapshop.forEach((doc) => {
			list.push({...doc.data(), id:doc.id});
		});
		setLista(list);
        somandoValorTotal(list)
	}, []);
    
	useEffect(() => {
        getList();
	}, [getList]);
    
    
    const somandoValorTotal = (list) => {
    var soma = 0
        for(var i = 0; i < list.length; i++){
            soma += list[i].valor
        }
        setValorTotal(soma)
    }
    
    
    
    
	return(
        <>
            <View style={styles.container}>
                <Text style={styles.valorTotal}>Valor Total: R${valorTotal}</Text>
                <FlatList 
                    showsVerticalScrollIndicator={true}
                    data={lista}
                    renderItem={( item ) => {
                        return(
                            <View style={styles.gastos}>
                                <Text style={styles.descricao}>R${item.item.valor} - {item.item.descricao}</Text>
                                <TouchableOpacity style={styles.deleteGastos}
                                    onPress={() => deleteGasto(item.item.id)}>
                                    <Octicons  
                                        name="trash"
                                        size={25}
                                        color='#fff'
                                    >
                                    </Octicons>                                  
                                </TouchableOpacity>
                            </View>);
                    }}
                    />
                    <TouchableOpacity style={styles.buttonAtualiza}
                        onPress={() => getList()}>
                        <AntDesign 
                            name="reload1"
                            size={25}
                            color='#fff'
                        ></AntDesign>
                    </TouchableOpacity>
                <TouchableOpacity style={styles.buttonNewGasto}
                    onPress={() => navigation.navigate('Novo Gasto', {email: route.params.email})}>
                    <Text style={styles.iconbutton}>+</Text>
                </TouchableOpacity>
            </View>
        </>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor:'#fff',
		paddingTop: 20
	},
    valorTotal: {
        backgroundColor:'#1F995D',
        width:'100%',
        textAlign:'center',
        color:'#fff',
        fontSize:40,
        marginBottom:10
    },
	iconbutton: {
		color: '#fff',
		fontWeight:'bold',
		fontSize:25
	},
	buttonNewGasto: {
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
	buttonAtualiza: {
		width:270,
		height:60,
		position:'absolute',
		bottom:30,
		left:100,
		backgroundColor:'#1F995D',
		borderRadius:50,
		justifyContent:'center',
		alignItems:'center'
	},
	gastos: {
		width:'100%',
		flexDirection:'row',
		marginTop:5
	},
	deleteGastos: {
		width:'10%',
		height:40,
        marginLeft:10,
		backgroundColor:'#1F995D',
		borderRadius:50,
		justifyContent:'center',
		alignItems:'center'
	},
	descricao: {
        marginLeft:5,
		width: '82%',
		alignContent:'flex-start',
		backgroundColor: '#f5f5f5',
		padding:12,
		paddingHorizontal:20,
		borderRadius:50,
		marginBottom:5,
		color:'#282b2db5'
	}
});