import type { WorkOrder } from "../data/workOrders";

export async function saveWorkOrder(workOrder: WorkOrder): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, 800));

  if (workOrder.unit === "000") {
    throw new Error("Server unavailable. Please try again.");
  }
}
