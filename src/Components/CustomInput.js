import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../const/colors";

//Componente de input para padronização durante todo o aplicativo

//Propriedades do Input
const CustomInput = ({ iconName, password, label, onFocus = () => {}, ...props }) => {
  //Logica de UI para o usuario saber onde esta digitando
  const [isFocused, setIsFocused] = useState(false);
  //Logica para esconder a senha do usuario
  const [hidePassword, setHidePassword] = useState(password);

  return (
    <View style={{marginVertical: 15}}>
      <Text style={style.label}>{label}</Text>

      {/* "COLORS" vem da const Colors.js */}
      <View
        style={[
          style.inputContainer,
          { borderColor: isFocused ? COLORS.blue : COLORS.black },
        ]}
      >
        <Icon name={iconName} style={{ fontSize: 22, marginRight: 10 }} />

        {/* Muda a cor da borda do input de acordo com o que o usuario esta correspondendo */}
        <TextInput
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          {...props}
          style={{ flex: 1 }}
        />

        {/* Para o usuario poder mostrar ou esconder sua senha */}
        {password && (
          <Icon
            style={{ fontSize: 22 }}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            onPress={() => setHidePassword(!hidePassword)}
          />
        )}
      </View>
    </View>
  );
};

//Estilização
const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 10,
  },
});

export default CustomInput;
