import { Router } from "express";
import {
  createItem,
  getAllItems,
  updateItem,
} from "../controllers/itemController";
const router = Router();

router.get("/", getAllItems);
router.post("/", createItem);
router.patch("/:id", updateItem);

export default router;
