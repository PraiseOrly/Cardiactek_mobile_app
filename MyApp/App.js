import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './src/screens/AuthScreen';
import PatientPortal from './src/screens/PatientPortal';
import DoctorPortal from './src/screens/DoctorPortal';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PatientPortal" component={PatientPortal} />
        <Stack.Screen name="DoctorPortal" component={DoctorPortal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
