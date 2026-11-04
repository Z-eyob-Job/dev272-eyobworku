import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  workOrderSchema,
  type WorkOrderInput,
  type WorkOrderOutput,
} from "../utils/workOrderSchema";

export default function AddWorkOrderScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkOrderInput, unknown, WorkOrderOutput>({
    resolver: zodResolver(workOrderSchema),
    mode: "onBlur",
    defaultValues: {
      unit: "",
      issue: "",
      estimatedMinutes: "",
      priority: "medium",
      permissionToEnter: false,
    },
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <Text>Form goes here</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 24,
  },
});
