import { createContext, useContext, useState, type ReactNode } from "react";
import { workOrders as initialWorkOrders, type WorkOrder } from "../data/workOrders";

type WorkOrdersContextValue = {
  workOrders: WorkOrder[];
  addWorkOrder: (workOrder: WorkOrder) => void;
  updateWorkOrder: (workOrder: WorkOrder) => void;
};

const WorkOrdersContext = createContext<WorkOrdersContextValue | undefined>(
  undefined,
);

export function WorkOrdersProvider({ children }: { children: ReactNode }) {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(initialWorkOrders);

  function addWorkOrder(workOrder: WorkOrder) {
    setWorkOrders((currentWorkOrders) => [workOrder, ...currentWorkOrders]);
  }

  function updateWorkOrder(workOrder: WorkOrder) {
    setWorkOrders((currentWorkOrders) =>
      currentWorkOrders.map((item) =>
        item.id === workOrder.id ? workOrder : item,
      ),
    );
  }

  return (
    <WorkOrdersContext.Provider
      value={{ workOrders, addWorkOrder, updateWorkOrder }}
    >
      {children}
    </WorkOrdersContext.Provider>
  );
}

export function useWorkOrders() {
  const context = useContext(WorkOrdersContext);

  if (context === undefined) {
    throw new Error("useWorkOrders must be used inside WorkOrdersProvider");
  }

  return context;
}
