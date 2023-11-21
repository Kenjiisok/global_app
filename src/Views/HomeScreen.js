import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import CustomButton from "../Components/CustomButton";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseAuth";
import { StatusBar } from "expo-status-bar";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const HomeScreen = ({ navigation }) => {
  const [infos, setInfos] = useState([]);

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
    return unsubscribe; // importante para desinscrever
  }, []);

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
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
