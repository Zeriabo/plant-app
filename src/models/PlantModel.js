import AsyncStorage from "@react-native-async-storage/async-storage";

class PlantModel {
  static async savePlant(plant) {
    let plants = await AsyncStorage.getItem("plants");
    plants = plants ? JSON.parse(plants) : [];
    plants.push(plant);
    await AsyncStorage.setItem("plants", JSON.stringify(plants));
  }

  static async getPlants() {
    let plants = await AsyncStorage.getItem("plants");
    return plants ? JSON.parse(plants) : [];
  }
}

export default PlantModel;
