import express from "express";
import { isAuth } from "../middlewares/isAuth.js";

import { createInventory, decreaseStock, deleteInventory, getAllInventories, getInventoryById, increaseStock, releaseReservedStock, reserveStock, updateInventory } from "../controllers/inventory.controller.js";

const inventoryrouter = express.Router();

inventoryrouter.post("/", isAuth, createInventory);
inventoryrouter.get("/", isAuth, getAllInventories);
inventoryrouter.get("/:id", isAuth, getInventoryById);
inventoryrouter.put("/:id", isAuth, updateInventory);
inventoryrouter.delete("/:id", isAuth, deleteInventory);

inventoryrouter.put("/:id/increase", isAuth, increaseStock);
inventoryrouter.put("/:id/decrease", isAuth, decreaseStock);
inventoryrouter.put("/:id/reserve", isAuth, reserveStock);
inventoryrouter.put("/:id/release", isAuth, releaseReservedStock);

export default inventoryrouter;