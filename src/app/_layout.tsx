import { Stack } from "expo-router";
import { CompletedJobsProvider } from "../context/CompletedJobsContext";
import { WorkOrdersProvider } from "../context/WorkOrdersContext";

export default function RootLayout() {
  return (
    <WorkOrdersProvider>
      <CompletedJobsProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="add" options={{ title: "New work order" }} />
        </Stack>
      </CompletedJobsProvider>
    </WorkOrdersProvider>
  );
}
