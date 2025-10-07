import Inventory from "../models/inventory.js";
import { optimizeInventory } from "../utility/mlclient.js";
import Material from "../models/material.js";




export const applyInventoryOptimization = async (req, res) => {
  try {
    const { simulation_scenario } = req.body;

   
    const inventories = await Inventory.find().populate("material");

    const materials = inventories.map((inv) => ({
      name: inv.material.name,
      current_stock: inv.availableQty,
      avg_monthly_consumption: inv.material.avgMonthlyConsumption || 0,
      forecast_demand_next_month: inv.material.forecastDemandNextMonth || 0,
      lead_time_days: inv.material.leadTimeDays || 0,
      cost_per_unit: inv.material.costPerUnit || 0,
      criticality: inv.material.criticality || "medium",
    }));

    
    const result = await optimizeInventory(materials, simulation_scenario);

    
    for (const item of result.optimized_inventory) {
      const inventory = await Inventory.findOne()
        .populate("material")
        .where("material.name").equals(item.name);

      if (inventory) {
        inventory.optimizedData = {
          recommendedReorderPoint: item.recommended_reorder_point,
          optimalStockLevel: item.optimal_stock_level,
          safetyStock: item.safety_stock,
          comment: item.comment,
          priceTrendInfo: item.price_trend_info,
          lastOptimizationDate: new Date(),
          scenario: result.scenario,
        };
        await inventory.save();
      }
    }

    res.status(200).json({
      message: "Inventory optimization applied successfully",
      scenario: result.scenario,
      count: result.optimized_inventory.length,
    });
  } catch (err) {
    console.error("Optimization error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
