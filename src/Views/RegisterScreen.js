import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Keyboard,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import COLORS from "../const/colors";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import CustomLoader from "../Components/CustomLoader";
import { auth } from "../../firebaseAuth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

const RegisterScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fullname: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const register = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      const db = getFirestore();
      await setDoc(doc(db, "users", userCredential.user.uid), {
        fullname: inputs.fullname,
        email: inputs.email,
      });
      setLoading(false);
      navigation.navigate("LoginScreen");
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", error.message);
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
      <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <CustomLoader visible={loading} />
        <ScrollView
          contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}
        >
          <Text
            style={{
              color: COLORS.black,
              fontSize: 50,
              fontWeight: "300",
              fontStyle: "italic",
            }}
          >
            Registre-se
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
            Notes App.
          </Text>

          <View style={{ marginVertical: 20 }}>
            <CustomInput
              onChangeText={(text) => handleOnChange(text, "fullname")}
              onFocus={() => handleError(null, "fullname")}
              iconName="account-outline"
              label="Nome Completo"
              placeholder="Coloque seu nome completo"
              error={errors.fullname}
            />

            <CustomInput
              onChangeText={(text) => handleOnChange(text, "email")}
              onFocus={() => handleError(null, "email")}
              iconName="email-outline"
              label="Email"
              keyboardType="email-address"
              placeholder="Endereço de email"
              error={errors.email}
              autoCapitalize="none"
            />

            <CustomInput
              onChangeText={(text) => handleOnChange(text, "password")}
              onFocus={() => handleError(null, "password")}
              iconName="lock-outline"
              label="Senha"
              placeholder="Crie uma senha"
              error={errors.password}
              password
            />

            {/* Botão para confirmar o registro*/}
            <CustomButton title="Registrar-se" onPress={validate} />

            {/* Caso ja tenha uma conta basta ir para o login*/}
            <Text
              style={{
                color: COLORS.black,
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              Já tem uma conta?
              <Text
                onPress={() => navigation.navigate("LoginScreen")}
                style={{ color: COLORS.blue }}
              >
                {" "}
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default RegisterScreen;
