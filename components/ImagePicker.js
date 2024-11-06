import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useCameraPermissions, PermissionStatus, launchCameraAsync } from 'expo-image-picker';

export default function ImagePickerComponent() {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  async function verifyPermission() {

    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      alert('Necesitas permisos de la cámara');
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission()
    if (!hasPermission) {
    return
   }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });

    console.log(image)
    setPickedImage(image.assets[0].uri)
}


  return (
    <View style={styles.container}>
      {pickedImage && <Image source={{ uri: pickedImage }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={takeImageHandler}>
        <Text style={styles.buttonText}>Tomar una imagen</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300 * 9 /16,
    marginBottom:10,
  },
  button: {
    backgroundColor: "#3A9AD9",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    width: 270,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
