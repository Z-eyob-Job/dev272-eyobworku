import { useState } from "react";
import { router } from "expo-router";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Pressable,
  Switch,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWorkOrders } from "../context/WorkOrdersContext";
import type { WorkOrder } from "../data/workOrders";
import { saveWorkOrder } from "../utils/saveWorkOrder";
import {
  workOrderSchema,
  type WorkOrderInput,
  type WorkOrderOutput,
} from "../utils/workOrderSchema";

export default function AddWorkOrderScreen() {
  const { addWorkOrder } = useWorkOrders();
  const [saveError, setSaveError] = useState<string | null>(null);
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  async function onSubmit(values: WorkOrderOutput) {
    setSaveError(null);

    const workOrder: WorkOrder = {
      ...values,
      id: Date.now().toString(),
      unit: values.unit.toUpperCase(),
    };

    try {
      await saveWorkOrder(workOrder);
      addWorkOrder(workOrder);

      const message = `Unit ${workOrder.unit} was added.`;

      if (Platform.OS === "web") {
        window.alert(message);
        router.back();
      } else {
        Alert.alert("Work order saved", message, [
          { text: "OK", onPress: () => router.back() },
        ]);
      }
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Unable to save. Please try again.",
      );
    }
  }

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
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <TextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="e.g. J17"
              autoCapitalize="characters"
              autoCorrect={false}
              returnKeyType="next"
              submitBehavior="submit"
              onSubmitEditing={() => setFocus("issue")}
              style={[styles.input, errors.unit && styles.inputError]}
            />
          )}
        />
        {errors.unit && <Text style={styles.error}>{errors.unit.message}</Text>}

        <Text style={styles.label}>Issue</Text>
        <Controller
          control={control}
          name="issue"
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <TextInput
              ref={ref}
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
          render={({ field: { value, onChange, onBlur, ref } }) => (
            <TextInput
              ref={ref}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="e.g. 45"
              keyboardType="number-pad"
              returnKeyType="done"
              submitBehavior="blurAndSubmit"
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

        <Text style={styles.label}>Priority</Text>
        <Controller
          control={control}
          name="priority"
          render={({ field: { value, onChange } }) => (
            <View style={styles.chipRow}>
              {(["low", "medium", "high"] as const).map((priority) => (
                <Pressable
                  key={priority}
                  onPress={() => onChange(priority)}
                  style={[
                    styles.chip,
                    value === priority && styles.chipSelected,
                  ]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: value === priority }}
                >
                  <Text
                    style={[
                      styles.chipText,
                      value === priority && styles.chipTextSelected,
                    ]}
                  >
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        />
        {errors.priority && (
          <Text style={styles.error}>{errors.priority.message}</Text>
        )}

        <Controller
          control={control}
          name="permissionToEnter"
          render={({ field: { value, onChange } }) => (
            <View style={styles.switchRow}>
              <View style={styles.switchText}>
                <Text style={styles.switchLabel}>Permission to enter</Text>
                <Text style={styles.hint}>
                  OK to enter if the resident isn't home
                </Text>
              </View>
              <Switch
                value={value}
                onValueChange={onChange}
                accessibilityLabel="Permission to enter"
                accessibilityHint="OK to enter if the resident isn't home"
              />
            </View>
          )}
        />
        {saveError && <Text style={styles.error}>{saveError}</Text>}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          accessibilityRole="button"
          accessibilityState={{ disabled: isSubmitting, busy: isSubmitting }}
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.pressed,
            isSubmitting && styles.disabled,
          ]}
        >
          <Text style={styles.saveButtonText}>
            {isSubmitting ? "Saving…" : "Save work order"}
          </Text>
        </Pressable>
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
  chipRow: {
    flexDirection: "row",
    gap: 12,
  },
  chip: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 24,
  },
  chipSelected: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },
  chipText: {
    textAlign: "center",
  },
  chipTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    gap: 12,
  },
  switchText: {
    flex: 1,
  },
  switchLabel: {
    fontWeight: "bold",
  },
  hint: {
    color: "#666",
    fontSize: 13,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});
