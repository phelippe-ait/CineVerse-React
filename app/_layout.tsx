import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    // The Stack component manages the navigation stack for the app. Each screen is defined as a Stack.Screen.
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgotPassword" />
      // The "tabs" screen is the main authenticated area of the app, which contains the bottom tab navigator. It is defined in app/tabs/_layout.tsx.
      <Stack.Screen name="tabs" />
      <Stack.Screen
        name="movie_details"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
}