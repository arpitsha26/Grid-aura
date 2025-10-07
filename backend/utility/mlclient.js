import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const mlBaseURL = process.env.ML_BASE_URL;

export const optimizeInventory = async (materials, scenario = "default") => {
  const { data } = await axios.post(`${mlBaseURL}/optimize_inventory`, {
    materials,
    simulation_scenario: scenario,
  });
  return data;
};
