import { Router } from "express";
import { getAllItems } from "../controllers/itemController";
const router = Router();

router.get('/',getAllItems)

export default router;
