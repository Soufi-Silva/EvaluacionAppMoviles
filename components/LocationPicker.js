// LocationPicker.js
import React, { useState } from 'react';
import { Button, View, Alert, Text } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

function LocationPicker({ onLocationSelected }) {
    const [location, setLocation] = useState(null);
    const navigation = useNavigation();

    async function verifyPermissions() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Se necesita el permiso de ubicación.');
            return false;
        }
        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) return;

        const currentLocation = await Location.getCurrentPositionAsync({ timeout: 5000 });
        const selectedLocation = {
            lat: currentLocation.coords.latitude,
            lng: currentLocation.coords.longitude,
        };
        setLocation(selectedLocation);
        onLocationSelected(selectedLocation); 
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    return (
        <View>
            <Button title="Usar ubicación del dispositivo" onPress={getLocationHandler} />
            <Button title="Seleccionar en el mapa" onPress={pickOnMapHandler} />
            {location && <Text>Ubicación seleccionada: {location.lat}, {location.lng}</Text>}
        </View>
    );
}

export default LocationPicker;
