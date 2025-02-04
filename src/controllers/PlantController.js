import PlantModel from "../models/PlantModel";

class PlantController {
  static async addPlant(name, imageUri) {
    const plant = {
      id: Date.now(),
      name,
      imageUri,
      dateAdded: new Date().toISOString(),
    };
    await PlantModel.savePlant(plant);
    return plant;
  }

  static async fetchPlants() {
    return await PlantModel.getPlants();
  }
}

export default PlantController;
