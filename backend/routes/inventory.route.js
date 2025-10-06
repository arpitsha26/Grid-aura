import express from "express";

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