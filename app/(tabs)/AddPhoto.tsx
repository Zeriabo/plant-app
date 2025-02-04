import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { addPhoto } from "../../store/slices/photoSlice";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function AddPhoto({ navigation }: any) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const dispatch = useDispatch();

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Camera access is needed to take a photo."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const savePhoto = () => {
    if (!photoName || !photo) {
      Alert.alert("Error", "Please provide a name for the photo.");
      return;
    }

    dispatch(
      addPhoto({
        uri: photo,
        name: photoName,
        date: new Date().toISOString().split("T")[0],
        notes,
        id: "",
      })
    );
    setPhoto(null);
    setPhotoName("");
    setNotes("");
    Alert.alert("Success", "Photo saved successfully.");
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={{ uri: "https://example.com/image.jpg" }}
          style={{ width: "100%", height: 200 }}
        />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Capture a Photo</ThemedText>
        <Button title="Take Photo" onPress={takePhoto} />
        {photo && <Image source={{ uri: photo }} style={styles.image} />}
        <TextInput
          style={styles.input}
          placeholder="Enter photo name"
          value={photoName}
          onChangeText={setPhotoName}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter photo notes"
          value={notes}
          onChangeText={setNotes}
        />
        <Button title="Save Photo" onPress={savePhoto} />
        <Button
          title="View Saved Photos"
          onPress={() => navigation.navigate("ListView")}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
    width: "100%",
    borderRadius: 5,
  },
});
