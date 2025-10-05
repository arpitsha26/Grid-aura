import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { createAsset, deleteAsset, getAllAssets, getAssetById, getAssetSummaryByProject, updateAsset } from "../controllers/asset.controller.js";

const assetrouter=express.Router();

assetrouter.post("/", isAuth, createAsset);
assetrouter.get("/", isAuth, getAllAssets);
assetrouter.get("/:id", isAuth, getAssetById);
assetrouter.put("/:id", isAuth, updateAsset);
assetrouter.delete("/:id", isAuth, deleteAsset);


export default assetrouter;