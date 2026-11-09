import { supabase } from "@/lib/supabase";

export type WorkOrder = {
  id: string;
  created_at: string;
  unit: string;
  issue: string;
  priority: "low" | "medium" | "high";
  estimatedMinutes: number;
  permissionToEnter: boolean;
};

export type NewWorkOrder = Omit<WorkOrder, "id" | "created_at">;

export async function fetchWorkOrders(): Promise<WorkOrder[]> {
  const { data, error } = await supabase
    .from("work_orders")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchWorkOrder(id: string): Promise<WorkOrder | null> {
  const { data, error } = await supabase
    .from("work_orders")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function createWorkOrder(input: NewWorkOrder): Promise<WorkOrder> {
  const { data, error } = await supabase
    .from("work_orders")
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data;
}
