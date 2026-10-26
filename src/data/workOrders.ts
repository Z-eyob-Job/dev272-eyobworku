export type WorkOrder = {
  id: string;
  unit: string;
  issue: string;
  priority: "low" | "medium" | "high";
};

export const workOrders: WorkOrder[] = [
  {
    id: "WO-001",
    unit: "101",
    issue: "Kitchen faucet leaking under the sink",
    priority: "high",
  },
  {
    id: "WO-002",
    unit: "102",
    issue: "Bedroom door handle loose",
    priority: "low",
  },
  {
    id: "WO-003",
    unit: "103",
    issue: "Dishwasher not draining",
    priority: "medium",
  },
  {
    id: "WO-004",
    unit: "201",
    issue: "Air conditioner blowing warm air",
    priority: "high",
  },
  {
    id: "WO-005",
    unit: "202",
    issue: "Bathroom exhaust fan making noise",
    priority: "medium",
  },
  {
    id: "WO-006",
    unit: "203",
    issue: "Window screen needs replacement",
    priority: "low",
  },
  {
    id: "WO-007",
    unit: "301",
    issue: "Toilet running continuously",
    priority: "medium",
  },
  {
    id: "WO-008",
    unit: "302",
    issue: "Front door deadbolt will not lock",
    priority: "high",
  },
];