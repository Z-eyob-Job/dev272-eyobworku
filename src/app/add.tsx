import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  TextInput,
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
        <Text style={styles.label}>Unit</Text>
        <Controller
          control={control}
          name="unit"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="e.g. J17"
              autoCapitalize="characters"
              autoCorrect={false}
              style={[styles.input, errors.unit && styles.inputError]}
            />
          )}
        />
        {errors.unit && <Text style={styles.error}>{errors.unit.message}</Text>}

        <Text style={styles.label}>Issue</Text>
        <Controller
          control={control}
          name="issue"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="What's wrong?"
              multiline
              autoCapitalize="sentences"
              style={[
                styles.input,
                styles.multiline,
                errors.issue && styles.inputError,
              ]}
            />
          )}
        />
        {errors.issue && <Text style={styles.error}>{errors.issue.message}</Text>}

        <Text style={styles.label}>Estimated minutes</Text>
        <Controller
          control={control}
          name="estimatedMinutes"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="e.g. 45"
              keyboardType="number-pad"
              style={[
                styles.input,
                errors.estimatedMinutes && styles.inputError,
              ]}
            />
          )}
        />
        {errors.estimatedMinutes && (
          <Text style={styles.error}>{errors.estimatedMinutes.message}</Text>
        )}
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
  label: {
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#dc2626",
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  error: {
    color: "#dc2626",
    fontSize: 13,
    marginTop: 6,
  },
});
