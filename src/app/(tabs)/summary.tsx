import { View, Text, StyleSheet } from "react-native";
import { useCompletedJobs } from "../../context/CompletedJobsContext";
import { useWorkOrdersQuery } from "@/hooks/workOrderQueries";

export default function SummaryScreen() {
  const { data: workOrders = [] } = useWorkOrdersQuery();
  const { completedJobs } = useCompletedJobs();
  const total = workOrders.length;
  const completed = completedJobs.length;
  const open = total - completed;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Work order summary</Text>
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.number}>{total}</Text>
          <Text style={styles.label}>Total</Text>
        </View>
        <View style={[styles.card, styles.completedCard]}>
          <Text style={[styles.number, styles.completedNumber]}>{completed}</Text>
          <Text style={styles.label}>Completed</Text>
        </View>
        <View style={[styles.card, styles.openCard]}>
          <Text style={[styles.number, styles.openNumber]}>{open}</Text>
          <Text style={styles.label}>Open</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E3A2F",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E4EAE0",
    backgroundColor: "#F7F9F5",
  },
  completedCard: {
    backgroundColor: "#EDF4EC",
  },
  openCard: {
    backgroundColor: "#F8F2E8",
  },
  number: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E3A2F",
  },
  completedNumber: {
    color: "#45674B",
  },
  openNumber: {
    color: "#9A6A34",
  },
  label: {
    fontSize: 13,
    color: "#666",
    marginTop: 6,
    textAlign: "center",
  },
});
