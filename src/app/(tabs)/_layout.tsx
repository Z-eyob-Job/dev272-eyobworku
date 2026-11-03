import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCompletedJobs } from "../../context/CompletedJobsContext";

export default function TabLayout() {
  const { completedJobs } = useCompletedJobs();
  const completedCount = completedJobs.length;

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Work Orders",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="completed"
        options={{
          title: "Completed",
          tabBarBadge: completedCount > 0 ? completedCount : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-done" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: "Summary",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
