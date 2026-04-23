import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    // The Stack component manages the navigation stack for the app. Each screen is defined as a Stack.Screen.
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index" 
        options={{
          title: "Sign In",
        }
        
      }/>
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          title: "Create Account",
          headerStyle: { backgroundColor: "#0A101D" },
          headerTintColor: "#E2E8F0",
          headerTitleStyle: { fontWeight: "600", fontSize: 18 },
        }}
      />
      <Stack.Screen
        name="forgotPassword"
        options={{
          headerShown: true,
          title: "Reset Password",
          headerStyle: { backgroundColor: "#0A101D" },
          headerTintColor: "#E2E8F0",
          headerTitleStyle: { fontWeight: "600", fontSize: 18 },
        }}
      />
      {/* The tabs screen is the main authenticated area of the app. */}
      <Stack.Screen name="tabs" />
      <Stack.Screen
        name="movie_details"
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
}
