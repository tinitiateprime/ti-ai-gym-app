import { Platform } from "react-native";

export const API_BASE =
  Platform.OS === "android"
    ? "http://10.0.2.2:3001"   // Android emulator
    : "http://localhost:3001"; // iOS simulator
