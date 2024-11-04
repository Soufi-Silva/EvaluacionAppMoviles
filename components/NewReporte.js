import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, Modal, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveReporte } from '../http';
import { LocationContext } from '../context/LocationContext';

function NewReporte({ showModal, hideModal, onAddReporte }) {
    const [name, setName] = useState('');
    const { location, setLocation } = useContext(LocationContext);
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        if (route.params?.pickedLocation) {
            setLocation(route.params.pickedLocation);
        }
    }, [route.params]);

    async function handleAddReporte() {
        if (!name || !location) {
            alert('Por favor, complete la descripción y seleccione una ubicación.');
            return;
        }

        const newReporte = {
            id: Date.now().toString(),
            name: name,
            date: new Date().toISOString(),
            location: location
        };

        try {
            await saveReporte(newReporte);
            onAddReporte(newReporte);
            hideModal();
            setLocation(null);
        } catch (error) {
            console.error("Error al guardar el reporte:", error);
        }
    }

    function handleSelectLocation() {
        navigation.navigate('Map');
    }

    function handleClose() {
        hideModal();
        setLocation(null); 
    }

    return (
        <Modal visible={showModal} animationType="slide">
            <View style={styles.container}>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.text}>Nuevo Reporte</Text>
                <TextInput
                    onChangeText={(text) => setName(text)}
                    style={styles.input}
                    placeholder="Descripción de la incidencia"
                    color="white"
                />
                <TouchableOpacity style={styles.button} onPress={handleSelectLocation}>
                    <Text style={styles.buttonText}>Seleccionar Ubicación</Text>
                </TouchableOpacity>
                {location && (
                    <Text style={styles.locationText}>
                        Ubicación seleccionada: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                    </Text>
                )}
                <TouchableOpacity style={styles.button} onPress={handleAddReporte}>
                    <Text style={styles.buttonText}>Guardar Reporte</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1C3B57",
        paddingHorizontal: 20,
    },
    logo: {
        width: 100,  
        height: 100, 
        marginBottom: 20,
    },
    input: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#3A9AD9",
        width: "100%",
        marginVertical: 10,
        backgroundColor: "#3A9AD9",
        borderRadius: 10,
        color: "white",
        fontSize: 16,
    },
    text: {
        color: "#E1E8ED",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    button: {
        backgroundColor: "#3A9AD9",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    locationText: {
        color: "#E1E8ED",
        fontSize: 14,
        marginTop: 12,
        paddingHorizontal: 20,
        textAlign: 'center'
    },
    cancelButton: {
        backgroundColor: "#FF4B4B",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginVertical: 10,
        width: "80%",
        alignItems: "center",
    },
});

export default NewReporte;
