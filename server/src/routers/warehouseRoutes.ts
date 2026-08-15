import { Router } from "express";
import {
  createWarehouse,
  getAllWarehouses,
  updateWarehouse,
} from "../controllers/warehouseController";
const router = Router();

router.get("/", getAllWarehouses);
router.post("/", createWarehouse);
router.patch("/:id", updateWarehouse);
export default router;
