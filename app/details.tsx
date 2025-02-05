import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updatePhoto, selectPhotos } from "../store/slices/photoSlice";
import { useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

interface Photo {
  id: string;
  uri: string;
  name: string;
  notes: string;
  date: string;
}

export default function DetailView() {
  const photos = useSelector(selectPhotos);
  const dispatch = useDispatch();
  const item = useLocalSearchParams();
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const selectedPhoto = photos.find((p: Photo) => p.id === item.id);
    if (selectedPhoto) {
      setPhoto(selectedPhoto);
      setName(selectedPhoto.name);
      setNotes(selectedPhoto.notes);
    }
  }, [item.id, photos]);

  const handleSave = () => {
    if (photo) {
      dispatch(
        updatePhoto({
          ...photo,
          name,
          notes,
          date: new Date().toISOString().split("T")[0],
        })
      );
      navigation.goBack();
    }
  };

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

    if (!result.canceled && result.assets.length > 0) {
      setPhoto((prevPhoto) => ({
        ...(prevPhoto ?? {
          id: item.id,
          uri: "",
          name: "",
          notes: "",
          date: "",
        }),
        uri: result.assets[0].uri,
      }));
    }
  };

  if (!photo) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.uri }} style={styles.photo} />
      <Button title="Take New Photo" onPress={takePhoto} />

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter plant name"
      />

      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        placeholder="Enter plant notes"
        multiline
      />

      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    paddingLeft: 10,
    width: "100%",
    marginBottom: 10,
    borderRadius: 5,
  },
});
