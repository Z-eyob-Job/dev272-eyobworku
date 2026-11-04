export type WorkOrder = {
  id: string;
  unit: string;
  issue: string;
  priority: "low" | "medium" | "high";
  estimatedMinutes: number;
  permissionToEnter: boolean;
};

export const workOrders: WorkOrder[] = [
  {
    id: "WO-001",
    unit: "101",
    issue: "Kitchen faucet leaking under the sink",
    priority: "high",
    estimatedMinutes: 45,
    permissionToEnter: true,
  },
  {
    id: "WO-002",
    unit: "102",
    issue: "Bedroom door handle loose",
    priority: "low",
    estimatedMinutes: 15,
    permissionToEnter: false,
  },
  {
    id: "WO-003",
    unit: "103",
    issue: "Dishwasher not draining",
    priority: "medium",
    estimatedMinutes: 60,
    permissionToEnter: true,
  },
  {
    id: "WO-004",
    unit: "201",
    issue: "Air conditioner blowing warm air",
    priority: "high",
    estimatedMinutes: 90,
    permissionToEnter: false,
  },
  {
    id: "WO-005",
    unit: "202",
    issue: "Bathroom exhaust fan making noise",
    priority: "medium",
    estimatedMinutes: 30,
    permissionToEnter: false,
  },
  {
    id: "WO-006",
    unit: "203",
    issue: "Window screen needs replacement",
    priority: "low",
    estimatedMinutes: 30,
    permissionToEnter: false,
  },
  {
    id: "WO-007",
    unit: "301",
    issue: "Toilet running continuously",
    priority: "medium",
    estimatedMinutes: 30,
    permissionToEnter: false,
  },
  {
    id: "WO-008",
    unit: "302",
    issue: "Front door deadbolt will not lock",
    priority: "high",
    estimatedMinutes: 45,
    permissionToEnter: false,
  },
];
