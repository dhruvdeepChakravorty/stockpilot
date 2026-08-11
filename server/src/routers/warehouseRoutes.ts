import { Router } from "express";
import {
  createWarehouse,
  getAllWarehouses,
} from "../controllers/warehouseController";
const router = Router();

router.get("/", getAllWarehouses);
router.post("/", createWarehouse);
export default router;
