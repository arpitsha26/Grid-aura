import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { assignMaterialsToVendor, createVendor, deleteVendor, getAllVendors, getVendorById, updateVendor } from "../controllers/vendor.controller.js";

const vendorrouter = express.Router();

vendorrouter.post("/", isAuth, createVendor);
vendorrouter.get("/", isAuth, getAllVendors);
vendorrouter.get("/:id", isAuth, getVendorById);
vendorrouter.put("/:id", isAuth, updateVendor);
vendorrouter.delete("/:id", isAuth, deleteVendor);
vendorrouter.put("/:vendorId/assign-materials", isAuth, assignMaterialsToVendor);

export default vendorrouter;