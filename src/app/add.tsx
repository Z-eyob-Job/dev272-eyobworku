import { View, Text, StyleSheet } from "react-native";

export default function AddWorkOrderScreen() {
  return (
    <View style={styles.container}>
      <Text>Form goes here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
