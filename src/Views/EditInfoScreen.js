import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import CustomInput from "../Components/CustomInput";
import CustomButton from "../Components/CustomButton";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import COLORS from "../const/colors";

const EditInfoScreen = ({ route, navigation }) => {
  const [info, setInfo] = useState({
    nome: "",
    idade: "",
    peso: "",
    descricao: "",
  });

  useEffect(() => {
    if (route.params?.userInfos) {
      setInfo(route.params.userInfos);
    } else {
      Alert.alert("Erro", "Informações do usuário não encontradas.");
      navigation.goBack(); // Retorna para a tela anterior se não houver dados
    }
  }, [route.params?.userInfos]);

  const handleUpdate = async () => {
    // Verifica se userInfos e id estão disponíveis
    if (!route.params?.userInfos || !route.params.userInfos.id) {
      Alert.alert("Erro", "Não foi possível atualizar as informações.");
      return;
    }

    const db = getFirestore();
    const infoRef = doc(db, "infos", route.params.userInfos.id);

    try {
      await updateDoc(infoRef, info);
      Alert.alert("Sucesso", "Informações atualizadas com sucesso!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar as informações.");
      console.error("Erro ao atualizar informações: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.whitem }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 25, paddingTop: 40 }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
          Editar Informações
        </Text>

        <CustomInput
          label="Nome"
          value={info.nome}
          onChangeText={(text) => setInfo({ ...info, nome: text })}
        />
        <CustomInput
          label="Idade"
          value={info.idade}
          onChangeText={(text) => setInfo({ ...info, idade: text })}
          keyboardType="numeric"
        />
        <CustomInput
          label="Peso"
          value={info.peso}
          onChangeText={(text) => setInfo({ ...info, peso: text })}
          keyboardType="numeric"
        />
        <CustomInput
          label="Descrição"
          value={info.descricao}
          onChangeText={(text) => setInfo({ ...info, descricao: text })}
          multiline
        />

        <CustomButton title="Salvar Alterações" onPress={handleUpdate} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditInfoScreen;
