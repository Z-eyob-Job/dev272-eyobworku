import { View, Text, StyleSheet } from "react-native";

export default function SummaryScreen() {
  return (
    <View style={styles.container}>
      <Text>Summary will show here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});
