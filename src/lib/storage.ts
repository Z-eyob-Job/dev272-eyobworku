import AsyncStorage from "@react-native-async-storage/async-storage";

export const STORAGE_KEYS = {
  completedJobs: "completedJobs.v1",
} as const;

export async function loadJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const stored = await AsyncStorage.getItem(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch (e) {
    console.warn(`loadJson(${key}) failed`, e);
    return fallback;
  }
}

export async function saveJson<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`saveJson(${key}) failed`, e);
  }
}
