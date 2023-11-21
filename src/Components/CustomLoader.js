import React from "react";
import { View, StyleSheet, useWindowDimensions, ActivityIndicator, Text} from "react-native";
import COLORS from "../const/colors";

// Componente loader, para o usuario identificar que a ação dele foi contabilizada.
const CustomLoader = ({visible = false}) => {
    const {height, width} = useWindowDimensions()
    return visible && <View style={[style.container, {height, width}]}>
        <View style={style.loader}>
            <ActivityIndicator size="large" color={COLORS.grey}/>
            <Text style={{marginRight: 10, fontSize: 16, marginLeft: 65, fontWeight: 'bold'}}>Carregando</Text>
        </View>
    </View>
} 

// Estilizações do componente

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
    },
    loader: {
        height: 70,
        backgroundColor: COLORS.white,
        marginHorizontal: 50,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    }
})

export default CustomLoader;