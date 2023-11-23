import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomButton from "../Components/CustomButton";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseAuth";
import { StatusBar } from "expo-status-bar";
import {
  collection,
  getDocs,
  query,
  where,
  getFirestore,
} from "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";
import { Configuration, OpenAIApi } from "openai";
import { OPEN_AI_KEY } from "@env";

// Configuração da API do OpenAI
const configuration = new Configuration({ apiKey: OPEN_AI_KEY });
const openAI = new OpenAIApi(configuration);

const HomeScreen = ({ navigation }) => {
  const [infos, setInfos] = useState([]);
  const [workout, setWorkout] = useState("");

  const fetchInfo = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const db = getFirestore();
      const infoRef = collection(db, "infos");
      const q = query(infoRef, where("userId", "==", currentUser.uid));
      const infosSnapshot = await getDocs(q);
      const infosList = infosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInfos(infosList);
    }
  };

  useEffect(() => {
    fetchInfo();
    const unsubscribe = onAuthStateChanged(auth, fetchInfo);
    return unsubscribe;
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchInfo();
    }, [])
  );

  const generateWorkout = async () => {
    try {
      const prompt = `Gerar um plano de treino para uma pessoa com as seguintes informações: ${JSON.stringify(
        infos
      )}`;
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPEN_AI_KEY}`, // Sua chave da API OpenAI
          },
          body: JSON.stringify({
            prompt: prompt,
            temperature: 0.7,
            max_tokens: 150,
          }),
        }
      );

      const data = await response.json();
      setWorkout(data.choices[0].text.trim());
    } catch (error) {
      console.error("Erro ao gerar treino: ", error);
      Alert.alert("Erro", "Não foi possível gerar o treino.");
    }
  };

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>IncluStep.</Text>
          <Icon
            style={styles.icon}
            name={"cog-outline"}
            onPress={() => navigation.navigate("SettingsScreen")}
          />
        </View>

        <View style={styles.infoContainer}>
          {infos.map((info) => (
            <View key={info.id} style={styles.infoCard}>
              <Text style={styles.infoText}>Nome: {info.nome}</Text>
              <Text style={styles.infoText}>Idade: {info.idade}</Text>
              <Text style={styles.infoText}>Peso: {info.peso}</Text>
              <Text style={styles.infoText}>Descrição: {info.descricao}</Text>
            </View>
          ))}
          <View style={{ margin: 20 }}>
            <CustomButton title="Gerar Treino" onPress={generateWorkout} />
            {workout ? <Text style={styles.workoutText}>{workout}</Text> : null}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  workoutText: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 70,
  },
  title: {
    fontSize: 50,
    fontWeight: "200",
    fontStyle: "italic",
  },
  icon: {
    fontSize: 38,
    marginRight: 20,
  },
  infoContainer: {
    // estilos para o container das informações
  },
  infoCard: {
    // estilos para cada cartão de informação
  },
  infoText: {
    // estilos para o texto das informações
  },
});

export default HomeScreen;
