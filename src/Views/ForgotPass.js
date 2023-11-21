import React, { useState } from 'react';
import { Text, SafeAreaView, View, Alert } from 'react-native';
import { auth } from '../../firebaseAuth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { StatusBar } from 'expo-status-bar';
import COLORS from '../const/colors';
import CustomLoader from "../Components/CustomLoader";
import CustomInput from "../Components/CustomInput"
import CustomButton from "../Components/CustomButton"

//Armazena o email e seta o loading
export const ForgotPass = () => {
  const [email, setEmail] = useState(''); 
  const [loading, setLoading] = useState(false); 


  //Funcao para resetar a senha com o firebase
  const resetPassword = () => {
    setLoading(true);
    sendPasswordResetEmail(auth, email) //Solicita o envio do email para redefinição
      .then(() => {
        Alert.alert('Sucesso', 'Email de redefinição enviado! Verifique sua caixa de entrada.');
        setLoading(false); 
      })
      .catch(error => {
        Alert.alert('Erro', error.message);
        setLoading(false); 
      });
  };

  return (
    <>
    <StatusBar/>
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <CustomLoader visible={loading} />
      <View style={{paddingTop: 90, paddingHorizontal: 25}}>
        <Text style={{color: COLORS.black, fontSize: 60, fontWeight: '200'}}>
          Recuperação de senha
        </Text>

        <Text
            style={{
              color: COLORS.black,
              fontSize: 20,
              fontStyle: "italic",
              fontWeight: "200",
              marginTop: 10,
            }}
          >
            IncluStep.
          </Text>
      </View>

      <View style={{marginTop: 60, marginHorizontal: 30}}>
        <CustomInput
          iconName="email-outline"
          placeholder="Email"
          label="Email de recuperação"
          keyboardType="email-address" 
          value={email} 
          autoCapitalize="none"
          onChangeText={setEmail} 
        />
      </View>

    {/* Botão para realizar a solicitação*/}
      <View style={{marginHorizontal: 30, marginTop: 10}}>
        <CustomButton title="Enviar" onPress={resetPassword} />
      </View>
    </SafeAreaView>
    </>
  );
};

export default ForgotPass;