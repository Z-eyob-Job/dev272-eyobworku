import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { workOrders } from "../data/workOrders";
import WorkOrderRow from "../components/WorkOrderRow";

export default function Index() {
  const [query, setQuery] = useState("");

  function handleClear() {
    console.log("Searching for:", query);
    setQuery("");
  }

  const header = (
    <View style={styles.header}>
      <Text style={styles.title}>Work Orders</Text>
      <View style={styles.searchRow}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search by unit or issue"
          style={styles.input}
        />
        <Pressable onPress={handleClear} style={styles.button}>
          <Text style={styles.buttonText}>Clear</Text>
        </Pressable>
      </View>
    </View>
  );

  const filtered = workOrders.filter(
    (item) =>
      item.unit.toLowerCase().includes(query.toLowerCase()) ||
      item.issue.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <WorkOrderRow item={item} />}
      ListHeaderComponent={header}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
