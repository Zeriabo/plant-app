import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@react-navigation/native";
import { useDispatch } from "react-redux"; // Use dispatch
import { setTheme } from "../../store/slices/themeSlice";
export default function Settings() {
  const router = useRouter();
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(setTheme("light"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.placeholder}>This is the settings page.</Text>
      <Button title="Go to Home" onPress={() => router.push("/")} />
      <TouchableOpacity
        style={{ backgroundColor: colors.card }}
        onPress={toggleTheme}
      >
        <Text style={{ color: colors.text }}>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
});
