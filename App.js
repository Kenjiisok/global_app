//OBS: O treino realmente demora para ser gerado, em torno de 1-2 minutos.
//Não achei maneiras de deixar ele mais rapido, espero que entenda.


import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/Views/LoginScreen";
import RegisterScreen from "./src/Views/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPass from "./src/Views/ForgotPass";
import InfoScreen from "./src/Views/InfoScreen";
import HomeScreen from "./src/Views/HomeScreen";
import SettingsScreen from "./src/Views/SettingsScreen";
import EditInfoScreen from "./src/Views/EditInfoScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <Stack.Screen name="ForgotPass" component={ForgotPass}/>
        <Stack.Screen name="InfoScreen" component={InfoScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        <Stack.Screen name="SettingsScreen" component={SettingsScreen}/>
        <Stack.Screen name="EditInfoScreen" component={EditInfoScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
