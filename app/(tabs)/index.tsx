import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Button,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { selectPhotos, addPhoto } from "../../store/slices/photoSlice";
import { useRouter } from "expo-router";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

export default function ListView({ navigation }: any) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const photos = useSelector(selectPhotos);
  const dispatch = useDispatch();
  const router = useRouter();

  const takePhoto = async () => {
    setIsLoading(true);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    setIsLoading(false);

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
        id: uuidv4(),
      })
    );
    setPhoto(null);
    setPhotoName("");
    setNotes("");
    Alert.alert("Success", "Photo saved successfully.");
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => router.push({ pathname: `/details`, params: item })}
    >
      <View style={styles.photoContainer}>
        <Image
          source={{ uri: item.uri }}
          style={styles.photo}
          accessibilityLabel={item.name}
        />
        <Text>{item.name}</Text>
        <Text>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plant Photo App</Text>

      <View style={styles.addPhotoContainer}>
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
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.title}>Saved Photos</Text>
        {photos.length === 0 ? (
          <Text>No photos saved yet.</Text>
        ) : (
          <FlatList
            data={photos}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addPhotoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
  photoContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
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
