import { Router } from "express";
import { getAllWarehouses } from "../controllers/warehouseController";
const router = Router();

router.get('/',getAllWarehouses)

export default router;