import { Router } from "express";
import { createSupplier, getAllSuppliers, updateSupplier } from "../controllers/supplierController";
const router = Router();

router.get('/',getAllSuppliers)
router.post('/',createSupplier)
router.patch('/:id', updateSupplier);

export default router;