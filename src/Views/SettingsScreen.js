import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView } from "react-native";
import CustomButton from "../Components/CustomButton";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseAuth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SettingsScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [userInfos, setUserInfos] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const db = getFirestore();
        // Busca informações do usuário na coleção 'users'
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserDetails({ uid: currentUser.uid, ...userDocSnap.data() });

          // Busca informações do usuário na coleção 'infos'
          const infoQuery = query(
            collection(db, "infos"),
            where("userId", "==", currentUser.uid)
          );
          const infoSnapshot = await getDocs(infoQuery);
          if (!infoSnapshot.empty) {
            setUserInfos({
              id: infoSnapshot.docs[0].id,
              ...infoSnapshot.docs[0].data(),
            });
          }
        } else {
          console.log("Documento não existente");
        }
      }
    });

    // Debug para verificar se os dados de userInfos estão corretos

    return unsubscribe;
  }, [userInfos]);

  const logOut = async () => {
    try {
      await signOut(auth);
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Logout falhou", error);
    }
  };

  // Função para navegar para a tela de edição
  const navigateToEditScreen = () => {
    // Simplesmente navegue para a tela de edição com userInfos
    navigation.navigate("EditInfoScreen", { userInfos });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <Icon
        style={{ fontSize: 38, marginLeft: 20, marginTop: 20 }}
        name={"arrow-left"}
        onPress={() => navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          paddingVertical: 100,
          justifyContent: "center",
          marginHorizontal: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "300" }}></Text>
        <CustomButton
          title="Editar Informações"
          onPress={navigateToEditScreen}
        />
        <CustomButton title="Sair" onPress={logOut} />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
