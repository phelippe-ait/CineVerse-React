import { Stack } from "expo-router";
import React from "react";

export default function AccountLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "Account" }} />
      <Stack.Screen name="watched" options={{ title: "Watched Movies" }} />
    </Stack>
  );
}
