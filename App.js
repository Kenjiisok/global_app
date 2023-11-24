//Eduardo Kenji - RM94180
//Matheus de Deus - RM95021
//João Pacheco - RM94692
//João Alves - RM95265


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