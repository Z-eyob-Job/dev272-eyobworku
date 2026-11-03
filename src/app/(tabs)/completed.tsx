import { FlatList, View, Text, StyleSheet } from "react-native";
import { useCompletedJobs } from "../../context/CompletedJobsContext";
import { workOrders } from "../../data/workOrders";

export default function CompletedScreen() {
  const { completedJobs } = useCompletedJobs();

  return (
    <FlatList
      data={completedJobs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        const workOrder = workOrders.find((job) => job.id === item.id);

        if (!workOrder) {
          return null;
        }

        return (
          <View style={styles.row}>
            <Text style={styles.unit}>Unit {workOrder.unit}</Text>
            <Text style={styles.issue}>{workOrder.issue}</Text>
            <Text style={styles.date}>Completed on {item.completedOn}</Text>
          </View>
        );
      }}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No jobs closed yet</Text>
          <Text style={styles.emptyHint}>
            Open a work order and tap Mark complete to see it here.
          </Text>
        </View>
      }
      contentContainerStyle={styles.content}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flexGrow: 1,
  },
  row: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  unit: {
    fontSize: 18,
    fontWeight: "bold",
  },
  issue: {
    fontSize: 15,
    marginTop: 4,
  },
  date: {
    fontSize: 13,
    color: "#15803d",
    marginTop: 8,
  },
  empty: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    color: "#666",
    fontWeight: "600",
    textAlign: "center",
  },
  emptyHint: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});
