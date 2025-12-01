// App.js
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';

// telas reais
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import ForgotPassword from './src/screens/ForgotPassword';
import Dashboard from './src/screens/Dashboard';
import Goals from './src/screens/Goals';
import NewGoal from './src/screens/NewGoal';
import Profile from './src/screens/Profile';
import Transactions from './src/screens/Transactions';
import Relatorio from './src/screens/relatorio';

enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Goals" component={Goals} />
        <Stack.Screen name="NewGoal" component={NewGoal} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Transactions" component={Transactions} />
        <Stack.Screen name="Relatorio" component={Relatorio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}