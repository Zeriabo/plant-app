import React, { useState, useEffect } from "react";
import { View, Button, Image, TextInput, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera"; // Use expo-camera if using Expo
import PlantController from "../controllers/PlantController"; // Assuming you have this for saving plant data

const ScanView = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const [plantName, setPlantName] = useState("");

  // Request camera permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); // Expo method for permissions
      setHasPermission(status === "granted");
    })();
  }, []);

  // Take picture
  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  // Save the plant details
  const savePlant = async () => {
    if (photoUri && plantName) {
      await PlantController.addPlant(plantName, photoUri); // Assuming you have this function
      navigation.navigate("ListView"); // Navigate to your list view after saving
    }
  };

  // Show loading state while permission is being requested
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Loading Camera...</Text>
      </View>
    );
  }

  // If no permission, show an error message
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Render camera only if permission is granted */}
      {hasPermission && (
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={Camera.Constants.Type.back} // Use back camera
        />
      )}

      <Button title="Take Picture" onPress={takePicture} />
      {photoUri && (
        <Image source={{ uri: photoUri }} style={styles.imagePreview} />
      )}

      <TextInput
        style={styles.input}
        placeholder="Enter Plant Name"
        value={plantName}
        onChangeText={setPlantName}
      />

      <Button title="Save Plant" onPress={savePlant} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  camera: {
    width: "100%",
    height: 400,
    marginBottom: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 8,
  },
});

export default ScanView;
