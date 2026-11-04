import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { workOrders } from "../../data/workOrders";
import { useCompletedJobs } from "../../context/CompletedJobsContext";

export default function WorkOrderDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { completedJobs, markComplete, undoComplete } = useCompletedJobs();
  const workOrder = workOrders.find((item) => item.id === id);

  if (!workOrder) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Not found" }} />
        <Text style={styles.value}>No work order was found with ID {id}.</Text>
      </View>
    );
  }

  const completedJob = completedJobs.find((job) => job.id === workOrder.id);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Unit ${workOrder.unit}` }} />
      <Text style={styles.label}>ID</Text>
      <Text style={styles.value}>{workOrder.id}</Text>
      <Text style={styles.label}>Unit</Text>
      <Text style={styles.value}>{workOrder.unit}</Text>
      <Text style={styles.label}>Issue</Text>
      <Text style={styles.value}>{workOrder.issue}</Text>
      <Text style={styles.label}>Priority</Text>
      <Text style={styles.value}>{workOrder.priority}</Text>
      <Text style={styles.label}>Estimated time</Text>
      <Text style={styles.value}>{workOrder.estimatedMinutes} min</Text>
      <Text style={styles.label}>Permission to enter</Text>
      <Text style={styles.value}>{workOrder.permissionToEnter ? "Yes" : "No"}</Text>
      {completedJob ? (
        <>
          <Text style={styles.status}>
            Completed on {completedJob.completedOn}
          </Text>
          <Pressable
            onPress={() => undoComplete(workOrder.id)}
            style={({ pressed }) => [
              styles.button,
              styles.undoButton,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Undo</Text>
          </Pressable>
        </>
      ) : (
        <Pressable
          onPress={() => markComplete(workOrder.id)}
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Mark complete</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.6,
  },
  status: {
    color: "#15803d",
    fontSize: 16,
    fontWeight: "600",
  },
  undoButton: {
    backgroundColor: "#6b7280",
  },
});
