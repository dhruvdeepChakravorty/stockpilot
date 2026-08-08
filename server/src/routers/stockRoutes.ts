import { Router } from "express";
import {
  createStockMovement,
  getAllStockMovement,
  getLowStock,
} from "../controllers/stockController";

const router = Router();

router.get("/low", getLowStock);
router.get("/movements", getAllStockMovement);
router.post("/movements", createStockMovement);

export default router;
