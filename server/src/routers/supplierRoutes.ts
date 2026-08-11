import { Router } from "express";
import { createSupplier, getAllSuppliers } from "../controllers/supplierController";
const router = Router();

router.get('/',getAllSuppliers)
router.post('/',createSupplier)

export default router;