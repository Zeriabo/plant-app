import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { selectPhotos } from "../../store/slices/photoSlice";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ListView({ navigation }: any) {
  const photos = useSelector(selectPhotos);
  const router = useRouter();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => router.push({ pathname: `/details`, params: item })}
    >
      <View style={styles.photoContainer}>
        <Image source={{ uri: item.uri }} style={styles.photo} />
        <Text>{item.name}</Text>
        <Text>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Photos</Text>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
});
