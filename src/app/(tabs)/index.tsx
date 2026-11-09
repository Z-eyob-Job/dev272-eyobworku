import { useState } from "react";
import { Link, router } from "expo-router";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useWorkOrdersQuery } from "@/hooks/workOrderQueries";
import WorkOrderRow from "../../components/WorkOrderRow";

export default function Index() {
  const {
    data: workOrders,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
  } = useWorkOrdersQuery();
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
      <Pressable
        onPress={() => router.push("/add")}
        style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
        accessibilityRole="button"
      >
        <Text style={styles.addButtonText}>+ New work order</Text>
      </Pressable>
    </View>
  );

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error.message}</Text>
        <Pressable onPress={() => refetch()} accessibilityRole="button">
          <Text style={styles.link}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const filtered = workOrders.filter(
    (item) =>
      item.unit.toLowerCase().includes(query.toLowerCase()) ||
      item.issue.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: "/work-orders/[id]",
            params: { id: item.id },
          }}
          asChild
        >
          <Pressable>
            <WorkOrderRow item={item} />
          </Pressable>
        </Link>
      )}
      ListHeaderComponent={header}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={() => refetch()}
        />
      }
      ListEmptyComponent={
        <Text style={styles.empty}>
          {query ? "No matches." : "No work orders yet."}
        </Text>
      }
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
  addButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.6,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  error: {
    color: "#b91c1c",
    marginBottom: 12,
  },
  link: {
    color: "#2563eb",
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    color: "#666",
    padding: 24,
  },
});
