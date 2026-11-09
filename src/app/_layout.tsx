import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CompletedJobsProvider } from "../context/CompletedJobsContext";
import { WorkOrdersProvider } from "../context/WorkOrdersContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <WorkOrdersProvider>
        <CompletedJobsProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="add" options={{ title: "New work order" }} />
          </Stack>
        </CompletedJobsProvider>
      </WorkOrdersProvider>
    </QueryClientProvider>
  );
}
