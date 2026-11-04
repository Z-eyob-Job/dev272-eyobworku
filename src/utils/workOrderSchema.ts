import { z } from "zod";

export const workOrderSchema = z.object({
  unit: z
    .string({ error: "Unit is required" })
    .trim()
    .min(1, { error: "Unit is required" })
    .max(5, { error: "Use letters and numbers only, up to 5" })
    .regex(/^[a-zA-Z0-9]+$/, {
      error: "Use letters and numbers only, up to 5",
    }),
  issue: z
    .string({ error: "Describe the issue in at least 5 characters" })
    .trim()
    .min(5, { error: "Describe the issue in at least 5 characters" }),
  estimatedMinutes: z.coerce
    .number<string>({ error: "Enter a number between 5 and 480" })
    .int({ error: "Enter a whole number between 5 and 480" })
    .min(5, { error: "Enter a number between 5 and 480" })
    .max(480, { error: "Enter a number between 5 and 480" }),
  priority: z.enum(["low", "medium", "high"], { error: "Pick a priority" }),
  permissionToEnter: z.boolean(),
});

export type WorkOrderInput = z.input<typeof workOrderSchema>;
export type WorkOrderOutput = z.output<typeof workOrderSchema>;
