import express from "express";
import { pool } from "./config/dbConnect";
import { errfunction } from "./middleware/errorHandler";
import stockRoutes from "./routers/stockRoutes";
import itemsRoutes from "./routers/itemRoutes";
import warehousesRoutes from "./routers/warehouseRoutes";
import suppliersRoutes from "./routers/supplierRoutes";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use("/stock", stockRoutes);
app.use("/items", itemsRoutes);
app.use("/warehouses", warehousesRoutes);
app.use("/suppliers", suppliersRoutes);

app.use(errfunction);

app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
pool
  .query("SELECT NOW()")
  .then((res) => console.log("DB connected. Server time:", res.rows[0].now))
  .catch((err) => console.error("DB connection failed:", err));
