import { useEffect, useState } from "react";
import "./App.css";
import { CreateStockMovementDialog } from "./components/CreateStockMovementDialog";
import { LowStockDialog } from "./components/LowStockDialog";
import { StockMovementTable } from "./components/stockMovements";
import { Toaster } from "@/components/ui/sonner";
import type { StockMovement } from "./types/stock";
import { getAllMovements } from "./api/stockApi";

function App() {
  const[movements,setMovements]=useState<StockMovement[]>([])
  const fetchMovements = async () => {
      try {
        const data = await getAllMovements();
        setMovements(data);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(()=>{
      fetchMovements();
    },[]);
  return (
    <div>
      <Toaster />
      <LowStockDialog />
      <CreateStockMovementDialog onMovementAdded={fetchMovements}/>
      <StockMovementTable  movements={movements} />
    </div>
  );
}

export default App;
