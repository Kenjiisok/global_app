import React, { useState } from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import COLORS from "../const/colors"
import { auth } from "../../firebaseAuth";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../Components/CustomButton";
import CustomLoader from "../Components/CustomLoader";
import { signInWithEmailAndPassword } from "firebase/auth";
import CustomInput from "../Components/CustomInput";

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const login = async () => {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      console.log(user);
      navigation.replace("HomeScreen");
    } catch (error) {
      Alert.alert("dados invalidos");
      setLoading(false);
      console.log(error);
    }
  };

  //Funcao para manipular alterações
  const handleOnChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  //Função para manipular os erros
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={{ backgroundColor: COLORS.whitem, flex: 1 }}>
        <CustomLoader visible={loading} />
        <View style={{ paddingTop: 100, paddingHorizontal: 25 }}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: 45,
              fontWeight: "300",
              fontStyle: "italic",
            }}
          >
            Notes app.
          </Text>
        </View>

        <View style={{ marginVertical: 60, paddingHorizontal: 25 }}>
          <CustomInput
            onChangeText={(text) => handleOnChange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            keyboardType="email-address"
            placeholder="Seu email de cadastro"
            autoCapitalize="none"
            error={errors.email}
          />

          <CustomInput
            onChangeText={(text) => handleOnChange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Senha"
            password
            error={errors.password}
          />

          {/* Botão para redefinição de senha */}
          <Text
            onPress={() => navigation.navigate("ForgotPass")}
            style={{
              color: COLORS.blue,
              fontWeight: "bold",
              textAlign: "right",
              fontSize: 13,
              padding: 10,
              marginHorizontal: 15,
            }}
          >
            Esqueci minha senha
          </Text>

          {/* Botão que realiza o login */}
          <CustomButton title="Entrar" onPress={validate} />

          {/* Botão para criar uma nova conta */}
          <Text
            style={{
              color: COLORS.black,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Não tem uma conta?
            <Text
              onPress={() => navigation.navigate("RegisterScreen")}
              style={{ color: COLORS.blue }}
            >
              {" "}
              Registre-se
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default LoginScreen;
