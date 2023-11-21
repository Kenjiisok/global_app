import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import COLORS from "../const/colors";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import CustomLoader from "../Components/CustomLoader";
import { StatusBar } from "expo-status-bar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebaseAuth";
import { addDoc, collection } from "firebase/firestore";

const InfoScreen = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [descricao, setDescricao] = useState("");

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState(null);

  // Adiciona este useEffect para obter o usuário atual
  useEffect(() => {
    console.log("useEffect chamado para verificar o usuário");
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Usuário atual: ", currentUser);
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // Função para mandar os dados para a Firestore
  const handleAddInfo = async () => {
    console.log("Iniciando a adição de informações ao Firestore");

    // Verifique se todos os campos estão preenchidos
    if (!nome || !idade || !peso || !descricao) {
      console.log("Erro: Todos os campos são obrigatórios");
      return;
    }

    console.log("Verificações de campos passaram");

    if (user) {
      console.log("Usuário autenticado: ", user.uid);
      const infoData = {
        nome,
        idade,
        peso,
        descricao,
        userId: user.uid,
      };

      try {
        console.log("Tentando adicionar ao Firestore", infoData);
        const docRef = await addDoc(collection(db, "infos"), infoData);
        console.log("Informações adicionadas com sucesso, docRef: ", docRef);
        navigation.navigate("HomeScreen");
      } catch (error) {
        console.error("Erro ao adicionar informações ao Firestore: ", error);
      }
    } else {
      console.log("Usuário não está autenticado.");
    }
  };

  //Valida as informações
  const validateInfo = () => {
    let isValid = true;

    if (!nome) {
      handleError("Por favor insira seu nome", "nome");
      isValid = false;
    }

    if (!idade) {
      handleError("Por favor insira a idade", "idade");
      isValid = false;
    }
    if (!peso) {
      handleError("Por favor insira o peso", "peso");
      isValid = false;
    }
    if (!descricao) {
      handleError("Por favor insira a descricao", "descricao");
      isValid = false;
    }

    if (isValid) {
      handleAddInfo();
    }
  };

  // Função para manipular erros
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ backgroundColor: COLORS.whitem, flex: 1 }}>
          <StatusBar />
          <CustomLoader visible={loading} />
          <ScrollView contentContainerStyle={{ paddingHorizontal: 25 }}>
            <View style={{ paddingTop: 40 }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: 45,
                  fontWeight: "300",
                  fontStyle: "italic",
                }}
              >
                Mais informações
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

            <View style={{ marginVertical: 60 }}>
              <CustomInput
                onChangeText={setNome}
                onFocus={() => handleError(null, "fullname")}
                iconName="account-outline"
                label="Nome Completo"
                placeholder="Coloque seu nome completo"
                error={errors.fullname}
              />

              <CustomInput
                onChangeText={setIdade}
                onFocus={() => handleError(null, "idade")}
                iconName="counter"
                label="Idade"
                keyboardType="numeric"
                placeholder="Ex: 24"
                error={errors.idade}
              />

              <CustomInput
                onChangeText={setPeso}
                onFocus={() => handleError(null, "peso")}
                iconName="weight-lifter"
                label="Peso"
                keyboardType="numeric"
                placeholder="Ex: 68"
                error={errors.peso}
              />

              <CustomInput
                onChangeText={setDescricao}
                onFocus={() => handleError(null, "descricao")}
                iconName="typewriter"
                label="Descrição"
                placeholder="Descreva sua deficiência"
                error={errors.descricao}
              />

              {/* Botão que realiza o login */}
              <CustomButton title="Confirmar" onPress={validateInfo} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InfoScreen;
