import { Router } from "express";
import { createItem, getAllItems } from "../controllers/itemController";
const router = Router();

router.get('/',getAllItems)
router.post('/',createItem)

export default router;
