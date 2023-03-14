import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './src/pages/home';
import Lista from './src/pages/lista';
import NovoGasto from './src/pages/novoGasto';

const Stack = createStackNavigator();

export default function App() {

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Controle de Gastos'>
				<Stack.Screen
					name='Controle de Gastos'
					component={Home}
					options={{
						headerTintColor:'#1F995D',
					}}
				/>
				<Stack.Screen
					name='Lista'
					component={Lista}
					options={{
						headerTintColor:'#1F995D'
					}}
				/>
				<Stack.Screen
					name='Novo Gasto'
					component={NovoGasto}
					options={{
						headerTintColor:'#1F995D'
					}}
				/>
				{/* <Stack.Screen
					name='Editar'
					component={Editar}
					options={{
						headerTintColor:'#1F995D'
					}}
				/> */}
			</Stack.Navigator>
		</NavigationContainer>
	);
}