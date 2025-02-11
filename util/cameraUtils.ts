import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const capturePhoto = async (): Promise<string | null> => {
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Camera access is required to take a photo. Please enable it in settings.",
        [{ text: "OK" }]
      );
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return null;
    }

    return result.assets[0].uri;
  } catch (error) {
    console.error("Error capturing photo:", error);
    Alert.alert("Error", "Something went wrong while capturing the photo.");
    return null;
  }
};
