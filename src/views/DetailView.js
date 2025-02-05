import React from "react";
import { View, Text, Image, Button } from "react-native";

const DetailView = ({ route, navigation }) => {
  const { plant } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Image
        source={{ uri: plant.imageUri }}
        style={{ width: 300, height: 300 }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 10 }}>
        {plant.name}
      </Text>
      <Text style={{ fontSize: 16, color: "gray" }}>
        Added on: {plant.dateAdded}
      </Text>
      <Button title="Back to List" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailView;
