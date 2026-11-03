import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { workOrders } from "../../data/workOrders";

export default function WorkOrderDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const workOrder = workOrders.find((item) => item.id === id);

  if (!workOrder) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Not found" }} />
        <Text style={styles.value}>No work order was found with ID {id}.</Text>
      </View>
    );
  }

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
});
