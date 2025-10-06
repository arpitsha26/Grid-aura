import express from "express";
import { isAuth } from "../middlewares/isAuth";
import { createProcurementOrder, deleteProcurementOrder, getAllProcurementOrders, getOrdersByProject, getProcurementOrderById, updateProcurementOrder } from "../controllers/procurementorder.controller";

const prorouter = express.Router();

prorouter.post("/", isAuth, createProcurementOrder);
prorouter.get("/", isAuth, getAllProcurementOrders);
prorouter.get("/:id", isAuth, getProcurementOrderById);
prorouter.get("/project/:projectId", isAuth, getOrdersByProject);
prorouter.put("/:id", isAuth, updateProcurementOrder);
prorouter.delete("/:id", isAuth, deleteProcurementOrder);

export default prorouter;