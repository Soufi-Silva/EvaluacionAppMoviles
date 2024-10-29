//PAGINA INICIAL DONDE ESTAN LOS CUADROS CON INFO 

import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable, StyleSheet } from "react-native"

function ReporteItem(props){

    const navigator = useNavigation();

    function goToEdit(){
        navigator.navigate('Edit',{id:props.id})
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={goToEdit}>
                <View>
                    <Text style={styles.text}>{props.name}</Text>
                    <Text style={styles.text}>{props.date}</Text>
                    
                </View>
            </Pressable>
        </View>
    )
}

export default ReporteItem;

const styles = StyleSheet.create({
    container:{
        marginVertical:16,
        marginHorizontal:40,
        backgroundColor:'#204C68',
        padding:8,
        borderRadius:10,
        width: 300,
        height: 300

    },
    text:{
        color:'#fff'
    }
});



