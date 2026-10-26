import { View, Text, StyleSheet } from "react-native";
import type { WorkOrder } from "../data/workOrders";

type Props = {
  item: WorkOrder;
};

export default function WorkOrderRow({ item }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.topLine}>
        <Text style={styles.unit}>Unit {item.unit}</Text>
        <Text style={styles.priority}>{item.priority}</Text>
      </View>
      <Text style={styles.issue}>{item.issue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  unit: {
    fontSize: 18,
    fontWeight: "bold",
  },
  priority: {
    fontSize: 13,
    color: "#666",
  },
  issue: {
    fontSize: 15,
    marginTop: 4,
  },
});
