import { useQuery } from "@tanstack/react-query";
import { fetchWorkOrders, fetchWorkOrder } from "@/api/workOrders";

export const useWorkOrdersQuery = () =>
  useQuery({ queryKey: ["workOrders"], queryFn: fetchWorkOrders });

export const useWorkOrderQuery = (id: string) =>
  useQuery({
    queryKey: ["workOrders", id],
    queryFn: () => fetchWorkOrder(id),
    enabled: !!id,
  });
