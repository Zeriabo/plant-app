import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Button } from "react-native";
import PlantController from "../controllers/PlantController";

const ListView = ({ navigation }) => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const loadPlants = async () => {
      const data = await PlantController.fetchPlants();
      setPlants(data);
    };
    loadPlants();
  }, []);

  return (
    <View>
      <FlatList
        data={plants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.imageUri }}
              style={{ width: 100, height: 100 }}
            />
            <Text>{item.name}</Text>
            <Text>{item.dateAdded}</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate("DetailView", { plant: item })}
            />
          </View>
        )}
      />
      <Button
        title="Add Plant"
        onPress={() => navigation.navigate("ScanView")}
      />
    </View>
  );
};
export default ListView;
