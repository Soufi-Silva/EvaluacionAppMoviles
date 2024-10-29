//PAGINA DE CREAR REPORTE
import { View, Text, Button, Modal, TextInput, StyleSheet, Image} from "react-native";
import IconButton from "./IconButton";
import { useContext, useState } from "react";
import { ReporteContext } from "../store/reporte-context";
import { saveReporte } from "../http";
import logo from '../assets/logo.png';


function NewReporte(props){
    const reporteCTX = useContext(ReporteContext);
    const [name, setName] = useState('')
    
    function addReporte(){
        reporteCTX.addReporte({
            id:name,
            name:name,
            date:Date()

        })
        saveReporte({name:name, date:Date()})
        props.hideModal()
    }

    return (
        <Modal visible={props.showModal} animationType="slide" >
            <View style={styles.container}>
                <View>
                    <Image source= {logo} style = {{height:150, width:150}}/>
                </View>

                <View style={styles.close} >
                    <IconButton name='close' color='white' onPress={props.hideModal} />
                </View>
                
                <Text style={styles.text}>Nuevo Reporte</Text>

                <TextInput 
                    onChangeText={(text)=>{setName(text)}}
                    style={styles.input}
                    placeholder="alguna incidencia"
                    color='white' />

                <Button title="Postear" onPress={addReporte} />
            </View>

        </Modal>
    )

}

export default NewReporte

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#204C68'
    },
    input:{
        padding:8,
        borderWidth:1,
        borderColor:'#6393A6',
        width:'80%',
        marginVertical:8, 
        backgroundColor: '#6393A6',
        with:250,
        height:200,
        borderRadius: 15,
    
    },
    close:{
        position:'absolute',
        top:50,
        right:0
    },
    text:{
        color:'#fff'
    }
})