import { Stack } from "expo-router";
import { CompletedJobsProvider } from "../context/CompletedJobsContext";

export default function RootLayout() {
  return (
    <CompletedJobsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </CompletedJobsProvider>
  );
}
